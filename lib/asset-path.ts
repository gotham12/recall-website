/** GitHub Pages base path — must match next.config.mjs */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/recall-website';

/** Prefix public asset paths for static export on GitHub Pages. */
export function assetPath(path: string): string {
  if (!path) return path;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (BASE_PATH && normalized.startsWith(BASE_PATH)) return normalized;
  return `${BASE_PATH}${normalized}`;
}

/** Open Gmail compose in the browser (avoids default mailto → Apple Mail). */
export function gmailComposeUrl(
  email: string,
  options?: { subject?: string; body?: string }
): string {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: email,
  });
  if (options?.subject) params.set('su', options.subject);
  if (options?.body) params.set('body', options.body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
