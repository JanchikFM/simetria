import type { GeoJSONSource, Map as MlMap } from "maplibre-gl";
import {
  fillColor,
  geometryVisible,
  labelInk,
  strokeColor,
  type CloudStyle,
} from "@/lib/cloud-style";

const PIN_SOURCE = "meridian-pins";
const PIN_LAYER = "meridian-pins";
const PIN_LABELS = "meridian-pin-labels";

function colorLayer(map: MlMap, id: string, color: string) {
  const layer = map.getLayer(id);
  if (!layer) return;
  const prop =
    layer.type === "fill"
      ? "fill-color"
      : layer.type === "line"
        ? "line-color"
        : layer.type === "fill-extrusion"
          ? "fill-extrusion-color"
          : layer.type === "background"
            ? "background-color"
            : null;
  if (!prop) return;
  try {
    map.setPaintProperty(id, prop, color);
  } catch {
    /* this layer does not expose that paint property */
  }
}

function opacity(map: MlMap, id: string, value: number) {
  const layer = map.getLayer(id);
  if (!layer) return;
  const prop =
    layer.type === "fill"
      ? "fill-opacity"
      : layer.type === "line"
        ? "line-opacity"
        : layer.type === "fill-extrusion"
          ? "fill-extrusion-opacity"
          : null;
  if (!prop) return;
  try {
    map.setPaintProperty(id, prop, value);
  } catch {
    /* ignore */
  }
}

function show(map: MlMap, id: string, on: boolean) {
  if (!map.getLayer(id)) return;
  try {
    map.setLayoutProperty(id, "visibility", on ? "visible" : "none");
  } catch {
    /* ignore */
  }
}

function paintText(map: MlMap, id: string, text: string | undefined, halo: string | undefined, on: boolean) {
  show(map, id, on);
  if (!on) return;
  if (text) {
    try {
      map.setPaintProperty(id, "text-color", text);
    } catch {
      /* ignore */
    }
  }
  if (halo) {
    try {
      map.setPaintProperty(id, "text-halo-color", halo);
    } catch {
      /* ignore */
    }
    try {
      map.setPaintProperty(id, "text-halo-width", 1.15);
    } catch {
      /* ignore */
    }
  }
}

type RoadKind = "highway" | "arterial" | "local" | "ramp" | "path" | "rail";

function classifyRoad(id: string): { kind: RoadKind; casing: boolean } | null {
  if (!/^(road|tunnel|bridge)_/.test(id)) return null;
  if (id.includes("one_way") || id.includes("shield") || id.includes("arrow") || id.includes("area")) {
    return null;
  }
  const casing = id.includes("casing");
  if (id.includes("rail") || id.includes("transit")) return { kind: "rail", casing };
  if (id.includes("path") || id.includes("pedestrian")) return { kind: "path", casing };
  if (id.includes("link")) return { kind: "ramp", casing };
  if (id.includes("motorway")) return { kind: "highway", casing };
  if (
    id.includes("trunk") ||
    id.includes("primary") ||
    id.includes("secondary") ||
    id.includes("tertiary")
  ) {
    return { kind: "arterial", casing };
  }
  if (
    id.includes("minor") ||
    id.includes("street") ||
    id.includes("service") ||
    id.includes("track")
  ) {
    return { kind: "local", casing };
  }
  return null;
}

const ROAD_FEATURE: Record<RoadKind, string> = {
  highway: "infrastructure.roadNetwork.road.highway",
  arterial: "infrastructure.roadNetwork.road.arterial",
  local: "infrastructure.roadNetwork.road.local",
  path: "infrastructure.roadNetwork.road.local",
  ramp: "infrastructure.roadNetwork.ramp",
  rail: "infrastructure.roadNetwork.road",
};

function paintFill(map: MlMap, id: string, featureId: string, doc: CloudStyle, alpha?: number) {
  const color = fillColor(doc, featureId);
  show(map, id, geometryVisible(doc, featureId));
  if (color) colorLayer(map, id, color);
  if (alpha !== undefined) opacity(map, id, alpha);
}

function cartoonBlocks(map: MlMap) {
  const layer = map.getLayer("building-3d");
  if (!layer || layer.type !== "fill-extrusion") return;
  try {
    map.setPaintProperty("building-3d", "fill-extrusion-height", [
      "*",
      ["coalesce", ["get", "render_height"], ["get", "height"], 16],
      1.55,
    ]);
  } catch {
    /* this style has no extrusion height */
  }
}

