import { i as __toESM } from "../_runtime.mjs";
import { _ as createFileRoute, b as require_jsx_runtime, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, q as require_react, v as createRootRoute, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-zsURi0A_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var COPY = {
	en: {
		feats: {
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
			"political.reservation": "Reservation"
		},
		presets: {
			strelson: {
				name: "Non-Strelson",
				note: "Toy streets and candy blocks"
			},
			"strelson-night": {
				name: "Non-Strelson Night",
				note: "Indigo blocks, butter roads"
			},
			signal: {
				name: "Signal Night",
				note: "Cyan highways, rose pins"
			},
			paper: {
				name: "Paper Coast",
				note: "Newsprint and terracotta"
			},
			ember: {
				name: "Ember District",
				note: "Sodium light on charcoal"
			},
			glass: {
				name: "Glass Harbor",
				note: "Fog, teal, and slate"
			}
		},
		places: {
			sarov: "Sarov",
			australia: "Australia",
			harbor: "Harbor",
			grid: "Grid",
			canals: "Canals",
			desert: "Desert",
			alpine: "Alpine"
		},
		briefs: [
			"Night harbor, cyan highways, rose pins, ink water",
			"Newsprint atlas, terracotta arterials, pale sea",
			"Rain-soaked charcoal, sodium highways, warm windows",
			"Arctic station, ice fields, hazard-orange roads"
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
		opera: "Opera House"
	},
	ru: {
		feats: {
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
			"political.reservation": "Резервация"
		},
		presets: {
			strelson: {
				name: "Non-Strelson",
				note: "Игрушечные улицы и конфетные дома"
			},
			"strelson-night": {
				name: "Non-Strelson ночь",
				note: "Индиго-кварталы, масляные дороги"
			},
			signal: {
				name: "Ночной сигнал",
				note: "Бирюзовые шоссе, алые пины"
			},
			paper: {
				name: "Бумажный берег",
				note: "Газетная бумага и терракота"
			},
			ember: {
				name: "Угольный район",
				note: "Натриевый свет на угле"
			},
			glass: {
				name: "Стеклянная гавань",
				note: "Туман, тил и сланец"
			}
		},
		places: {
			sarov: "Саров",
			australia: "Австралия",
			harbor: "Гавань",
			grid: "Сетка",
			canals: "Каналы",
			desert: "Пустыня",
			alpine: "Альпы"
		},
		briefs: [
			"Ночная гавань, бирюзовые шоссе, алые пины, чернильная вода",
			"Газетный атлас, терракотовые магистрали, бледное море",
			"Мокрый уголь, натриевые шоссе, тёплые окна",
			"Арктическая станция, ледяные поля, аварийно-оранжевые дороги"
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
		opera: "Оперный театр"
	}
};
var STORAGE_KEY = "meridian-lang";
var Ctx = (0, import_react.createContext)(null);
function I18nProvider({ children }) {
	const [lang, setLang] = (0, import_react.useState)("ru");
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved === "en" || saved === "ru") setLang(saved);
	}, []);
	(0, import_react.useEffect)(() => {
		localStorage.setItem(STORAGE_KEY, lang);
		document.documentElement.lang = lang;
	}, [lang]);
	const value = (0, import_react.useMemo)(() => ({
		lang,
		setLang,
		copy: COPY[lang]
	}), [lang]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useI18n() {
	const value = (0, import_react.useContext)(Ctx);
	if (!value) throw new Error("Language provider is missing.");
	return value;
}
function LangToggle() {
	const { lang, setLang, copy } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"aria-label": copy.langLabel,
		className: "flex h-11 shrink-0 items-center rounded-full border border-paper/15 bg-ink p-1",
		children: ["ru", "en"].map((id) => {
			const on = lang === id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": on,
				onClick: () => setLang(id),
				className: on ? "h-9 rounded-full bg-paper px-3 text-sm font-medium text-ink" : "h-9 rounded-full px-3 text-sm text-fog",
				children: id === "ru" ? "Рус" : "EN"
			}, id);
		})
	});
}
function formatDistance(lang, meters) {
	const safe = Math.max(0, meters);
	if (safe < 15) return lang === "ru" ? "0 м" : "0 m";
	if (safe < 950) {
		const rounded = Math.max(10, Math.round(safe / 10) * 10);
		return lang === "ru" ? `${rounded} м` : `${rounded} m`;
	}
	const km = safe / 1e3;
	const text = (km < 10 ? km.toFixed(1) : Math.round(km).toString()).replace(".", lang === "ru" ? "," : ".");
	return lang === "ru" ? `${text} км` : `${text} km`;
}
function formatDuration(lang, seconds) {
	const min = Math.max(1, Math.round(seconds / 60));
	if (min < 60) return lang === "ru" ? `${min} мин` : `${min} min`;
	const h = Math.floor(min / 60);
	const m = min % 60;
	return lang === "ru" ? `${h} ч ${m} мин` : `${h} h ${m} min`;
}
function instruction(lang, type, modifier) {
	if (type === "arrive") return lang === "ru" ? "Вы на месте" : "You have arrived";
	if (type === "depart") return lang === "ru" ? "Начинайте движение" : "Start driving";
	if (type === "roundabout" || type === "rotary") return lang === "ru" ? "На кольцо" : "Enter the roundabout";
	if (type === "merge") return lang === "ru" ? "Перестройтесь" : "Merge";
	if (type === "fork" || type === "end of road") {
		if (modifier.includes("left")) return lang === "ru" ? "Держитесь левее" : "Keep left";
		if (modifier.includes("right")) return lang === "ru" ? "Держитесь правее" : "Keep right";
	}
	const table = {
		left: ["Налево", "Turn left"],
		right: ["Направо", "Turn right"],
		straight: ["Прямо", "Continue straight"],
		"slight left": ["Плавно налево", "Bear left"],
		"slight right": ["Плавно направо", "Bear right"],
		"sharp left": ["Резко налево", "Sharp left"],
		"sharp right": ["Резко направо", "Sharp right"],
		uturn: ["Разворот", "Make a U-turn"]
	};
	const pair = table[modifier] ?? table.straight;
	return lang === "ru" ? pair[0] : pair[1];
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-Dz05TLaV.css";
var APP_NAME = "Simetria";
var Route$1 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Симе́трия — мультяшный навигатор: Саров и Австралия, GPS, спидометр и стиль Non-Strelson."
			},
			{
				name: "theme-color",
				content: "#1c1430"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "h-full antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "h-full bg-ink text-paper",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter = () => import("./routes-C8f5-4CD.mjs");
var rootRouteChildren = { IndexRoute: createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") }).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { instruction as a, formatDuration as i, LangToggle as n, useI18n as o, formatDistance as r, router_exports as t };
