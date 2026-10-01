import { env } from "cloudflare:workers";

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

export function renderBlogContent(content: string): string {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.trim()).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
