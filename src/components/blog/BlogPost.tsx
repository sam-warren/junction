import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { BlogPost as BlogPostType } from "@/types/blog";
import { getBlogPost, formatDate } from "@/utils/blog";
import FrostedCard from "@/components/ui/FrostedCard";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const blogPost = await getBlogPost(slug);
        setPost(blogPost);
      } catch (error) {
        console.error("Failed to load blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return null; // Don't render anything while loading
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const PostComponent = post.component;

  return (
    <div className="relative">
      <section className="relative mx-auto w-full max-w-4xl p-3 px-2 pt-6 sm:p-4 sm:px-6 lg:px-8 lg:pt-8">
        <Link
          to="/blog"
          className="mb-8 inline-flex animate-fade-up items-center text-blue-600 opacity-0 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <article className="prose prose-lg prose-gray dark:prose-invert max-w-none">
          <header className="not-prose mb-8">
            <h1 className="mb-4 animate-fade-up-200 text-3xl font-bold tracking-tight text-gray-900 opacity-0 sm:text-4xl dark:text-white">
              {post.title}
            </h1>

            <div className="mb-4 flex animate-fade-up-400 items-center text-gray-500 opacity-0 dark:text-gray-400">
              <Calendar className="mr-2 h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex animate-fade-up-600 flex-wrap gap-2 opacity-0">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-300/20"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <FrostedCard className="animate-fade-up-800 opacity-0 p-10">
            <div className="prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-img:rounded-lg prose-img:shadow-lg prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-gray-900 prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-gray-800 dark:prose-code:text-gray-100">
              {PostComponent && <PostComponent />}
            </div>
          </FrostedCard>
        </article>
      </section>
    </div>
  );
};

export default BlogPost;
