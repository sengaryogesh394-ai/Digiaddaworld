import { NextRequest, NextResponse } from 'next/server';
import { BlogController } from '@/controllers/blogController';

// POST - Publish a blog post
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await BlogController.publishBlog(params.id);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.message.includes('not found') ? 404 : 500 }
    );
  }
}
