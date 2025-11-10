import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // Find user by email to get user ID
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json({
        success: true,
        orders: [],
      });
    }

    console.log('Fetching orders for user:', user._id, 'Email:', session.user.email);

    // Fetch all orders for the logged-in user using user ID
    const orders = await Order.find({ user: user._id })
      .sort({ createdAt: -1 }) // Most recent first
      .lean();

    console.log('Found orders:', orders.length);

    return NextResponse.json({
      success: true,
      orders: orders,
    });
  } catch (error: any) {
    console.error('Error fetching user orders:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
