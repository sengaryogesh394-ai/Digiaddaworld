import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('GEMINI_API_KEY is not set in environment variables');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Image generation helper
export interface ProductImageResponse {
  images: Array<{
    url: string;
    hint: string;
    type: 'image';
  }>;
  searchTerms: string[];
}

// Helper function to get relevant Unsplash photo IDs based on category
function getCategoryImages(category: string, searchTerm: string): string[] {
  const lowerCategory = category.toLowerCase();
  const lowerTerm = searchTerm.toLowerCase();
  
  // Curated high-quality Unsplash photo IDs for different categories
  const imageMap: Record<string, string[]> = {
    'graphic design': [
      '1626785774573-4b799315345d', // Design workspace
      '1611162617474-5b21e879e113', // Creative tools
      '1634986666676-f46f4c0b7b5e', // Design mockup
      '1542744173-8e7e53415bb0', // Workspace setup
      '1611224923853-80b023f02d71', // Design process
    ],
    'video editing': [
      '1574717024653-61fd2cf4d44d', // Video editing
      '1492619375914-88005aa9e8fb', // Film production
      '1536240967884-e5c8f2d7b6f9', // Video workspace
      '1574717024653-61fd2cf4d44d', // Editing timeline
      '1574717024653-61fd2cf4d44d', // Video production
    ],
    'social media': [
      '1611162616305-c69b3fa7fbe0', // Social media
      '1611162618071-b39a2ec055fb', // Phone mockup
      '1611162616475-46b635cb6868', // Social content
      '1563986768609-322da13575f3', // Instagram
      '1611162618071-b39a2ec055fb', // Mobile content
    ],
    'courses': [
      '1516321318423-f06f85e504b3', // Learning
      '1503676260728-1c00da094a0b', // Education
      '1434030216411-0b793f4b4173', // Online course
      '1516321318423-f06f85e504b3', // Study
      '1503676260728-1c00da094a0b', // Teaching
    ],
    'templates': [
      '1618005182384-a83a8bd57fbe', // Templates
      '1558655146-9f40138edfeb', // Design templates
      '1633356122544-f134324a6cee', // Mockup templates
      '1626785774625-ddcddc3445e9', // UI templates
      '1618005182384-a83a8bd57fbe', // Template design
    ],
    'default': [
      '1618005182384-a83a8bd57fbe', // Abstract design
      '1558655146-9f40138edfeb', // Creative workspace
      '1633356122544-f134324a6cee', // Professional design
      '1611162617474-5b21e879e113', // Digital tools
      '1626785774573-4b799315345d', // Modern workspace
    ]
  };
  
  // Find matching category
  for (const [key, images] of Object.entries(imageMap)) {
    if (lowerCategory.includes(key) || lowerTerm.includes(key)) {
      return images;
    }
  }
  
  return imageMap['default'];
}

export interface BlogContentResponse {
  content: string;
  excerpt: string;
  tags: string[];
  featuredImagePrompt: string;
}

