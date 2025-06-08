# Blog System Setup

Your website now has a fully functional blog system using MDX files. Here's how to add and manage blog posts.

## How to Add a New Blog Post

### 1. Create the MDX File

Create a new `.mdx` file in the `/public/blog/` directory:

```mdx
export const metadata = {
  title: "Your Blog Post Title",
  date: "2024-01-15", // YYYY-MM-DD format
  tags: ["tag1", "tag2", "tag3"],
  slug: "your-blog-post-slug", // Must match filename
  description: "A brief description of your blog post that appears on the blog listing page."
};

# Your Blog Post Title

Your content goes here using standard Markdown syntax.

## Subheading

You can use:
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Code blocks
- Lists
- And more!

```javascript
// Code example
const example = "Hello, World!";
console.log(example);
```

```

### 2. Register the Blog Post

Add your new blog post to the registry in `src/utils/blog.ts`:

```typescript
const blogRegistry: Record<string, () => Promise<{ default: React.ComponentType, metadata: BlogMetadata }>> = {
  'example-blog': () => import('../../public/blog/example-blog.mdx'),
  'getting-started': () => import('../../public/blog/getting-started.mdx'),
  'your-blog-post-slug': () => import('../../public/blog/your-blog-post-slug.mdx'), // Add this line
};
```

### 3. Deploy

Push your changes and deploy. Your blog post will automatically appear on the `/blog` page!

## File Structure

```
public/
  blog/
    example-blog.mdx
    getting-started.mdx
    your-new-post.mdx
src/
  utils/
    blog.ts  # Register new posts here
  components/
    blog/
      BlogList.tsx   # Blog listing page
      BlogPost.tsx   # Individual blog post page
```

## Blog Post Metadata

Each blog post must export a `metadata` object with:

- `title`: The blog post title
- `date`: Publication date in YYYY-MM-DD format
- `tags`: Array of tags for categorization
- `slug`: URL slug (must match filename without .mdx)
- `description`: Optional description for the blog listing

## Features

- ✅ Frosted glass cards on blog listing
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Typography styling for content
- ✅ Tag system
- ✅ Date formatting
- ✅ Navigation between posts and listing
- ✅ Loading states
- ✅ SEO-friendly URLs

## Routes

- `/blog` - Blog listing page
- `/blog/[slug]` - Individual blog post pages

That's it! The system is designed to be simple and seamless. Just drop in MDX files and register them - no complex configuration needed. 