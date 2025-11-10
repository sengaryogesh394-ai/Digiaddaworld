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

    // Get last 6 months data
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        month: date.toLocaleString('default', { month: 'short' }),
        year: date.getFullYear(),
        startDate: new Date(date.getFullYear(), date.getMonth(), 1),
        endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59),
      });
    }

    // Fetch revenue for each month
    const revenueData = await Promise.all(
      months.map(async ({ month, year, startDate, endDate }) => {
        const result = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startDate,
                $lte: endDate,
              },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$total' },
              count: { $sum: 1 },
            },
          },
        ]);

        return {
          month,
          revenue: result[0]?.total || 0,
          orders: result[0]?.count || 0,
        };
      })
    );

    return NextResponse.json({
      data: revenueData,
    });
  } catch (error: any) {
    console.error('Revenue chart error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch revenue data' },
      { status: 500 }
    );
  }
}
