export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function nl2br(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br/>");
}
