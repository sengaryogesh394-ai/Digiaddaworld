import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
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

    // Fetch recent users (last 5)
    const recentUsers = await User.find({ role: { $ne: 'admin' } })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email createdAt')
      .lean();

    // Fetch recent orders (last 5)
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email')
      .lean();

    // Combine activities
    const activities = [];

    // Add orders
    for (const order of recentOrders) {
      const timeAgo = getTimeAgo(new Date(order.createdAt));
      const user = order.user as any;
      activities.push({
        user: user?.name || 'Unknown User',
        action: `New order - ${order.items?.length || 0} items`,
        time: timeAgo,
        amount: `Rs ${order.total?.toFixed(2) || '0.00'}`,
        type: 'order',
        createdAt: order.createdAt,
      });
    }

    // Add user registrations
    for (const user of recentUsers) {
      const timeAgo = getTimeAgo(new Date(user.createdAt));
      activities.push({
        user: user.name || 'New User',
        action: 'New registration',
        time: timeAgo,
        amount: '',
        type: 'user',
        createdAt: user.createdAt,
      });
    }

    // Sort by date and limit to 10
    activities.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      activities: activities.slice(0, 10),
    });
  } catch (error: any) {
    console.error('Activity fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds} sec ago`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? 's' : ''} ago`;
}
