import { NextRequest, NextResponse } from 'next/server';
import { BlogController } from '@/controllers/blogController';

// GET - Fetch all blog posts
export async function GET(request: NextRequest) {
  try {
    const result = await BlogController.getAllBlogs(request);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await BlogController.createBlog(body);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