export async function generateBlogContent(title: string): Promise<BlogContentResponse> {
  if (!genAI) {
    throw new Error('Gemini API is not configured. Please set GEMINI_API_KEY in your environment variables.');
  }

  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    generationConfig: {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 4096,
    }
  });

  const prompt = `Generate blog content for: "${title}"

Return ONLY valid JSON in this exact format (no other text, no markdown, no explanations):

{
  "content": "HTML content here with <h2>Section Title</h2><p>Paragraph text.</p><h3>Subsection</h3><p>More text.</p><ul><li>Point 1</li><li>Point 2</li></ul>",
  "excerpt": "Brief 2-3 sentence summary",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "featuredImagePrompt": "Image description"
}

Requirements:
- content: 500+ words as HTML using <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em> tags only
- excerpt: 150-200 characters
- tags: 5-7 lowercase, SEO-friendly keywords
- featuredImagePrompt: detailed image description

CRITICAL: Return ONLY the JSON object. No markdown code blocks. No extra text.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Raw Gemini response:', text.substring(0, 500)); // Log first 500 chars

    let parsedResponse: BlogContentResponse;
    try {
      // Try direct parse first
      parsedResponse = JSON.parse(text);
    } catch (firstError) {
      console.log('Direct JSON parse failed, trying cleanup...');
      
      try {
        // Remove markdown code fences and extra text
        let cleaned = text.trim();
        
        // Remove all variations of code fences
        cleaned = cleaned.replace(/```json/g, '');
        cleaned = cleaned.replace(/```/g, '');
        
        // Remove any text before first {
        const startBrace = cleaned.indexOf('{');
        if (startBrace > 0) {
          cleaned = cleaned.substring(startBrace);
        }
        
        // Remove any text after last }
        const endBrace = cleaned.lastIndexOf('}');
        if (endBrace > 0 && endBrace < cleaned.length - 1) {
          cleaned = cleaned.substring(0, endBrace + 1);
        }
        
        // Try parsing cleaned version
        try {
          parsedResponse = JSON.parse(cleaned);
          console.log('Successfully parsed after cleanup');
        } catch (parseError) {
          console.error('Parse error after cleanup:', parseError);
          console.error('Cleaned text:', cleaned.substring(0, 200));
          
          // Last resort: try to extract just the JSON object
          const jsonMatch = text.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/);
          if (!jsonMatch) {
            console.error('No JSON object found in response');
            console.error('Full response:', text);
            throw new Error('Failed to parse JSON from Gemini response. No valid JSON found.');
          }
          
          try {
            parsedResponse = JSON.parse(jsonMatch[0]);
            console.log('Successfully parsed with regex extraction');
          } catch (finalError) {
            console.error('Final parse attempt failed');
            console.error('Extracted text:', jsonMatch[0].substring(0, 200));
            throw new Error('Failed to parse JSON from Gemini response after all attempts');
          }
        }
      } catch (secondError: any) {
        console.error('All parsing attempts failed');
        console.error('Error:', secondError.message);
        console.error('Original text length:', text.length);
        console.error('First 500 chars:', text.substring(0, 500));
        console.error('Last 200 chars:', text.substring(Math.max(0, text.length - 200)));
        throw new Error('Failed to parse JSON from Gemini response after multiple attempts');
      }
    }

    // Coerce tags to array if string returned
    if (parsedResponse && (parsedResponse as any).tags && typeof (parsedResponse as any).tags === 'string') {
      (parsedResponse as any).tags = (parsedResponse as any).tags
        .split(',')
        .map((t: string) => t.trim())
        .filter(Boolean);
    }

    if (!parsedResponse.content || !parsedResponse.excerpt || !parsedResponse.tags) {
      console.error('Invalid response structure:', parsedResponse);
      throw new Error('Invalid response structure from Gemini - missing required fields');
    }

    return parsedResponse;
  } catch (error: any) {
    console.error('Error generating blog content:', error);
    console.error('Error stack:', error.stack);
    throw new Error(`Failed to generate blog content: ${error.message}`);
  }
}

export async function generateBlogExcerpt(content: string): Promise<string> {
  if (!genAI) {
    throw new Error('Gemini API is not configured');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `Generate a compelling 2-3 sentence excerpt (150-200 characters) for the following blog content. Make it attention-grabbing and SEO-friendly.

Content:
${content.substring(0, 1000)}

Return only the excerpt text, nothing else.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error: any) {
    console.error('Error generating excerpt:', error);
    throw new Error(`Failed to generate excerpt: ${error.message}`);
  }
}

