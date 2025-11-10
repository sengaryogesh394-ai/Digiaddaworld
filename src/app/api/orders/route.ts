import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login to place an order' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { items, total, shippingAddress, paymentMethod } = body;

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Order must contain at least one item' },
        { status: 400 }
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { error: 'Shipping address is required' },
        { status: 400 }
      );
    }

    // Get user ID from session
    const userId = (session.user as any).id;

    console.log('Creating order for user:', userId);
    console.log('Cart items:', JSON.stringify(items, null, 2));

    // Create order
    const order = await Order.create({
      user: userId,
      items: items.map((item: any) => {
        const productId = item._id || item.id;
        console.log('Mapping item:', item.name, 'Product ID:', productId);
        return {
          product: productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.media?.[0]?.url || item.image || '',
        };
      }),
      total,
      status: 'pending',
      paymentMethod: paymentMethod || 'card',
      paymentStatus: 'pending',
      shippingAddress,
    });

    console.log('Order created successfully:', order._id);

    return NextResponse.json({
      message: 'Order created successfully',
      orderId: order._id,
      order,
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
