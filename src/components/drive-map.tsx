import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { applyCloudStyle } from "@/lib/apply-cloud-style";
import { fillColor, type CloudStyle } from "@/lib/cloud-style";
import type { LngLat } from "@/lib/geo";
import { useI18n } from "@/lib/i18n";
import type { GeoJSONSource, Map as MlMap, Marker } from "maplibre-gl";

const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";
const ROUTE_SOURCE = "meridian-route";
const ROUTE_CASING = "meridian-route-casing";
const ROUTE_LINE = "meridian-route-line";

export type Puck = { lng: number; lat: number; heading: number };

type DriveMapProps = {
  doc: CloudStyle;
  puck: Puck;
  follow: boolean;
  headingUp: boolean;
  destination: { lng: number; lat: number; name: string } | null;
  routeCoords: LngLat[];
  frame: number;
  focusToken: number;
  focusZoom: number;
  onUserMove: () => void;
};

function markerElement(className: string, src: string, title: string) {
  const el = document.createElement("div");
  el.className = className;
  el.title = title;
  const img = document.createElement("img");
  img.src = src;
  img.alt = "";
  el.appendChild(img);
  return el;
}

export function DriveMap({
  doc,
  puck,
  follow,
  headingUp,
  destination,
  routeCoords,
  frame,
  focusToken,
  focusZoom,
  onUserMove,
}: DriveMapProps) {
  const { copy } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const puckMarker = useRef<Marker | null>(null);
  const destMarker = useRef<Marker | null>(null);
  const puckRef = useRef(puck);
  const docRef = useRef(doc);
  const followRef = useRef(follow);
  const headingRef = useRef(headingUp);
  const moveRef = useRef(onUserMove);
  const frameApplied = useRef(-1);
  const focusApplied = useRef(-1);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  puckRef.current = puck;
  docRef.current = doc;
  followRef.current = follow;
  headingRef.current = headingUp;
  moveRef.current = onUserMove;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let dead = false;
    let map: MlMap | null = null;
    setStatus("loading");

    (async () => {
      try {
        const maplibregl = await import("maplibre-gl");
        const worker = await import("maplibre-gl/dist/maplibre-gl-worker.mjs?url");
        maplibregl.setWorkerUrl(worker.default);
        if (dead || !containerRef.current) return;
        const here = puckRef.current;
        map = new maplibregl.Map({
          container: containerRef.current,
          style: STYLE_URL,
          center: [here.lng, here.lat],
          zoom: 15.6,
          pitch: 52,
          bearing: 0,
          maxPitch: 68,
          attributionControl: { compact: true },
          fadeDuration: 0,
        });
        map.on("dragstart", () => moveRef.current());
        map.on("rotatestart", (event) => {
          if (event.originalEvent) moveRef.current();
        });
        map.on("load", () => {
          if (dead || !map) return;
          applyCloudStyle(map, docRef.current);
          const puckEl = markerElement("drive-puck", "/drive/car.jpg", "");
          puckMarker.current = new maplibregl.Marker({ element: puckEl, anchor: "center", rotationAlignment: "viewport" })
            .setLngLat([puckRef.current.lng, puckRef.current.lat])
            .addTo(map);
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
    }, 12000);

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

  useEffect(() => {
    const map = mapRef.current;
    if (!map || status !== "ready") return;
    applyCloudStyle(map, doc);
  }, [doc, status]);

  useEffect(() => {
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
      type: "Feature" as const,
      properties: {},
      geometry: { type: "LineString" as const, coordinates: routeCoords },
    };
    if (!map.getSource(ROUTE_SOURCE)) {
      map.addSource(ROUTE_SOURCE, { type: "geojson", data });
      map.addLayer({
        id: ROUTE_CASING,
        type: "line",
        source: ROUTE_SOURCE,
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": doc.backgroundColor, "line-width": 9, "line-opacity": 0.9 },
      });
      map.addLayer({
        id: ROUTE_LINE,
        type: "line",
        source: ROUTE_SOURCE,
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": color, "line-width": 4 },
      });
    } else {
      (map.getSource(ROUTE_SOURCE) as GeoJSONSource).setData(data);
      map.setPaintProperty(ROUTE_LINE, "line-color", color);
      map.setPaintProperty(ROUTE_CASING, "line-color", doc.backgroundColor);
    }
    const visible = routeCoords.length > 1 ? "visible" : "none";
    map.setLayoutProperty(ROUTE_LINE, "visibility", visible);
    map.setLayoutProperty(ROUTE_CASING, "visibility", visible);
  }, [doc, routeCoords, status]);

  useEffect(() => {
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
    map.fitBounds(
      [
        [west, south],
        [east, north],
      ],
      {
        padding: { top: 120, bottom: 280, left: 36, right: 56 },
        pitch: 48,
        duration: reduce ? 0 : 900,
      },
    );
  }, [frame, routeCoords, status]);

  useEffect(() => {
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
      duration: reduce ? 0 : 1000,
    });
  }, [focusToken, focusZoom, headingUp, puck.heading, puck.lat, puck.lng, status]);

  useEffect(() => {
    const map = mapRef.current;
    const marker = puckMarker.current;
    if (!map || !marker || status !== "ready") return;
    marker.setLngLat([puck.lng, puck.lat]);
    if (follow) {
      map.jumpTo({
        center: [puck.lng, puck.lat],
        bearing: headingUp ? puck.heading : map.getBearing(),
        pitch: map.getPitch(),
      });
    }
    marker.setRotation(puck.heading - map.getBearing());
  }, [follow, headingUp, puck, status]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || status !== "ready") return;
    let dead = false;
    (async () => {
      const maplibregl = await import("maplibre-gl");
      if (dead || mapRef.current !== map) return;
      destMarker.current?.remove();
      destMarker.current = null;
      if (!destination) return;
      const el = markerElement("drive-pin", "/drive/building.jpg", destination.name);
      destMarker.current = new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([destination.lng, destination.lat])
        .addTo(map);
    })();
    return () => {
      dead = true;
    };
  }, [destination, status]);

  useEffect(() => {
    const map = mapRef.current;
    const el = containerRef.current;
    if (!map || !el || status !== "ready") return;
    const observer = new ResizeObserver(() => map.resize());
    observer.observe(el);
    return () => observer.disconnect();
  }, [status]);

  return (
    <div className="drive-map absolute inset-0">
      <div ref={containerRef} className="h-full w-full" />
      <div className="absolute top-36 right-3 z-10 flex flex-col gap-2">
        <button
          type="button"
          aria-label={copy.zoomIn}
          onClick={() => mapRef.current?.zoomIn()}
          className="grid size-11 place-items-center rounded-full bg-panel text-lg text-paper"
        >
          +
        </button>
        <button
          type="button"
          aria-label={copy.zoomOut}
          onClick={() => mapRef.current?.zoomOut()}
          className="grid size-11 place-items-center rounded-full bg-panel text-lg text-paper"
        >
          −
        </button>
      </div>
      {status !== "ready" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink px-6 text-center">
          <p className="text-2xl font-semibold tracking-tight text-paper">
            {status === "error" ? copy.chartError : copy.chartLoading}
          </p>
          <p className="max-w-xs text-sm text-pretty text-fog">
            {status === "error" ? copy.chartErrorHint : copy.chartLoadingHint}
          </p>
          {status === "error" ? (
            <button
              type="button"
              className="mt-1 h-11 rounded-full bg-paper px-4 text-sm font-medium text-ink"
              onClick={() => setAttempt((value) => value + 1)}
            >
              {copy.tryAgain}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
