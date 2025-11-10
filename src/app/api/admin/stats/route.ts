import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Product from '@/models/Product';
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

    // Get current date and last month date
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    // Fetch statistics
    const [
      totalUsers,
      usersLastMonth,
      totalProducts,
      productsLastMonth,
      totalOrders,
      ordersLastMonth,
      totalRevenue,
      revenueLastMonth,
    ] = await Promise.all([
      // Total users (excluding admins)
      User.countDocuments({ role: { $ne: 'admin' } }),
      // Users from last month
      User.countDocuments({ 
        role: { $ne: 'admin' },
        createdAt: { $gte: lastMonth } 
      }),
      // Total products
      Product.countDocuments(),
      // Products from last month
      Product.countDocuments({ createdAt: { $gte: lastMonth } }),
      // Total orders
      Order.countDocuments(),
      // Orders from last month
      Order.countDocuments({ createdAt: { $gte: lastMonth } }),
      // Total revenue
      Order.aggregate([
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]),
      // Revenue from last month
      Order.aggregate([
        { $match: { createdAt: { $gte: lastMonth } } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]),
    ]);

    // Calculate percentages
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const revenue = totalRevenue[0]?.total || 0;
    const revenueChange = revenueLastMonth[0]?.total || 0;

    return NextResponse.json({
      users: {
        total: totalUsers,
        change: calculateChange(usersLastMonth, totalUsers - usersLastMonth),
        newThisMonth: usersLastMonth,
      },
      products: {
        total: totalProducts,
        change: calculateChange(productsLastMonth, totalProducts - productsLastMonth),
        newThisMonth: productsLastMonth,
      },
      orders: {
        total: totalOrders,
        change: calculateChange(ordersLastMonth, totalOrders - ordersLastMonth),
        newThisMonth: ordersLastMonth,
      },
      revenue: {
        total: revenue,
        change: calculateChange(revenueChange, revenue - revenueChange),
        thisMonth: revenueChange,
      },
    });
  } catch (error: any) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
