import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  status: 'draft' | 'published';
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

const BlogSchema: Schema<IBlog> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    author: {
      type: String,
      required: [true, 'Please provide an author'],
      default: 'Admin',
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    excerpt: {
      type: String,
      maxlength: [500, 'Excerpt cannot be more than 500 characters'],
    },
    featuredImage: {
      type: String,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Set publishedAt when status changes to published
BlogSchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
