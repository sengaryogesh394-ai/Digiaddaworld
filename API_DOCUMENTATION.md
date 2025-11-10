# Blog API Documentation

## Architecture Overview

```
src/
├── controllers/
│   └── blogController.ts       # Business logic layer
├── models/
│   └── Blog.ts                 # MongoDB schema & model
├── lib/
│   └── mongodb.ts              # Database connection
└── app/api/blog/
    ├── route.ts                # GET all, POST new
    ├── [id]/
    │   ├── route.ts            # GET, PUT, DELETE by ID
    │   ├── publish/
    │   │   └── route.ts        # POST - Publish blog
    │   └── unpublish/
    │       └── route.ts        # POST - Unpublish blog
    ├── slug/
    │   └── [slug]/
    │       └── route.ts        # GET by slug
    ├── published/
    │   └── route.ts            # GET published only
    └── stats/
        └── route.ts            # GET statistics
```

## API Endpoints

### 1. Get All Blogs
**GET** `/api/blog`

Get all blog posts with pagination, filtering, and search.

**Query Parameters:**
- `status` (optional): Filter by status (`draft` or `published`)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search in title, content, and tags

**Example:**
```
GET /api/blog?status=published&page=1&limit=10&search=tutorial
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "My Blog Post",
      "content": "...",
      "author": "Admin",
      "status": "published",
      "slug": "my-blog-post",
      "excerpt": "...",
      "tags": ["tech", "tutorial"],
      "publishedAt": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

---

### 2. Create Blog Post
**POST** `/api/blog`

Create a new blog post.

**Request Body:**
```json
{
  "title": "My New Blog Post",
  "content": "Full content here...",
  "author": "Admin",
  "status": "draft",
  "excerpt": "Brief summary",
  "featuredImage": "https://example.com/image.jpg",
  "tags": ["tech", "tutorial"]
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* blog object */ },
  "message": "Blog post created successfully"
}
```

---

### 3. Get Blog by ID
**GET** `/api/blog/[id]`

Get a single blog post by its MongoDB ObjectId.

**Example:**
```
GET /api/blog/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "data": { /* blog object */ }
}
```

---

### 4. Update Blog Post
**PUT** `/api/blog/[id]`

Update an existing blog post.

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "status": "published"
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* updated blog object */ },
  "message": "Blog post updated successfully"
}
```

---

### 5. Delete Blog Post
**DELETE** `/api/blog/[id]`

Delete a blog post permanently.

**Response:**
```json
{
  "success": true,
  "message": "Blog post deleted successfully"
}
```

---

### 6. Publish Blog Post
**POST** `/api/blog/[id]/publish`

Change blog status from draft to published.

**Response:**
```json
{
  "success": true,
  "data": { /* blog object */ },
  "message": "Blog post published successfully"
}
```

---

### 7. Unpublish Blog Post
**POST** `/api/blog/[id]/unpublish`

Change blog status from published to draft.

**Response:**
```json
{
  "success": true,
  "data": { /* blog object */ },
  "message": "Blog post unpublished successfully"
}
```

---

### 8. Get Blog by Slug
**GET** `/api/blog/slug/[slug]`

Get a blog post by its URL-friendly slug (for public pages).

**Example:**
```
GET /api/blog/slug/my-blog-post
```

**Response:**
```json
{
  "success": true,
  "data": { /* blog object */ }
}
```

---

### 9. Get Published Blogs Only
**GET** `/api/blog/published`

Get only published blogs (for public blog listing).

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `tag` (optional): Filter by tag

**Example:**
```
GET /api/blog/published?tag=tutorial&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [ /* array of published blogs */ ],
  "pagination": { /* pagination info */ }
}
```

---

### 10. Get Blog Statistics
**GET** `/api/blog/stats`

Get overall blog statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 100,
    "published": 75,
    "draft": 25,
    "tags": 15
  }
}
```

---

## Controller Methods

### BlogController Class

All business logic is centralized in the `BlogController` class:

```typescript
BlogController.getAllBlogs(request)        // Get all with filters
BlogController.getBlogById(id)             // Get by ID
BlogController.getBlogBySlug(slug)         // Get by slug
BlogController.createBlog(data)            // Create new
BlogController.updateBlog(id, data)        // Update existing
BlogController.deleteBlog(id)              // Delete
BlogController.publishBlog(id)             // Publish
BlogController.unpublishBlog(id)           // Unpublish
BlogController.getPublishedBlogs(request)  // Get published only
BlogController.getBlogStats()              // Get statistics
```

---

## Blog Model Schema

```typescript
{
  title: string (required, max 200 chars)
  content: string (required)
  author: string (default: "Admin")
  status: "draft" | "published"
  slug: string (auto-generated, unique)
  excerpt: string (optional, max 500 chars)
  featuredImage: string (optional)
  tags: string[] (optional)
  publishedAt: Date (auto-set on publish)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Server Error

---

## Usage Examples

### Create a Draft Blog
```javascript
const response = await fetch('/api/blog', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Blog Post',
    content: 'Content here...',
    status: 'draft'
  })
});
```

### Publish a Blog
```javascript
const response = await fetch('/api/blog/507f1f77bcf86cd799439011/publish', {
  method: 'POST'
});
```

### Search Blogs
```javascript
const response = await fetch('/api/blog?search=tutorial&status=published');
const data = await response.json();
```

### Get Blog Statistics
```javascript
const response = await fetch('/api/blog/stats');
const stats = await response.json();
```

---

## Features

✅ **MVC Architecture** - Separation of concerns (Model, Controller, Routes)
✅ **CRUD Operations** - Complete Create, Read, Update, Delete
✅ **Search & Filter** - Search in title/content/tags, filter by status
✅ **Pagination** - Efficient data loading
✅ **Auto-Slug Generation** - SEO-friendly URLs
✅ **Draft/Publish Workflow** - Content management
✅ **Tag System** - Categorization
✅ **Statistics** - Dashboard metrics
✅ **Error Handling** - Consistent error responses
✅ **Type Safety** - Full TypeScript support
