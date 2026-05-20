import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.nartechnique.com';
  
  const services = [
    'tv-mounting-san-mateo',
    'ceiling-fan-installation-san-mateo',
    'faucet-replacement-san-mateo',
    'garbage-disposal-installation-san-mateo',
    'light-fixture-installation-san-mateo',
    'toilet-installation-san-mateo',
    'appliance-installation-san-mateo',
    'furniture-assembly-san-mateo',
    'art-installation-san-mateo',
    'water-treatment-installation-san-mateo',
    'window-ac-installation-san-mateo'
  ];

  const serviceUrls: MetadataRoute.Sitemap = services.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...serviceUrls,
  ];
}
