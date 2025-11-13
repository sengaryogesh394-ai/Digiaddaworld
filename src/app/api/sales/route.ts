import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sale from '@/models/Sale';

// GET /api/sales - Get all sales with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Filters
    const paymentStatus = searchParams.get('paymentStatus');
    const orderStatus = searchParams.get('orderStatus');
    const customerEmail = searchParams.get('customerEmail');
    const productId = searchParams.get('productId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build query
    const query: any = {};
    
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (orderStatus) query.orderStatus = orderStatus;
    if (customerEmail) query.customerEmail = { $regex: customerEmail, $options: 'i' };
    if (productId) query.productId = productId;
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Execute query
    const [sales, total] = await Promise.all([
      Sale.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Sale.countDocuments(query)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      data: {
        sales,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage,
          hasPrevPage
        }
      }
    });

  } catch (error: any) {
    console.error('Error fetching sales:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sales' },
      { status: 500 }
    );
  }
}

// POST /api/sales - Create a new sale record
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      productId,
      productName,
      productCategory,
      productPrice,
      downloadLink,
      userId,
      customerEmail,
      customerPhone,
      customerName,
      orderId,
      razorpayOrderId,
      amount,
      currency = 'INR',
      receiptId,
      notes,
      userAgent,
      ipAddress,
      source = 'web'
    } = body;

    // Validate required fields
    if (!productId || !productName || !customerEmail || !orderId || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new sale record
    const sale = new Sale({
      productId,
      productName,
      productCategory,
      productPrice,
      downloadLink,
      userId,
      customerEmail,
      customerPhone,
      customerName,
      orderId,
      razorpayOrderId,
      amount,
      currency,
      receiptId,
      notes,
      userAgent,
      ipAddress,
      source,
      paymentStatus: 'pending',
      orderStatus: 'created'
    });

    await sale.save();

    return NextResponse.json({
      success: true,
      data: sale,
      message: 'Sale record created successfully'
    });

  } catch (error: any) {
    console.error('Error creating sale:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Sale with this order ID already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create sale record' },
      { status: 500 }
    );
  }
}
