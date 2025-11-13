import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sale from '@/models/Sale';

// GET /api/sales/search - Search sales by various criteria
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    
    // Search parameters
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build search query
    const searchQuery: any = {};

    if (query) {
      searchQuery.$or = [
        { productName: { $regex: query, $options: 'i' } },
        { customerEmail: { $regex: query, $options: 'i' } },
        { customerPhone: { $regex: query, $options: 'i' } },
        { orderId: { $regex: query, $options: 'i' } },
        { razorpayOrderId: { $regex: query, $options: 'i' } },
        { razorpayPaymentId: { $regex: query, $options: 'i' } }
      ];
    }

    // Execute search
    const [sales, total] = await Promise.all([
      Sale.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Sale.countDocuments(searchQuery)
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
        },
        searchQuery: query
      }
    });

  } catch (error: any) {
    console.error('Error searching sales:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search sales' },
      { status: 500 }
    );
  }
}
