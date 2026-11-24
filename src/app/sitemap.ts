import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const showcases = ["restaurant", "clinic", "shop", "realestate", "hotel", "fitness"];
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/demo`, changeFrequency: "monthly", priority: 0.7 },
    ...showcases.map(slug => ({ url: `${site.url}/showcase/${slug}/index.html`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
