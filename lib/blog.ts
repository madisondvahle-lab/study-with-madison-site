import { env } from "cloudflare:workers";
import { nclexBlogPosts } from "./nclex-blog-posts";
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
    .prepare("SELECT * FROM blog_posts ORDER BY published_at DESC, created_at DESC, id ASC")
    .all<BlogPost>();
  const postsBySlug = new Map(nclexBlogPosts.map((post) => [post.slug, post]));
  for (const post of result.results) {
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
  if (storedPost) return storedPost.status === "published" ? storedPost : null;
  return nclexBlogPosts.find((post) => post.slug === slug) ?? null;
}