export function applyCloudStyle(map: MlMap, doc: CloudStyle) {
  const land = fillColor(doc, "natural.land") ?? doc.backgroundColor;
  colorLayer(map, "background", land);
  show(map, "natural_earth", false);
  show(map, "road_area_pattern", false);
  show(map, "road_one_way_arrow", false);
  show(map, "road_one_way_arrow_opposite", false);

  paintFill(map, "water", "natural.water", doc, 1);
  for (const id of ["waterway_river", "waterway_other", "waterway_tunnel"]) {
    paintFill(map, id, "natural.water", doc, 1);
  }

  paintFill(map, "landcover_wood", "natural.land.landCover.forest", doc, 1);
  paintFill(map, "landcover_grass", "natural.land.landCover.crops", doc, 1);
  paintFill(map, "landcover_wetland", "natural.land.landCover.shrub", doc, 1);
  paintFill(map, "landcover_sand", "natural.land.landCover.sand", doc, 1);
  paintFill(map, "landcover_ice", "natural.land.landCover.ice", doc, 1);

  paintFill(map, "park", "pointOfInterest.recreation.park", doc, 0.95);
  const park = fillColor(doc, "pointOfInterest.recreation.park");
  if (park) colorLayer(map, "park_outline", park);
  show(map, "park_outline", geometryVisible(doc, "pointOfInterest.recreation.park"));

  paintFill(map, "landuse_residential", "infrastructure.urbanArea", doc, 0.86);
  paintFill(map, "landuse_school", "infrastructure.urbanArea", doc, 0.9);
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
      const fill =
        fillColor(doc, featureId) ?? fillColor(doc, "infrastructure.roadNetwork.road") ?? land;
      colorLayer(map, layer.id, fill);
    }
  }

  const border = ruleColor(doc);
  const borderOn = geometryVisible(doc, "political.border");
  for (const id of ["boundary_2", "boundary_3", "boundary_disputed"]) {
    show(map, id, borderOn);
    if (border) colorLayer(map, id, border);
    opacity(map, id, 0.9);
  }

  const waterInk = labelInk(doc, "natural.water");
  const waterOn = geometryVisible(doc, "natural.water") && waterInk.visible;
  for (const id of ["waterway_line_label", "water_name_point_label", "water_name_line_label"]) {
    paintText(map, id, waterInk.text, waterInk.stroke ?? doc.backgroundColor, waterOn);
  }

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
    "label_country_1",
  ]) {
    paintText(map, id, placeInk.text ?? "#e2e8f0", placeInk.stroke ?? doc.backgroundColor, true);
  }

  const highwayInk = labelInk(doc, "infrastructure.roadNetwork.road.highway");
  const highwayOn = geometryVisible(doc, "infrastructure.roadNetwork.road.highway") && highwayInk.visible;
  for (const id of [
    "highway-name-major",
    "highway-shield-non-us",
    "highway-shield-us-interstate",
    "road_shield_us",
  ]) {
    paintText(map, id, highwayInk.text, highwayInk.stroke ?? doc.backgroundColor, highwayOn);
  }

  const localInk = labelInk(doc, "infrastructure.roadNetwork.road.local");
  const localOn = geometryVisible(doc, "infrastructure.roadNetwork.road.local") && localInk.visible;
  for (const id of ["highway-name-minor", "highway-name-path"]) {
    paintText(map, id, localInk.text, localInk.stroke ?? doc.backgroundColor, localOn);
  }

  const poi = labelInk(doc, "pointOfInterest");
  const poiOn = geometryVisible(doc, "pointOfInterest") && poi.visible;
  for (const id of ["poi_r1", "poi_r7", "poi_r20", "poi_transit"]) {
    paintText(map, id, poi.text, poi.stroke ?? doc.backgroundColor, poiOn);
    if (map.getLayer(id)) {
      try {
        map.setPaintProperty(id, "icon-opacity", 0);
      } catch {
        /* icon paint may be absent */
      }
    }
  }

  const air = labelInk(doc, "pointOfInterest");
  paintText(map, "airport", air.text, air.stroke ?? doc.backgroundColor, true);
}

function ruleColor(doc: CloudStyle): string | undefined {
  return doc.styles.find((item) => item.id === "political.border")?.geometry?.color;
}

export function syncPins(map: MlMap, doc: CloudStyle, center: [number, number]) {
  const poi = labelInk(doc, "pointOfInterest");
  const pinsOn = geometryVisible(doc, "pointOfInterest") && poi.visible;
  const land = fillColor(doc, "natural.land") ?? doc.backgroundColor;
  const [lng, lat] = center;
  const data = {
    type: "FeatureCollection" as const,
    features: [
      { name: "Market", coordinates: [lng + 0.006, lat + 0.003] },
      { name: "Station", coordinates: [lng - 0.007, lat + 0.001] },
      { name: "Landing", coordinates: [lng + 0.001, lat - 0.006] },
    ].map((pin) => ({
      type: "Feature" as const,
      properties: { name: pin.name },
      geometry: { type: "Point" as const, coordinates: pin.coordinates },
    })),
  };

  if (!map.getSource(PIN_SOURCE)) {
    map.addSource(PIN_SOURCE, { type: "geojson", data });
    map.addLayer({
      id: PIN_LAYER,
      type: "circle",
      source: PIN_SOURCE,
      paint: {
        "circle-radius": 6,
        "circle-color": poi.pin ?? "#f43f5e",
        "circle-stroke-width": 2,
        "circle-stroke-color": land,
      },
    });
    map.addLayer({
      id: PIN_LABELS,
      type: "symbol",
      source: PIN_SOURCE,
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Noto Sans Regular"],
        "text-size": 12,
        "text-offset": [0, 0.9],
        "text-anchor": "top",
      },
      paint: {
        "text-color": poi.text ?? "#f8fafc",
        "text-halo-color": poi.stroke ?? doc.backgroundColor,
        "text-halo-width": 1.2,
      },
    });
  } else {
    (map.getSource(PIN_SOURCE) as GeoJSONSource).setData(data);
  }

  show(map, PIN_LAYER, pinsOn);
  show(map, PIN_LABELS, pinsOn);
  try {
    map.setPaintProperty(PIN_LAYER, "circle-color", poi.pin ?? "#f43f5e");
    map.setPaintProperty(PIN_LAYER, "circle-stroke-color", land);
    map.setPaintProperty(PIN_LABELS, "text-color", poi.text ?? "#f8fafc");
    map.setPaintProperty(PIN_LABELS, "text-halo-color", poi.stroke ?? doc.backgroundColor);
  } catch {
    /* pins paint after the source exists */
  }
}
