import { BlogPost, BlogMetadata } from '@/types/blog';

// Registry for blog posts - add new posts here
const blogRegistry: Record<string, () => Promise<{ default: React.ComponentType, metadata: BlogMetadata }>> = {
    // 'example': () => import('../../public/blog/example.mdx'),
    // 'clarke-engineering': () => import('../../public/blog/clarke-engineering.mdx'), TODO: Publish later
    'service-packages': () => import('../../public/blog/service-packages.mdx'),
};

export const registerBlogPost = (
    slug: string,
    importFn: () => Promise<{ default: React.ComponentType, metadata: BlogMetadata }>
) => {
    blogRegistry[slug] = importFn;
};

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
    const posts: BlogPost[] = [];

    for (const [slug, importFn] of Object.entries(blogRegistry)) {
        try {
            const module = await importFn();
            posts.push({
                ...module.metadata,
                component: module.default,
            });
        } catch (error) {
            console.error(`Failed to load blog post: ${slug}`, error);
        }
    }

    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
    const importFn = blogRegistry[slug];
    if (!importFn) {
        return null;
    }

    try {
        const module = await importFn();
        return {
            ...module.metadata,
            component: module.default,
        };
    } catch (error) {
        console.error(`Failed to load blog post: ${slug}`, error);
        return null;
    }
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}; 