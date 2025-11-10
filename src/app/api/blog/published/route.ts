import { NextRequest, NextResponse } from 'next/server';
import { BlogController } from '@/controllers/blogController';

// GET - Fetch only published blog posts (for public view)
export async function GET(request: NextRequest) {
  try {
    const result = await BlogController.getPublishedBlogs(request);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
