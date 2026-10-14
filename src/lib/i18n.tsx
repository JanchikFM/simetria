import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "ru" | "en";

const FEATS_EN: Record<string, string> = {
  "natural.land": "Land",
  "natural.water": "Water",
  "infrastructure.urbanArea": "Districts",
  "infrastructure.building": "Buildings",
  "infrastructure.roadNetwork.road.local": "Local roads",
  "infrastructure.roadNetwork.road.arterial": "Arterials",
  "infrastructure.roadNetwork.road.highway": "Highways",
  "infrastructure.roadNetwork.ramp": "Ramps",
  "pointOfInterest.recreation.park": "Parks",
  pointOfInterest: "Places",
  "political.border": "Borders",
  "natural.land.landCover.forest": "Forest",
  "natural.land.landCover.crops": "Fields",
  "natural.land.landCover.shrub": "Shrub",
  "natural.land.landCover.sand": "Sand",
  "natural.land.landCover.ice": "Ice",
  "natural.land.landCover.dryCrops": "Dry crops",
  "natural.land.landCover.tundra": "Tundra",
  "infrastructure.building.commercial": "Commercial",
  "infrastructure.businessCorridor": "Corridors",
  "pointOfInterest.recreation.natureReserve": "Nature reserve",
  "pointOfInterest.recreation.golfCourse": "Golf",
  "pointOfInterest.recreation.sportsComplex": "Sports complex",
  "pointOfInterest.recreation.sportsField": "Sports field",
  "pointOfInterest.recreation.zoo": "Zoo",
  "pointOfInterest.other.cemetery": "Cemetery",
  "pointOfInterest.emergency.hospital": "Hospital",
  "pointOfInterest.transit.airport": "Airport",
  "political.reservation": "Reservation",
};

const FEATS_RU: Record<string, string> = {
  "natural.land": "Земля",
  "natural.water": "Вода",
  "infrastructure.urbanArea": "Кварталы",
  "infrastructure.building": "Здания",
  "infrastructure.roadNetwork.road.local": "Дворы и улицы",
  "infrastructure.roadNetwork.road.arterial": "Магистрали",
  "infrastructure.roadNetwork.road.highway": "Шоссе",
  "infrastructure.roadNetwork.ramp": "Съезды",
  "pointOfInterest.recreation.park": "Парки",
  pointOfInterest: "Места",
  "political.border": "Границы",
  "natural.land.landCover.forest": "Лес",
  "natural.land.landCover.crops": "Поля",
  "natural.land.landCover.shrub": "Кустарник",
  "natural.land.landCover.sand": "Песок",
  "natural.land.landCover.ice": "Лёд",
  "natural.land.landCover.dryCrops": "Сухие поля",
  "natural.land.landCover.tundra": "Тундра",
  "infrastructure.building.commercial": "Коммерция",
  "infrastructure.businessCorridor": "Коридоры",
  "pointOfInterest.recreation.natureReserve": "Заповедник",
  "pointOfInterest.recreation.golfCourse": "Гольф",
  "pointOfInterest.recreation.sportsComplex": "Спорткомплекс",
  "pointOfInterest.recreation.sportsField": "Площадка",
  "pointOfInterest.recreation.zoo": "Зоопарк",
  "pointOfInterest.other.cemetery": "Кладбище",
  "pointOfInterest.emergency.hospital": "Больница",
  "pointOfInterest.transit.airport": "Аэропорт",
  "political.reservation": "Резервация",
};

export type Copy = {
  feats: Record<string, string>;
  presets: Record<string, { name: string; note: string }>;
  places: Record<string, string>;
  briefs: string[];
  brief: string;
  briefPlaceholder: string;
  compose: string;
  composing: string;
  composeHint: string;
  composeFail: string;
  plates: string;
  base: string;
  darkTemplate: string;
  lightTemplate: string;
  palette: string;
  moreSurfaces: string;
  cloudJson: string;
  cloudHint: string;
  applyJson: string;
  download: string;
  customPlate: string;
  undo: string;
  redo: string;
  copyJson: string;
  copied: string;
  hide: string;
  show: string;
  chartError: string;
  chartLoading: string;
  chartErrorHint: string;
  chartLoadingHint: string;
  tryAgain: string;
  jsonInvalid: string;
  clipboardBlocked: string;
  backToRoad: string;
  langLabel: string;
  appName: string;
  appTag: string;
  seriesDay: string;
  seriesNight: string;
  searchPlaceholder: string;
  go: string;
  stop: string;
  again: string;
  locate: string;
  style: string;
  north: string;
  heading: string;
  trip: string;
  wild: string;
  resetTrip: string;
  routing: string;
  searching: string;
  noHits: string;
  routeFail: string;
  gpsMissing: string;
  gpsDenied: string;
  home: string;
  toAustralia: string;
  speed: string;
  zoomIn: string;
  zoomOut: string;
  arrived: string;
  cathedral: string;
  prospect: string;
  opera: string;
};

