import { NextRequest, NextResponse } from 'next/server';
import { generateProductContent, enhanceProductDescription, generateProductTags } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, productName, category, description, briefDescription } = body;

    if (!productName) {
      return NextResponse.json(
        { success: false, error: 'Product name is required' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'generate':
        // Generate full product content
        if (!category) {
          return NextResponse.json(
            { success: false, error: 'Category is required for generation' },
            { status: 400 }
          );
        }
        result = await generateProductContent(productName, category, briefDescription);
        break;

      case 'enhance':
        // Enhance existing description
        if (!description) {
          return NextResponse.json(
            { success: false, error: 'Description is required for enhancement' },
            { status: 400 }
          );
        }
        const enhancedDescription = await enhanceProductDescription(description, productName);
        result = { description: enhancedDescription };
        break;

      case 'tags':
        // Generate tags only
        if (!category || !description) {
          return NextResponse.json(
            { success: false, error: 'Category and description are required for tag generation' },
            { status: 400 }
          );
        }
        const tags = await generateProductTags(productName, category, description);
        result = { tags };
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action. Use: generate, enhance, or tags' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error: any) {
    console.error('Error in product generation API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to generate product content' 
      },
      { status: 500 }
    );
  }
}
