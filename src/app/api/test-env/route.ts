import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    environment: {
      RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID ? 'SET' : 'MISSING',
      RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET ? 'SET' : 'MISSING',
      NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? 'SET' : 'MISSING',
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'DEFAULT: http://localhost:9002',
      MONGODB_URI: process.env.MONGODB_URI ? 'SET' : 'MISSING',
      NODE_ENV: process.env.NODE_ENV
    }
  });
}
