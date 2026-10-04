export function renderBlogContent(content: string): string {
  if (/<(?:p|h[1-6]|strong|em|ul|ol|blockquote|a)\b/i.test(content)) {
    return formatRichText(sanitizeRichText(content));
  }

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

function formatRichText(html: string): string {
  let formatted = html.replace(
    /<p>((?:Step|Part)\s+\d+\s*:[\s\S]*?)<\/p>/gi,
    "<h2>$1</h2>",
  );
  if (formatted.startsWith("<p>")) {
    formatted = formatted.replace(/^<p>/, '<p class="article-lead">');
  }
  return formatted;
}

export function sanitizeRichText(html: string): string {
  const allowedTags = new Set(["p", "br", "strong", "em", "u", "h2", "h3", "ul", "ol", "li", "blockquote", "a"]);
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\s*\/?\s*([a-z0-9]+)(?:\s[^>]*)?>/gi, (tag, name: string) => {
      const normalizedName = name.toLowerCase();
      if (!allowedTags.has(normalizedName)) return "";
      if (tag.startsWith("</")) return `</${normalizedName}>`;
      if (normalizedName !== "a") return `<${normalizedName}>`;
      const href = tag.match(/\bhref\s*=\s*["'](https?:\/\/[^"']+)["']/i)?.[1];
      return href ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">` : "<a>";
    });
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
