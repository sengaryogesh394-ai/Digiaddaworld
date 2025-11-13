import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sale from '@/models/Sale';

// GET /api/sales/analytics - Get sales analytics and statistics
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build date filter
    const dateFilter: any = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
    }

    // Get overall statistics
    const [
      totalSales,
      successfulSales,
      failedSales,
      pendingSales,
      totalRevenue,
      successfulRevenue,
      topProducts,
      salesByStatus,
      salesByDate,
      recentSales
    ] = await Promise.all([
      // Total sales count
      Sale.countDocuments(dateFilter),
      
      // Successful sales count
      Sale.countDocuments({ ...dateFilter, paymentStatus: 'success' }),
      
      // Failed sales count
      Sale.countDocuments({ ...dateFilter, paymentStatus: 'failed' }),
      
      // Pending sales count
      Sale.countDocuments({ ...dateFilter, paymentStatus: 'pending' }),
      
      // Total revenue (all attempts)
      Sale.aggregate([
        { $match: dateFilter },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      
      // Successful revenue only
      Sale.aggregate([
        { $match: { ...dateFilter, paymentStatus: 'success' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      
      // Top selling products
      Sale.aggregate([
        { $match: { ...dateFilter, paymentStatus: 'success' } },
        {
          $group: {
            _id: '$productId',
            productName: { $first: '$productName' },
            totalSales: { $sum: 1 },
            totalRevenue: { $sum: '$amount' }
          }
        },
        { $sort: { totalSales: -1 } },
        { $limit: 10 }
      ]),
      
      // Sales by status
      Sale.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: '$paymentStatus',
            count: { $sum: 1 },
            revenue: { $sum: '$amount' }
          }
        }
      ]),
      
      // Sales by date (last 30 days)
      Sale.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$createdAt'
              }
            },
            totalSales: { $sum: 1 },
            successfulSales: {
              $sum: { $cond: [{ $eq: ['$paymentStatus', 'success'] }, 1, 0] }
            },
            revenue: {
              $sum: { $cond: [{ $eq: ['$paymentStatus', 'success'] }, '$amount', 0] }
            }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      
      // Recent sales (last 10)
      Sale.find(dateFilter)
        .sort({ createdAt: -1 })
        .limit(10)
        .select('productName customerEmail amount paymentStatus createdAt')
    ]);

    // Calculate conversion rate
    const conversionRate = totalSales > 0 ? (successfulSales / totalSales) * 100 : 0;

    // Format response
    const analytics = {
      overview: {
        totalSales,
        successfulSales,
        failedSales,
        pendingSales,
        conversionRate: Math.round(conversionRate * 100) / 100,
        totalRevenue: totalRevenue[0]?.total || 0,
        successfulRevenue: successfulRevenue[0]?.total || 0,
        averageOrderValue: successfulSales > 0 ? Math.round((successfulRevenue[0]?.total || 0) / successfulSales) : 0
      },
      topProducts: topProducts.map(product => ({
        productId: product._id,
        productName: product.productName,
        totalSales: product.totalSales,
        totalRevenue: product.totalRevenue,
        averagePrice: Math.round(product.totalRevenue / product.totalSales)
      })),
      salesByStatus: salesByStatus.reduce((acc, item) => {
        acc[item._id] = {
          count: item.count,
          revenue: item.revenue
        };
        return acc;
      }, {}),
      salesTrend: salesByDate,
      recentSales
    };

    return NextResponse.json({
      success: true,
      data: analytics
    });

  } catch (error: any) {
    console.error('Error fetching sales analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sales analytics' },
      { status: 500 }
    );
  }
}
