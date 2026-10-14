import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { applyCloudStyle, syncPins } from "@/lib/apply-cloud-style";
import type { CloudStyle, Place } from "@/lib/cloud-style";
import { useI18n } from "@/lib/i18n";
import type { Map as MlMap } from "maplibre-gl";

const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

type StyleMapProps = {
  doc: CloudStyle;
  place: Place;
};

export function StyleMap({ doc, place }: StyleMapProps) {
  const { copy } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const docRef = useRef(doc);
  const placeRef = useRef(place);
  const skippedFly = useRef(false);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  docRef.current = doc;
  placeRef.current = place;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let dead = false;
    let map: MlMap | null = null;
    skippedFly.current = false;
    setStatus("loading");

    (async () => {
      try {
        const maplibregl = await import("maplibre-gl");
        const worker = await import("maplibre-gl/dist/maplibre-gl-worker.mjs?url");
        maplibregl.setWorkerUrl(worker.default);
        if (dead || !containerRef.current) return;
        map = new maplibregl.Map({
          container: containerRef.current,
          style: STYLE_URL,
          center: placeRef.current.center,
          zoom: placeRef.current.zoom,
          attributionControl: { compact: true },
          fadeDuration: 0,
        });
        map.addControl(
          new maplibregl.NavigationControl({ visualizePitch: true, showCompass: true }),
          "top-right",
        );
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
    }, 12000);

    return () => {
      dead = true;
      window.clearTimeout(failTimer);
      mapRef.current = null;
      map?.remove();
    };
  }, [attempt]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || status !== "ready") return;
    applyCloudStyle(map, doc);
    syncPins(map, doc, placeRef.current.center);
  }, [doc, status]);

  useEffect(() => {
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
      duration: reduce ? 0 : 1100,
    });
    const onEnd = () => syncPins(map, docRef.current, place.center);
    map.once("moveend", onEnd);
    return () => {
      map.off("moveend", onEnd);
    };
  }, [place, status]);

  useEffect(() => {
    const map = mapRef.current;
    const el = containerRef.current;
    if (!map || !el || status !== "ready") return;
    const observer = new ResizeObserver(() => map.resize());
    observer.observe(el);
    return () => observer.disconnect();
  }, [status]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="h-full w-full" />
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
              className="mt-1 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink"
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
