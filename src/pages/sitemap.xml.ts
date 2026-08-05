import type { Post } from '@/types';

const blogPosts: Post[] = [];
const siteUrl = process.env.PUBLIC_SITE_URL || 'https://portfolio.hansondev.me';
const pages = [{ permalink: '/' }];

const formatLastMod = (date?: string | null) => {
  if (!date) return new Date().toISOString();

  return new Date(date).toISOString();
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${siteUrl}${page.permalink}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>`,
    )
    .join('')}
  ${blogPosts
    .map(
      (post) => `
    <url>
      <loc>${siteUrl}/blog/${post.slug}</loc>
      <lastmod>${formatLastMod(post.published_at)}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`,
    )
    .join('')}
</urlset>`;

export async function GET() {
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