const en: Copy = {
  feats: FEATS_EN,
  presets: {
    strelson: { name: "Non-Strelson", note: "Toy streets and candy blocks" },
    "strelson-night": { name: "Non-Strelson Night", note: "Indigo blocks, butter roads" },
    signal: { name: "Signal Night", note: "Cyan highways, rose pins" },
    paper: { name: "Paper Coast", note: "Newsprint and terracotta" },
    ember: { name: "Ember District", note: "Sodium light on charcoal" },
    glass: { name: "Glass Harbor", note: "Fog, teal, and slate" },
  },
  places: {
    sarov: "Sarov",
    australia: "Australia",
    harbor: "Harbor",
    grid: "Grid",
    canals: "Canals",
    desert: "Desert",
    alpine: "Alpine",
  },
  briefs: [
    "Night harbor, cyan highways, rose pins, ink water",
    "Newsprint atlas, terracotta arterials, pale sea",
    "Rain-soaked charcoal, sodium highways, warm windows",
    "Arctic station, ice fields, hazard-orange roads",
  ],
  brief: "Brief",
  briefPlaceholder: "Night harbor, cyan highways, rose pins",
  compose: "Compose style",
  composing: "Composing…",
  composeHint: "Writes a Google Cloud style JSON, then paints it on the chart.",
  composeFail: "Couldn't compose that style.",
  plates: "Plates",
  base: "Base",
  darkTemplate: "Dark template",
  lightTemplate: "Light template",
  palette: "Palette",
  moreSurfaces: "More surfaces",
  cloudJson: "Cloud JSON",
  cloudHint: "Paste this into Google Maps Platform → Map styles. The chart is an OpenStreetMap preview painted with the same colors.",
  applyJson: "Apply JSON",
  download: "Download",
  customPlate: "Custom plate",
  undo: "Undo",
  redo: "Redo",
  copyJson: "Copy JSON",
  copied: "Copied",
  hide: "Hide",
  show: "Show",
  chartError: "The chart didn’t load.",
  chartLoading: "Setting the chart…",
  chartErrorHint: "The basemap didn’t respond. Try again in a moment.",
  chartLoadingHint: "Painting land, water, and streets with your plate.",
  tryAgain: "Try again",
  jsonInvalid: "That JSON isn’t a cloud map style. It needs a styles array.",
  clipboardBlocked: "Clipboard was blocked. Select the JSON below and copy it.",
  backToRoad: "Back",
  langLabel: "Language",
  appName: "Simetria",
  appTag: "Non-Strelson series",
  seriesDay: "Day",
  seriesNight: "Night",
  searchPlaceholder: "Where to?",
  go: "Drive",
  stop: "Stop",
  again: "Again",
  locate: "Locate",
  style: "Style",
  north: "North",
  heading: "Heading",
  trip: "Odometer",
  wild: "Heck meter",
  resetTrip: "Reset",
  routing: "Building the route…",
  searching: "Searching…",
  noHits: "Nothing matched.",
  routeFail: "No drivable route there. Pick a point on land.",
  gpsMissing: "This browser has no location.",
  gpsDenied: "Location is blocked. The demo drive still works.",
  home: "Home, Sarov",
  toAustralia: "To Australia",
  speed: "Speed",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  arrived: "You have arrived",
  cathedral: "Cathedral",
  prospect: "Prospekt Mira",
  opera: "Opera House",
};

const ru: Copy = {
  feats: FEATS_RU,
  presets: {
    strelson: { name: "Non-Strelson", note: "Игрушечные улицы и конфетные дома" },
    "strelson-night": { name: "Non-Strelson ночь", note: "Индиго-кварталы, масляные дороги" },
    signal: { name: "Ночной сигнал", note: "Бирюзовые шоссе, алые пины" },
    paper: { name: "Бумажный берег", note: "Газетная бумага и терракота" },
    ember: { name: "Угольный район", note: "Натриевый свет на угле" },
    glass: { name: "Стеклянная гавань", note: "Туман, тил и сланец" },
  },
  places: {
    sarov: "Саров",
    australia: "Австралия",
    harbor: "Гавань",
    grid: "Сетка",
    canals: "Каналы",
    desert: "Пустыня",
    alpine: "Альпы",
  },
  briefs: [
    "Ночная гавань, бирюзовые шоссе, алые пины, чернильная вода",
    "Газетный атлас, терракотовые магистрали, бледное море",
    "Мокрый уголь, натриевые шоссе, тёплые окна",
    "Арктическая станция, ледяные поля, аварийно-оранжевые дороги",
  ],
  brief: "Бриф",
  briefPlaceholder: "Ночная гавань, бирюзовые шоссе, алые пины",
  compose: "Собрать стиль",
  composing: "Собираем…",
  composeHint: "Пишет JSON стиля Google Cloud и красит им карту.",
  composeFail: "Не удалось собрать стиль.",
  plates: "Плашки",
  base: "Основа",
  darkTemplate: "Тёмный шаблон",
  lightTemplate: "Светлый шаблон",
  palette: "Палитра",
  moreSurfaces: "Ещё поверхности",
  cloudJson: "JSON для Cloud",
  cloudHint: "Вставьте это в Google Maps Platform → стили карты. Карта здесь — предпросмотр OpenStreetMap теми же цветами.",
  applyJson: "Применить JSON",
  download: "Скачать",
  customPlate: "Своя плашка",
  undo: "Отменить",
  redo: "Повторить",
  copyJson: "Копировать JSON",
  copied: "Скопировано",
  hide: "Скрыть",
  show: "Показать",
  chartError: "Карта не загрузилась.",
  chartLoading: "Готовим карту…",
  chartErrorHint: "Подложка не ответила. Повторите через момент.",
  chartLoadingHint: "Красим землю, воду и улицы вашей плашкой.",
  tryAgain: "Ещё раз",
  jsonInvalid: "Это не стиль облачной карты. Нужен массив styles.",
  clipboardBlocked: "Буфер закрыт. Выделите JSON ниже и скопируйте.",
  backToRoad: "Назад",
  langLabel: "Язык",
  appName: "Симе́трия",
  appTag: "Серия Non-Strelson",
  seriesDay: "День",
  seriesNight: "Ночь",
  searchPlaceholder: "Куда едем?",
  go: "Поехать",
  stop: "Стоп",
  again: "Ещё раз",
  locate: "Где я",
  style: "Стиль",
  north: "Север",
  heading: "По курсу",
  trip: "Одометр",
  wild: "Хуёметр",
  resetTrip: "Сброс",
  routing: "Строим маршрут…",
  searching: "Ищем…",
  noHits: "Ничего не нашлось.",
  routeFail: "По дорогам туда не доехать. Выберите точку на суше.",
  gpsMissing: "В этом браузере нет геолокации.",
  gpsDenied: "Геолокация закрыта. Демо-поездка всё равно работает.",
  home: "Домой, в Саров",
  toAustralia: "В Австралию",
  speed: "Скорость",
  zoomIn: "Ближе",
  zoomOut: "Дальше",
  arrived: "Вы на месте",
  cathedral: "Собор",
  prospect: "Проспект Мира",
  opera: "Оперный театр",
};

