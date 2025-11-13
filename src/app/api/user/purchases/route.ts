import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sale from '@/models/Sale';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET /api/user/purchases - Get user's purchase history
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get user session for secure access
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status'); // 'success', 'failed', 'pending'
    
    const userId = (session.user as any).id;
    const userEmail = session.user.email;

    const skip = (page - 1) * limit;

    // Build query - use userId if available, fallback to email
    const query: any = {};
    if (userId) {
      query.userId = userId;
    } else {
      query.customerEmail = userEmail;
    }
    
    if (status) {
      query.paymentStatus = status;
    }

    console.log('🔍 Purchases query:', { userId, userEmail, query });

    // Get user's purchases
    const [purchases, total] = await Promise.all([
      Sale.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('productId productName productCategory productPrice downloadLink paymentStatus orderStatus createdAt paymentCompletedAt razorpayPaymentId amount receiptId')
        .lean(),
      Sale.countDocuments(query)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Get summary statistics
    const summaryQuery = userId ? { userId: userId } : { customerEmail: userEmail };
    const [successfulPurchases, totalSpent] = await Promise.all([
      Sale.countDocuments({ ...summaryQuery, paymentStatus: 'success' }),
      Sale.aggregate([
        { $match: { ...summaryQuery, paymentStatus: 'success' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ])
    ]);

    return NextResponse.json({
      success: true,
      data: {
        purchases,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage,
          hasPrevPage
        },
        summary: {
          totalPurchases: total,
          successfulPurchases,
          totalSpent: totalSpent[0]?.total || 0
        }
      }
    });

  } catch (error: any) {
    console.error('Error fetching user purchases:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch purchases' },
      { status: 500 }
    );
  }
}
