
import type { Product, Category, BlogPost } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  // Fallback to a default placeholder if image not found to prevent crashes
  return { 
    id: image?.id || 'default', 
    url: image?.imageUrl || 'https://picsum.photos/seed/default/600/400', 
    hint: image?.imageHint || 'digital product' 
  };
};

export const mockProducts: Product[] = [
  {
    id: 'prod-instagram-course',
    name: 'Instagram Growth Mastery Course',
    price: 199.99,
    media: [
      { ...getImage('prod-instagram-course-1'), type: 'image' }, 
      { url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', id:'vid1', hint: 'course promo', type: 'video' },
      { ...getImage('prod-instagram-course-3'), type: 'image' },
      { url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', id:'vid2', hint: 'course content', type: 'video' },
    ],
    category: 'Courses & E-books',
    description: 'Unlock the secrets to explosive Instagram growth. This comprehensive course provides step-by-step strategies to increase your followers, boost engagement, and build a powerful brand on the platform. Perfect for influencers, entrepreneurs, and marketers.',
    isFeatured: true,
    features: [
      { icon: '🎥', title: '<b>20+ Hours</b> of Video Content', description: '(High-quality, in-depth lessons)', value: 'Rs 4,999 Value' },
      { icon: '📈', title: 'Follower <b>Growth Strategies</b>', description: '(Actionable techniques for organic growth)', value: 'Rs 3,999 Value' },
      { icon: '📝', title: '<b>Content Creation</b> Guides', description: '(Learn to create engaging posts and stories)', value: 'Rs 1,999 Value' },
      { icon: '🔍', title: 'Advanced <b>Hashtag Research</b>', description: '(Find the best hashtags for your niche)', value: 'Rs 999 Value' },
      { icon: '💬', title: 'Private <b>Community Access</b>', description: '(Network with other students and get support)', value: 'Rs 1,499 Value' }
    ],
    compatibility: {
      title: "Course Access",
      details: [
        "<b>Accessible on any device</b> with an internet connection (desktop, tablet, mobile).",
        "<b>Lifetime access</b> to all course materials and future updates."
      ],
      notes: "No special software is required. A personal Instagram account is recommended to follow along with the lessons."
    }
  },
  {
    id: 'prod-graphic-design-bundle',
    name: 'Graphic Design Bundle',
    price: 79.99,
    media: [
        { ...getImage('prod-graphic-design-bundle-1'), type: 'image' }, 
        { ...getImage('prod-graphic-design-bundle-2'), type: 'image' }, 
        { url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', id:'vid3', hint: 'design showcase', type: 'video' },
        { ...getImage('prod-graphic-design-bundle-4'), type: 'image' }
    ],
    category: 'Graphic Design',
    description: 'A massive collection of premium graphic design assets to supercharge your creative projects. This bundle includes thousands of templates, fonts, icons, and illustrations, suitable for both beginners and professional designers.',
    isFeatured: true,
    features: [
        { icon: '📱', title: '<b>1000+</b> Social Media Templates', description: '(For Instagram, Facebook, Pinterest)', value: 'Rs 2,999 Value' },
        { icon: '✒️', title: '<b>500+</b> Unique Fonts', description: '(Serif, Sans-Serif, Script, and Display)', value: 'Rs 1,999 Value' },
        { icon: '🎨', title: '<b>2000+</b> Vector Icons', description: '(Fully editable and scalable)', value: 'Rs 1,499 Value' },
        { icon: '🖼️', title: '<b>100+ High-Res</b> Textures', description: '(Paper, grunge, and abstract textures)', value: 'Rs 999 Value' },
        { icon: '📄', title: 'Commercial License', description: '(Use in unlimited personal & commercial projects)', value: 'Rs 5,000 Value' }
    ],
    compatibility: {
      title: "Software Requirements",
      details: [
        "<b>Adobe Photoshop:</b> CS6 and above",
        "<b>Adobe Illustrator:</b> CS6 and above",
        "<b>Canva:</b> Free and Pro versions",
        "<b>Figma:</b> All versions"
      ],
      notes: "Some files are provided in .PSD and .AI formats, requiring Adobe software. PNG and SVG files are provided for broader compatibility."
    }
  },
  {
    id: 'prod-ai-reels-fitness',
    name: '500+ AI Fitness Reels Bundle',
    price: 49.99,
    media: [
        { ...getImage('prod-ai-reels-fitness-1'), type: 'image' },
        { ...getImage('prod-ai-reels-fitness-2'), type: 'image' }, 
        { url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', id:'vid5', hint: 'workout reel', type: 'video' },
        { ...getImage('prod-ai-reels-fitness-4'), type: 'image' }
    ],
    category: 'AI Reels',
    description: 'A massive bundle of 500+ AI-generated, ready-to-post fitness reels. Perfect for fitness influencers, gyms, and personal trainers looking to create engaging social media content without the hassle. Videos feature workout demos, motivational quotes, and fitness tips.',
    isFeatured: true,
    features: [
        { icon: '💪', title: '<b>500+</b> Fitness Reels', description: '(HD vertical videos for social media)', value: 'Rs 3,999 Value' },
        { icon: '🏋️‍♀️', title: 'Multiple Niches Covered', description: '(Home workouts, gym, yoga, nutrition)', value: 'Rs 1,999 Value' },
        { icon: '🎵', title: 'Trending Audio Suggestions', description: '(Stay relevant with popular sounds)', value: 'Rs 499 Value' },
        { icon: '💧', title: 'No Watermarks', description: '(Add your own branding with ease)', value: 'Rs 999 Value' },
        { icon: '🚀', title: '<b>Instant Download</b> & <b>Lifetime Access</b>', description: '(Get started immediately)', value: 'Priceless' }
    ],
    compatibility: {
      title: "Platform & Editing",
      details: [
        "<b>Instagram Reels, TikTok</b>, and <b>YouTube Shorts</b>.",
        "Provided in standard <b>MP4 format</b>."
      ],
      notes: "Videos are ready to post as-is, or can be further customized in any video editing software like CapCut, InShot, or Adobe Premiere Rush."
    }
  },
  {
    id: 'prod-adobe-suite',
    name: 'Adobe Premium Software 2024',
    price: 299.99,
    media: [
        { ...getImage('prod-adobe-suite-1'), type: 'image' },
        { ...getImage('prod-adobe-suite-2'), type: 'image' },
        { ...getImage('prod-adobe-suite-3'), type: 'image' },
        { url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', id:'vid6', hint: 'software demo', type: 'video' },
    ],
    category: 'Software & Tools',
    description: 'Get the full suite of Adobe Premium software for 2024. Includes Photoshop, Illustrator, Premiere Pro, and more. This is a one-time purchase for a lifetime license of the industry-standard creative software.',
    isFeatured: true,
    features: [
        { icon: '✨', title: '<b>20+</b> Adobe Creative Cloud Apps', description: '(Photoshop, Illustrator, Premiere Pro, etc.)', value: 'Rs 20,000 Value' },
        { icon: '💻', title: 'Desktop and Mobile Versions', description: '(Create on your computer or on the go)', value: 'Rs 5,000 Value' },
        { icon: '💸', title: '<b>One-Time Payment</b>', description: '(No recurring monthly or annual fees)', value: 'Priceless' },
        { icon: '🔑', title: '<b>Lifetime License</b>', description: '(Use the software forever)', value: 'Priceless' },
        { icon: '📚', title: 'Comprehensive Installation Guide', description: '(Easy-to-follow setup instructions)', value: 'Rs 999 Value' }
    ],
    compatibility: {
      title: "System Requirements",
      details: [
        "<b>Windows:</b> Windows 10 (64-bit) version 20H2 or later",
        "<b>macOS:</b> macOS Big Sur (version 11.0) or later",
        "At least <b>16GB of RAM</b> recommended",
        "SSD with <b>50GB</b> of available space"
      ],
      notes: "This package is for desktop software. Some apps may have mobile companions available separately through app stores."
    }
  },
  {
    id: 'prod-ai-reels-motivation',
    name: '500+ AI Motivational Reels Bundle',
    price: 49.99,
    media: [
        { ...getImage('prod-ai-reels-motivation-1'), type: 'image' },
        { url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', id:'vid7', hint: 'inspirational video', type: 'video' },
        { ...getImage('prod-ai-reels-motivation-3'), type: 'image' },
        { url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', id:'vid8', hint: 'motivational reel', type: 'video' },
    ],
    category: 'AI Reels',
    description: 'Inspire your audience with over 500 AI-generated motivational reels. This bundle is perfect for life coaches, entrepreneurs, and content creators who want to share powerful messages and grow their online presence.',
    features: [
        { icon: '🌟', title: '<b>500+</b> Motivational Reels', description: '(HD vertical videos with inspiring content)', value: 'Rs 3,999 Value' },
        { icon: '🧠', title: 'Multiple Themes', description: '(Success, mindset, perseverance, and more)', value: 'Rs 999 Value' },
        { icon: '🎶', title: '<b>Background Music</b> Included', description: '(Inspiring and royalty-free tracks)', value: 'Rs 1,499 Value' },
        { icon: '🚫', title: 'No Branding', description: '(Easily add your own logo and colors)', value: 'Rs 999 Value' },
        { icon: '⚡', title: '<b>Instant Download</b> Link', description: '(Start posting within minutes)', value: 'Priceless' }
    ],
    compatibility: {
      title: "Platform & Editing",
      details: [
        "Optimized for <b>Instagram Reels, TikTok</b>, and <b>YouTube Shorts</b>.",
        "Standard <b>MP4 format</b> compatible with all devices."
      ],
      notes: "Ready to upload directly or customize with your own logo using any standard video editor."
    }
  },
  {
    id: 'prod-god-reels',
    name: '500+ God Reels Bundle',
    price: 49.99,
    media: [
        { ...getImage('prod-god-reels-1'), type: 'image' },
        { ...getImage('prod-god-reels-2'), type: 'image' },
        { ...getImage('prod-god-reels-3'), type: 'image' },
        { url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', id:'vid9', hint: 'spiritual video', type: 'video' },
    ],
    category: 'Content Bundles',
    description: 'A unique collection of 500+ spiritual and religious-themed reels for your social media channels. Share faith-based content with beautiful visuals and uplifting messages. Ideal for religious organizations, community groups, and spiritual influencers.',
    features: [
        { icon: '🙏', title: '<b>500+</b> Spiritual Reels', description: '(With quotes, prayers, and serene visuals)', value: 'Rs 3,999 Value' },
        { icon: '🕊️', title: 'Multi-Faith Content', description: '(Suitable for various religions and beliefs)', value: 'Rs 1,999 Value' },
        { icon: '🎼', title: 'Calm <b>Background Music</b>', description: '(Respectful and uplifting audio)', value: 'Rs 1,499 Value' },
        { icon: '🌍', title: 'Brand-Free & Ready to Share', description: '(For community and personal pages)', value: 'Rs 999 Value' },
        { icon: '⏳', title: '<b>Lifetime Access</b> to All Files', description: '(Download anytime, forever)', value: 'Priceless' }
    ],
     compatibility: {
      title: "Platform & Editing",
      details: [
        "Perfect for <b>Instagram, Facebook</b>, and <b>YouTube</b>.",
        "Videos are in <b>MP4 format</b>."
      ],
      notes: "Designed for easy sharing. Add your own text overlays or logos as needed."
    }
  },
  {
    id: 'prod-kids-worksheet',
    name: '6000+ Kids Activity Worksheets',
    price: 29.99,
    media: [
        { ...getImage('prod-kids-worksheet-1'), type: 'image' },
        { ...getImage('prod-kids-worksheet-2'), type: 'image' },
        { ...getImage('prod-kids-worksheet-3'), type: 'image' },
        { ...getImage('prod-kids-worksheet-4'), type: 'image' },
    ],
    category: 'Templates',
    description: 'Over 6000 printable activity worksheets for kids. This massive bundle covers subjects like math, language arts, puzzles, and coloring. Perfect for parents, teachers, and homeschoolers to keep children engaged and learning.',
    features: [
        { icon: '🎨', title: '<b>6000+</b> Activity Pages', description: '(Math, Language, Puzzles, Coloring, etc.)', value: 'Rs 5,999 Value' },
        { icon: '👶', title: 'Multiple Age Groups', description: '(Categorized for Preschool to Grade 5)', value: 'Rs 1,999 Value' },
        { icon: '🖨️', title: '<b>Print-Ready</b> PDF Format', description: '(High-quality files for easy printing)', value: 'Rs 499 Value' },
        { icon: '🧠', title: 'Fun and Educational', description: '(Designed to make learning enjoyable)', value: 'Priceless' },
        { icon: '🏡', title: 'Perfect for Home & School', description: '(For parents, teachers, and homeschoolers)', value: 'Priceless' }
    ],
     compatibility: {
      title: "File Format",
      details: [
        "Provided as high-quality <b>PDF files</b>.",
        "Can be printed on <b>any standard home or office printer</b>."
      ],
      notes: "You will need a PDF reader like Adobe Acrobat Reader (free) to view and print the files."
    }
  },
  {
    id: 'prod-excel-templates',
    name: 'Excel Sheet Templates',
    price: 19.99,
    media: [
        { ...getImage('prod-excel-templates-1'), type: 'image' },
        { url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', id:'vid10', hint: 'excel demo', type: 'video' },
        { ...getImage('prod-excel-templates-3'), type: 'image' },
        { ...getImage('prod-excel-templates-4'), type: 'image' },
    ],
    category: 'Templates',
    description: 'A collection of powerful and easy-to-use Excel templates for various business and personal needs. Includes templates for project management, budgeting, financial analysis, and more. Save time and get organized with these professional spreadsheets.',
    features: [
        { icon: '📊', title: '<b>50+</b> Professional Templates', description: '(For business and personal finance)', value: 'Rs 2,499 Value' },
        { icon: '📈', title: 'Dashboards and Charts', description: '(Visualize your data effectively)', value: 'Rs 1,499 Value' },
        { icon: '🤖', title: 'Automated Calculations', description: '(Save time and reduce errors)', value: 'Rs 999 Value' },
        { icon: '🎨', title: 'Fully Customizable', description: '(Easily adapt to your specific needs)', value: 'Rs 499 Value' },
        { icon: '📖', title: 'Detailed Instructions', description: '(Get started quickly with our guides)', value: 'Rs 299 Value' }
    ],
     compatibility: {
      title: "Software Requirements",
      details: [
        "<b>Microsoft Excel</b> 2010 or newer (PC & Mac).",
        "Also compatible with <b>Google Sheets</b> with minor adjustments."
      ],
      notes: "Advanced features like macros may only be fully supported in desktop versions of Microsoft Excel."
    }
  },
  {
    id: 'prod-digital-marketing-course',
    name: 'Complete Digital Marketing Course',
    price: 249.99,
    media: [
        { ...getImage('prod-digital-marketing-course-1'), type: 'image' },
        { ...getImage('prod-digital-marketing-course-2'), type: 'image' },
        { ...getImage('prod-digital-marketing-course-3'), type: 'image' },
        { ...getImage('prod-digital-marketing-course-4'), type: 'image' },
    ],
    category: 'Courses & E-books',
    description: 'An A-to-Z course on digital marketing, covering SEO, SEM, social media, email marketing, and more. This course is designed for beginners and intermediates who want to build a career in digital marketing or grow their own business online.',
     features: [
        { icon: '🎓', title: '<b>50+ Hours</b> of Lessons', description: '(Covering SEO, SEM, Social Media, Email, etc.)', value: 'Rs 9,999 Value' },
        { icon: '🏢', title: 'Real-World Case Studies', description: '(Learn from actual marketing campaigns)', value: 'Rs 2,999 Value' },
        { icon: '📜', title: '<b>Certificate of Completion</b>', description: '(Add a new credential to your resume)', value: 'Rs 1,999 Value' },
        { icon: '🔄', title: '<b>Lifetime Access</b> & Updates', description: '(Stay current with the latest trends)', value: 'Priceless' },
        { icon: '🤝', title: 'Instructor Support', description: '(Get your questions answered by experts)', value: 'Rs 2,499 Value' }
    ],
    compatibility: {
      title: "Course Access",
      details: [
        "Accessible on <b>any device</b> with an internet connection.",
        "<b>Stream videos online</b> or download for offline viewing."
      ],
       notes: "No special software is required to take this course."
    }
  },
   {
    id: 'prod-spoken-english-course',
    name: 'Spoken English Course',
    price: 99.00,
    media: [
        { ...getImage('prod-spoken-english-course-1'), type: 'image' },
        { ...getImage('prod-spoken-english-course-2'), type: 'image' },
        { ...getImage('prod-spoken-english-course-3'), type: 'image' },
        { ...getImage('prod-spoken-english-course-4'), type: 'image' },
    ],
    category: 'Courses & E-books',
    description: 'Improve your spoken English with this comprehensive course. Learn to speak confidently and fluently in personal and professional situations. The course covers pronunciation, vocabulary, grammar, and conversation skills.',
    features: [
        { icon: '🗣️', title: 'Interactive Video Lessons', description: '(With native English speakers)', value: 'Rs 3,999 Value' },
        { icon: '🎤', title: '<b>Pronunciation Practice</b>', description: '(Using voice recognition technology)', value: 'Rs 1,999 Value' },
        { icon: '📚', title: 'Vocabulary Builders', description: '(For everyday and professional scenarios)', value: 'Rs 999 Value' },
        { icon: '👥', title: '<b>Conversation Exercises</b>', description: '(Practice speaking with AI partners)', value: 'Rs 1,499 Value' },
        { icon: '📝', title: 'Quizzes & Assignments', description: '(Track your progress and get feedback)', value: 'Rs 499 Value' }
    ],
    compatibility: {
      title: "Course Access",
      details: [
        "Available on <b>web and mobile</b> (iOS & Android).",
        "<b>Download lessons</b> for offline practice."
      ],
      notes: "A microphone is recommended for the pronunciation practice sections."
    }
  },
  {
    id: 'prod-resume-templates',
    name: 'Resume CV Templates',
    price: 25.00,
    media: [
        { ...getImage('prod-resume-templates-1'), type: 'image' },
        { ...getImage('prod-resume-templates-2'), type: 'image' },
        { ...getImage('prod-resume-templates-3'), type: 'image' },
        { ...getImage('prod-resume-templates-4'), type: 'image' },
    ],
    category: 'Templates',
    description: 'A premium collection of professionally designed resume and CV templates to help you land your dream job. Easy to edit and customize, these templates will make your application stand out from the crowd.',
    features: [
        { icon: '📄', title: '<b>30+</b> Resume Templates', description: '(Modern, creative, and professional designs)', value: 'Rs 1,499 Value' },
        { icon: '✍️', title: 'Matching Cover Letters', description: '(Create a consistent application)', value: 'Rs 999 Value' },
        { icon: '🎨', title: '<b>Multiple Color</b> Schemes', description: '(Customize the look to match your style)', value: 'Rs 499 Value' },
        { icon: '📏', title: 'A4 & US Letter Sizes', description: '(Formatted for global standards)', value: 'Rs 299 Value' },
        { icon: '🖋️', title: '<b>Free Font List</b> Included', description: '(Links to download all required fonts)', value: 'Priceless' }
    ],
    compatibility: {
      title: "Software Requirements",
      details: [
        "<b>Microsoft Word</b> (.docx)",
        "<b>Adobe Photoshop</b> (.psd)",
        "<b>Canva</b>"
      ],
      notes: "You will need the appropriate software to edit these templates. A list of free fonts used is included."
    }
  },
  {
    id: 'prod-chatgpt-prompts',
    name: '999+ Ultimate ChatGPT Prompts',
    price: 39.00,
    media: [
        { ...getImage('prod-chatgpt-prompts-1'), type: 'image' },
        { ...getImage('prod-chatgpt-prompts-2'), type: 'image' },
        { ...getImage('prod-chatgpt-prompts-3'), type: 'image' },
        { ...getImage('prod-chatgpt-prompts-4'), type: 'image' },
    ],
    category: 'Software & Tools',
    description: 'Unlock the full potential of ChatGPT with over 999 copy-and-paste prompts for more than 180 tasks. This prompt library will help you generate high-quality content for marketing, business, education, and much more.',
    features: [
        { icon: '🤖', title: '<b>999+</b> Expertly Crafted Prompts', description: '(For over 180 different tasks)', value: 'Rs 2,999 Value' },
        { icon: '📈', title: 'Multiple Categories', description: '(Marketing, content creation, coding, etc.)', value: 'Rs 999 Value' },
        { icon: '📋', title: 'Easy <b>Copy & Paste</b> Format', description: '(Get results in seconds)', value: 'Priceless' },
        { icon: '💡', title: '<b>Notion Database</b> Delivery', description: '(Searchable and easy to navigate)', value: 'Rs 499 Value' },
        { icon: '🔄', title: 'Free <b>Lifetime Updates</b>', description: '(Get new prompts as they are added)', value: 'Rs 1,999 Value' }
    ],
    compatibility: {
      title: "Requirements",
      details: [
        "An account with OpenAI for <b>ChatGPT</b> (works with free or Plus accounts).",
        "A free <b>Notion account</b> to access and duplicate the prompt database."
      ],
      notes: "These are prompts (text inputs) and can be used with any AI language model, though they are optimized for ChatGPT."
    }
  },
];

export const mockCategories: Category[] = [
  {
    id: 'software-and-tools',
    name: 'Software & Tools',
    image: getImage('cat-software'),
    itemCount: 2
  },
  {
    id: 'courses-and-ebooks',
    name: 'Courses & E-books',
    image: getImage('cat-courses'),
    itemCount: 3
  },
  {
    id: 'templates',
    name: 'Templates',
    image: getImage('cat-templates'),
    itemCount: 4
  },
  {
    id: 'content-bundles',
    name: 'Content Bundles',
    image: getImage('cat-bundles'),
    itemCount: 3
  },
  {
    id: 'ai-reels',
    name: 'AI Reels',
    image: getImage('cat-ai-reels'),
    itemCount: 2,
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    image: getImage('cat-graphic-design'),
    itemCount: 1,
  },
];

export const mockBlogPosts: BlogPost[] = [
    {
        id: '1',
        slug: '10-tips-for-selling-digital-products',
        title: '10 Essential Tips for Selling Your Digital Products',
        excerpt: 'Learn the best strategies to successfully market and sell your digital goods online. From pricing to promotion, we cover it all.',
        content: 'Full blog post content goes here...',
        image: getImage('blog-1'),
        author: 'Jane Doe',
        date: '2024-05-15',
    },
    {
        id: '2',
        slug: 'the-rise-of-the-creator-economy',
        title: 'The Rise of the Creator Economy: A New Era for Creatives',
        excerpt: 'Explore how the creator economy is empowering individuals to monetize their passions and build sustainable businesses.',
        content: 'Full blog post content goes here...',
        image: getImage('blog-2'),
        author: 'John Smith',
        date: '2024-05-10',
    },
    {
        id: '3',
        slug: 'how-to-price-your-digital-products',
        title: 'How to Price Your Digital Products for Maximum Profit',
        excerpt: 'Pricing can be tricky. This guide breaks down different pricing models and helps you find the sweet spot for your products.',
        content: 'Full blog post content goes here...',
        image: getImage('blog-3'),
        author: 'Emily White',
        date: '2024-05-01',
    },
];

    