"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { renderBlogContent } from "@/lib/blog-content";

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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then(async (response) => {
        if (!response.ok) throw new Error(`Unable to load posts (${response.status}).`);
        setPosts(await response.json());
      })
      .catch((error: Error) => setMessage(error.message));
  }, []);

  function update(field: keyof typeof emptyPost, value: string) {
    setPost((current) => ({ ...current, [field]: value }));
  }

  function format(command: string, value?: string) {
    contentRef.current?.focus();
    document.execCommand(command, false, value);
    if (contentRef.current) update("content", contentRef.current.innerHTML);
  }

  function insertLink() {
    contentRef.current?.focus();
    const url = window.prompt("Destination URL, including https://");
    if (url?.startsWith("https://")) format("createLink", url);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    setMessage("Saving…");
    try {
      const response = await fetch("/api/posts", {
        method: "id" in post ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(body?.error ?? `Unable to save post (${response.status}).`);
      }
      setMessage("Saved.");
      setPosts(await (await fetch("/api/posts")).json());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save post.");
    }
  }

  return <main className="admin-shell">
    <nav className="nav"><a className="brand" href="/"><span>Study With</span> Madison<span className="brand-rn">, RN</span></a><a href="/blog">View blog</a></nav>
    <section className="admin-panel">
      <p className="eyebrow">Private editor</p><h1>Write a blog post</h1><p>Cloudflare Access protects this page and the post API.</p>
      <form onSubmit={save}>
        <label>Title<input value={post.title} onChange={(event) => update("title", event.target.value)} required /></label>
        <label>Slug<input value={post.slug} onChange={(event) => update("slug", event.target.value)} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required /></label>
        <label>Description<textarea value={post.description} onChange={(event) => update("description", event.target.value)} required /></label>
        <label>Content
          <div className="editor-toolbar" aria-label="Formatting tools">
            <button type="button" onClick={() => format("formatBlock", "p")}>Body</button>
            <button type="button" onClick={() => format("formatBlock", "h2")}>Heading</button>
            <button type="button" onClick={() => format("formatBlock", "h3")}>Subheading</button>
            <button type="button" onClick={() => format("bold")}>Bold</button>
            <button type="button" onClick={() => format("italic")}>Italic</button>
            <button type="button" onClick={() => format("underline")}>Underline</button>
            <button type="button" onClick={() => format("insertUnorderedList")}>Bullets</button>
            <button type="button" onClick={() => format("insertOrderedList")}>Numbered</button>
            <button type="button" onClick={() => format("formatBlock", "blockquote")}>Quote</button>
            <button type="button" onClick={insertLink}>Link</button>
          </div>
          <div
            key={"id" in post ? post.id : "new"}
            ref={contentRef}
            className="admin-content admin-rich-editor"
            contentEditable
            role="textbox"
            aria-multiline="true"
            onInput={(event) => update("content", event.currentTarget.innerHTML)}
            dangerouslySetInnerHTML={{ __html: renderBlogContent(post.content) }}
          />
          <small>Select text before clicking Link to use it as the displayed hyperlink text.</small>
        </label>
        <label>Status<select value={post.status} onChange={(event) => update("status", event.target.value)}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <button className="button" type="submit">Save post</button><span>{message}</span>
      </form>
      <h2>Posts</h2><ul>{posts.map((item) => <li key={item.id}><button type="button" onClick={() => setPost(item)}>{item.title || item.slug}</button> <small>{item.status}</small></li>)}</ul>
    </section>
  </main>;
}
