import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devzilla.com'; // Replace with the actual production domain

  // Define static routes
  const routes = ['', '/seo', '/portfolio'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In a real production app, we would fetch dynamic routes from the database here
  // e.g. const dynamicRoutes = db.getPages().map(page => ({ url: `${baseUrl}/c/${page.id}`, ... }))
  // return [...routes, ...dynamicRoutes];

  return routes;
}
