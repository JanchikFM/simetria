import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/directions-DtgV8lO4.js
function asLang(value) {
	return value === "en" ? "en" : "ru";
}
function coord(value, min, max) {
	if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) throw new Error("bad coord");
	return value;
}
function fail(lang) {
	return lang === "ru" ? "По дорогам туда не доехать. Выберите точку на суше." : "No drivable route there. Pick a point on land.";
}
var searchPlaces_createServerFn_handler = createServerRpc({
	id: "630d3c7e99c3788e604e2fec867e95044d6fbbd73a8d42f7a28f13682056eb33",
	name: "searchPlaces",
	filename: "src/lib/directions.ts"
}, (opts) => searchPlaces.__executeServer(opts));
var searchPlaces = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input.query !== "string") throw new Error("bad query");
	const query = input.query.trim().slice(0, 120);
	if (query.length < 2) throw new Error("short query");
	return {
		query,
		lang: asLang(input.lang)
	};
}).handler(searchPlaces_createServerFn_handler, async ({ data }) => {
	const url = new URL("https://nominatim.openstreetmap.org/search");
	url.searchParams.set("q", data.query);
	url.searchParams.set("format", "jsonv2");
	url.searchParams.set("limit", "6");
	url.searchParams.set("accept-language", data.lang);
	try {
		const res = await fetch(url, {
			signal: AbortSignal.timeout(12e3),
			headers: {
				Accept: "application/json",
				"User-Agent": "SimetriaNav/1.0 (cartoon navigator)"
			}
		});
		if (!res.ok) return {
			ok: false,
			error: data.lang === "ru" ? "Поиск мест не ответил." : "Place search didn’t answer."
		};
		const body = await res.json();
		const places = [];
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
				center: [lng, lat]
			});
		}
		return {
			ok: true,
			places
		};
	} catch {
		return {
			ok: false,
			error: data.lang === "ru" ? "Поиск мест не ответил." : "Place search didn’t answer."
		};
	}
});
var fetchRoute_createServerFn_handler = createServerRpc({
	id: "47d2df0c56be44e930c150af48785538d1f25050d2d00afab7da0c9858ba6f89",
	name: "fetchRoute",
	filename: "src/lib/directions.ts"
}, (opts) => fetchRoute.__executeServer(opts));
var fetchRoute = createServerFn({ method: "POST" }).validator((input) => {
	if (!input) throw new Error("bad route");
	return {
		fromLng: coord(input.fromLng, -180, 180),
		fromLat: coord(input.fromLat, -85, 85),
		toLng: coord(input.toLng, -180, 180),
		toLat: coord(input.toLat, -85, 85),
		lang: asLang(input.lang)
	};
}).handler(fetchRoute_createServerFn_handler, async ({ data }) => {
	const url = `https://router.project-osrm.org/route/v1/driving/${`${data.fromLng},${data.fromLat};${data.toLng},${data.toLat}`}?overview=full&geometries=geojson&steps=true`;
	try {
		const res = await fetch(url, { signal: AbortSignal.timeout(12e3) });
		if (!res.ok) return {
			ok: false,
			error: fail(data.lang)
		};
		const body = await res.json();
		const route = body.routes?.[0];
		const coords = route?.geometry?.coordinates ?? [];
		if (body.code !== "Ok" || !route || coords.length < 2) return {
			ok: false,
			error: fail(data.lang)
		};
		const steps = [];
		for (const step of route.legs?.[0]?.steps ?? []) {
			const location = step.maneuver?.location;
			if (!location || location.length < 2) continue;
			steps.push({
				distance: typeof step.distance === "number" ? step.distance : 0,
				name: step.name ?? "",
				type: step.maneuver?.type ?? "continue",
				modifier: step.maneuver?.modifier ?? "straight",
				location: [location[0], location[1]]
			});
		}
		return {
			ok: true,
			route: {
				distance: route.distance,
				duration: route.duration,
				coords,
				steps
			}
		};
	} catch {
		return {
			ok: false,
			error: fail(data.lang)
		};
	}
});
//#endregion
export { fetchRoute_createServerFn_handler, searchPlaces_createServerFn_handler };
