import { NextRequest, NextResponse } from 'next/server';
import { generateBlogContent } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Gemini API is not configured. Please add GEMINI_API_KEY to your .env file.' 
        },
        { status: 500 }
      );
    }

    console.log('Generating content for title:', title);
    const generatedContent = await generateBlogContent(title);

    return NextResponse.json({
      success: true,
      data: generatedContent,
    });
  } catch (error: any) {
    console.error('Error in generate-content API:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to generate content' 
      },
      { status: 500 }
    );
  }
}
