import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sale from '@/models/Sale';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET /api/user/purchases/[id] - Get specific purchase details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;
    
    // Get user session for secure access
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;
    const userEmail = session.user.email;

    // Find purchase by ID and ensure it belongs to the user
    const query = userId ? { _id: id, userId: userId } : { _id: id, customerEmail: userEmail };
    const purchase = await Sale.findOne(query).lean();

    console.log('🔍 Purchase details query:', { id, userId, userEmail, query });

    if (!purchase) {
      return NextResponse.json(
        { success: false, error: 'Purchase not found' },
        { status: 404 }
      );
    }

    // Get product details if needed (you might want to populate this from Product model)
    // For now, we'll use the data stored in the sale record

    return NextResponse.json({
      success: true,
      data: purchase
    });

  } catch (error: any) {
    console.error('Error fetching purchase details:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch purchase details' },
      { status: 500 }
    );
  }
}
