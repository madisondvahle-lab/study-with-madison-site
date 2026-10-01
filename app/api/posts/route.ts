import { requireAccess } from "@/lib/access-auth";
import { env } from "cloudflare:workers";

type PostInput = {
  id?: string;
  slug?: string;
  title?: string;
  description?: string;
  content?: string;
  status?: "draft" | "published";
};

function database(): D1Database {
  if (!env.DB) throw new Error("Cloudflare D1 binding `DB` is unavailable.");
  return env.DB;
}

export async function GET(request: Request): Promise<Response> {
  if (!(await requireAccess(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const posts = await database().prepare("SELECT * FROM blog_posts ORDER BY updated_at DESC").all();
  return Response.json(posts.results);
}

export async function POST(request: Request): Promise<Response> {
  if (!(await requireAccess(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const input = (await request.json()) as PostInput;
  const title = input.title?.trim();
  const slug = input.slug?.trim().toLowerCase();
  const description = input.description?.trim();
  const content = input.content?.trim();
  if (!title || !slug || !description || !content || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return Response.json({ error: "Title, slug, description, and content are required. Use a URL-safe slug." }, { status: 400 });
  }

  const now = Date.now();
  const id = crypto.randomUUID();
  const status = input.status === "published" ? "published" : "draft";
  await database()
    .prepare(
      "INSERT INTO blog_posts (id, slug, title, description, content, author, status, published_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(id, slug, title, description, content, "Madison, RN", status, status === "published" ? now : null, now, now)
    .run();

  return Response.json({ id, slug }, { status: 201 });
}

export async function PUT(request: Request): Promise<Response> {
  if (!(await requireAccess(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const input = (await request.json()) as PostInput;
  const id = input.id?.trim();
  const title = input.title?.trim();
  const slug = input.slug?.trim().toLowerCase();
  const description = input.description?.trim();
  const content = input.content?.trim();
  if (!id || !title || !slug || !description || !content || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return Response.json({ error: "A post id and all content fields are required." }, { status: 400 });
  }

  const existing = await database().prepare("SELECT status, published_at FROM blog_posts WHERE id = ?").bind(id).first<{ status: string; published_at: number | null }>();
  if (!existing) return Response.json({ error: "Post not found." }, { status: 404 });
  const status = input.status === "published" ? "published" : "draft";
  const now = Date.now();
  await database()
    .prepare("UPDATE blog_posts SET slug = ?, title = ?, description = ?, content = ?, status = ?, published_at = ?, updated_at = ? WHERE id = ?")
    .bind(slug, title, description, content, status, status === "published" ? existing.published_at ?? now : null, now, id)
    .run();

  return Response.json({ id, slug });
}

export async function DELETE(request: Request): Promise<Response> {
  if (!(await requireAccess(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ error: "Post id is required." }, { status: 400 });
  await database().prepare("DELETE FROM blog_posts WHERE id = ?").bind(id).run();
  return new Response(null, { status: 204 });
}
