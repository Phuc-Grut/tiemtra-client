// src/services/provinceApi.ts
export interface Province {
  code: number;
  name: string;
}
export interface District {
  code: number;
  name: string;
  province_code: number;
}
export interface Ward {
  code: number;
  name: string;
  district_code: number;
}

// Simple in-memory cache để hạn chế gọi lặp
const cache = new Map<string, any>();
async function getJSON<T>(url: string): Promise<T> {
  if (cache.has(url)) return cache.get(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  cache.set(url, data);
  return data;
}

export async function fetchProvinces(): Promise<Province[]> {
  // Trả về danh sách tỉnh
  return getJSON<Province[]>("https://provinces.open-api.vn/api/p/");
}

export async function fetchDistricts(
  provinceCode: number
): Promise<District[]> {
  return getJSON<District[]>(
    `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
  ).then((p: any) => p.districts as District[]);
}

export async function fetchWards(districtCode: number): Promise<Ward[]> {
  return getJSON<Ward[]>(
    `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
  ).then((d: any) => d.wards as Ward[]);
}
