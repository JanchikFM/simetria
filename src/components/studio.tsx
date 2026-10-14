import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy, Download, Eye, EyeOff, PenLine, Redo2, Undo2 } from "lucide-react";
import { StyleMap } from "@/components/style-map";
import { composeCloudStyle } from "@/lib/compose-style";
import { LangToggle, useI18n } from "@/lib/i18n";
import {
  MORE_CONTROLS,
  PLACES,
  PRESETS,
  PRIMARY_CONTROLS,
  NON_STRELSON,
  SIGNAL_NIGHT,
  fillColor,
  geometryVisible,
  labelInk,
  matchingPreset,
  normHex,
  parseCloudStyle,
  pretty,
  sameLook,
  setBorderColor,
  setFill,
  setGround,
  setLabelColor,
  setPin,
  setStroke,
  setVariant,
  setVisible,
  strokeColor,
  touchMeta,
  type CloudStyle,
  type PaletteControl,
  type Place,
  type StyleVariant,
  STYLE_STORAGE_KEY,
} from "@/lib/cloud-style";

const STORAGE_KEY = STYLE_STORAGE_KEY;

function useStyleHistory(initial: CloudStyle) {
  const [doc, setDoc] = useState(initial);
  const docRef = useRef(doc);
  docRef.current = doc;
  const past = useRef<CloudStyle[]>([]);
  const future = useRef<CloudStyle[]>([]);
  const gesture = useRef<CloudStyle | null>(null);
  const [, setEpoch] = useState(0);
  const refresh = () => setEpoch((value) => value + 1);

  const preview = useCallback((next: CloudStyle) => {
    if (!gesture.current) gesture.current = docRef.current;
    setDoc(next);
  }, []);

  const commit = useCallback((next: CloudStyle) => {
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
  }, []);

  const replace = useCallback((next: CloudStyle) => {
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
  }, []);

  const undo = useCallback(() => {
    const prev = past.current.pop();
    if (!prev) return;
    future.current.push(docRef.current);
    gesture.current = null;
    setDoc(prev);
    refresh();
  }, []);

  const redo = useCallback(() => {
    const next = future.current.pop();
    if (!next) return;
    past.current.push(docRef.current);
    gesture.current = null;
    setDoc(next);
    refresh();
  }, []);

  const hydrate = useCallback((next: CloudStyle) => {
    past.current = [];
    future.current = [];
    gesture.current = null;
    setDoc(next);
    refresh();
  }, []);

  return {
    doc,
    preview,
    commit,
    replace,
    undo,
    redo,
    hydrate,
    canUndo: past.current.length > 0,
    canRedo: future.current.length > 0,
  };
}

function Swatch({
  color,
  label,
  onPreview,
  onCommit,
}: {
  color: string;
  label: string;
  onPreview: (hex: string) => void;
  onCommit: (hex: string) => void;
}) {
  const safe = normHex(color) ?? "#000000";
  return (
    <span
      className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-paper/20"
      style={{ backgroundColor: safe }}
    >
      <input
        type="color"
        value={safe}
        aria-label={label}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        onInput={(event) => onPreview(event.currentTarget.value)}
        onChange={(event) => onCommit(event.currentTarget.value)}
      />
    </span>
  );
}

function controlHex(doc: CloudStyle, control: PaletteControl): string {
  if (control.kind === "ground") return fillColor(doc, "natural.land") ?? doc.backgroundColor;
  if (control.kind === "border") {
    return doc.styles.find((item) => item.id === "political.border")?.geometry?.color ?? "#38bdf8";
  }
  if (control.pin && !fillColor(doc, control.featureId)) {
    return labelInk(doc, control.featureId).pin ?? "#f43f5e";
  }
  return fillColor(doc, control.featureId) ?? doc.backgroundColor;
}

function applyControl(doc: CloudStyle, control: PaletteControl, hex: string): CloudStyle {
  if (control.kind === "ground") return setGround(doc, hex);
  if (control.kind === "border") return setBorderColor(doc, hex);
  if (control.pin && !fillColor(doc, control.featureId)) return setPin(doc, control.featureId, hex);
  return setFill(doc, control.featureId, hex);
}

