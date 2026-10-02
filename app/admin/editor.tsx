"use client";

import { FormEvent, useEffect, useState } from "react";

type Post = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  status: "draft" | "published";
};

const emptyPost: Omit<Post, "id"> = { slug: "", title: "", description: "", content: "", status: "draft" };

export default function AdminEditor() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | Omit<Post, "id">>(emptyPost);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/posts").then(async (response) => response.ok && setPosts(await response.json()));
  }, []);

  function update(field: keyof typeof emptyPost, value: string) {
    setPost((current) => ({ ...current, [field]: value }));
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    setMessage("Saving…");
    const response = await fetch("/api/posts", {
      method: "id" in post ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      setMessage((await response.json()).error ?? "Unable to save post.");
      return;
    }
    setMessage("Saved.");
    setPosts(await (await fetch("/api/posts")).json());
  }

  return <main className="admin-shell">
    <nav className="nav"><a className="brand" href="/"><span>Study With</span> Madison<span className="brand-rn">, RN</span></a><a href="/blog">View blog</a></nav>
    <section className="admin-panel">
      <p className="eyebrow">Private editor</p><h1>Write a blog post</h1><p>Cloudflare Access protects this page and the post API.</p>
      <form onSubmit={save}>
        <label>Title<input value={post.title} onChange={(event) => update("title", event.target.value)} required /></label>
        <label>Slug<input value={post.slug} onChange={(event) => update("slug", event.target.value)} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required /></label>
        <label>Description<textarea value={post.description} onChange={(event) => update("description", event.target.value)} required /></label>
        <label>Content<textarea className="admin-content" value={post.content} onChange={(event) => update("content", event.target.value)} required /></label>
        <label>Status<select value={post.status} onChange={(event) => update("status", event.target.value)}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <button className="button" type="submit">Save post</button><span>{message}</span>
      </form>
      <h2>Posts</h2><ul>{posts.map((item) => <li key={item.id}><button type="button" onClick={() => setPost(item)}>{item.title || item.slug}</button> <small>{item.status}</small></li>)}</ul>
    </section>
  </main>;
}
