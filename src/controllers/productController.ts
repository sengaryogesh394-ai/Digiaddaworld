import connectDB from '@/lib/mongodb';
import Product, { IProduct } from '@/models/Product';

export class ProductController {
  // Get all products with filtering, sorting, and pagination
  static async getAllProducts(options: {
    page?: number;
    limit?: number;
    category?: string;
    isFeatured?: boolean;
    status?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}) {
    await connectDB();

    const {
      page = 1,
      limit = 12,
      category,
      isFeatured,
      status,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = options;

    const skip = (page - 1) * limit;

    // Build filter query
    const filter: any = {};
    
    // Only add status filter if status is provided (undefined means fetch all)
    // If status is explicitly undefined, don't filter by status
    if (status !== undefined) {
      filter.status = status;
    }

    if (category) {
      filter.category = category;
    }

    if (isFeatured !== undefined) {
      filter.isFeatured = isFeatured;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort query
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter)
    ]);

    return {
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Get product by ID
  static async getProductById(id: string) {
    await connectDB();

    const product = await Product.findById(id).lean();

    if (!product) {
      return {
        success: false,
        error: 'Product not found'
      };
    }

    return {
      success: true,
      data: product
    };
  }

  // Get product by slug
  static async getProductBySlug(slug: string) {
    await connectDB();

    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      return {
        success: false,
        error: 'Product not found'
      };
    }

    return {
      success: true,
      data: product
    };
  }

  // Create new product
  static async createProduct(productData: Partial<IProduct>) {
    await connectDB();

    // Generate slug if not provided
    if (!productData.slug && productData.name) {
      productData.slug = productData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // Ensure unique slug
      const existingProduct = await Product.findOne({ slug: productData.slug });
      if (existingProduct) {
        productData.slug = `${productData.slug}-${Date.now()}`;
      }
    }

    const product = new Product(productData);
    await product.save();

    return {
      success: true,
      data: product,
      message: 'Product created successfully'
    };
  }

  // Update product
  static async updateProduct(id: string, updateData: Partial<IProduct>) {
    await connectDB();

    console.log('ProductController - Received update data:', JSON.stringify(updateData, null, 2));
    console.log('ProductController - Promotion data:', updateData.promotion);

    // If name is updated, regenerate slug
    if (updateData.name) {
      const newSlug = updateData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // Check if slug already exists (excluding current product)
      const existingProduct = await Product.findOne({ 
        slug: newSlug,
        _id: { $ne: id }
      });
      
      if (existingProduct) {
        updateData.slug = `${newSlug}-${Date.now()}`;
      } else {
        updateData.slug = newSlug;
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return {
        success: false,
        error: 'Product not found'
      };
    }

    console.log('ProductController - Product after save:', JSON.stringify(product, null, 2));
    console.log('ProductController - Saved promotion:', product.promotion);

    return {
      success: true,
      data: product,
      message: 'Product updated successfully'
    };
  }

  // Delete product
  static async deleteProduct(id: string) {
    await connectDB();

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return {
        success: false,
        error: 'Product not found'
      };
    }

    return {
      success: true,
      message: 'Product deleted successfully'
    };
  }

  // Toggle featured status
  static async toggleFeatured(id: string) {
    await connectDB();

    const product = await Product.findById(id);

    if (!product) {
      return {
        success: false,
        error: 'Product not found'
      };
    }

    product.isFeatured = !product.isFeatured;
    await product.save();

    return {
      success: true,
      data: product,
      message: `Product ${product.isFeatured ? 'featured' : 'unfeatured'} successfully`
    };
  }

  // Update stock
  static async updateStock(id: string, quantity: number) {
    await connectDB();

    const product = await Product.findById(id);

    if (!product) {
      return {
        success: false,
        error: 'Product not found'
      };
    }

    product.stock = quantity;
    if (quantity === 0) {
      product.status = 'out_of_stock';
    } else if (product.status === 'out_of_stock') {
      product.status = 'active';
    }
    
    await product.save();

    return {
      success: true,
      data: product,
      message: 'Stock updated successfully'
    };
  }

  // Increment sales
  static async incrementSales(id: string) {
    await connectDB();

    const product = await Product.findByIdAndUpdate(
      id,
      { $inc: { sales: 1, stock: -1 } },
      { new: true }
    );

    if (!product) {
      return {
        success: false,
        error: 'Product not found'
      };
    }

    return {
      success: true,
      data: product
    };
  }

  // Get product statistics
  static async getProductStats() {
    await connectDB();

    const [
      totalProducts,
      activeProducts,
      featuredProducts,
      outOfStock,
      totalSales,
      categories
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ status: 'active' }),
      Product.countDocuments({ isFeatured: true }),
      Product.countDocuments({ status: 'out_of_stock' }),
      Product.aggregate([
        { $group: { _id: null, total: { $sum: '$sales' } } }
      ]),
      Product.distinct('category')
    ]);

    return {
      success: true,
      data: {
        totalProducts,
        activeProducts,
        featuredProducts,
        outOfStock,
        totalSales: totalSales[0]?.total || 0,
        categories: categories.length
      }
    };
  }

  // Get related products
  static async getRelatedProducts(productId: string, limit: number = 4) {
    await connectDB();

    const product = await Product.findById(productId);

    if (!product) {
      return {
        success: false,
        error: 'Product not found'
      };
    }

    const relatedProducts = await Product.find({
      _id: { $ne: productId },
      category: product.category,
      status: 'active'
    })
      .limit(limit)
      .lean();

    return {
      success: true,
      data: relatedProducts
    };
  }
}
