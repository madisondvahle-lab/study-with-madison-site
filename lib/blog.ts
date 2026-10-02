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
    .map((block, index) => {
      const lines = block.trim().split("\n");
      if (lines.every((line) => /^> /.test(line))) {
        return `<blockquote>${formatInline(lines.map((line) => line.slice(2)).join("\n")).replace(/\n/g, "<br />")}</blockquote>`;
      }
      if (lines.every((line) => /^- /.test(line))) {
        return `<ul>${lines.map((line) => `<li>${formatInline(line.slice(2))}</li>`).join("")}</ul>`;
      }
      const heading = lines.join(" ").match(/^(#{1,3}) (.+)$/);
      if (heading) {
        return `<h${heading[1].length}>${formatInline(heading[2])}</h${heading[1].length}>`;
      }
      const className = index === 0 ? ' class="article-lead"' : "";
      return `<p${className}>${formatInline(lines.join("\n")).replace(/\n/g, "<br />")}</p>`;
    })
    .join("");
}

function formatInline(value: string): string {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
