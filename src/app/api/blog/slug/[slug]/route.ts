import { NextRequest, NextResponse } from 'next/server';
import { BlogController } from '@/controllers/blogController';

// GET - Fetch blog post by slug (for public URLs)
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const result = await BlogController.getBlogBySlug(params.slug);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.message.includes('not found') ? 404 : 500 }
    );
  }
}
