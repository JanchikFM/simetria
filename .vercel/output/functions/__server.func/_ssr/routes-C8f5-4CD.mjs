import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { C as setStroke, D as touchMeta, E as strokeColor, S as setPin, T as setVisible, _ as sameLook, a as PRESETS, b as setGround, c as STYLE_STORAGE_KEY, d as labelInk, f as matchingPreset, g as pretty, h as parseCloudStyle, i as PLACES, l as fillColor, m as normHex, n as MORE_CONTROLS, o as PRIMARY_CONTROLS, r as NON_STRELSON, s as SIGNAL_NIGHT, u as geometryVisible, v as setBorderColor, w as setVariant, x as setLabelColor, y as setFill } from "./cloud-style-BIT75FBC.mjs";
import { a as LocateFixed, c as Download, i as PenLine, l as Copy, o as Eye, r as Redo2, s as EyeOff, t as Undo2, u as Check } from "../_libs/lucide-react.mjs";
import { a as instruction, i as formatDuration, n as LangToggle, o as useI18n, r as formatDistance } from "./router-zsURi0A_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C8f5-4CD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PIN_SOURCE = "meridian-pins";
var PIN_LAYER = "meridian-pins";
var PIN_LABELS = "meridian-pin-labels";
function colorLayer(map, id, color) {
	const layer = map.getLayer(id);
	if (!layer) return;
	const prop = layer.type === "fill" ? "fill-color" : layer.type === "line" ? "line-color" : layer.type === "fill-extrusion" ? "fill-extrusion-color" : layer.type === "background" ? "background-color" : null;
	if (!prop) return;
	try {
		map.setPaintProperty(id, prop, color);
	} catch {}
}
function opacity(map, id, value) {
	const layer = map.getLayer(id);
	if (!layer) return;
	const prop = layer.type === "fill" ? "fill-opacity" : layer.type === "line" ? "line-opacity" : layer.type === "fill-extrusion" ? "fill-extrusion-opacity" : null;
	if (!prop) return;
	try {
		map.setPaintProperty(id, prop, value);
	} catch {}
}
function show(map, id, on) {
	if (!map.getLayer(id)) return;
	try {
		map.setLayoutProperty(id, "visibility", on ? "visible" : "none");
	} catch {}
}
function paintText(map, id, text, halo, on) {
	show(map, id, on);
	if (!on) return;
	if (text) try {
		map.setPaintProperty(id, "text-color", text);
	} catch {}
	if (halo) {
		try {
			map.setPaintProperty(id, "text-halo-color", halo);
		} catch {}
		try {
			map.setPaintProperty(id, "text-halo-width", 1.15);
		} catch {}
	}
}
function classifyRoad(id) {
	if (!/^(road|tunnel|bridge)_/.test(id)) return null;
	if (id.includes("one_way") || id.includes("shield") || id.includes("arrow") || id.includes("area")) return null;
	const casing = id.includes("casing");
	if (id.includes("rail") || id.includes("transit")) return {
		kind: "rail",
		casing
	};
	if (id.includes("path") || id.includes("pedestrian")) return {
		kind: "path",
		casing
	};
	if (id.includes("link")) return {
		kind: "ramp",
		casing
	};
	if (id.includes("motorway")) return {
		kind: "highway",
		casing
	};
	if (id.includes("trunk") || id.includes("primary") || id.includes("secondary") || id.includes("tertiary")) return {
		kind: "arterial",
		casing
	};
	if (id.includes("minor") || id.includes("street") || id.includes("service") || id.includes("track")) return {
		kind: "local",
		casing
	};
	return null;
}
var ROAD_FEATURE = {
	highway: "infrastructure.roadNetwork.road.highway",
	arterial: "infrastructure.roadNetwork.road.arterial",
	local: "infrastructure.roadNetwork.road.local",
	path: "infrastructure.roadNetwork.road.local",
	ramp: "infrastructure.roadNetwork.ramp",
	rail: "infrastructure.roadNetwork.road"
};
function paintFill(map, id, featureId, doc, alpha) {
	const color = fillColor(doc, featureId);
	show(map, id, geometryVisible(doc, featureId));
	if (color) colorLayer(map, id, color);
	if (alpha !== void 0) opacity(map, id, alpha);
}
function cartoonBlocks(map) {
	const layer = map.getLayer("building-3d");
	if (!layer || layer.type !== "fill-extrusion") return;
	try {
		map.setPaintProperty("building-3d", "fill-extrusion-height", [
			"*",
			[
				"coalesce",
				["get", "render_height"],
				["get", "height"],
				16
			],
			1.55
		]);
	} catch {}
}
function applyCloudStyle(map, doc) {
	const land = fillColor(doc, "natural.land") ?? doc.backgroundColor;
	colorLayer(map, "background", land);
	show(map, "natural_earth", false);
	show(map, "road_area_pattern", false);
	show(map, "road_one_way_arrow", false);
	show(map, "road_one_way_arrow_opposite", false);
	paintFill(map, "water", "natural.water", doc, 1);
	for (const id of [
		"waterway_river",
		"waterway_other",
		"waterway_tunnel"
	]) paintFill(map, id, "natural.water", doc, 1);
	paintFill(map, "landcover_wood", "natural.land.landCover.forest", doc, 1);
	paintFill(map, "landcover_grass", "natural.land.landCover.crops", doc, 1);
	paintFill(map, "landcover_wetland", "natural.land.landCover.shrub", doc, 1);
	paintFill(map, "landcover_sand", "natural.land.landCover.sand", doc, 1);
	paintFill(map, "landcover_ice", "natural.land.landCover.ice", doc, 1);
	paintFill(map, "park", "pointOfInterest.recreation.park", doc, .95);
	const park = fillColor(doc, "pointOfInterest.recreation.park");
	if (park) colorLayer(map, "park_outline", park);
	show(map, "park_outline", geometryVisible(doc, "pointOfInterest.recreation.park"));
	paintFill(map, "landuse_residential", "infrastructure.urbanArea", doc, .86);
	paintFill(map, "landuse_school", "infrastructure.urbanArea", doc, .9);
	paintFill(map, "landuse_pitch", "pointOfInterest.recreation.sportsField", doc, 1);
	paintFill(map, "landuse_track", "pointOfInterest.recreation.sportsField", doc, 1);
	paintFill(map, "landuse_cemetery", "pointOfInterest.other.cemetery", doc, 1);
	paintFill(map, "landuse_hospital", "pointOfInterest.emergency.hospital", doc, 1);
	paintFill(map, "aeroway_fill", "pointOfInterest.transit.airport", doc, 1);
	paintFill(map, "aeroway_runway", "infrastructure.roadNetwork.road.highway", doc, 1);
	paintFill(map, "aeroway_taxiway", "infrastructure.roadNetwork.road.local", doc, 1);
	paintFill(map, "building", "infrastructure.building", doc, 1);
	paintFill(map, "building-3d", "infrastructure.building", doc, 1);
	cartoonBlocks(map);
	const layers = map.getStyle()?.layers ?? [];
	for (const layer of layers) {
		if (layer.id.startsWith("meridian-")) continue;
		const kind = classifyRoad(layer.id);
		if (!kind) continue;
		const featureId = ROAD_FEATURE[kind.kind];
		const on = geometryVisible(doc, featureId);
		show(map, layer.id, on);
		if (!on) continue;
		if (kind.casing) {
			const stroke = strokeColor(doc, featureId) ?? land;
			colorLayer(map, layer.id, stroke);
		} else {
			const fill = fillColor(doc, featureId) ?? fillColor(doc, "infrastructure.roadNetwork.road") ?? land;
			colorLayer(map, layer.id, fill);
		}
	}
	const border = ruleColor(doc);
	const borderOn = geometryVisible(doc, "political.border");
	for (const id of [
		"boundary_2",
		"boundary_3",
		"boundary_disputed"
	]) {
		show(map, id, borderOn);
		if (border) colorLayer(map, id, border);
		opacity(map, id, .9);
	}
	const waterInk = labelInk(doc, "natural.water");
	const waterOn = geometryVisible(doc, "natural.water") && waterInk.visible;
	for (const id of [
		"waterway_line_label",
		"water_name_point_label",
		"water_name_line_label"
	]) paintText(map, id, waterInk.text, waterInk.stroke ?? doc.backgroundColor, waterOn);
	const placeInk = labelInk(doc, "infrastructure.building");
	for (const id of [
		"label_other",
		"label_village",
		"label_town",
		"label_state",
		"label_city",
		"label_city_capital",
		"label_country_3",
		"label_country_2",
		"label_country_1"
	]) paintText(map, id, placeInk.text ?? "#e2e8f0", placeInk.stroke ?? doc.backgroundColor, true);
	const highwayInk = labelInk(doc, "infrastructure.roadNetwork.road.highway");
	const highwayOn = geometryVisible(doc, "infrastructure.roadNetwork.road.highway") && highwayInk.visible;
	for (const id of [
		"highway-name-major",
		"highway-shield-non-us",
		"highway-shield-us-interstate",
		"road_shield_us"
	]) paintText(map, id, highwayInk.text, highwayInk.stroke ?? doc.backgroundColor, highwayOn);
	const localInk = labelInk(doc, "infrastructure.roadNetwork.road.local");
	const localOn = geometryVisible(doc, "infrastructure.roadNetwork.road.local") && localInk.visible;
	for (const id of ["highway-name-minor", "highway-name-path"]) paintText(map, id, localInk.text, localInk.stroke ?? doc.backgroundColor, localOn);
	const poi = labelInk(doc, "pointOfInterest");
	const poiOn = geometryVisible(doc, "pointOfInterest") && poi.visible;
	for (const id of [
		"poi_r1",
		"poi_r7",
		"poi_r20",
		"poi_transit"
	]) {
		paintText(map, id, poi.text, poi.stroke ?? doc.backgroundColor, poiOn);
		if (map.getLayer(id)) try {
			map.setPaintProperty(id, "icon-opacity", 0);
		} catch {}
	}
	const air = labelInk(doc, "pointOfInterest");
	paintText(map, "airport", air.text, air.stroke ?? doc.backgroundColor, true);
}
function ruleColor(doc) {
	return doc.styles.find((item) => item.id === "political.border")?.geometry?.color;
}
function syncPins(map, doc, center) {
	const poi = labelInk(doc, "pointOfInterest");
	const pinsOn = geometryVisible(doc, "pointOfInterest") && poi.visible;
	const land = fillColor(doc, "natural.land") ?? doc.backgroundColor;
	const [lng, lat] = center;
	const data = {
		type: "FeatureCollection",
		features: [
			{
				name: "Market",
				coordinates: [lng + .006, lat + .003]
			},
			{
				name: "Station",
				coordinates: [lng - .007, lat + .001]
			},
			{
				name: "Landing",
				coordinates: [lng + .001, lat - .006]
			}
		].map((pin) => ({
			type: "Feature",
			properties: { name: pin.name },
			geometry: {
				type: "Point",
				coordinates: pin.coordinates
			}
		}))
	};
	if (!map.getSource(PIN_SOURCE)) {
		map.addSource(PIN_SOURCE, {
			type: "geojson",
			data
		});
		map.addLayer({
			id: PIN_LAYER,
			type: "circle",
			source: PIN_SOURCE,
			paint: {
				"circle-radius": 6,
				"circle-color": poi.pin ?? "#f43f5e",
				"circle-stroke-width": 2,
				"circle-stroke-color": land
			}
		});
		map.addLayer({
			id: PIN_LABELS,
			type: "symbol",
			source: PIN_SOURCE,
			layout: {
				"text-field": ["get", "name"],
				"text-font": ["Noto Sans Regular"],
				"text-size": 12,
				"text-offset": [0, .9],
				"text-anchor": "top"
			},
			paint: {
				"text-color": poi.text ?? "#f8fafc",
				"text-halo-color": poi.stroke ?? doc.backgroundColor,
				"text-halo-width": 1.2
			}
		});
	} else map.getSource(PIN_SOURCE).setData(data);
	show(map, PIN_LAYER, pinsOn);
	show(map, PIN_LABELS, pinsOn);
	try {
		map.setPaintProperty(PIN_LAYER, "circle-color", poi.pin ?? "#f43f5e");
		map.setPaintProperty(PIN_LAYER, "circle-stroke-color", land);
		map.setPaintProperty(PIN_LABELS, "text-color", poi.text ?? "#f8fafc");
		map.setPaintProperty(PIN_LABELS, "text-halo-color", poi.stroke ?? doc.backgroundColor);
	} catch {}
}
var STYLE_URL$1 = "https://tiles.openfreemap.org/styles/liberty";
var ROUTE_SOURCE = "meridian-route";
var ROUTE_CASING = "meridian-route-casing";
var ROUTE_LINE = "meridian-route-line";
function markerElement(className, src, title) {
	const el = document.createElement("div");
	el.className = className;
	el.title = title;
	const img = document.createElement("img");
	img.src = src;
	img.alt = "";
	el.appendChild(img);
	return el;
}
function DriveMap({ doc, puck, follow, headingUp, destination, routeCoords, frame, focusToken, focusZoom, onUserMove }) {
	const { copy } = useI18n();
	const containerRef = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const puckMarker = (0, import_react.useRef)(null);
	const destMarker = (0, import_react.useRef)(null);
	const puckRef = (0, import_react.useRef)(puck);
	const docRef = (0, import_react.useRef)(doc);
	const followRef = (0, import_react.useRef)(follow);
	const headingRef = (0, import_react.useRef)(headingUp);
	const moveRef = (0, import_react.useRef)(onUserMove);
	const frameApplied = (0, import_react.useRef)(-1);
	const focusApplied = (0, import_react.useRef)(-1);
	const [attempt, setAttempt] = (0, import_react.useState)(0);
	const [status, setStatus] = (0, import_react.useState)("loading");
	puckRef.current = puck;
	docRef.current = doc;
	followRef.current = follow;
	headingRef.current = headingUp;
	moveRef.current = onUserMove;
	(0, import_react.useEffect)(() => {
		if (!containerRef.current) return;
		let dead = false;
		let map = null;
		setStatus("loading");
		(async () => {
			try {
				const maplibregl = await import("../_libs/maplibre-gl.mjs").then((n) => n.t);
				const worker = await import("./maplibre-gl-worker-BS08EmGH.mjs");
				maplibregl.setWorkerUrl(worker.default);
				if (dead || !containerRef.current) return;
				const here = puckRef.current;
				map = new maplibregl.Map({
					container: containerRef.current,
					style: STYLE_URL$1,
					center: [here.lng, here.lat],
					zoom: 15.6,
					pitch: 52,
					bearing: 0,
					maxPitch: 68,
					attributionControl: { compact: true },
					fadeDuration: 0
				});
				map.on("dragstart", () => moveRef.current());
				map.on("rotatestart", (event) => {
					if (event.originalEvent) moveRef.current();
				});
				map.on("load", () => {
					if (dead || !map) return;
					applyCloudStyle(map, docRef.current);
					const puckEl = markerElement("drive-puck", "/drive/car.jpg", "");
					puckMarker.current = new maplibregl.Marker({
						element: puckEl,
						anchor: "center",
						rotationAlignment: "viewport"
					}).setLngLat([puckRef.current.lng, puckRef.current.lat]).addTo(map);
					mapRef.current = map;
					setStatus("ready");
				});
				map.on("error", (event) => {
					if (dead || !map || map.isStyleLoaded()) return;
					const message = event.error instanceof Error ? event.error.message : "";
					if (/style|ajax|fetch|sprite|glyph/i.test(message)) setStatus("error");
				});
			} catch {
				if (!dead) setStatus("error");
			}
		})();
		const failTimer = window.setTimeout(() => {
			if (!dead && !mapRef.current) setStatus("error");
		}, 12e3);
		return () => {
			dead = true;
			window.clearTimeout(failTimer);
			puckMarker.current?.remove();
			destMarker.current?.remove();
			puckMarker.current = null;
			destMarker.current = null;
			mapRef.current = null;
			map?.remove();
		};
	}, [attempt]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		if (!map || status !== "ready") return;
		applyCloudStyle(map, doc);
	}, [doc, status]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		if (!map || status !== "ready") return;
		if (routeCoords.length < 2) {
			if (map.getLayer(ROUTE_LINE)) {
				map.setLayoutProperty(ROUTE_LINE, "visibility", "none");
				map.setLayoutProperty(ROUTE_CASING, "visibility", "none");
			}
			return;
		}
		const color = fillColor(doc, "infrastructure.roadNetwork.road.highway") ?? "#00e5ff";
		const data = {
			type: "Feature",
			properties: {},
			geometry: {
				type: "LineString",
				coordinates: routeCoords
			}
		};
		if (!map.getSource(ROUTE_SOURCE)) {
			map.addSource(ROUTE_SOURCE, {
				type: "geojson",
				data
			});
			map.addLayer({
				id: ROUTE_CASING,
				type: "line",
				source: ROUTE_SOURCE,
				layout: {
					"line-cap": "round",
					"line-join": "round"
				},
				paint: {
					"line-color": doc.backgroundColor,
					"line-width": 9,
					"line-opacity": .9
				}
			});
			map.addLayer({
				id: ROUTE_LINE,
				type: "line",
				source: ROUTE_SOURCE,
				layout: {
					"line-cap": "round",
					"line-join": "round"
				},
				paint: {
					"line-color": color,
					"line-width": 4
				}
			});
		} else {
			map.getSource(ROUTE_SOURCE).setData(data);
			map.setPaintProperty(ROUTE_LINE, "line-color", color);
			map.setPaintProperty(ROUTE_CASING, "line-color", doc.backgroundColor);
		}
		const visible = routeCoords.length > 1 ? "visible" : "none";
		map.setLayoutProperty(ROUTE_LINE, "visibility", visible);
		map.setLayoutProperty(ROUTE_CASING, "visibility", visible);
	}, [
		doc,
		routeCoords,
		status
	]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		if (!map || status !== "ready") return;
		if (frameApplied.current === frame) return;
		frameApplied.current = frame;
		if (routeCoords.length < 2) return;
		let west = routeCoords[0][0];
		let east = west;
		let south = routeCoords[0][1];
		let north = south;
		for (const [lng, lat] of routeCoords) {
			west = Math.min(west, lng);
			east = Math.max(east, lng);
			south = Math.min(south, lat);
			north = Math.max(north, lat);
		}
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		map.fitBounds([[west, south], [east, north]], {
			padding: {
				top: 120,
				bottom: 280,
				left: 36,
				right: 56
			},
			pitch: 48,
			duration: reduce ? 0 : 900
		});
	}, [
		frame,
		routeCoords,
		status
	]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		if (!map || status !== "ready") return;
		if (focusApplied.current === focusToken) return;
		focusApplied.current = focusToken;
		if (focusToken === 0) return;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		map.flyTo({
			center: [puck.lng, puck.lat],
			zoom: focusZoom,
			pitch: 52,
			bearing: headingUp ? puck.heading : 0,
			essential: true,
			duration: reduce ? 0 : 1e3
		});
	}, [
		focusToken,
		focusZoom,
		headingUp,
		puck.heading,
		puck.lat,
		puck.lng,
		status
	]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		const marker = puckMarker.current;
		if (!map || !marker || status !== "ready") return;
		marker.setLngLat([puck.lng, puck.lat]);
		if (follow) map.jumpTo({
			center: [puck.lng, puck.lat],
			bearing: headingUp ? puck.heading : map.getBearing(),
			pitch: map.getPitch()
		});
		marker.setRotation(puck.heading - map.getBearing());
	}, [
		follow,
		headingUp,
		puck,
		status
	]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		if (!map || status !== "ready") return;
		let dead = false;
		(async () => {
			const maplibregl = await import("../_libs/maplibre-gl.mjs").then((n) => n.t);
			if (dead || mapRef.current !== map) return;
			destMarker.current?.remove();
			destMarker.current = null;
			if (!destination) return;
			const el = markerElement("drive-pin", "/drive/building.jpg", destination.name);
			destMarker.current = new maplibregl.Marker({
				element: el,
				anchor: "center"
			}).setLngLat([destination.lng, destination.lat]).addTo(map);
		})();
		return () => {
			dead = true;
		};
	}, [destination, status]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		const el = containerRef.current;
		if (!map || !el || status !== "ready") return;
		const observer = new ResizeObserver(() => map.resize());
		observer.observe(el);
		return () => observer.disconnect();
	}, [status]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "drive-map absolute inset-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: containerRef,
				className: "h-full w-full"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-36 right-3 z-10 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": copy.zoomIn,
					onClick: () => mapRef.current?.zoomIn(),
					className: "grid size-11 place-items-center rounded-full bg-panel text-lg text-paper",
					children: "+"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": copy.zoomOut,
					onClick: () => mapRef.current?.zoomOut(),
					className: "grid size-11 place-items-center rounded-full bg-panel text-lg text-paper",
					children: "−"
				})]
			}),
			status !== "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xl font-semibold tracking-tight text-paper",
						children: status === "error" ? copy.chartError : copy.chartLoading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xs text-sm text-pretty text-fog",
						children: status === "error" ? copy.chartErrorHint : copy.chartLoadingHint
					}),
					status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-1 h-11 rounded-full bg-paper px-4 text-sm font-medium text-ink",
						onClick: () => setAttempt((value) => value + 1),
						children: copy.tryAgain
					}) : null
				]
			}) : null
		]
	});
}
var STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";
function StyleMap({ doc, place }) {
	const { copy } = useI18n();
	const containerRef = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const docRef = (0, import_react.useRef)(doc);
	const placeRef = (0, import_react.useRef)(place);
	const skippedFly = (0, import_react.useRef)(false);
	const [attempt, setAttempt] = (0, import_react.useState)(0);
	const [status, setStatus] = (0, import_react.useState)("loading");
	docRef.current = doc;
	placeRef.current = place;
	(0, import_react.useEffect)(() => {
		if (!containerRef.current) return;
		let dead = false;
		let map = null;
		skippedFly.current = false;
		setStatus("loading");
		(async () => {
			try {
				const maplibregl = await import("../_libs/maplibre-gl.mjs").then((n) => n.t);
				const worker = await import("./maplibre-gl-worker-BS08EmGH.mjs");
				maplibregl.setWorkerUrl(worker.default);
				if (dead || !containerRef.current) return;
				map = new maplibregl.Map({
					container: containerRef.current,
					style: STYLE_URL,
					center: placeRef.current.center,
					zoom: placeRef.current.zoom,
					attributionControl: { compact: true },
					fadeDuration: 0
				});
				map.addControl(new maplibregl.NavigationControl({
					visualizePitch: true,
					showCompass: true
				}), "top-right");
				map.on("load", () => {
					if (dead || !map) return;
					applyCloudStyle(map, docRef.current);
					syncPins(map, docRef.current, placeRef.current.center);
					mapRef.current = map;
					setStatus("ready");
				});
				map.on("error", (event) => {
					if (dead || !map || map.isStyleLoaded()) return;
					const message = event.error instanceof Error ? event.error.message : "";
					if (/style|ajax|fetch|sprite|glyph/i.test(message)) setStatus("error");
				});
			} catch {
				if (!dead) setStatus("error");
			}
		})();
		const failTimer = window.setTimeout(() => {
			if (!dead && !mapRef.current) setStatus("error");
		}, 12e3);
		return () => {
			dead = true;
			window.clearTimeout(failTimer);
			mapRef.current = null;
			map?.remove();
		};
	}, [attempt]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		if (!map || status !== "ready") return;
		applyCloudStyle(map, doc);
		syncPins(map, doc, placeRef.current.center);
	}, [doc, status]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		if (!map || status !== "ready") return;
		if (!skippedFly.current) {
			skippedFly.current = true;
			return;
		}
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		map.flyTo({
			center: place.center,
			zoom: place.zoom,
			essential: true,
			duration: reduce ? 0 : 1100
		});
		const onEnd = () => syncPins(map, docRef.current, place.center);
		map.once("moveend", onEnd);
		return () => {
			map.off("moveend", onEnd);
		};
	}, [place, status]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		const el = containerRef.current;
		if (!map || !el || status !== "ready") return;
		const observer = new ResizeObserver(() => map.resize());
		observer.observe(el);
		return () => observer.disconnect();
	}, [status]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: containerRef,
			className: "h-full w-full"
		}), status !== "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink px-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl font-semibold tracking-tight text-paper",
					children: status === "error" ? copy.chartError : copy.chartLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xs text-sm text-pretty text-fog",
					children: status === "error" ? copy.chartErrorHint : copy.chartLoadingHint
				}),
				status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-1 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink",
					onClick: () => setAttempt((value) => value + 1),
					children: copy.tryAgain
				}) : null
			]
		}) : null]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var composeCloudStyle = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input.brief !== "string") throw new Error("Describe a mood first.");
	const brief = input.brief.trim();
	if (brief.length < 3) throw new Error("Describe a mood first.");
	if (brief.length > 500) throw new Error("Keep the brief under 500 characters.");
	return {
		brief,
		lang: input.lang === "en" ? "en" : "ru"
	};
}).handler(createSsrRpc("0f637e779cf5f0121aaf6aa56834c6d828b5f98624710137ac4d147dd9efa9fe"));
var STORAGE_KEY = STYLE_STORAGE_KEY;
function useStyleHistory(initial) {
	const [doc, setDoc] = (0, import_react.useState)(initial);
	const docRef = (0, import_react.useRef)(doc);
	docRef.current = doc;
	const past = (0, import_react.useRef)([]);
	const future = (0, import_react.useRef)([]);
	const gesture = (0, import_react.useRef)(null);
	const [, setEpoch] = (0, import_react.useState)(0);
	const refresh = () => setEpoch((value) => value + 1);
	return {
		doc,
		preview: (0, import_react.useCallback)((next) => {
			if (!gesture.current) gesture.current = docRef.current;
			setDoc(next);
		}, []),
		commit: (0, import_react.useCallback)((next) => {
			const base = gesture.current ?? docRef.current;
			gesture.current = null;
			if (sameLook(base, next)) {
				setDoc(next);
				return;
			}
			past.current = [...past.current.slice(-40), base];
			future.current = [];
			setDoc(touchMeta(next));
			refresh();
		}, []),
		replace: (0, import_react.useCallback)((next) => {
			const current = docRef.current;
			gesture.current = null;
			if (sameLook(current, next)) {
				setDoc(next);
				return;
			}
			past.current = [...past.current.slice(-40), current];
			future.current = [];
			setDoc(next);
			refresh();
		}, []),
		undo: (0, import_react.useCallback)(() => {
			const prev = past.current.pop();
			if (!prev) return;
			future.current.push(docRef.current);
			gesture.current = null;
			setDoc(prev);
			refresh();
		}, []),
		redo: (0, import_react.useCallback)(() => {
			const next = future.current.pop();
			if (!next) return;
			past.current.push(docRef.current);
			gesture.current = null;
			setDoc(next);
			refresh();
		}, []),
		hydrate: (0, import_react.useCallback)((next) => {
			past.current = [];
			future.current = [];
			gesture.current = null;
			setDoc(next);
			refresh();
		}, []),
		canUndo: past.current.length > 0,
		canRedo: future.current.length > 0
	};
}
function Swatch({ color, label, onPreview, onCommit }) {
	const safe = normHex(color) ?? "#000000";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "relative size-10 shrink-0 overflow-hidden rounded-lg border border-paper/20",
		style: { backgroundColor: safe },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "color",
			value: safe,
			"aria-label": label,
			className: "absolute inset-0 h-full w-full cursor-pointer opacity-0",
			onInput: (event) => onPreview(event.currentTarget.value),
			onChange: (event) => onCommit(event.currentTarget.value)
		})
	});
}
function controlHex(doc, control) {
	if (control.kind === "ground") return fillColor(doc, "natural.land") ?? doc.backgroundColor;
	if (control.kind === "border") return doc.styles.find((item) => item.id === "political.border")?.geometry?.color ?? "#38bdf8";
	if (control.pin && !fillColor(doc, control.featureId)) return labelInk(doc, control.featureId).pin ?? "#f43f5e";
	return fillColor(doc, control.featureId) ?? doc.backgroundColor;
}
function applyControl(doc, control, hex) {
	if (control.kind === "ground") return setGround(doc, hex);
	if (control.kind === "border") return setBorderColor(doc, hex);
	if (control.pin && !fillColor(doc, control.featureId)) return setPin(doc, control.featureId, hex);
	return setFill(doc, control.featureId, hex);
}
function PaletteRow({ doc, control, onPreview, onCommit }) {
	const { copy } = useI18n();
	const label = copy.feats[control.featureId] ?? control.label;
	const hex = controlHex(doc, control);
	const visible = control.kind === "ground" ? true : geometryVisible(doc, control.featureId);
	const casing = control.casing ? strokeColor(doc, control.featureId) ?? hex : void 0;
	const ink = control.text || control.pin ? labelInk(doc, control.featureId) : void 0;
	const showFill = !(control.pin && !fillColor(doc, control.featureId) && control.kind !== "border");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 border-b border-paper/10 py-2",
		children: [
			control.kind === "ground" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-10 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": visible ? `${copy.hide} ${label}` : `${copy.show} ${label}`,
				"aria-pressed": visible,
				className: "grid size-10 shrink-0 place-items-center rounded-lg text-fog transition-colors hover:bg-paper/5 hover:text-paper",
				onClick: () => onCommit(setVisible(doc, control.featureId, !visible)),
				children: visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm text-paper",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-fog uppercase",
					children: hex
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 gap-2",
				children: [
					showFill ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swatch, {
						color: hex,
						label: `${label} color`,
						onPreview: (value) => onPreview(applyControl(doc, control, value)),
						onCommit: (value) => onCommit(applyControl(doc, control, value))
					}) : null,
					control.pin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swatch, {
						color: ink?.pin ?? "#f43f5e",
						label: `${label} pin`,
						onPreview: (value) => onPreview(setPin(doc, control.featureId, value)),
						onCommit: (value) => onCommit(setPin(doc, control.featureId, value))
					}) : null,
					casing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swatch, {
						color: casing,
						label: `${label} casing`,
						onPreview: (value) => onPreview(setStroke(doc, control.featureId, value)),
						onCommit: (value) => onCommit(setStroke(doc, control.featureId, value))
					}) : null,
					control.text && ink ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swatch, {
						color: ink.text ?? "#e2e8f0",
						label: `${label} label`,
						onPreview: (value) => onPreview(setLabelColor(doc, control.featureId, value)),
						onCommit: (value) => onCommit(setLabelColor(doc, control.featureId, value))
					}) : null
				]
			})
		]
	});
}
function IconButton({ label, disabled, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		disabled,
		onClick,
		className: "grid size-10 place-items-center rounded-lg text-paper transition-colors hover:bg-paper/10 disabled:cursor-not-allowed disabled:text-fog/50",
		children
	});
}
function Studio({ onBack }) {
	const { lang, copy } = useI18n();
	const { doc, preview, commit, replace, undo, redo, hydrate, canUndo, canRedo } = useStyleHistory(NON_STRELSON);
	const [place, setPlace] = (0, import_react.useState)(PLACES[0]);
	const [brief, setBrief] = (0, import_react.useState)(copy.briefs[0]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [aiError, setAiError] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [jsonDraft, setJsonDraft] = (0, import_react.useState)(null);
	const [jsonError, setJsonError] = (0, import_react.useState)(null);
	const skipSave = (0, import_react.useRef)(true);
	const active = matchingPreset(doc);
	const plateName = active ? copy.presets[active.id]?.name ?? copy.customPlate : copy.customPlate;
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (!(event.metaKey || event.ctrlKey)) return;
			const target = event.target;
			if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
			if (event.key.toLowerCase() === "z" && !event.shiftKey) {
				event.preventDefault();
				undo();
			} else if (event.key.toLowerCase() === "z" || event.key.toLowerCase() === "y") {
				event.preventDefault();
				redo();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [undo, redo]);
	(0, import_react.useEffect)(() => {
		if (skipSave.current) {
			skipSave.current = false;
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const parsed = parseCloudStyle(raw);
			if (parsed && !sameLook(parsed, SIGNAL_NIGHT)) hydrate(parsed);
			else hydrate(NON_STRELSON);
			return;
		}
		localStorage.setItem(STORAGE_KEY, pretty(doc));
	}, [doc, hydrate]);
	(0, import_react.useEffect)(() => {
		setJsonDraft(null);
		setJsonError(null);
	}, [doc]);
	async function compose() {
		const text = brief.trim();
		if (text.length < 3 || busy) return;
		setBusy(true);
		setAiError(null);
		try {
			const result = await composeCloudStyle({ data: {
				brief: text,
				lang
			} });
			if (!result.ok) {
				setAiError(result.error);
				return;
			}
			replace(result.style);
		} catch (error) {
			setAiError(error instanceof Error ? error.message : copy.composeFail);
		} finally {
			setBusy(false);
		}
	}
	async function copyJson() {
		const text = pretty(doc);
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			setJsonDraft(text);
			setJsonError(copy.clipboardBlocked);
		}
	}
	function downloadJson() {
		const blob = new Blob([pretty(doc)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "simetria-map-style.json";
		link.click();
		URL.revokeObjectURL(url);
	}
	function applyDraft() {
		const parsed = parseCloudStyle(jsonDraft ?? pretty(doc));
		if (!parsed) {
			setJsonError(copy.jsonInvalid);
			return;
		}
		setJsonError(null);
		replace(parsed);
	}
	const highway = fillColor(doc, "infrastructure.roadNetwork.road.highway") ?? "#00e5ff";
	const arterial = fillColor(doc, "infrastructure.roadNetwork.road.arterial") ?? "#6366f1";
	const local = fillColor(doc, "infrastructure.roadNetwork.road.local") ?? "#1c2a44";
	const pin = labelInk(doc, "pointOfInterest").pin ?? "#f43f5e";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex h-dvh flex-col overflow-hidden bg-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex shrink-0 items-center gap-3 border-b border-paper/10 px-4 py-3 md:px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-3",
				children: [onBack ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onBack,
					className: "h-10 shrink-0 rounded-full border border-paper/15 px-3 text-sm text-paper",
					children: copy.backToRoad
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "truncate text-xl leading-none font-semibold tracking-tight text-paper",
						children: copy.appName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 truncate text-xs text-fog",
						children: plateName
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: copy.undo,
						disabled: !canUndo,
						onClick: undo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: copy.redo,
						disabled: !canRedo,
						onClick: redo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Redo2, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: downloadJson,
						className: "hidden h-10 items-center gap-2 rounded-full px-3 text-sm text-paper hover:bg-paper/10 sm:inline-flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), copy.download]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: copyJson,
						className: "inline-flex h-10 items-center gap-2 rounded-full bg-signal px-3 text-sm font-medium text-ink",
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden md:inline",
							children: copied ? copy.copied : copy.copyJson
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "studio-split",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative min-h-0 bg-ink md:order-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyleMap, {
						doc,
						place
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-x-0 top-0 z-10 flex p-3 pr-16",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-auto flex flex-wrap gap-2",
							children: PLACES.map((item) => {
								const on = item.id === place.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": on,
									onClick: () => setPlace(item),
									className: on ? "h-10 rounded-full bg-paper px-3 text-sm font-medium text-ink" : "h-10 rounded-full bg-ink/80 px-3 text-sm text-paper float-chip",
									children: copy.places[item.id] ?? item.name
								}, item.id);
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "float-legend pointer-events-none absolute bottom-8 left-3 z-10 flex items-center gap-3 rounded-full bg-ink/80 px-3 py-2 text-xs text-paper",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendDot, {
								color: highway,
								label: copy.feats["infrastructure.roadNetwork.road.highway"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendDot, {
								color: arterial,
								label: copy.feats["infrastructure.roadNetwork.road.arterial"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendDot, {
								color: local,
								label: copy.feats["infrastructure.roadNetwork.road.local"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendDot, {
								color: pin,
								label: copy.feats.pointOfInterest
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "flex min-h-0 flex-col border-paper/10 bg-panel md:order-1 md:border-r",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							htmlFor: "brief",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tracking-widest text-fog uppercase",
								children: copy.brief
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "brief",
								value: brief,
								maxLength: 500,
								rows: 3,
								onChange: (event) => setBrief(event.target.value),
								className: "mt-2 w-full resize-none rounded-xl border border-paper/15 bg-ink px-3 py-3 text-sm text-pretty text-paper outline-none placeholder:text-fog",
								placeholder: copy.briefPlaceholder
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: compose,
							disabled: busy || brief.trim().length < 3,
							className: "mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-paper text-sm font-medium text-ink disabled:cursor-not-allowed disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-4" }), busy ? copy.composing : copy.compose]
						}),
						aiError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-pretty text-fog",
							role: "alert",
							children: aiError
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-pretty text-fog",
							children: copy.composeHint
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex gap-2 overflow-x-auto pb-1",
							children: copy.briefs.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setBrief(item),
								className: "h-10 shrink-0 rounded-full border border-paper/15 px-3 text-xs text-fog hover:text-paper",
								children: item.split(",")[0]
							}, item))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-6 text-xs tracking-widest text-fog uppercase",
							children: copy.plates
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex gap-2 overflow-x-auto pb-1",
							children: PRESETS.map((preset) => {
								const on = active?.id === preset.id;
								const dots = [
									fillColor(preset.doc, "natural.land") ?? preset.doc.backgroundColor,
									fillColor(preset.doc, "natural.water") ?? preset.doc.backgroundColor,
									fillColor(preset.doc, "infrastructure.roadNetwork.road.highway") ?? "#ffffff",
									labelInk(preset.doc, "pointOfInterest").pin ?? "#f43f5e"
								];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"aria-pressed": on,
									onClick: () => replace(preset.doc),
									className: on ? "w-40 shrink-0 rounded-xl border border-signal bg-ink p-3 text-left" : "w-40 shrink-0 rounded-xl border border-paper/15 bg-ink p-3 text-left hover:border-paper/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex gap-1",
											children: dots.map((color, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-2 flex-1 rounded-full",
												style: { backgroundColor: color }
											}, `${preset.id}-${index}`))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-2 block text-sm font-semibold text-paper",
											children: copy.presets[preset.id]?.name ?? preset.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-0.5 block text-xs text-fog",
											children: copy.presets[preset.id]?.note ?? preset.note
										})
									]
								}, preset.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-6 text-xs tracking-widest text-fog uppercase",
							children: copy.base
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-2 gap-2",
							children: ["dark", "light"].map((variant) => {
								const on = doc.variant === variant;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": on,
									onClick: () => commit(setVariant(doc, variant)),
									className: on ? "h-10 rounded-full bg-paper text-sm font-medium text-ink" : "h-10 rounded-full border border-paper/15 text-sm text-fog",
									children: variant === "dark" ? copy.darkTemplate : copy.lightTemplate
								}, variant);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-6 text-xs tracking-widest text-fog uppercase",
							children: copy.palette
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1",
							children: PRIMARY_CONTROLS.map((control) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaletteRow, {
								doc,
								control,
								onPreview: preview,
								onCommit: commit
							}, control.featureId))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
								className: "cursor-pointer text-sm text-fog",
								children: copy.moreSurfaces
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1",
								children: MORE_CONTROLS.map((control) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaletteRow, {
									doc,
									control,
									onPreview: preview,
									onCommit: commit
								}, control.featureId))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "mt-5 mb-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
									className: "cursor-pointer text-sm text-fog",
									children: copy.cloudJson
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-pretty text-fog",
									children: copy.cloudHint
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: jsonDraft ?? pretty(doc),
									spellCheck: false,
									onChange: (event) => {
										setJsonDraft(event.target.value);
										setJsonError(null);
									},
									className: "mt-2 h-48 w-full resize-y rounded-xl border border-paper/15 bg-ink p-3 font-sans text-xs leading-relaxed text-paper outline-none"
								}),
								jsonError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-fog",
									role: "alert",
									children: jsonError
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: applyDraft,
										className: "h-10 rounded-full bg-paper px-4 text-sm font-medium text-ink",
										children: copy.applyJson
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: downloadJson,
										className: "inline-flex h-10 items-center gap-2 rounded-full border border-paper/15 px-4 text-sm text-paper sm:hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), copy.download]
									})]
								})
							]
						})
					]
				})
			})]
		})]
	});
}
function LegendDot({ color, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-2.5 rounded-full",
			style: { backgroundColor: color }
		}), label]
	});
}
function asLang(value) {
	return value === "en" ? "en" : "ru";
}
function coord(value, min, max) {
	if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) throw new Error("bad coord");
	return value;
}
var searchPlaces = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input.query !== "string") throw new Error("bad query");
	const query = input.query.trim().slice(0, 120);
	if (query.length < 2) throw new Error("short query");
	return {
		query,
		lang: asLang(input.lang)
	};
}).handler(createSsrRpc("630d3c7e99c3788e604e2fec867e95044d6fbbd73a8d42f7a28f13682056eb33"));
var fetchRoute = createServerFn({ method: "POST" }).validator((input) => {
	if (!input) throw new Error("bad route");
	return {
		fromLng: coord(input.fromLng, -180, 180),
		fromLat: coord(input.fromLat, -85, 85),
		toLng: coord(input.toLng, -180, 180),
		toLat: coord(input.toLat, -85, 85),
		lang: asLang(input.lang)
	};
}).handler(createSsrRpc("47d2df0c56be44e930c150af48785538d1f25050d2d00afab7da0c9858ba6f89"));
function haversine(a, b) {
	const R = 6371e3;
	const φ1 = a[1] * Math.PI / 180;
	const φ2 = b[1] * Math.PI / 180;
	const dφ = (b[1] - a[1]) * Math.PI / 180;
	const dλ = (b[0] - a[0]) * Math.PI / 180;
	const s = Math.sin(dφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(dλ / 2) ** 2;
	return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}
function bearing(a, b) {
	const φ1 = a[1] * Math.PI / 180;
	const φ2 = b[1] * Math.PI / 180;
	const dλ = (b[0] - a[0]) * Math.PI / 180;
	const y = Math.sin(dλ) * Math.cos(φ2);
	const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(dλ);
	return Math.atan2(y, x) * 180 / Math.PI;
}
function indexPath(coords) {
	const cum = [0];
	for (let i = 1; i < coords.length; i++) cum.push(cum[i - 1] + haversine(coords[i - 1], coords[i]));
	return {
		coords,
		cum,
		total: cum[cum.length - 1] ?? 0
	};
}
function pointAt(path, distance) {
	if (path.coords.length === 0) return {
		point: [0, 0],
		heading: 0
	};
	const d = Math.max(0, Math.min(distance, path.total));
	if (path.coords.length === 1 || d <= 0) {
		const next = path.coords[1] ?? path.coords[0];
		return {
			point: path.coords[0],
			heading: bearing(path.coords[0], next)
		};
	}
	let i = 1;
	while (i < path.cum.length && path.cum[i] < d) i++;
	if (i >= path.coords.length) {
		const a = path.coords[path.coords.length - 2];
		const b = path.coords[path.coords.length - 1];
		return {
			point: b,
			heading: bearing(a, b)
		};
	}
	const a = path.coords[i - 1];
	const b = path.coords[i];
	const span = path.cum[i] - path.cum[i - 1];
	const t = span === 0 ? 0 : (d - path.cum[i - 1]) / span;
	return {
		point: [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t],
		heading: bearing(a, b)
	};
}
var SAROV = {
	lng: 43.3239,
	lat: 54.9358
};
var AUSTRALIA = {
	lng: 151.2093,
	lat: -33.8688
};
var TRIP_KEY = "meridian-trip-m";
var EMPTY_ROUTE = [];
var SHORTCUTS = [
	{
		id: "cathedral",
		region: "sarov",
		lng: 43.3289276,
		lat: 54.9250893
	},
	{
		id: "prospect",
		region: "sarov",
		lng: 43.344,
		lat: 54.922
	},
	{
		id: "opera",
		region: "australia",
		lng: 151.2153,
		lat: -33.8568
	}
];
function regionOf(puck) {
	if (haversine([puck.lng, puck.lat], [SAROV.lng, SAROV.lat]) < 8e4) return "sarov";
	if (haversine([puck.lng, puck.lat], [AUSTRALIA.lng, AUSTRALIA.lat]) < 15e4) return "australia";
	return "other";
}
function readStyle() {
	try {
		const raw = localStorage.getItem(STYLE_STORAGE_KEY);
		if (!raw) return NON_STRELSON;
		const parsed = parseCloudStyle(raw);
		if (!parsed || sameLook(parsed, SIGNAL_NIGHT)) return NON_STRELSON;
		return parsed;
	} catch {
		return NON_STRELSON;
	}
}
function DriveApp() {
	const { lang, copy } = useI18n();
	const [doc, setDoc] = (0, import_react.useState)(NON_STRELSON);
	const [styleOpen, setStyleOpen] = (0, import_react.useState)(false);
	const [puck, setPuck] = (0, import_react.useState)({
		...SAROV,
		heading: 0
	});
	const [dest, setDest] = (0, import_react.useState)(null);
	const [route, setRoute] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [hits, setHits] = (0, import_react.useState)([]);
	const [searching, setSearching] = (0, import_react.useState)(false);
	const [routing, setRouting] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)(null);
	const [mode, setMode] = (0, import_react.useState)("idle");
	const [follow, setFollow] = (0, import_react.useState)(true);
	const [headingUp, setHeadingUp] = (0, import_react.useState)(true);
	const [speed, setSpeed] = (0, import_react.useState)(0);
	const [traveled, setTraveled] = (0, import_react.useState)(0);
	const [trip, setTrip] = (0, import_react.useState)(0);
	const [wild, setWild] = (0, import_react.useState)(6);
	const [frame, setFrame] = (0, import_react.useState)(0);
	const [focusToken, setFocusToken] = (0, import_react.useState)(0);
	const [focusZoom, setFocusZoom] = (0, import_react.useState)(15.6);
	const sim = (0, import_react.useRef)(null);
	const gpsId = (0, import_react.useRef)(null);
	const traveledRef = (0, import_react.useRef)(0);
	const headingRef = (0, import_react.useRef)(0);
	const tripRef = (0, import_react.useRef)(0);
	const puckRef = (0, import_react.useRef)(puck);
	puckRef.current = puck;
	tripRef.current = trip;
	(0, import_react.useEffect)(() => {
		setDoc(readStyle());
		const saved = Number(localStorage.getItem(TRIP_KEY));
		if (Number.isFinite(saved) && saved > 0) setTrip(saved);
	}, []);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			localStorage.setItem(TRIP_KEY, String(tripRef.current));
		}, 2e3);
		return () => window.clearInterval(id);
	}, []);
	function halt() {
		if (sim.current != null) cancelAnimationFrame(sim.current);
		sim.current = null;
		if (gpsId.current != null && navigator.geolocation) navigator.geolocation.clearWatch(gpsId.current);
		gpsId.current = null;
		setMode("idle");
		setSpeed(0);
	}
	(0, import_react.useEffect)(() => {
		return () => {
			if (sim.current != null) cancelAnimationFrame(sim.current);
			if (gpsId.current != null && navigator.geolocation) navigator.geolocation.clearWatch(gpsId.current);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const q = query.trim();
		if (q.length < 2) {
			setHits([]);
			setSearching(false);
			return;
		}
		let dead = false;
		setSearching(true);
		const timer = window.setTimeout(() => {
			searchPlaces({ data: {
				query: q,
				lang
			} }).then((result) => {
				if (dead) return;
				setHits(result.ok ? result.places : []);
				if (!result.ok) setNote(result.error);
			}).catch(() => {
				if (!dead) setHits([]);
			}).finally(() => {
				if (!dead) setSearching(false);
			});
		}, 280);
		return () => {
			dead = true;
			window.clearTimeout(timer);
		};
	}, [lang, query]);
	async function goTo(next, from = puckRef.current) {
		halt();
		setDest(next);
		setQuery("");
		setHits([]);
		setRouting(true);
		setNote(null);
		setRoute(null);
		setTraveled(0);
		traveledRef.current = 0;
		try {
			const result = await fetchRoute({ data: {
				fromLng: from.lng,
				fromLat: from.lat,
				toLng: next.lng,
				toLat: next.lat,
				lang
			} });
			if (!result.ok) {
				setRoute(null);
				setNote(result.error);
				return;
			}
			setRoute(result.route);
			setFollow(false);
			setFrame((value) => value + 1);
		} catch {
			setRoute(null);
			setNote(copy.routeFail);
		} finally {
			setRouting(false);
		}
	}
	function teleport(where) {
		halt();
		const spot = where === "sarov" ? SAROV : AUSTRALIA;
		const next = {
			lng: spot.lng,
			lat: spot.lat,
			heading: 0
		};
		puckRef.current = next;
		setPuck(next);
		setDest(null);
		setRoute(null);
		setTraveled(0);
		traveledRef.current = 0;
		setFollow(true);
		setFocusZoom(where === "sarov" ? 15.6 : 14.8);
		setFocusToken((value) => value + 1);
		setNote(null);
	}
	function startSim() {
		if (!route) return;
		halt();
		const path = indexPath(route.coords);
		if (path.total < 8) return;
		let distance = traveledRef.current >= path.total - 4 ? 0 : traveledRef.current;
		let speedKmh = 0;
		let last = performance.now();
		let bucket = 0;
		let prevHeading = headingRef.current;
		setMode("sim");
		setFollow(true);
		setHeadingUp(true);
		const step = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			const remaining = path.total - distance;
			speedKmh += ((remaining < 35 ? 0 : remaining < 160 ? 24 : 54) - speedKmh) * Math.min(1, dt * 1.5);
			distance += speedKmh / 3.6 * dt;
			const sample = pointAt(path, Math.min(distance, path.total));
			const turn = Math.min(180, Math.abs(((sample.heading - prevHeading) % 360 + 540) % 360 - 180));
			prevHeading = sample.heading;
			bucket += dt;
			if (bucket >= .12 || distance >= path.total) {
				bucket = 0;
				const delta = Math.max(0, distance - traveledRef.current);
				traveledRef.current = distance;
				headingRef.current = sample.heading;
				setTraveled(Math.min(distance, path.total));
				setTrip((meters) => meters + delta);
				setSpeed(distance >= path.total ? 0 : speedKmh);
				setWild(Math.round(Math.min(100, speedKmh / 110 * 72 + Math.min(28, turn))));
				const next = {
					lng: sample.point[0],
					lat: sample.point[1],
					heading: sample.heading
				};
				puckRef.current = next;
				setPuck(next);
			}
			if (distance >= path.total) {
				sim.current = null;
				setMode("idle");
				return;
			}
			sim.current = requestAnimationFrame(step);
		};
		sim.current = requestAnimationFrame(step);
	}
	function pickSeries(id) {
		const preset = PRESETS.find((item) => item.id === id);
		if (!preset) return;
		setDoc(preset.doc);
		localStorage.setItem(STYLE_STORAGE_KEY, pretty(preset.doc));
	}
	function locate() {
		if (!navigator.geolocation) {
			setNote(copy.gpsMissing);
			return;
		}
		halt();
		setNote(null);
		setMode("gps");
		setFollow(true);
		let last = null;
		gpsId.current = navigator.geolocation.watchPosition((pos) => {
			const nextPoint = [pos.coords.longitude, pos.coords.latitude];
			const moved = last ? haversine(last, nextPoint) : 0;
			if (last && moved > .4 && moved < 250) setTrip((meters) => meters + moved);
			last = nextPoint;
			const kmh = typeof pos.coords.speed === "number" && pos.coords.speed >= 0 ? pos.coords.speed * 3.6 : 0;
			const heading = typeof pos.coords.heading === "number" && pos.coords.heading >= 0 ? pos.coords.heading : headingRef.current;
			const turn = Math.min(180, Math.abs(((heading - headingRef.current) % 360 + 540) % 360 - 180));
			headingRef.current = heading;
			setSpeed(kmh);
			setWild(Math.round(Math.min(100, kmh / 110 * 72 + Math.min(28, turn))));
			const next = {
				lng: nextPoint[0],
				lat: nextPoint[1],
				heading
			};
			puckRef.current = next;
			setPuck(next);
			setMode("gps");
		}, () => {
			setNote(copy.gpsDenied);
			setMode("idle");
			gpsId.current = null;
		}, {
			enableHighAccuracy: true,
			maximumAge: 1500,
			timeout: 12e3
		});
	}
	function openStyle() {
		halt();
		setStyleOpen(true);
	}
	function closeStyle() {
		setDoc(readStyle());
		setStyleOpen(false);
	}
	if (styleOpen) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio, { onBack: closeStyle });
	const plate = matchingPreset(doc)?.id;
	const here = regionOf(puck);
	const shortcuts = SHORTCUTS.filter((item) => item.region === here);
	const step = route ? activeStep(route, traveled) : null;
	const remain = route ? Math.max(0, route.distance - traveled) : 0;
	const eta = route && route.distance > 0 ? route.duration * (remain / route.distance) : 0;
	const done = route != null && traveled >= route.distance - 8 && mode === "idle" && traveled > 0;
	const driveLabel = mode === "sim" ? copy.stop : done ? copy.again : copy.go;
	const shortcutName = (id) => id === "cathedral" ? copy.cathedral : id === "prospect" ? copy.prospect : copy.opera;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh overflow-hidden bg-ink text-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriveMap, {
				doc,
				puck,
				follow: follow && mode !== "idle",
				headingUp,
				destination: dest,
				routeCoords: route?.coords ?? EMPTY_ROUTE,
				frame,
				focusToken,
				focusZoom,
				onUserMove: () => setFollow(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col gap-2 p-3 pr-16 pt-[max(0.75rem,env(safe-area-inset-top))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "min-w-0 flex-1",
							onSubmit: (event) => {
								event.preventDefault();
								if (hits[0]) goTo({
									lng: hits[0].center[0],
									lat: hits[0].center[1],
									name: hits[0].name
								});
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "sr-only",
								htmlFor: "dest",
								children: copy.searchPlaceholder
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "dest",
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: copy.searchPlaceholder,
								className: "h-11 w-full rounded-full border border-paper/15 bg-ink px-4 text-sm text-paper outline-none placeholder:text-fog"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {})]
					}),
					query.trim().length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto overflow-hidden rounded-2xl border border-paper/15 bg-panel",
						children: [
							searching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-4 py-3 text-sm text-fog",
								children: copy.searching
							}) : null,
							!searching && hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-4 py-3 text-sm text-fog",
								children: copy.noHits
							}) : null,
							hits.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void goTo({
									lng: hit.center[0],
									lat: hit.center[1],
									name: hit.name
								}),
								className: "block w-full border-t border-paper/10 px-4 py-3 text-left first:border-t-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm font-medium text-paper",
									children: hit.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-xs text-fog",
									children: hit.label
								})]
							}, hit.id))
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto flex gap-2 overflow-x-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => teleport("sarov"),
								className: "h-10 shrink-0 rounded-full border border-paper/15 bg-ink px-3 text-sm text-paper",
								children: copy.home
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => teleport("australia"),
								className: "h-10 shrink-0 rounded-full border border-paper/15 bg-ink px-3 text-sm text-paper",
								children: copy.toAustralia
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": plate === "strelson",
								onClick: () => pickSeries("strelson"),
								className: plate === "strelson" ? "h-10 shrink-0 rounded-full bg-paper px-3 text-sm font-medium text-ink" : "h-10 shrink-0 rounded-full border border-paper/15 bg-ink px-3 text-sm text-paper",
								children: copy.seriesDay
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": plate === "strelson-night",
								onClick: () => pickSeries("strelson-night"),
								className: plate === "strelson-night" ? "h-10 shrink-0 rounded-full bg-paper px-3 text-sm font-medium text-ink" : "h-10 shrink-0 rounded-full border border-paper/15 bg-ink px-3 text-sm text-paper",
								children: copy.seriesNight
							}),
							shortcuts.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void goTo({
									lng: item.lng,
									lat: item.lat,
									name: shortcutName(item.id)
								}),
								className: "h-10 shrink-0 rounded-full border border-paper/15 bg-ink px-3 text-sm text-fog",
								children: shortcutName(item.id)
							}, item.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": headingUp,
								onClick: () => {
									setHeadingUp((value) => !value);
									setFollow(true);
								},
								className: "h-10 shrink-0 rounded-full border border-paper/15 bg-ink px-3 text-sm text-paper",
								children: headingUp ? copy.heading : copy.north
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "pointer-events-auto rounded-3xl bg-panel p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/drive/stele.jpg",
									alt: "",
									className: "size-11 shrink-0 rounded-2xl object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs tracking-wide text-fog uppercase",
											children: [
												copy.appName,
												" · ",
												copy.appTag
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 truncate text-lg font-semibold tracking-tight text-paper",
											children: routing ? copy.routing : step ? instruction(lang, step.step.type, step.step.modifier) : copy.searchPlaceholder
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm text-fog",
											children: route ? `${step?.step.name ? `${step.step.name} · ` : ""}${formatDistance(lang, remain)} · ${formatDuration(lang, eta)}` : note
										})
									]
								})]
							}), mode !== "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 rounded-full bg-ink px-2 py-1 text-xs text-signal",
								children: mode === "gps" ? "GPS" : copy.go
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-end justify-between gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dial, {
									value: speed,
									max: 120,
									label: copy.speed,
									unit: lang === "ru" ? "км/ч" : "km/h",
									tone: "signal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1 pb-1 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-fog",
											children: copy.trip
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setTrip(0),
											className: "text-xs text-fog",
											children: copy.resetTrip
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-lg font-semibold tabular-nums text-paper",
										children: formatDistance(lang, trip)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dial, {
									value: wild,
									max: 100,
									label: copy.wild,
									tone: "coral"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: !route && mode !== "sim",
									onClick: () => {
										if (mode === "sim") halt();
										else startSim();
									},
									className: "h-11 rounded-full bg-paper text-sm font-medium text-ink disabled:opacity-40",
									children: driveLabel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: locate,
									className: "inline-flex h-11 items-center justify-center gap-1 rounded-full border border-paper/15 text-sm text-paper",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocateFixed, { className: "size-4" }), copy.locate]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: openStyle,
									className: "inline-flex h-11 items-center justify-center gap-1 rounded-full border border-paper/15 text-sm text-paper",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-4" }), copy.style]
								})
							]
						})
					]
				})
			})
		]
	});
}
function Dial({ value, max, label, unit, tone }) {
	const pct = Math.max(0, Math.min(100, value / max * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-20 shrink-0 flex-col items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid size-20 place-items-center rounded-full",
			style: { background: `conic-gradient(${tone === "coral" ? "var(--color-coral)" : "var(--color-signal)"} ${pct}%, color-mix(in srgb, var(--color-paper) 16%, transparent) ${pct}%)` },
			"aria-label": label,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex size-16 flex-col items-center justify-center rounded-full bg-panel text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xl leading-none font-semibold tabular-nums text-paper",
					children: Math.round(value)
				}), unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs tracking-wide text-fog uppercase",
					children: unit
				}) : null]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "max-w-full truncate text-xs text-fog",
			children: label
		})]
	});
}
function activeStep(route, traveled) {
	let acc = 0;
	for (let i = 0; i < route.steps.length; i++) {
		const end = acc + route.steps[i].distance;
		if (traveled < end - 12 || i === route.steps.length - 1) return {
			step: route.steps[i],
			remain: Math.max(0, end - traveled)
		};
		acc = end;
	}
	return null;
}
var SplitComponent = DriveApp;
//#endregion
export { SplitComponent as component };
