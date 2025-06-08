import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Tag, BookOpen } from "lucide-react";
import FrostedCard from "@/components/ui/FrostedCard";
import { BlogPost } from "@/types/blog";
import { getAllBlogPosts, formatDate } from "@/utils/blog";

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const blogPosts = await getAllBlogPosts();
        setPosts(blogPosts);
      } catch (error) {
        console.error("Failed to load blog posts:", error);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="relative">
      <section className="relative mx-auto w-full max-w-7xl p-3 px-2 pt-6 sm:p-4 sm:px-6 lg:px-8 lg:pt-8">
        <div className="mb-8 lg:mb-12">
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-6 flex items-center justify-center">
              <BookOpen className="mr-4 h-8 w-8 animate-fade-up text-blue-500 opacity-0 dark:text-blue-400" />
              <h2 className="animate-fade-up text-3xl font-bold opacity-0">
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:via-blue-500 dark:to-blue-600">
                  Blog
                </span>
              </h2>
            </div>
            <div className="space-y-2 px-4 sm:px-0">
              <p className="animate-fade-up-200 text-base text-gray-600 opacity-0 sm:text-lg dark:text-gray-300">
                Insights, tutorials, and thoughts on modern software
                development.
              </p>
            </div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="animate-fade-up-400 py-12 text-center opacity-0">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block animate-fade-up opacity-0"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <FrostedCard className="h-full transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/50 group-hover:scale-[1.02] dark:hover:border-blue-900 dark:hover:bg-blue-900/20">
                  <div className="flex h-full flex-col">
                    <div className="mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="mr-1 h-4 w-4" />
                      {formatDate(post.date)}
                    </div>

                    <h2 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {post.title}
                    </h2>

                    {post.tags && post.tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-300/20"
                          >
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {post.description && (
                      <p className="mt-auto text-gray-600 dark:text-gray-300">
                        {post.description}
                      </p>
                    )}
                  </div>
                </FrostedCard>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogList;
