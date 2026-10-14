import { createServerFn } from "@tanstack/react-start";
import type { LngLat } from "@/lib/geo";

export type PlaceHit = {
  id: string;
  name: string;
  label: string;
  center: LngLat;
};

export type RouteStep = {
  distance: number;
  name: string;
  type: string;
  modifier: string;
  location: LngLat;
};

export type DriveRoute = {
  distance: number;
  duration: number;
  coords: LngLat[];
  steps: RouteStep[];
};

type Lang = "ru" | "en";

function asLang(value: unknown): Lang {
  return value === "en" ? "en" : "ru";
}

function coord(value: unknown, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) {
    throw new Error("bad coord");
  }
  return value;
}

function fail(lang: Lang): string {
  return lang === "ru"
    ? "По дорогам туда не доехать. Выберите точку на суше."
    : "No drivable route there. Pick a point on land.";
}

export const searchPlaces = createServerFn({ method: "POST" })
  .validator((input: { query: string; lang?: string }) => {
    if (!input || typeof input.query !== "string") throw new Error("bad query");
    const query = input.query.trim().slice(0, 120);
    if (query.length < 2) throw new Error("short query");
    return { query, lang: asLang(input.lang) };
  })
  .handler(async ({ data }): Promise<{ ok: true; places: PlaceHit[] } | { ok: false; error: string }> => {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", data.query);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "6");
    url.searchParams.set("accept-language", data.lang);
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(12000),
        headers: {
          Accept: "application/json",
          "User-Agent": "SimetriaNav/1.0 (cartoon navigator)",
        },
      });
      if (!res.ok) {
        return {
          ok: false,
          error: data.lang === "ru" ? "Поиск мест не ответил." : "Place search didn’t answer.",
        };
      }
      const body = (await res.json()) as {
        place_id?: number;
        name?: string;
        display_name?: string;
        lat?: string;
        lon?: string;
      }[];
      const places: PlaceHit[] = [];
      for (const hit of body) {
        const lat = Number(hit.lat);
        const lng = Number(hit.lon);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
        const label = hit.display_name ?? hit.name ?? "";
        const name = hit.name || label.split(",")[0] || label;
        if (!name) continue;
        places.push({
          id: String(hit.place_id ?? `${lng},${lat}`),
          name,
          label,
          center: [lng, lat],
        });
      }
      return { ok: true, places };
    } catch {
      return {
        ok: false,
        error: data.lang === "ru" ? "Поиск мест не ответил." : "Place search didn’t answer.",
      };
    }
  });

export const fetchRoute = createServerFn({ method: "POST" })
  .validator((input: { fromLng: number; fromLat: number; toLng: number; toLat: number; lang?: string }) => {
    if (!input) throw new Error("bad route");
    return {
      fromLng: coord(input.fromLng, -180, 180),
      fromLat: coord(input.fromLat, -85, 85),
      toLng: coord(input.toLng, -180, 180),
      toLat: coord(input.toLat, -85, 85),
      lang: asLang(input.lang),
    };
  })
  .handler(async ({ data }): Promise<{ ok: true; route: DriveRoute } | { ok: false; error: string }> => {
    const path = `${data.fromLng},${data.fromLat};${data.toLng},${data.toLat}`;
    const url = `https://router.project-osrm.org/route/v1/driving/${path}?overview=full&geometries=geojson&steps=true`;
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
      if (!res.ok) return { ok: false, error: fail(data.lang) };
      const body = (await res.json()) as {
        code?: string;
        routes?: {
          distance: number;
          duration: number;
          geometry?: { coordinates?: LngLat[] };
          legs?: {
            steps?: {
              distance?: number;
              name?: string;
              maneuver?: { type?: string; modifier?: string; location?: LngLat };
            }[];
          }[];
        }[];
      };
      const route = body.routes?.[0];
      const coords = route?.geometry?.coordinates ?? [];
      if (body.code !== "Ok" || !route || coords.length < 2) return { ok: false, error: fail(data.lang) };
      const steps: RouteStep[] = [];
      for (const step of route.legs?.[0]?.steps ?? []) {
        const location = step.maneuver?.location;
        if (!location || location.length < 2) continue;
        steps.push({
          distance: typeof step.distance === "number" ? step.distance : 0,
          name: step.name ?? "",
          type: step.maneuver?.type ?? "continue",
          modifier: step.maneuver?.modifier ?? "straight",
          location: [location[0], location[1]],
        });
      }
      return {
        ok: true,
        route: {
          distance: route.distance,
          duration: route.duration,
          coords,
          steps,
        },
      };
    } catch {
      return { ok: false, error: fail(data.lang) };
    }
  });
