import { NextRequest, NextResponse } from 'next/server';
import { BlogController } from '@/controllers/blogController';

// GET - Get blog statistics
export async function GET(request: NextRequest) {
  try {
    const result = await BlogController.getBlogStats();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
