import type { MetadataRoute } from "next";

const BASE = "https://jupaficonsultores.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-05-30");
  const routes = ["", "/privacidad", "/terminos", "/datos", "/marca"];
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.5,
  }));
}
