# MongoDB Blog Setup Guide

## 1. Install Dependencies

Run the following command to install mongoose:

```bash
npm install mongoose
```

## 2. MongoDB Setup

### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Click "Connect" and choose "Connect your application"
5. Copy the connection string

### Option B: Local MongoDB
1. Install MongoDB locally from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Connection string will be: `mongodb://localhost:27017/digiaddaworld`

## 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string_here
```

Example for MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/digiaddaworld?retryWrites=true&w=majority
```

Example for Local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/digiaddaworld
```

## 4. File Structure Created

```
src/
├── lib/
│   └── mongodb.ts              # MongoDB connection utility
├── models/
│   └── Blog.ts                 # Blog schema and model
├── app/
│   ├── api/
│   │   └── blog/
│   │       ├── route.ts        # GET all, POST new blog
│   │       └── [id]/
│   │           └── route.ts    # GET, PUT, DELETE by ID
│   └── admin/
│       └── blog/
│           └── new/
│               └── page.tsx    # Blog creation form
```

## 5. API Endpoints

### GET /api/blog
Fetch all blog posts with pagination
- Query params: `status`, `page`, `limit`
- Example: `/api/blog?status=published&page=1&limit=10`

### POST /api/blog
Create a new blog post
```json
{
  "title": "My Blog Post",
  "content": "Blog content here...",
  "author": "Admin",
  "status": "draft",
  "excerpt": "Short summary",
  "tags": ["tech", "tutorial"],
  "featuredImage": "https://example.com/image.jpg"
}
```

### GET /api/blog/[id]
Get single blog post by ID

### PUT /api/blog/[id]
Update blog post by ID

### DELETE /api/blog/[id]
Delete blog post by ID

## 6. Blog Model Schema

```typescript
{
  title: string (required, max 200 chars)
  content: string (required)
  author: string (default: "Admin")
  status: "draft" | "published"
  slug: string (auto-generated from title)
  excerpt: string (optional, max 500 chars)
  featuredImage: string (optional)
  tags: string[] (optional)
  publishedAt: Date (auto-set when published)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

## 7. Testing

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `/admin/blog/new`
3. Fill out the form and click "Save as Draft" or "Publish"
4. Check `/admin/blog` to see your posts

## 8. Features Implemented

✅ MongoDB connection with connection pooling
✅ Blog model with auto-slug generation
✅ RESTful API routes (CRUD operations)
✅ Form validation
✅ Loading states
✅ Toast notifications
✅ Draft and publish functionality
✅ Tags support
✅ Featured image support
✅ Pagination support
✅ Status filtering

## Troubleshooting

### Mongoose errors
- Make sure mongoose is installed: `npm install mongoose`
- Check your MongoDB connection string in `.env.local`

### Connection errors
- Verify your MongoDB cluster is running
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure the connection string includes the database name

### API errors
- Check the browser console for detailed error messages
- Verify the API routes are accessible
- Check MongoDB connection in the server logs