function PaletteRow({
  doc,
  control,
  onPreview,
  onCommit,
}: {
  doc: CloudStyle;
  control: PaletteControl;
  onPreview: (next: CloudStyle) => void;
  onCommit: (next: CloudStyle) => void;
}) {
  const { copy } = useI18n();
  const label = copy.feats[control.featureId] ?? control.label;
  const hex = controlHex(doc, control);
  const visible = control.kind === "ground" ? true : geometryVisible(doc, control.featureId);
  const casing = control.casing ? (strokeColor(doc, control.featureId) ?? hex) : undefined;
  const ink = control.text || control.pin ? labelInk(doc, control.featureId) : undefined;
  const showFill = !(control.pin && !fillColor(doc, control.featureId) && control.kind !== "border");

  return (
    <div className="flex items-center gap-2 border-b border-paper/10 py-2">
      {control.kind === "ground" ? (
        <span className="size-10 shrink-0" />
      ) : (
        <button
          type="button"
          aria-label={visible ? `${copy.hide} ${label}` : `${copy.show} ${label}`}
          aria-pressed={visible}
          className="grid size-10 shrink-0 place-items-center rounded-lg text-fog transition-colors hover:bg-paper/5 hover:text-paper"
          onClick={() => onCommit(setVisible(doc, control.featureId, !visible))}
        >
          {visible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
        </button>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-paper">{label}</p>
        <p className="text-xs tracking-wide text-fog uppercase">{hex}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        {showFill ? (
          <Swatch
            color={hex}
            label={`${label} color`}
            onPreview={(value) => onPreview(applyControl(doc, control, value))}
            onCommit={(value) => onCommit(applyControl(doc, control, value))}
          />
        ) : null}
        {control.pin ? (
          <Swatch
            color={ink?.pin ?? "#f43f5e"}
            label={`${label} pin`}
            onPreview={(value) => onPreview(setPin(doc, control.featureId, value))}
            onCommit={(value) => onCommit(setPin(doc, control.featureId, value))}
          />
        ) : null}
        {casing ? (
          <Swatch
            color={casing}
            label={`${label} casing`}
            onPreview={(value) => onPreview(setStroke(doc, control.featureId, value))}
            onCommit={(value) => onCommit(setStroke(doc, control.featureId, value))}
          />
        ) : null}
        {control.text && ink ? (
          <Swatch
            color={ink.text ?? "#e2e8f0"}
            label={`${label} label`}
            onPreview={(value) => onPreview(setLabelColor(doc, control.featureId, value))}
            onCommit={(value) => onCommit(setLabelColor(doc, control.featureId, value))}
          />
        ) : null}
      </div>
    </div>
  );
}

function IconButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-lg text-paper transition-colors hover:bg-paper/10 disabled:cursor-not-allowed disabled:text-fog/50"
    >
      {children}
    </button>
  );
}

export function Studio({ onBack }: { onBack?: () => void }) {
  const { lang, copy } = useI18n();
  const { doc, preview, commit, replace, undo, redo, hydrate, canUndo, canRedo } =
    useStyleHistory(NON_STRELSON);
  const [place, setPlace] = useState<Place>(PLACES[0]);
  const [brief, setBrief] = useState(copy.briefs[0]);
  const [busy, setBusy] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [jsonDraft, setJsonDraft] = useState<string | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const skipSave = useRef(true);
  const active = matchingPreset(doc);
  const plateName = active ? (copy.presets[active.id]?.name ?? copy.customPlate) : copy.customPlate;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey)) return;
      const target = event.target as HTMLElement | null;
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

  useEffect(() => {
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

  useEffect(() => {
    setJsonDraft(null);
    setJsonError(null);
  }, [doc]);

  async function compose() {
    const text = brief.trim();
    if (text.length < 3 || busy) return;
    setBusy(true);
    setAiError(null);
    try {
      const result = await composeCloudStyle({ data: { brief: text, lang } });
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

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-ink">
      <header className="flex shrink-0 items-center gap-3 border-b border-paper/10 px-4 py-3 md:px-5">
        <div className="flex min-w-0 items-center gap-3">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="h-10 shrink-0 rounded-full border border-paper/15 px-3 text-sm text-paper"
            >
              {copy.backToRoad}
            </button>
          ) : null}
          <div className="min-w-0">
            <h1 className="truncate text-xl leading-none font-semibold tracking-tight text-paper">{copy.appName}</h1>
            <p className="mt-1 truncate text-xs text-fog">{plateName}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <IconButton label={copy.undo} disabled={!canUndo} onClick={undo}>
            <Undo2 className="size-4" />
          </IconButton>
          <IconButton label={copy.redo} disabled={!canRedo} onClick={redo}>
            <Redo2 className="size-4" />
          </IconButton>
          <button
            type="button"
            onClick={downloadJson}
            className="hidden h-10 items-center gap-2 rounded-full px-3 text-sm text-paper hover:bg-paper/10 sm:inline-flex"
          >
            <Download className="size-4" />
            {copy.download}
          </button>
          <LangToggle />
          <button
            type="button"
            onClick={copyJson}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-signal px-3 text-sm font-medium text-ink"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            <span className="hidden md:inline">{copied ? copy.copied : copy.copyJson}</span>
          </button>
        </div>
      </header>

      <div className="studio-split">
        <section className="relative min-h-0 bg-ink md:order-2">
          <StyleMap doc={doc} place={place} />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex p-3 pr-16">
            <div className="pointer-events-auto flex flex-wrap gap-2">
              {PLACES.map((item) => {
                const on = item.id === place.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPlace(item)}
                    className={
                      on
                        ? "h-10 rounded-full bg-paper px-3 text-sm font-medium text-ink"
                        : "h-10 rounded-full bg-ink/80 px-3 text-sm text-paper float-chip"
                    }
                  >
                    {copy.places[item.id] ?? item.name}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="float-legend pointer-events-none absolute bottom-8 left-3 z-10 flex items-center gap-3 rounded-full bg-ink/80 px-3 py-2 text-xs text-paper">
            <LegendDot color={highway} label={copy.feats["infrastructure.roadNetwork.road.highway"]} />
            <LegendDot color={arterial} label={copy.feats["infrastructure.roadNetwork.road.arterial"]} />
            <LegendDot color={local} label={copy.feats["infrastructure.roadNetwork.road.local"]} />
            <LegendDot color={pin} label={copy.feats.pointOfInterest} />
          </div>
        </section>

        <aside className="flex min-h-0 flex-col border-paper/10 bg-panel md:order-1 md:border-r">
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-5">
            <label className="block" htmlFor="brief">
              <span className="text-xs tracking-widest text-fog uppercase">{copy.brief}</span>
              <textarea
                id="brief"
                value={brief}
                maxLength={500}
                rows={3}
                onChange={(event) => setBrief(event.target.value)}
                className="mt-2 w-full resize-none rounded-xl border border-paper/15 bg-ink px-3 py-3 text-sm text-pretty text-paper outline-none placeholder:text-fog"
                placeholder={copy.briefPlaceholder}
              />
            </label>
            <button
              type="button"
              onClick={compose}
              disabled={busy || brief.trim().length < 3}
              className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-paper text-sm font-medium text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PenLine className="size-4" />
              {busy ? copy.composing : copy.compose}
            </button>
            {aiError ? (
              <p className="mt-2 text-sm text-pretty text-fog" role="alert">
                {aiError}
              </p>
            ) : (
              <p className="mt-2 text-xs text-pretty text-fog">{copy.composeHint}</p>
            )}
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {copy.briefs.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setBrief(item)}
                  className="h-10 shrink-0 rounded-full border border-paper/15 px-3 text-xs text-fog hover:text-paper"
                >
                  {item.split(",")[0]}
                </button>
              ))}
            </div>

            <h2 className="mt-6 text-xs tracking-widest text-fog uppercase">{copy.plates}</h2>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
              {PRESETS.map((preset) => {
                const on = active?.id === preset.id;
                const dots = [
                  fillColor(preset.doc, "natural.land") ?? preset.doc.backgroundColor,
                  fillColor(preset.doc, "natural.water") ?? preset.doc.backgroundColor,
                  fillColor(preset.doc, "infrastructure.roadNetwork.road.highway") ?? "#ffffff",
                  labelInk(preset.doc, "pointOfInterest").pin ?? "#f43f5e",
                ];
                return (
                  <button
                    key={preset.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => replace(preset.doc)}
                    className={
                      on
                        ? "w-40 shrink-0 rounded-xl border border-signal bg-ink p-3 text-left"
                        : "w-40 shrink-0 rounded-xl border border-paper/15 bg-ink p-3 text-left hover:border-paper/30"
                    }
                  >
                    <span className="flex gap-1">
                      {dots.map((color, index) => (
                        <span
                          key={`${preset.id}-${index}`}
                          className="h-2 flex-1 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </span>
                    <span className="mt-2 block text-sm font-semibold text-paper">
                      {copy.presets[preset.id]?.name ?? preset.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-fog">{copy.presets[preset.id]?.note ?? preset.note}</span>
                  </button>
                );
              })}
            </div>

            <h2 className="mt-6 text-xs tracking-widest text-fog uppercase">{copy.base}</h2>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["dark", "light"] as StyleVariant[]).map((variant) => {
                const on = doc.variant === variant;
                return (
                  <button
                    key={variant}
                    type="button"
                    aria-pressed={on}
                    onClick={() => commit(setVariant(doc, variant))}
                    className={
                      on
                        ? "h-10 rounded-full bg-paper text-sm font-medium text-ink"
                        : "h-10 rounded-full border border-paper/15 text-sm text-fog"
                    }
                  >
                    {variant === "dark" ? copy.darkTemplate : copy.lightTemplate}
                  </button>
                );
              })}
            </div>

            <h2 className="mt-6 text-xs tracking-widest text-fog uppercase">{copy.palette}</h2>
            <div className="mt-1">
              {PRIMARY_CONTROLS.map((control) => (
                <PaletteRow
                  key={control.featureId}
                  doc={doc}
                  control={control}
                  onPreview={preview}
                  onCommit={commit}
                />
              ))}
            </div>

            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-fog">{copy.moreSurfaces}</summary>
              <div className="mt-1">
                {MORE_CONTROLS.map((control) => (
                  <PaletteRow
                    key={control.featureId}
                    doc={doc}
                    control={control}
                    onPreview={preview}
                    onCommit={commit}
                  />
                ))}
              </div>
            </details>

            <details className="mt-5 mb-2">
              <summary className="cursor-pointer text-sm text-fog">{copy.cloudJson}</summary>
              <p className="mt-2 text-xs text-pretty text-fog">{copy.cloudHint}</p>
              <textarea
                value={jsonDraft ?? pretty(doc)}
                spellCheck={false}
                onChange={(event) => {
                  setJsonDraft(event.target.value);
                  setJsonError(null);
                }}
                className="mt-2 h-48 w-full resize-y rounded-xl border border-paper/15 bg-ink p-3 font-sans text-xs leading-relaxed text-paper outline-none"
              />
              {jsonError ? (
                <p className="mt-2 text-sm text-fog" role="alert">
                  {jsonError}
                </p>
              ) : null}
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={applyDraft}
                  className="h-10 rounded-full bg-paper px-4 text-sm font-medium text-ink"
                >
                  {copy.applyJson}
                </button>
                <button
                  type="button"
                  onClick={downloadJson}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-paper/15 px-4 text-sm text-paper sm:hidden"
                >
                  <Download className="size-4" />
                  {copy.download}
                </button>
              </div>
            </details>
          </div>
        </aside>
      </div>
    </main>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