export async function generateBlogTags(title: string, content: string): Promise<string[]> {
  if (!genAI) {
    throw new Error('Gemini API is not configured');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `Generate 5-7 relevant, SEO-friendly tags for the following blog post. Return them as a JSON array of lowercase strings.

Title: ${title}
Content: ${content.substring(0, 500)}

Return only a JSON array like: ["tag1", "tag2", "tag3"]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    try {
      const parsed = JSON.parse(text);
      return Array.isArray(parsed) ? parsed : String(parsed).split(',').map(s => s.trim()).filter(Boolean);
    } catch {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return text.split(',').map(s => s.trim()).filter(Boolean);
    }
  } catch (error: any) {
    console.error('Error generating tags:', error);
    throw new Error(`Failed to generate tags: ${error.message}`);
  }
}

// Product AI Generation Functions

export interface ProductContentResponse {
  description: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
    value: string;
  }>;
  tags: string[];
  suggestedPrice: number;
}

export async function generateProductContent(
  productName: string,
  category: string,
  briefDescription?: string
): Promise<ProductContentResponse> {
  if (!genAI) {
    throw new Error('Gemini API is not configured. Please set GEMINI_API_KEY in your environment variables.');
  }

  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    generationConfig: {
      temperature: 0.8,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 4096,
    }
  });

  const prompt = `Generate compelling product content for a digital product.

Product Name: "${productName}"
Category: "${category}"
${briefDescription ? `Brief: "${briefDescription}"` : ''}

Return ONLY valid JSON in this exact format (no markdown, no extra text):

{
  "description": "Detailed 150-250 word product description that sells the product, highlights benefits, and creates urgency",
  "features": [
    {
      "icon": "🎯",
      "title": "Feature Name",
      "description": "Brief feature description",
      "value": "Rs X,XXX Value"
    }
  ],
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "suggestedPrice": 199.99
}

Requirements:
- description: Persuasive, benefit-focused, 150-250 words
- features: 4-6 key features with relevant emojis, compelling titles, and value propositions
- tags: 5-8 SEO-friendly, lowercase keywords
- suggestedPrice: Realistic price in Indian Rupees (Rs) based on category and value

CRITICAL: Return ONLY the JSON object. No markdown code blocks. No explanations.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Raw Gemini product response length:', text.length);
    console.log('Raw Gemini product response:', text);

    let parsedResponse: ProductContentResponse;
    try {
      parsedResponse = JSON.parse(text);
    } catch (firstError) {
      console.log('Direct JSON parse failed, trying cleanup...');
      
      let cleaned = text.trim();
      cleaned = cleaned.replace(/```json/g, '');
      cleaned = cleaned.replace(/```/g, '');
      
      const startBrace = cleaned.indexOf('{');
      if (startBrace > 0) {
        cleaned = cleaned.substring(startBrace);
      }
      
      const endBrace = cleaned.lastIndexOf('}');
      if (endBrace > 0 && endBrace < cleaned.length - 1) {
        cleaned = cleaned.substring(0, endBrace + 1);
      }
      
      try {
        parsedResponse = JSON.parse(cleaned);
      } catch (parseError) {
        const jsonMatch = text.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/);
        if (!jsonMatch) {
          throw new Error('Failed to parse JSON from Gemini response');
        }
        parsedResponse = JSON.parse(jsonMatch[0]);
      }
    }

    // Validate response
    if (!parsedResponse.description || !parsedResponse.features || !parsedResponse.tags) {
      console.error('Parsed response:', JSON.stringify(parsedResponse, null, 2));
      throw new Error('Invalid response structure from Gemini - missing required fields');
    }
    
    // Ensure features is an array
    if (!Array.isArray(parsedResponse.features)) {
      throw new Error('Features must be an array');
    }

    return parsedResponse;
  } catch (error: any) {
    console.error('Error generating product content:', error);
    throw new Error(`Failed to generate product content: ${error.message}`);
  }
}

export async function enhanceProductDescription(
  currentDescription: string,
  productName: string
): Promise<string> {
  if (!genAI) {
    throw new Error('Gemini API is not configured');
  }

  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
    }
  });

  const prompt = `Enhance this product description to be more compelling and sales-focused.

Product: ${productName}
Current Description: ${currentDescription}

Return an enhanced 150-250 word description that:
- Highlights key benefits
- Creates urgency
- Uses persuasive language
- Includes social proof elements
- Has clear call-to-action language

Return ONLY the enhanced description text, nothing else.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error: any) {
    console.error('Error enhancing description:', error);
    throw new Error(`Failed to enhance description: ${error.message}`);
  }
}

export async function generateProductTags(
  productName: string,
  category: string,
  description: string
): Promise<string[]> {
  if (!genAI) {
    throw new Error('Gemini API is not configured');
  }

  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 256,
    }
  });

  const prompt = `Generate SEO-optimized tags for this digital product.

