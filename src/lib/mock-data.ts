
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
      "<b>20+ hours</b> of high-quality video content",
      "Actionable strategies for <b>follower growth</b>",
      "<b>Content creation</b> and <b>scheduling guides</b>",
      "Advanced <b>hashtag research</b> techniques",
      "Access to a <b>private community</b> for support"
    ],
    compatibility: {
      title: "Course Access",
      details: [
        "Accessible on any device with an internet connection (desktop, tablet, mobile).",
        "Lifetime access to all course materials and future updates."
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
      "<b>1000+ Social Media</b> Templates (Instagram, Facebook, etc.)",
      "<b>500+ Unique</b> Fonts",
      "<b>2000+ Vector</b> Icons",
      "<b>100+ High-Resolution</b> Textures and Patterns",
      "<b>Commercial license</b> included for all assets"
    ],
    compatibility: {
      title: "Software Requirements",
      details: [
        "Adobe Photoshop: CS6 and above",
        "Adobe Illustrator: CS6 and above",
        "Canva: Free and Pro versions",
        "Figma: All versions"
      ],
      notes: "Some files are provided in .PSD and .AI formats, requiring Adobe software. PNG and SVG files are provided for broader compatibility."
    }
  },
  {
    id: 'prod-ai-reels-fitness',
    name: '500+ AI Fitness Reels Bundle',
    price: 49.99,
    media: [
        { url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', id:'vid4', hint: 'fitness promo', type: 'video' },
        { ...getImage('prod-ai-reels-fitness-2'), type: 'image' }, 
        { url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', id:'vid5', hint: 'workout reel', type: 'video' },
        { ...getImage('prod-ai-reels-fitness-4'), type: 'image' }
    ],
    category: 'AI Reels',
    description: 'A massive bundle of 500+ AI-generated, ready-to-post fitness reels. Perfect for fitness influencers, gyms, and personal trainers looking to create engaging social media content without the hassle. Videos feature workout demos, motivational quotes, and fitness tips.',
    isFeatured: true,
    features: [
      "<b>500+ high-definition</b> vertical videos",
      "Content covering various niches: <b>home workouts, gym, yoga, nutrition</b>",
      "<b>Trending audio</b> suggestions for each reel",
      "<b>No watermarks</b> or branding",
      "<b>Instant download</b> and <b>lifetime access</b>"
    ],
    compatibility: {
      title: "Platform & Editing",
      details: [
        "Instagram Reels, TikTok, and YouTube Shorts.",
        "Provided in standard MP4 format."
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
      "Full versions of over <b>20+ desktop and mobile apps</b>",
      "Includes <b>Photoshop, Illustrator, Premiere Pro, After Effects, Lightroom</b>, and more",
      "<b>One-time payment</b> with <b>lifetime access</b>",
      "<b>No monthly</b> subscription fees",
      "Comprehensive <b>installation guide</b> included"
    ],
    compatibility: {
      title: "System Requirements",
      details: [
        "Windows: Windows 10 (64-bit) version 20H2 or later",
        "macOS: macOS Big Sur (version 11.0) or later",
        "At least 16GB of RAM recommended",
        "SSD with 50GB of available space"
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
      "<b>500+ HD vertical videos</b> with inspiring quotes and visuals",
      "Content themes include <b>success, mindset, and perseverance</b>",
      "<b>Background music</b> included",
      "<b>No branding</b> for easy integration",
      "<b>Instant download</b> link"
    ],
    compatibility: {
      title: "Platform & Editing",
      details: [
        "Optimized for Instagram Reels, TikTok, and YouTube Shorts.",
        "Standard MP4 format compatible with all devices."
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
      "<b>500+ reels</b> with religious quotes, prayers, and serene visuals",
      "Content suitable for <b>various faiths</b> and spiritual practices",
      "Calm and respectful <b>background music</b>",
      "<b>Brand-free</b> and ready to share",
      "<b>Lifetime access</b> to all files"
    ],
     compatibility: {
      title: "Platform & Editing",
      details: [
        "Perfect for Instagram, Facebook, and YouTube.",
        "Videos are in MP4 format."
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
      "<b>6000+ pages</b> of activities",
      "Categorized by <b>age group</b> (Preschool to Grade 5)",
      "Subjects include <b>Math, English, Science</b>, and more",
      "<b>Print-ready</b> PDF format",
      "<b>Fun and educational</b> designs"
    ],
     compatibility: {
      title: "File Format",
      details: [
        "Provided as high-quality PDF files.",
        "Can be printed on any standard home or office printer."
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
      "<b>50+ professional</b> Excel templates",
      "Includes <b>dashboards, charts, and automated calculations</b>",
      "Templates for <b>budgeting, invoicing, project tracking</b>, etc.",
      "<b>Fully customizable</b> to fit your needs",
      "Detailed <b>instructions</b> for each template"
    ],
     compatibility: {
      title: "Software Requirements",
      details: [
        "Microsoft Excel 2010 or newer (PC & Mac).",
        "Also compatible with Google Sheets with minor adjustments."
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
      "<b>50+ hours</b> of in-depth video lessons",
      "Covering <b>SEO, Social Media, Google Ads, Email Marketing, and Analytics</b>",
      "<b>Real-world case studies</b> and projects",
      "<b>Certificate</b> of completion",
      "<b>Lifetime access</b> to course content and all future updates"
    ],
    compatibility: {
      title: "Course Access",
      details: [
        "Accessible on any device with an internet connection.",
        "Stream videos online or download for offline viewing."
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
      "<b>Interactive video lessons</b> with native speakers",
      "Pronunciation practice with <b>voice recognition</b>",
      "<b>Vocabulary builders</b> for common scenarios",
      "<b>Conversation practice</b> exercises",
      "<b>Quizzes and assignments</b> to track progress"
    ],
    compatibility: {
      title: "Course Access",
      details: [
        "Available on web and mobile (iOS & Android).",
        "Download lessons for offline practice."
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
      "<b>30+ modern and professional</b> resume templates",
      "Matching <b>cover letter</b> templates included",
      "<b>One and two-page</b> resume designs",
      "Available in <b>multiple color schemes</b>",
      "<b>A4 and US Letter</b> sizes"
    ],
    compatibility: {
      title: "Software Requirements",
      details: [
        "Microsoft Word (.docx)",
        "Adobe Photoshop (.psd)",
        "Canva"
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
      "<b>999+ expertly crafted</b> prompts",
      "Organized into <b>180+ categories</b> and tasks",
      "Covers <b>marketing, content creation, coding</b>, and more",
      "Easy-to-use <b>copy and paste</b> format",
      "Delivered as a <b>Notion database</b> for easy searching"
    ],
    compatibility: {
      title: "Requirements",
      details: [
        "An account with OpenAI for ChatGPT (works with free or Plus accounts).",
        "A free Notion account to access and duplicate the prompt database."
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