const COPY: Record<Lang, Copy> = { en, ru };
const STORAGE_KEY = "meridian-lang";

const Ctx = createContext<{ lang: Lang; setLang: (lang: Lang) => void; copy: Copy } | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ru") setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, copy: COPY[lang] }), [lang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const value = useContext(Ctx);
  if (!value) throw new Error("Language provider is missing.");
  return value;
}

export function LangToggle() {
  const { lang, setLang, copy } = useI18n();
  return (
    <div
      role="group"
      aria-label={copy.langLabel}
      className="flex h-11 shrink-0 items-center rounded-full border border-paper/15 bg-ink p-1"
    >
      {(["ru", "en"] as const).map((id) => {
        const on = lang === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={on}
            onClick={() => setLang(id)}
            className={
              on
                ? "h-9 rounded-full bg-paper px-3 text-sm font-medium text-ink"
                : "h-9 rounded-full px-3 text-sm text-fog"
            }
          >
            {id === "ru" ? "Рус" : "EN"}
          </button>
        );
      })}
    </div>
  );
}

export function formatDistance(lang: Lang, meters: number): string {
  const safe = Math.max(0, meters);
  if (safe < 15) return lang === "ru" ? "0 м" : "0 m";
  if (safe < 950) {
    const rounded = Math.max(10, Math.round(safe / 10) * 10);
    return lang === "ru" ? `${rounded} м` : `${rounded} m`;
  }
  const km = safe / 1000;
  const text = (km < 10 ? km.toFixed(1) : Math.round(km).toString()).replace(".", lang === "ru" ? "," : ".");
  return lang === "ru" ? `${text} км` : `${text} km`;
}

export function formatDuration(lang: Lang, seconds: number): string {
  const min = Math.max(1, Math.round(seconds / 60));
  if (min < 60) return lang === "ru" ? `${min} мин` : `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return lang === "ru" ? `${h} ч ${m} мин` : `${h} h ${m} min`;
}

export function instruction(lang: Lang, type: string, modifier: string): string {
  if (type === "arrive") return lang === "ru" ? "Вы на месте" : "You have arrived";
  if (type === "depart") return lang === "ru" ? "Начинайте движение" : "Start driving";
  if (type === "roundabout" || type === "rotary") return lang === "ru" ? "На кольцо" : "Enter the roundabout";
  if (type === "merge") return lang === "ru" ? "Перестройтесь" : "Merge";
  if (type === "fork" || type === "end of road") {
    if (modifier.includes("left")) return lang === "ru" ? "Держитесь левее" : "Keep left";
    if (modifier.includes("right")) return lang === "ru" ? "Держитесь правее" : "Keep right";
  }
  const table: Record<string, [string, string]> = {
    left: ["Налево", "Turn left"],
    right: ["Направо", "Turn right"],
    straight: ["Прямо", "Continue straight"],
    "slight left": ["Плавно налево", "Bear left"],
    "slight right": ["Плавно направо", "Bear right"],
    "sharp left": ["Резко налево", "Sharp left"],
    "sharp right": ["Резко направо", "Sharp right"],
    uturn: ["Разворот", "Make a U-turn"],
  };
  const pair = table[modifier] ?? table.straight;
  return lang === "ru" ? pair[0] : pair[1];
}