Product: ${productName}
Category: ${category}
Description: ${description.substring(0, 200)}

Return 6-10 relevant, lowercase, SEO-friendly tags as a JSON array.
Focus on: product type, use cases, target audience, benefits, and related keywords.

Return ONLY a JSON array like: ["tag1", "tag2", "tag3"]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    try {
      const parsed = JSON.parse(text);
      return Array.isArray(parsed) ? parsed : String(parsed).split(',').map(s => s.trim()).filter(Boolean);
    } catch {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return text.split(',').map(s => s.trim()).filter(Boolean);
    }
  } catch (error: any) {
    console.error('Error generating product tags:', error);
    throw new Error(`Failed to generate tags: ${error.message}`);
  }
}

export async function generateProductImages(
  productName: string,
  category: string,
  description: string,
  count: number = 4
): Promise<ProductImageResponse> {
  
  // Create 4 detailed prompts directly without using Gemini (to avoid rate limits)
  const imagePrompts = [
    `Professional ${category} workspace showcasing ${productName}, modern design tools on clean white desk, natural window lighting, vibrant colors, high-quality photography, 4K resolution, creative atmosphere, minimalist aesthetic`,
    `${productName} product display for ${category}, professional studio setup with soft lighting, attractive composition, premium quality, engaging visual, clean white background, product photography style`,
    `Creative ${category} environment featuring ${productName}, professional photography, modern aesthetic, inspiring workspace, beautiful natural lighting, colorful accents, professional setting`,
    `${productName} showcase in ${category} setting, high-end presentation, professional quality, attractive design, engaging composition, premium feel, studio lighting, professional product shot`
  ];

  // Generate images using Hugging Face with Pollinations fallback
  const apiKey = process.env.HUGGING_FACE_API_KEY || process.env.HUGGINGFACE_API_KEY;
  
  const imagePromises = imagePrompts.slice(0, 4).map(async (prompt, index) => {
    try {
      // Try Hugging Face first if API key exists
      if (apiKey) {
        console.log(`Attempting Hugging Face for image ${index + 1}...`);
        
        // Add timeout to Hugging Face request (10 seconds)
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        
        try {
          const response = await fetch(
            'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ inputs: prompt }),
              signal: controller.signal,
            }
          );
          
          clearTimeout(timeout);

          if (response.ok) {
            const imageBuffer = await response.arrayBuffer();
            const base64Image = Buffer.from(imageBuffer).toString('base64');
            const dataUrl = `data:image/jpeg;base64,${base64Image}`;

            console.log(`✅ Hugging Face success for image ${index + 1}`);
            return {
              url: dataUrl,
              hint: `${productName} - ${prompt.substring(0, 100)}`,
              type: 'image' as const
            };
          } else {
            const errorText = await response.text();
            console.warn(`Hugging Face failed for image ${index + 1}: ${response.status} - ${errorText}`);
          }
        } catch (fetchError: any) {
          clearTimeout(timeout);
          if (fetchError.name === 'AbortError') {
            console.warn(`Hugging Face timeout for image ${index + 1}, using Pollinations fallback`);
          } else {
            console.warn(`Hugging Face error for image ${index + 1}:`, fetchError.message);
          }
        }
      } else {
        console.log(`No API key, using Pollinations for image ${index + 1}`);
      }
      
      // Fallback to Pollinations.ai (free, no API key required)
      const encodedPrompt = encodeURIComponent(prompt);
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;
      
      console.log(`Using Pollinations for image ${index + 1}`);
      return {
        url: pollinationsUrl,
        hint: `${productName} - ${prompt.substring(0, 100)}`,
        type: 'image' as const
      };
      
    } catch (error) {
      console.error(`Error generating image ${index + 1}:`, error);
      // Final fallback to Pollinations
      const encodedPrompt = encodeURIComponent(prompt);
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;
      
      return {
        url: pollinationsUrl,
        hint: `${productName} - ${prompt.substring(0, 100)}`,
        type: 'image' as const
      };
    }
  });

  const images = await Promise.all(imagePromises);

  return {
    images,
    searchTerms: imagePrompts
  };
}
