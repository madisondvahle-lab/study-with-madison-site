"use client";

import { useEffect, useState } from "react";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function CopyButton({ text, label = "Copy prompt" }: { text: string; label?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    setState((await copyText(text)) ? "copied" : "failed");
    window.setTimeout(() => setState("idle"), 2200);
  }

  return (
    <button type="button" className="prompt-copy" onClick={copy}>
      {state === "copied" ? "Copied" : state === "failed" ? "Press Ctrl/Cmd+C" : label}
      <span className="sr-only" role="status">{state === "copied" ? "Prompt copied to clipboard" : ""}</span>
    </button>
  );
}

export function ArticlePromptCopy() {
  useEffect(() => {
    const timers = new Set<number>();
    async function onClick(event: MouseEvent) {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-copy-prompt]");
      if (!button) return;
      const text = button.closest(".prompt-box")?.querySelector(".prompt-box-text")?.textContent ?? "";
      const ok = await copyText(text);
      button.textContent = ok ? "Copied" : "Select and copy";
      const timer = window.setTimeout(() => {
        button.textContent = "Copy prompt";
        timers.delete(timer);
      }, 2200);
      timers.add(timer);
    }
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);
  return null;
}
