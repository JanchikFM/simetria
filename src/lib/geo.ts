export type LngLat = [number, number];

export function haversine(a: LngLat, b: LngLat): number {
  const R = 6371000;
  const φ1 = (a[1] * Math.PI) / 180;
  const φ2 = (b[1] * Math.PI) / 180;
  const dφ = ((b[1] - a[1]) * Math.PI) / 180;
  const dλ = ((b[0] - a[0]) * Math.PI) / 180;
  const s = Math.sin(dφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(dλ / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

export function bearing(a: LngLat, b: LngLat): number {
  const φ1 = (a[1] * Math.PI) / 180;
  const φ2 = (b[1] * Math.PI) / 180;
  const dλ = ((b[0] - a[0]) * Math.PI) / 180;
  const y = Math.sin(dλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(dλ);
  return (Math.atan2(y, x) * 180) / Math.PI;
}

export type PathIndex = {
  coords: LngLat[];
  cum: number[];
  total: number;
};

export function indexPath(coords: LngLat[]): PathIndex {
  const cum = [0];
  for (let i = 1; i < coords.length; i++) {
    cum.push(cum[i - 1] + haversine(coords[i - 1], coords[i]));
  }
  return { coords, cum, total: cum[cum.length - 1] ?? 0 };
}

export function pointAt(path: PathIndex, distance: number): { point: LngLat; heading: number } {
  if (path.coords.length === 0) return { point: [0, 0], heading: 0 };
  const d = Math.max(0, Math.min(distance, path.total));
  if (path.coords.length === 1 || d <= 0) {
    const next = path.coords[1] ?? path.coords[0];
    return { point: path.coords[0], heading: bearing(path.coords[0], next) };
  }
  let i = 1;
  while (i < path.cum.length && path.cum[i] < d) i++;
  if (i >= path.coords.length) {
    const a = path.coords[path.coords.length - 2];
    const b = path.coords[path.coords.length - 1];
    return { point: b, heading: bearing(a, b) };
  }
  const a = path.coords[i - 1];
  const b = path.coords[i];
  const span = path.cum[i] - path.cum[i - 1];
  const t = span === 0 ? 0 : (d - path.cum[i - 1]) / span;
  return {
    point: [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t],
    heading: bearing(a, b),
  };
}
