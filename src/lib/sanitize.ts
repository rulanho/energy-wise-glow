import DOMPurify from "dompurify";

export const cleanHtml = (html: string) =>
  DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "br", "strong", "em", "ul", "ol", "li", "a", "h2", "h3", "blockquote", "code"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
