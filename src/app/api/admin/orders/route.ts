import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is admin
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    await connectDB();

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Build search query
    const query: any = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }

    // Fetch orders with user population
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await Order.countDocuments(query);

    // Filter by search if provided
    let filteredOrders = orders;
    if (search) {
      filteredOrders = orders.filter(order => {
        const user = order.user as any;
        const searchLower = search.toLowerCase();
        const orderId = (order._id as any).toString();
        return (
          orderId.toLowerCase().includes(searchLower) ||
          user?.name?.toLowerCase().includes(searchLower) ||
          user?.email?.toLowerCase().includes(searchLower)
        );
      });
    }

    return NextResponse.json({
      orders: filteredOrders,
      pagination: {
        page,
        limit,
        total: search ? filteredOrders.length : total,
        pages: Math.ceil((search ? filteredOrders.length : total) / limit),
      },
    });
  } catch (error: any) {
    console.error('Fetch orders error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
