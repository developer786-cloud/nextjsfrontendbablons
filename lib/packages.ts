export type TravelPackage = {
  _id?: string;
  slug?: string;
  title?: string;
  name?: string;
  shortDescription?: string;
  description?: string;
  featuredImage?: { url?: string } | string;
  images?: Array<{ url?: string }>;
  seo?: { metaTitle?: string; metaDescription?: string };
  status?: string;
  pricing?: { basePrice?: number; pricePerPerson?: number; currency?: string };
  faqs?: Array<{ question?: string; answer?: string }>;
};

export type ContentRecord = Record<string, unknown> & {
  _id?: string;
  slug?: string;
  title?: string;
  name?: string;
  summary?: string;
  shortDescription?: string;
  description?: string;
  content?: string;
  featuredImage?: { url?: string } | string;
  thumbnail?: { url?: string } | string;
  image?: { url?: string } | string;
  images?: Array<{ url?: string }>;
  seo?: { metaTitle?: string; metaDescription?: string };
  status?: string;
  isPublished?: boolean;
  isActive?: boolean;
  updatedAt?: string;
  publishedAt?: string;
  createdAt?: string;
};

type ApiResponse<T> = { success?: boolean; data?: T };

export const API_BASE_URL = (
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000"
).replace(/\/+$/, "").replace(/\/api\/v1$/, "");

function apiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}

export function apiEndpoint(path: string): string {
  return apiUrl(path);
}

export async function getPackage(slug: string): Promise<TravelPackage | null> {
  const response = await fetch(apiUrl(`/api/v1/packages/${encodeURIComponent(slug)}`), {
    next: { revalidate: 3600 },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Package request failed (${response.status})`);

  const result = (await response.json()) as ApiResponse<TravelPackage | { item?: TravelPackage; package?: TravelPackage }>;
  const payload = result.data;
  if (!payload) return null;
  const wrapped = payload as { item?: TravelPackage; package?: TravelPackage };
  if (wrapped.item || wrapped.package) return wrapped.item || wrapped.package || null;
  return payload as TravelPackage;
}

export async function getPackages(): Promise<TravelPackage[]> {
  try {
    const response = await fetch(apiUrl("/api/v1/packages?limit=100"), {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      console.error(`Packages request failed (${response.status})`);
      return [];
    }

    const result = (await response.json()) as ApiResponse<{ packages?: TravelPackage[]; items?: TravelPackage[] }>;
    return result.data?.packages || result.data?.items || [];
  } catch (error) {
    console.error("Packages API is unavailable:", error);
    return [];
  }
}

export async function getRecords(path: string): Promise<ContentRecord[]> {
  try {
    const response = await fetch(apiUrl(path), { next: { revalidate: 3600 } });
    if (!response.ok) {
      console.error(`Content request failed (${response.status}): ${path}`);
      return [];
    }
    const result = (await response.json()) as ApiResponse<unknown>;
    const data = result.data;
    if (Array.isArray(data)) return data as ContentRecord[];
    if (!data || typeof data !== "object") return [];
    const object = data as Record<string, unknown>;
    for (const key of ["items", "packages", "destinations", "countries", "blogs", "news", "articles"]) {
      if (Array.isArray(object[key])) return object[key] as ContentRecord[];
    }
    if (Array.isArray(object.data)) return object.data as ContentRecord[];
    return [];
  } catch (error) {
    console.error(`Content API is unavailable for ${path}:`, error);
    return [];
  }
}

export async function getRecord(path: string): Promise<ContentRecord | null> {
  const response = await fetch(apiUrl(path), { next: { revalidate: 3600 } });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Content request failed (${response.status})`);
  const result = (await response.json()) as ApiResponse<unknown>;
  const data = result.data;
  if (Array.isArray(data)) return (data[0] as ContentRecord | undefined) || null;
  if (!data || typeof data !== "object") return null;
  const object = data as Record<string, unknown>;
  for (const key of ["item", "package", "destination", "blog", "news", "article"]) {
    if (object[key] && typeof object[key] === "object") return object[key] as ContentRecord;
  }
  return data as ContentRecord;
}

export function packageImage(item: TravelPackage): string | undefined {
  if (typeof item.featuredImage === "string") return item.featuredImage;
  return item.featuredImage?.url || item.images?.find((image) => image.url)?.url;
}

export function recordTitle(item: ContentRecord): string {
  return item.seo?.metaTitle || item.title || item.name || "Bablons Travel";
}

export function recordDescription(item: ContentRecord): string {
  const value = item.seo?.metaDescription || item.summary || item.shortDescription || item.description || "";
  return String(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 310);
}

export function recordImage(item: ContentRecord): string | undefined {
  for (const candidate of [item.featuredImage, item.thumbnail, item.image]) {
    if (typeof candidate === "string") return candidate;
    if (candidate && typeof candidate === "object" && "url" in candidate && typeof candidate.url === "string") return candidate.url;
  }
  return item.images?.find((image) => image.url)?.url;
}

export function packageDescription(item: TravelPackage): string {
  const value = item.seo?.metaDescription || item.shortDescription || item.description || "";
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 310);
}
