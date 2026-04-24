/**
 * The CMS lives on a separate hostname (subdomain) from the public app.
 * Anything matching this predicate serves the admin/auth area; everything
 * else serves the consumer app.
 *
 * Configure via VITE_CMS_HOSTNAMES (comma-separated). Defaults cover the
 * common cases:
 *  - any hostname starting with "cms." (e.g. cms.yourdomain.com)
 *  - any hostname starting with "admin."
 */
const DEFAULT_PREFIXES = ["cms.", "admin."];

export function isCmsHost(hostname: string = window.location.hostname): boolean {
  const extra = (import.meta.env.VITE_CMS_HOSTNAMES ?? "")
    .split(",")
    .map((s: string) => s.trim().toLowerCase())
    .filter(Boolean);

  const host = hostname.toLowerCase();

  if (extra.includes(host)) return true;
  if (DEFAULT_PREFIXES.some((p) => host.startsWith(p))) return true;

  // Allow opting in locally via ?cms=1 (kept in sessionStorage)
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("cms") === "1") sessionStorage.setItem("cms_mode", "1");
    if (sessionStorage.getItem("cms_mode") === "1") return true;
  } catch {
    /* ignore */
  }

  return false;
}
