import { env } from "cloudflare:workers";
import { aiStudyPosts } from "./ai-study-posts";
import { nclexBlogPosts } from "./nclex-blog-posts";

const builtInPosts = [...nclexBlogPosts, ...aiStudyPosts];
export { renderBlogContent, sanitizeRichText } from "./blog-content";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  status: "draft" | "published";
  publishedAt: number | null;
  createdAt: number;
  updatedAt: number;
};

function getDb(): D1Database {
  if (!env.DB) throw new Error("Cloudflare D1 binding `DB` is unavailable.");
  return env.DB;
}

function withPlainAuthor(post: BlogPost): BlogPost {
  return { ...post, author: post.author.replace(/,\s*RN$/, "") };
}

export async function listPublishedPosts(): Promise<BlogPost[]> {
  const result = await getDb()
    .prepare("SELECT * FROM blog_posts ORDER BY published_at DESC, created_at DESC, id ASC")
    .all<BlogPost>();
  const postsBySlug = new Map(builtInPosts.map((post) => [post.slug, post]));
  for (const stored of result.results) {
    const post = withPlainAuthor(stored);
    if (post.status === "published") postsBySlug.set(post.slug, post);
    else postsBySlug.delete(post.slug);
  }
  return [...postsBySlug.values()].sort(
    (first, second) =>
      (second.publishedAt ?? second.createdAt) - (first.publishedAt ?? first.createdAt) ||
      first.id.localeCompare(second.id),
  );
}

export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  const storedPost = await getDb()
    .prepare("SELECT * FROM blog_posts WHERE slug = ? LIMIT 1")
    .bind(slug)
    .first<BlogPost>();
  if (storedPost) return storedPost.status === "published" ? withPlainAuthor(storedPost) : null;
  return builtInPosts.find((post) => post.slug === slug) ?? null;
}
