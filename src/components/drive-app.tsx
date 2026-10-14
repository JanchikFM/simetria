import { useEffect, useRef, useState } from "react";
import { LocateFixed, PenLine } from "lucide-react";
import { DriveMap, type Puck } from "@/components/drive-map";
import { Studio } from "@/components/studio";
import { fetchRoute, searchPlaces, type DriveRoute, type PlaceHit } from "@/lib/directions";
import { haversine, indexPath, pointAt, type LngLat } from "@/lib/geo";
import { formatDistance, formatDuration, instruction, LangToggle, useI18n } from "@/lib/i18n";
import {
  NON_STRELSON,
  PRESETS,
  SIGNAL_NIGHT,
  STYLE_STORAGE_KEY,
  matchingPreset,
  parseCloudStyle,
  pretty,
  sameLook,
  type CloudStyle,
} from "@/lib/cloud-style";

const SAROV = { lng: 43.3239, lat: 54.9358 };
const AUSTRALIA = { lng: 151.2093, lat: -33.8688 };
const TRIP_KEY = "meridian-trip-m";
const EMPTY_ROUTE: LngLat[] = [];

type Dest = { lng: number; lat: number; name: string };

const SHORTCUTS: { id: string; region: "sarov" | "australia"; lng: number; lat: number }[] = [
  { id: "cathedral", region: "sarov", lng: 43.3289276, lat: 54.9250893 },
  { id: "prospect", region: "sarov", lng: 43.344, lat: 54.922 },
  { id: "opera", region: "australia", lng: 151.2153, lat: -33.8568 },
];

function regionOf(puck: Puck): "sarov" | "australia" | "other" {
  if (haversine([puck.lng, puck.lat], [SAROV.lng, SAROV.lat]) < 80000) return "sarov";
  if (haversine([puck.lng, puck.lat], [AUSTRALIA.lng, AUSTRALIA.lat]) < 150000) return "australia";
  return "other";
}

