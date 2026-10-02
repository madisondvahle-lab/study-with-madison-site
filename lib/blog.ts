import { env } from "cloudflare:workers";
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

export async function listPublishedPosts(): Promise<BlogPost[]> {
  const result = await getDb()
    .prepare("SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC, created_at DESC")
    .all<BlogPost>();
  return result.results;
}

export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  return getDb()
    .prepare("SELECT * FROM blog_posts WHERE slug = ? AND status = 'published' LIMIT 1")
    .bind(slug)
    .first<BlogPost>();
}