function readStyle(): CloudStyle {
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

export function DriveApp() {
  const { lang, copy } = useI18n();
  const [doc, setDoc] = useState<CloudStyle>(NON_STRELSON);
  const [styleOpen, setStyleOpen] = useState(false);
  const [puck, setPuck] = useState<Puck>({ ...SAROV, heading: 0 });
  const [dest, setDest] = useState<Dest | null>(null);
  const [route, setRoute] = useState<DriveRoute | null>(null);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<PlaceHit[]>([]);
  const [searching, setSearching] = useState(false);
  const [routing, setRouting] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [mode, setMode] = useState<"idle" | "sim" | "gps">("idle");
  const [follow, setFollow] = useState(true);
  const [headingUp, setHeadingUp] = useState(true);
  const [speed, setSpeed] = useState(0);
  const [traveled, setTraveled] = useState(0);
  const [trip, setTrip] = useState(0);
  const [wild, setWild] = useState(6);
  const [frame, setFrame] = useState(0);
  const [focusToken, setFocusToken] = useState(0);
  const [focusZoom, setFocusZoom] = useState(15.6);
  const sim = useRef<number | null>(null);
  const gpsId = useRef<number | null>(null);
  const traveledRef = useRef(0);
  const headingRef = useRef(0);
  const tripRef = useRef(0);
  const puckRef = useRef(puck);
  puckRef.current = puck;
  tripRef.current = trip;

  useEffect(() => {
    setDoc(readStyle());
    const saved = Number(localStorage.getItem(TRIP_KEY));
    if (Number.isFinite(saved) && saved > 0) setTrip(saved);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      localStorage.setItem(TRIP_KEY, String(tripRef.current));
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  function halt() {
    if (sim.current != null) cancelAnimationFrame(sim.current);
    sim.current = null;
    if (gpsId.current != null && navigator.geolocation) {
      navigator.geolocation.clearWatch(gpsId.current);
    }
    gpsId.current = null;
    setMode("idle");
    setSpeed(0);
  }

  useEffect(() => {
    return () => {
      if (sim.current != null) cancelAnimationFrame(sim.current);
      if (gpsId.current != null && navigator.geolocation) navigator.geolocation.clearWatch(gpsId.current);
    };
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setHits([]);
      setSearching(false);
      return;
    }
    let dead = false;
    setSearching(true);
    const timer = window.setTimeout(() => {
      void searchPlaces({ data: { query: q, lang } })
        .then((result) => {
          if (dead) return;
          setHits(result.ok ? result.places : []);
          if (!result.ok) setNote(result.error);
        })
        .catch(() => {
          if (!dead) setHits([]);
        })
        .finally(() => {
          if (!dead) setSearching(false);
        });
    }, 280);
    return () => {
      dead = true;
      window.clearTimeout(timer);
    };
  }, [lang, query]);

  async function goTo(next: Dest, from = puckRef.current) {
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
      const result = await fetchRoute({
        data: { fromLng: from.lng, fromLat: from.lat, toLng: next.lng, toLat: next.lat, lang },
      });
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

  function teleport(where: "sarov" | "australia") {
    halt();
    const spot = where === "sarov" ? SAROV : AUSTRALIA;
    const next = { lng: spot.lng, lat: spot.lat, heading: 0 };
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
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const remaining = path.total - distance;
      const target = remaining < 35 ? 0 : remaining < 160 ? 24 : 54;
      speedKmh += (target - speedKmh) * Math.min(1, dt * 1.5);
      distance += (speedKmh / 3.6) * dt;
      const sample = pointAt(path, Math.min(distance, path.total));
      const turn = Math.min(180, Math.abs((((sample.heading - prevHeading) % 360) + 540) % 360 - 180));
      prevHeading = sample.heading;
      bucket += dt;
      if (bucket >= 0.12 || distance >= path.total) {
        bucket = 0;
        const delta = Math.max(0, distance - traveledRef.current);
        traveledRef.current = distance;
        headingRef.current = sample.heading;
        setTraveled(Math.min(distance, path.total));
        setTrip((meters) => meters + delta);
        setSpeed(distance >= path.total ? 0 : speedKmh);
        setWild(Math.round(Math.min(100, (speedKmh / 110) * 72 + Math.min(28, turn))));
        const next = { lng: sample.point[0], lat: sample.point[1], heading: sample.heading };
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

  function pickSeries(id: "strelson" | "strelson-night") {
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
    let last: LngLat | null = null;
    gpsId.current = navigator.geolocation.watchPosition(
      (pos) => {
        const nextPoint: LngLat = [pos.coords.longitude, pos.coords.latitude];
        const moved = last ? haversine(last, nextPoint) : 0;
        if (last && moved > 0.4 && moved < 250) setTrip((meters) => meters + moved);
        last = nextPoint;
        const kmh =
          typeof pos.coords.speed === "number" && pos.coords.speed >= 0 ? pos.coords.speed * 3.6 : 0;
        const heading =
          typeof pos.coords.heading === "number" && pos.coords.heading >= 0
            ? pos.coords.heading
            : headingRef.current;
        const turn = Math.min(180, Math.abs((((heading - headingRef.current) % 360) + 540) % 360 - 180));
        headingRef.current = heading;
        setSpeed(kmh);
        setWild(Math.round(Math.min(100, (kmh / 110) * 72 + Math.min(28, turn))));
        const next = { lng: nextPoint[0], lat: nextPoint[1], heading };
        puckRef.current = next;
        setPuck(next);
        setMode("gps");
      },
      () => {
        setNote(copy.gpsDenied);
        setMode("idle");
        gpsId.current = null;
      },
      { enableHighAccuracy: true, maximumAge: 1500, timeout: 12000 },
    );
  }

  function openStyle() {
    halt();
    setStyleOpen(true);
  }

  function closeStyle() {
    setDoc(readStyle());
    setStyleOpen(false);
  }

  if (styleOpen) return <Studio onBack={closeStyle} />;

  const plate = matchingPreset(doc)?.id;
  const here = regionOf(puck);
  const shortcuts = SHORTCUTS.filter((item) => item.region === here);
  const step = route ? activeStep(route, traveled) : null;
  const remain = route ? Math.max(0, route.distance - traveled) : 0;
  const eta = route && route.distance > 0 ? route.duration * (remain / route.distance) : 0;
  const done = route != null && traveled >= route.distance - 8 && mode === "idle" && traveled > 0;
  const driveLabel = mode === "sim" ? copy.stop : done ? copy.again : copy.go;
  const shortcutName = (id: string) =>
    id === "cathedral" ? copy.cathedral : id === "prospect" ? copy.prospect : copy.opera;

  return (
    <main className="relative h-dvh overflow-hidden bg-ink text-paper">
      <DriveMap
        doc={doc}
        puck={puck}
        follow={follow && mode !== "idle"}
        headingUp={headingUp}
        destination={dest}
        routeCoords={route?.coords ?? EMPTY_ROUTE}
        frame={frame}
        focusToken={focusToken}
        focusZoom={focusZoom}
        onUserMove={() => setFollow(false)}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col gap-2 p-3 pr-16 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="pointer-events-auto flex items-start gap-2">
          <form
            className="min-w-0 flex-1"
            onSubmit={(event) => {
              event.preventDefault();
              if (hits[0]) void goTo({ lng: hits[0].center[0], lat: hits[0].center[1], name: hits[0].name });
            }}
          >
            <label className="sr-only" htmlFor="dest">
              {copy.searchPlaceholder}
            </label>
            <input
              id="dest"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              className="h-11 w-full rounded-full border border-paper/15 bg-ink px-4 text-sm text-paper outline-none placeholder:text-fog"
            />
          </form>
          <LangToggle />
        </div>
        {query.trim().length >= 2 ? (
          <div className="pointer-events-auto overflow-hidden rounded-2xl border border-paper/15 bg-panel">
            {searching ? <p className="px-4 py-3 text-sm text-fog">{copy.searching}</p> : null}
            {!searching && hits.length === 0 ? <p className="px-4 py-3 text-sm text-fog">{copy.noHits}</p> : null}
            {hits.map((hit) => (
              <button
                key={hit.id}
                type="button"
                onClick={() => void goTo({ lng: hit.center[0], lat: hit.center[1], name: hit.name })}
                className="block w-full border-t border-paper/10 px-4 py-3 text-left first:border-t-0"
              >
                <span className="block truncate text-sm font-medium text-paper">{hit.name}</span>
                <span className="block truncate text-xs text-fog">{hit.label}</span>
              </button>
            ))}
          </div>
        ) : null}
        <div className="pointer-events-auto flex gap-2 overflow-x-auto">
          <button type="button" onClick={() => teleport("sarov")} className="h-10 shrink-0 rounded-full border border-paper/15 bg-ink px-3 text-sm text-paper">
            {copy.home}
          </button>
          <button
            type="button"
            onClick={() => teleport("australia")}
            className="h-10 shrink-0 rounded-full border border-paper/15 bg-ink px-3 text-sm text-paper"
          >
            {copy.toAustralia}
          </button>
          <button
            type="button"
            aria-pressed={plate === "strelson"}
            onClick={() => pickSeries("strelson")}
            className={
              plate === "strelson"
                ? "h-10 shrink-0 rounded-full bg-paper px-3 text-sm font-medium text-ink"
                : "h-10 shrink-0 rounded-full border border-paper/15 bg-ink px-3 text-sm text-paper"
            }
          >
            {copy.seriesDay}
          </button>
          <button
            type="button"
            aria-pressed={plate === "strelson-night"}
            onClick={() => pickSeries("strelson-night")}
            className={
              plate === "strelson-night"
                ? "h-10 shrink-0 rounded-full bg-paper px-3 text-sm font-medium text-ink"
                : "h-10 shrink-0 rounded-full border border-paper/15 bg-ink px-3 text-sm text-paper"
            }
          >
            {copy.seriesNight}
          </button>
          {shortcuts.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => void goTo({ lng: item.lng, lat: item.lat, name: shortcutName(item.id) })}
              className="h-10 shrink-0 rounded-full border border-paper/15 bg-ink px-3 text-sm text-fog"
            >
              {shortcutName(item.id)}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={headingUp}
            onClick={() => {
              setHeadingUp((value) => !value);
              setFollow(true);
            }}
            className="h-10 shrink-0 rounded-full border border-paper/15 bg-ink px-3 text-sm text-paper"
          >
            {headingUp ? copy.heading : copy.north}
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <section className="pointer-events-auto rounded-3xl bg-panel p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <img src="/drive/stele.jpg" alt="" className="size-11 shrink-0 rounded-2xl object-cover" />
              <div className="min-w-0">
                <p className="text-xs tracking-wide text-fog uppercase">
                  {copy.appName} · {copy.appTag}
                </p>
                <p className="mt-1 truncate text-lg font-semibold tracking-tight text-paper">
                  {routing
                    ? copy.routing
                    : step
                      ? instruction(lang, step.step.type, step.step.modifier)
                      : copy.searchPlaceholder}
                </p>
                <p className="truncate text-sm text-fog">
                  {route
                    ? `${step?.step.name ? `${step.step.name} · ` : ""}${formatDistance(lang, remain)} · ${formatDuration(lang, eta)}`
                    : note}
                </p>
              </div>
            </div>
            {mode !== "idle" ? (
              <span className="shrink-0 rounded-full bg-ink px-2 py-1 text-xs text-signal">
                {mode === "gps" ? "GPS" : copy.go}
              </span>
            ) : null}
          </div>

          <div className="mt-3 flex items-end justify-between gap-2">
            <Dial
              value={speed}
              max={120}
              label={copy.speed}
              unit={lang === "ru" ? "км/ч" : "km/h"}
              tone="signal"
            />
            <div className="min-w-0 flex-1 pb-1 text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-xs text-fog">{copy.trip}</span>
                <button type="button" onClick={() => setTrip(0)} className="text-xs text-fog">
                  {copy.resetTrip}
                </button>
              </div>
              <p className="text-lg font-semibold tabular-nums text-paper">{formatDistance(lang, trip)}</p>
            </div>
            <Dial value={wild} max={100} label={copy.wild} tone="coral" />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <button
              type="button"
              disabled={!route && mode !== "sim"}
              onClick={() => {
                if (mode === "sim") halt();
                else startSim();
              }}
              className="h-11 rounded-full bg-paper text-sm font-medium text-ink disabled:opacity-40"
            >
              {driveLabel}
            </button>
            <button
              type="button"
              onClick={locate}
              className="inline-flex h-11 items-center justify-center gap-1 rounded-full border border-paper/15 text-sm text-paper"
            >
              <LocateFixed className="size-4" />
              {copy.locate}
            </button>
            <button
              type="button"
              onClick={openStyle}
              className="inline-flex h-11 items-center justify-center gap-1 rounded-full border border-paper/15 text-sm text-paper"
            >
              <PenLine className="size-4" />
              {copy.style}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function Dial({
  value,
  max,
  label,
  unit,
  tone,
}: {
  value: number;
  max: number;
  label: string;
  unit?: string;
  tone: "signal" | "coral";
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const color = tone === "coral" ? "var(--color-coral)" : "var(--color-signal)";
  return (
    <div className="flex w-20 shrink-0 flex-col items-center gap-1">
      <div
        className="grid size-20 place-items-center rounded-full"
        style={{
          background: `conic-gradient(${color} ${pct}%, color-mix(in srgb, var(--color-paper) 16%, transparent) ${pct}%)`,
        }}
        aria-label={label}
      >
        <div className="flex size-16 flex-col items-center justify-center rounded-full bg-panel text-center">
          <span className="text-xl leading-none font-semibold tabular-nums text-paper">{Math.round(value)}</span>
          {unit ? <span className="text-xs tracking-wide text-fog uppercase">{unit}</span> : null}
        </div>
      </div>
      <span className="max-w-full truncate text-xs text-fog">{label}</span>
    </div>
  );
}

function activeStep(route: DriveRoute, traveled: number) {
  let acc = 0;
  for (let i = 0; i < route.steps.length; i++) {
    const end = acc + route.steps[i].distance;
    if (traveled < end - 12 || i === route.steps.length - 1) {
      return { step: route.steps[i], remain: Math.max(0, end - traveled) };
    }
    acc = end;
  }
  return null;
}
