//#region node_modules/.nitro/vite/services/ssr/assets/cloud-style-BIT75FBC.js
var FEATURE_IDS = [
	"natural.base",
	"natural.land",
	"natural.land.landCover",
	"natural.land.landCover.crops",
	"natural.land.landCover.dryCrops",
	"natural.land.landCover.forest",
	"natural.land.landCover.ice",
	"natural.land.landCover.sand",
	"natural.land.landCover.shrub",
	"natural.land.landCover.tundra",
	"natural.water",
	"infrastructure.urbanArea",
	"infrastructure.businessCorridor",
	"infrastructure.building",
	"infrastructure.building.commercial",
	"infrastructure.roadNetwork.road",
	"infrastructure.roadNetwork.road.local",
	"infrastructure.roadNetwork.road.arterial",
	"infrastructure.roadNetwork.road.highway",
	"infrastructure.roadNetwork.ramp",
	"pointOfInterest",
	"pointOfInterest.recreation.park",
	"pointOfInterest.recreation.natureReserve",
	"pointOfInterest.recreation.golfCourse",
	"pointOfInterest.recreation.sportsComplex",
	"pointOfInterest.recreation.sportsField",
	"pointOfInterest.recreation.zoo",
	"pointOfInterest.other.cemetery",
	"pointOfInterest.emergency.hospital",
	"pointOfInterest.transit.airport",
	"political.reservation",
	"political.border"
];
var FEATURE_SET = new Set(FEATURE_IDS);
var SIGNAL_NIGHT = {
	variant: "dark",
	backgroundColor: "#0b111e",
	styles: [
		{
			id: "natural.base",
			geometry: {
				visible: true,
				fillColor: "#0b111e"
			}
		},
		{
			id: "natural.land",
			geometry: {
				visible: true,
				fillColor: "#0b111e"
			}
		},
		{
			id: "natural.land.landCover",
			geometry: {
				visible: true,
				fillColor: "#0f292f"
			}
		},
		{
			id: "natural.land.landCover.crops",
			geometry: {
				visible: true,
				fillColor: "#0f292f"
			}
		},
		{
			id: "natural.land.landCover.dryCrops",
			geometry: {
				visible: true,
				fillColor: "#0b111e"
			}
		},
		{
			id: "natural.land.landCover.forest",
			geometry: {
				visible: true,
				fillColor: "#11383f"
			}
		},
		{
			id: "natural.land.landCover.ice",
			geometry: {
				visible: true,
				fillColor: "#101829"
			}
		},
		{
			id: "natural.land.landCover.sand",
			geometry: {
				visible: true,
				fillColor: "#101829"
			}
		},
		{
			id: "natural.land.landCover.shrub",
			geometry: {
				visible: true,
				fillColor: "#0f292f"
			}
		},
		{
			id: "natural.land.landCover.tundra",
			geometry: {
				visible: true,
				fillColor: "#0b111e"
			}
		},
		{
			id: "natural.water",
			geometry: {
				visible: true,
				fillColor: "#071327"
			},
			label: {
				visible: true,
				textFillColor: "#38bdf8",
				textStrokeColor: "#071327"
			}
		},
		{
			id: "infrastructure.urbanArea",
			geometry: {
				visible: true,
				fillColor: "#101829"
			}
		},
		{
			id: "infrastructure.businessCorridor",
			geometry: {
				visible: true,
				fillColor: "#101829"
			}
		},
		{
			id: "infrastructure.building",
			geometry: {
				visible: true,
				fillColor: "#233554"
			},
			label: {
				visible: true,
				textFillColor: "#e2e8f0",
				textStrokeColor: "#0b111e"
			}
		},
		{
			id: "infrastructure.building.commercial",
			geometry: {
				visible: true,
				fillColor: "#314b78"
			}
		},
		{
			id: "infrastructure.roadNetwork.road",
			geometry: {
				visible: true,
				fillColor: "#1c2a44"
			},
			label: {
				visible: true,
				textFillColor: "#e2e8f0",
				textStrokeColor: "#0b111e"
			}
		},
		{
			id: "infrastructure.roadNetwork.road.local",
			geometry: {
				visible: true,
				fillColor: "#1c2a44"
			},
			label: {
				visible: true,
				textFillColor: "#e2e8f0",
				textStrokeColor: "#0b111e"
			}
		},
		{
			id: "infrastructure.roadNetwork.road.arterial",
			geometry: {
				visible: true,
				fillColor: "#6366f1",
				strokeColor: "#1c2a44"
			},
			label: {
				visible: true,
				textFillColor: "#e2e8f0",
				textStrokeColor: "#0b111e"
			}
		},
		{
			id: "infrastructure.roadNetwork.road.highway",
			geometry: {
				visible: true,
				fillColor: "#00e5ff",
				strokeColor: "#0284c7"
			},
			label: {
				visible: true,
				textFillColor: "#e2e8f0",
				textStrokeColor: "#0b111e"
			}
		},
		{
			id: "infrastructure.roadNetwork.ramp",
			geometry: {
				visible: true,
				fillColor: "#6366f1"
			}
		},
		{
			id: "pointOfInterest",
			label: {
				visible: true,
				pinFillColor: "#f43f5e",
				textFillColor: "#f8fafc",
				textStrokeColor: "#0b111e"
			}
		},
		{
			id: "pointOfInterest.recreation.park",
			geometry: {
				visible: true,
				fillColor: "#0f292f"
			},
			label: {
				visible: true,
				pinFillColor: "#11383f",
				textFillColor: "#f8fafc",
				textStrokeColor: "#0b111e"
			}
		},
		{
			id: "pointOfInterest.recreation.natureReserve",
			geometry: {
				visible: true,
				fillColor: "#11383f"
			},
			label: {
				visible: true,
				textFillColor: "#f8fafc",
				textStrokeColor: "#0b111e"
			}
		},
		{
			id: "pointOfInterest.recreation.golfCourse",
			geometry: {
				visible: true,
				fillColor: "#0f292f"
			}
		},
		{
			id: "pointOfInterest.recreation.sportsComplex",
			geometry: {
				visible: true,
				fillColor: "#0f292f"
			}
		},
		{
			id: "pointOfInterest.recreation.sportsField",
			geometry: {
				visible: true,
				fillColor: "#0f292f"
			}
		},
		{
			id: "pointOfInterest.recreation.zoo",
			geometry: {
				visible: true,
				fillColor: "#0f292f"
			}
		},
		{
			id: "pointOfInterest.other.cemetery",
			geometry: {
				visible: true,
				fillColor: "#0f292f"
			}
		},
		{
			id: "pointOfInterest.emergency.hospital",
			geometry: {
				visible: true,
				fillColor: "#314b78"
			}
		},
		{
			id: "pointOfInterest.transit.airport",
			geometry: {
				visible: true,
				fillColor: "#101829"
			}
		},
		{
			id: "political.reservation",
			geometry: {
				visible: true,
				fillColor: "#0f292f"
			}
		},
		{
			id: "political.border",
			geometry: { color: "#38bdf8" }
		}
	],
	metadata: {
		createdBy: "Maps Styling AI Studio app",
		createdTime: "11.10.2026, 16:46:53"
	}
};
function normHex(value) {
	if (typeof value !== "string") return void 0;
	let v = value.trim().toLowerCase();
	if (!v.startsWith("#")) v = `#${v}`;
	if (/^#[0-9a-f]{3}$/.test(v)) v = `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`;
	if (!/^#[0-9a-f]{6}$/.test(v)) return void 0;
	return v;
}
function formatNow(date = /* @__PURE__ */ new Date()) {
	const pad = (n) => String(n).padStart(2, "0");
	return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}, ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
function pretty(doc) {
	return JSON.stringify(doc, null, 2);
}
function sameLook(a, b) {
	return a.variant === b.variant && a.backgroundColor === b.backgroundColor && JSON.stringify(a.styles) === JSON.stringify(b.styles);
}
function touchMeta(doc) {
	return {
		...doc,
		metadata: {
			createdBy: "Simetria",
			createdTime: formatNow()
		}
	};
}
function rule(doc, id) {
	return doc.styles.find((item) => item.id === id);
}
function walk(id) {
	const ids = [];
	let cur = id;
	while (cur) {
		ids.push(cur);
		const dot = cur.lastIndexOf(".");
		cur = dot === -1 ? void 0 : cur.slice(0, dot);
	}
	return ids;
}
function fillColor(doc, id) {
	for (const cur of walk(id)) {
		const fill = rule(doc, cur)?.geometry?.fillColor;
		if (fill) return fill;
	}
}
function strokeColor(doc, id) {
	for (const cur of walk(id)) {
		const stroke = rule(doc, cur)?.geometry?.strokeColor;
		if (stroke) return stroke;
	}
}
function geometryVisible(doc, id) {
	for (const cur of walk(id)) {
		const visible = rule(doc, cur)?.geometry?.visible;
		if (visible === false) return false;
		if (visible === true) return true;
	}
	return true;
}
function labelInk(doc, id) {
	let text;
	let stroke;
	let pin;
	let visible = true;
	let seenVis = false;
	for (const cur of walk(id)) {
		const label = rule(doc, cur)?.label;
		if (!label) continue;
		if (!text && label.textFillColor) text = label.textFillColor;
		if (!stroke && label.textStrokeColor) stroke = label.textStrokeColor;
		if (!pin && label.pinFillColor) pin = label.pinFillColor;
		if (!seenVis && label.visible !== void 0) {
			visible = label.visible;
			seenVis = true;
		}
	}
	return {
		text,
		stroke,
		pin,
		visible
	};
}
function updateRule(doc, id, fn) {
	const styles = doc.styles.some((item) => item.id === id) ? doc.styles.map((item) => item.id === id ? fn(item) : item) : [...doc.styles, fn({ id })];
	return {
		...doc,
		styles
	};
}
function setFill(doc, id, color) {
	const hex = normHex(color);
	if (!hex) return doc;
	return updateRule(doc, id, (item) => ({
		...item,
		geometry: {
			...item.geometry,
			fillColor: hex
		}
	}));
}
function setStroke(doc, id, color) {
	const hex = normHex(color);
	if (!hex) return doc;
	return updateRule(doc, id, (item) => ({
		...item,
		geometry: {
			...item.geometry,
			strokeColor: hex
		}
	}));
}
function setBorderColor(doc, color) {
	const hex = normHex(color);
	if (!hex) return doc;
	return updateRule(doc, "political.border", (item) => ({
		...item,
		geometry: {
			...item.geometry,
			color: hex
		}
	}));
}
function setGround(doc, color) {
	const hex = normHex(color);
	if (!hex) return doc;
	let next = {
		...doc,
		backgroundColor: hex
	};
	next = setFill(next, "natural.base", hex);
	next = setFill(next, "natural.land", hex);
	return next;
}
function setVisible(doc, id, visible) {
	return updateRule(doc, id, (item) => ({
		...item,
		geometry: {
			...item.geometry,
			visible
		}
	}));
}
function setLabelColor(doc, id, color) {
	const hex = normHex(color);
	if (!hex) return doc;
	return updateRule(doc, id, (item) => ({
		...item,
		label: {
			...item.label,
			visible: item.label?.visible ?? true,
			textFillColor: hex
		}
	}));
}
function setPin(doc, id, color) {
	const hex = normHex(color);
	if (!hex) return doc;
	return updateRule(doc, id, (item) => ({
		...item,
		label: {
			...item.label,
			visible: item.label?.visible ?? true,
			pinFillColor: hex
		}
	}));
}
function setVariant(doc, variant) {
	return {
		...doc,
		variant
	};
}
function cleanGeometry(value) {
	if (!value || typeof value !== "object") return void 0;
	const raw = value;
	const geometry = {};
	if (typeof raw.visible === "boolean") geometry.visible = raw.visible;
	const fill = normHex(raw.fillColor);
	const stroke = normHex(raw.strokeColor);
	const color = normHex(raw.color);
	if (fill) geometry.fillColor = fill;
	if (stroke) geometry.strokeColor = stroke;
	if (color) geometry.color = color;
	return geometry;
}
function cleanLabel(value) {
	if (!value || typeof value !== "object") return void 0;
	const raw = value;
	const label = {};
	if (typeof raw.visible === "boolean") label.visible = raw.visible;
	const text = normHex(raw.textFillColor);
	const stroke = normHex(raw.textStrokeColor);
	const pin = normHex(raw.pinFillColor);
	if (text) label.textFillColor = text;
	if (stroke) label.textStrokeColor = stroke;
	if (pin) label.pinFillColor = pin;
	return label;
}
function parseCloudStyle(input) {
	let value = input;
	if (typeof input === "string") {
		const text = input.trim();
		if (!text) return null;
		try {
			value = JSON.parse(text);
		} catch {
			return null;
		}
	}
	if (!value || typeof value !== "object") return null;
	const raw = value;
	if (!Array.isArray(raw.styles)) return null;
	const styles = [];
	for (const item of raw.styles) {
		if (!item || typeof item !== "object") continue;
		const id = item.id;
		if (typeof id !== "string" || !id.trim()) continue;
		const geometry = cleanGeometry(item.geometry);
		const label = cleanLabel(item.label);
		const next = { id: id.trim() };
		if (geometry && Object.keys(geometry).length > 0) next.geometry = geometry;
		if (label && Object.keys(label).length > 0) next.label = label;
		styles.push(next);
	}
	if (styles.length === 0) return null;
	const variant = raw.variant === "light" ? "light" : "dark";
	const backgroundColor = normHex(raw.backgroundColor) ?? "#0b111e";
	let metadata;
	if (raw.metadata && typeof raw.metadata === "object") {
		const meta = raw.metadata;
		metadata = {};
		if (typeof meta.createdBy === "string") metadata.createdBy = meta.createdBy;
		if (typeof meta.createdTime === "string") metadata.createdTime = meta.createdTime;
	}
	return {
		variant,
		backgroundColor,
		styles,
		...metadata ? { metadata } : {}
	};
}
function recolor(variant, backgroundColor, fills, options) {
	const doc = structuredClone(SIGNAL_NIGHT);
	doc.variant = variant;
	doc.backgroundColor = backgroundColor;
	doc.metadata = {
		createdBy: "Simetria",
		createdTime: "14.10.2026, 20:01:00"
	};
	for (const item of doc.styles) {
		if (item.geometry) {
			const fill = fills[item.id];
			if (fill) item.geometry.fillColor = fill;
			const stroke = options.strokes?.[item.id];
			if (stroke) item.geometry.strokeColor = stroke;
			if (item.id === "political.border") item.geometry.color = options.border;
		}
		if (item.label) {
			if (item.label.textFillColor) item.label.textFillColor = options.text;
			if (item.label.textStrokeColor) item.label.textStrokeColor = options.textStroke;
			if (item.label.pinFillColor) item.label.pinFillColor = options.pin;
		}
	}
	return doc;
}
var PAPER_FILLS = {
	"natural.base": "#f3efe6",
	"natural.land": "#f3efe6",
	"natural.land.landCover": "#e5eddc",
	"natural.land.landCover.crops": "#e3ecd4",
	"natural.land.landCover.dryCrops": "#efe4cf",
	"natural.land.landCover.forest": "#d3e2c6",
	"natural.land.landCover.ice": "#e7eef2",
	"natural.land.landCover.sand": "#efe2cc",
	"natural.land.landCover.shrub": "#dce8d2",
	"natural.land.landCover.tundra": "#e6e2d6",
	"natural.water": "#b7cdd9",
	"infrastructure.urbanArea": "#e8e2d6",
	"infrastructure.businessCorridor": "#e4ddd0",
	"infrastructure.building": "#fffaf3",
	"infrastructure.building.commercial": "#f3e6d4",
	"infrastructure.roadNetwork.road": "#fffdf8",
	"infrastructure.roadNetwork.road.local": "#fffdf8",
	"infrastructure.roadNetwork.road.arterial": "#e39b62",
	"infrastructure.roadNetwork.road.highway": "#c2410c",
	"infrastructure.roadNetwork.ramp": "#e39b62",
	"pointOfInterest.recreation.park": "#d3e2c6",
	"pointOfInterest.recreation.natureReserve": "#c5d8b8",
	"pointOfInterest.recreation.golfCourse": "#d3e2c6",
	"pointOfInterest.recreation.sportsComplex": "#d7e4cc",
	"pointOfInterest.recreation.sportsField": "#d7e4cc",
	"pointOfInterest.recreation.zoo": "#d3e2c6",
	"pointOfInterest.other.cemetery": "#e4e0d6",
	"pointOfInterest.emergency.hospital": "#f3e6d4",
	"pointOfInterest.transit.airport": "#e8e2d6",
	"political.reservation": "#e3ecd4"
};
var EMBER_FILLS = {
	"natural.base": "#140e0c",
	"natural.land": "#140e0c",
	"natural.land.landCover": "#1b2420",
	"natural.land.landCover.crops": "#1a221c",
	"natural.land.landCover.dryCrops": "#1c1612",
	"natural.land.landCover.forest": "#1c2820",
	"natural.land.landCover.ice": "#241e22",
	"natural.land.landCover.sand": "#2a1c14",
	"natural.land.landCover.shrub": "#1b2822",
	"natural.land.landCover.tundra": "#1a1412",
	"natural.water": "#241820",
	"infrastructure.urbanArea": "#1c1614",
	"infrastructure.businessCorridor": "#241816",
	"infrastructure.building": "#2c2220",
	"infrastructure.building.commercial": "#3a2a26",
	"infrastructure.roadNetwork.road": "#3a2c28",
	"infrastructure.roadNetwork.road.local": "#3a2c28",
	"infrastructure.roadNetwork.road.arterial": "#c2410c",
	"infrastructure.roadNetwork.road.highway": "#ff6b3d",
	"infrastructure.roadNetwork.ramp": "#c2410c",
	"pointOfInterest.recreation.park": "#1c2820",
	"pointOfInterest.recreation.natureReserve": "#24352c",
	"pointOfInterest.recreation.golfCourse": "#1c2820",
	"pointOfInterest.recreation.sportsComplex": "#243028",
	"pointOfInterest.recreation.sportsField": "#243028",
	"pointOfInterest.recreation.zoo": "#1c2820",
	"pointOfInterest.other.cemetery": "#241c1a",
	"pointOfInterest.emergency.hospital": "#3a2a26",
	"pointOfInterest.transit.airport": "#1c1614",
	"political.reservation": "#1b2420"
};
var GLASS_FILLS = {
	"natural.base": "#e6eef1",
	"natural.land": "#e6eef1",
	"natural.land.landCover": "#d5e6e0",
	"natural.land.landCover.crops": "#d7ebe3",
	"natural.land.landCover.dryCrops": "#e7eee8",
	"natural.land.landCover.forest": "#c5ddd4",
	"natural.land.landCover.ice": "#f4f8fa",
	"natural.land.landCover.sand": "#efe6d4",
	"natural.land.landCover.shrub": "#d0e4dc",
	"natural.land.landCover.tundra": "#e4ecee",
	"natural.water": "#7eb0c2",
	"infrastructure.urbanArea": "#d5e2e6",
	"infrastructure.businessCorridor": "#d0dde3",
	"infrastructure.building": "#f7fbfc",
	"infrastructure.building.commercial": "#e7f1f4",
	"infrastructure.roadNetwork.road": "#f8fcfd",
	"infrastructure.roadNetwork.road.local": "#f8fcfd",
	"infrastructure.roadNetwork.road.arterial": "#0f766e",
	"infrastructure.roadNetwork.road.highway": "#155e75",
	"infrastructure.roadNetwork.ramp": "#0f766e",
	"pointOfInterest.recreation.park": "#c5ddd4",
	"pointOfInterest.recreation.natureReserve": "#b7d4c8",
	"pointOfInterest.recreation.golfCourse": "#c5ddd4",
	"pointOfInterest.recreation.sportsComplex": "#cfe3da",
	"pointOfInterest.recreation.sportsField": "#cfe3da",
	"pointOfInterest.recreation.zoo": "#c5ddd4",
	"pointOfInterest.other.cemetery": "#dce6e8",
	"pointOfInterest.emergency.hospital": "#e7f1f4",
	"pointOfInterest.transit.airport": "#d5e2e6",
	"political.reservation": "#d7ebe3"
};
var STRELSON_FILLS = {
	"natural.base": "#ffe9c2",
	"natural.land": "#ffe9c2",
	"natural.land.landCover": "#c8f0b0",
	"natural.land.landCover.crops": "#d4f5a8",
	"natural.land.landCover.dryCrops": "#f3e0b0",
	"natural.land.landCover.forest": "#7dcf6a",
	"natural.land.landCover.ice": "#e7f6ff",
	"natural.land.landCover.sand": "#f6d7a2",
	"natural.land.landCover.shrub": "#b7e89a",
	"natural.land.landCover.tundra": "#efe4c8",
	"natural.water": "#5ec8f5",
	"infrastructure.urbanArea": "#ffe0c2",
	"infrastructure.businessCorridor": "#ffd0b0",
	"infrastructure.building": "#ff8b6a",
	"infrastructure.building.commercial": "#ffd15c",
	"infrastructure.roadNetwork.road": "#fffaf3",
	"infrastructure.roadNetwork.road.local": "#fffaf3",
	"infrastructure.roadNetwork.road.arterial": "#ff7a3c",
	"infrastructure.roadNetwork.road.highway": "#ff4d6d",
	"infrastructure.roadNetwork.ramp": "#ff7a3c",
	"pointOfInterest.recreation.park": "#8ed67a",
	"pointOfInterest.recreation.natureReserve": "#6bc46a",
	"pointOfInterest.recreation.golfCourse": "#8ed67a",
	"pointOfInterest.recreation.sportsComplex": "#9adf88",
	"pointOfInterest.recreation.sportsField": "#9adf88",
	"pointOfInterest.recreation.zoo": "#8ed67a",
	"pointOfInterest.other.cemetery": "#e6dcc8",
	"pointOfInterest.emergency.hospital": "#ffd0d0",
	"pointOfInterest.transit.airport": "#ffe0c2",
	"political.reservation": "#d4f5a8"
};
var STRELSON_NIGHT_FILLS = {
	"natural.base": "#1c1430",
	"natural.land": "#241838",
	"natural.land.landCover": "#2c4a38",
	"natural.land.landCover.crops": "#2a4634",
	"natural.land.landCover.dryCrops": "#3a2e28",
	"natural.land.landCover.forest": "#1f6b45",
	"natural.land.landCover.ice": "#2a3358",
	"natural.land.landCover.sand": "#4a3828",
	"natural.land.landCover.shrub": "#245840",
	"natural.land.landCover.tundra": "#2a2440",
	"natural.water": "#3a6cff",
	"infrastructure.urbanArea": "#2e2448",
	"infrastructure.businessCorridor": "#3a2850",
	"infrastructure.building": "#ff7a59",
	"infrastructure.building.commercial": "#ffd15c",
	"infrastructure.roadNetwork.road": "#3a315c",
	"infrastructure.roadNetwork.road.local": "#3a315c",
	"infrastructure.roadNetwork.road.arterial": "#ff8a3d",
	"infrastructure.roadNetwork.road.highway": "#ffe14a",
	"infrastructure.roadNetwork.ramp": "#ff8a3d",
	"pointOfInterest.recreation.park": "#1f6b45",
	"pointOfInterest.recreation.natureReserve": "#187a52",
	"pointOfInterest.recreation.golfCourse": "#1f6b45",
	"pointOfInterest.recreation.sportsComplex": "#248056",
	"pointOfInterest.recreation.sportsField": "#248056",
	"pointOfInterest.recreation.zoo": "#1f6b45",
	"pointOfInterest.other.cemetery": "#3a3150",
	"pointOfInterest.emergency.hospital": "#ff8b9a",
	"pointOfInterest.transit.airport": "#2e2448",
	"political.reservation": "#2a4634"
};
var NON_STRELSON = recolor("light", "#ffe9c2", STRELSON_FILLS, {
	strokes: {
		"infrastructure.roadNetwork.road.arterial": "#fff4e0",
		"infrastructure.roadNetwork.road.highway": "#c81e4a"
	},
	border: "#5b4bff",
	text: "#2a2144",
	textStroke: "#fff6e8",
	pin: "#5b4bff"
});
var NON_STRELSON_NIGHT = recolor("dark", "#1c1430", STRELSON_NIGHT_FILLS, {
	strokes: {
		"infrastructure.roadNetwork.road.arterial": "#1c1430",
		"infrastructure.roadNetwork.road.highway": "#c9a227"
	},
	border: "#7aa2ff",
	text: "#fff4e4",
	textStroke: "#1c1430",
	pin: "#ff4d8d"
});
NON_STRELSON.metadata = {
	createdBy: "Simetria · Non-Strelson",
	createdTime: "14.10.2026, 20:01:00"
};
NON_STRELSON_NIGHT.metadata = {
	createdBy: "Simetria · Non-Strelson Night",
	createdTime: "14.10.2026, 20:01:00"
};
var PRESETS = [
	{
		id: "strelson",
		name: "Non-Strelson",
		note: "Toy streets and candy blocks",
		doc: NON_STRELSON
	},
	{
		id: "strelson-night",
		name: "Non-Strelson Night",
		note: "Indigo blocks, butter roads",
		doc: NON_STRELSON_NIGHT
	},
	{
		id: "signal",
		name: "Signal Night",
		note: "Cyan highways, rose pins",
		doc: SIGNAL_NIGHT
	},
	{
		id: "paper",
		name: "Paper Coast",
		note: "Newsprint and terracotta",
		doc: recolor("light", "#f3efe6", PAPER_FILLS, {
			strokes: {
				"infrastructure.roadNetwork.road.arterial": "#f3efe6",
				"infrastructure.roadNetwork.road.highway": "#9a3412"
			},
			border: "#7c8ea0",
			text: "#2c2824",
			textStroke: "#f3efe6",
			pin: "#9f1239"
		})
	},
	{
		id: "ember",
		name: "Ember District",
		note: "Sodium light on charcoal",
		doc: recolor("dark", "#140e0c", EMBER_FILLS, {
			strokes: {
				"infrastructure.roadNetwork.road.arterial": "#1a1210",
				"infrastructure.roadNetwork.road.highway": "#7c2d12"
			},
			border: "#e8a090",
			text: "#f6ebe4",
			textStroke: "#140e0c",
			pin: "#ffb088"
		})
	},
	{
		id: "glass",
		name: "Glass Harbor",
		note: "Fog, teal, and slate",
		doc: recolor("light", "#e6eef1", GLASS_FILLS, {
			strokes: {
				"infrastructure.roadNetwork.road.arterial": "#e6eef1",
				"infrastructure.roadNetwork.road.highway": "#0e3a45"
			},
			border: "#5b7c89",
			text: "#102a32",
			textStroke: "#e6eef1",
			pin: "#be123c"
		})
	}
];
function matchingPreset(doc) {
	return PRESETS.find((preset) => sameLook(preset.doc, doc));
}
function mergeAiStyle(raw) {
	const parsed = parseCloudStyle(raw);
	if (!parsed) return null;
	const paper = PRESETS.find((preset) => preset.id === "paper")?.doc ?? NON_STRELSON;
	const base = parsed.variant === "light" ? paper : NON_STRELSON_NIGHT;
	const doc = structuredClone(base);
	doc.variant = parsed.variant;
	doc.backgroundColor = parsed.backgroundColor;
	doc.metadata = {
		createdBy: "Simetria",
		createdTime: formatNow()
	};
	for (const incoming of parsed.styles) {
		if (!FEATURE_SET.has(incoming.id)) continue;
		const index = doc.styles.findIndex((item) => item.id === incoming.id);
		if (index === -1) {
			doc.styles.push(incoming);
			continue;
		}
		const current = doc.styles[index];
		doc.styles[index] = {
			...current,
			...incoming,
			geometry: current.geometry || incoming.geometry ? {
				...current.geometry,
				...incoming.geometry
			} : void 0,
			label: current.label || incoming.label ? {
				...current.label,
				...incoming.label
			} : void 0
		};
	}
	return doc;
}
var STYLE_STORAGE_KEY = "meridian-style-v1";
var PLACES = [
	{
		id: "sarov",
		name: "Sarov",
		center: [43.3239, 54.9358],
		zoom: 15.4
	},
	{
		id: "australia",
		name: "Australia",
		center: [151.2093, -33.8688],
		zoom: 14.8
	},
	{
		id: "harbor",
		name: "Harbor",
		center: [-122.395, 37.795],
		zoom: 14.4
	},
	{
		id: "grid",
		name: "Grid",
		center: [-73.989, 40.752],
		zoom: 14.6
	},
	{
		id: "canals",
		name: "Canals",
		center: [4.898, 52.373],
		zoom: 14.7
	},
	{
		id: "desert",
		name: "Desert",
		center: [55.274, 25.197],
		zoom: 13.6
	},
	{
		id: "alpine",
		name: "Alpine",
		center: [8.541, 47.376],
		zoom: 14.2
	}
];
var PRIMARY_CONTROLS = [
	{
		label: "Land",
		featureId: "natural.land",
		kind: "ground"
	},
	{
		label: "Water",
		featureId: "natural.water",
		text: true
	},
	{
		label: "Districts",
		featureId: "infrastructure.urbanArea"
	},
	{
		label: "Buildings",
		featureId: "infrastructure.building",
		text: true
	},
	{
		label: "Local roads",
		featureId: "infrastructure.roadNetwork.road.local"
	},
	{
		label: "Arterials",
		featureId: "infrastructure.roadNetwork.road.arterial",
		casing: true
	},
	{
		label: "Highways",
		featureId: "infrastructure.roadNetwork.road.highway",
		casing: true
	},
	{
		label: "Ramps",
		featureId: "infrastructure.roadNetwork.ramp"
	},
	{
		label: "Parks",
		featureId: "pointOfInterest.recreation.park"
	},
	{
		label: "Places",
		featureId: "pointOfInterest",
		pin: true,
		text: true
	},
	{
		label: "Borders",
		featureId: "political.border",
		kind: "border"
	}
];
var MORE_CONTROLS = [
	{
		label: "Forest",
		featureId: "natural.land.landCover.forest"
	},
	{
		label: "Fields",
		featureId: "natural.land.landCover.crops"
	},
	{
		label: "Shrub",
		featureId: "natural.land.landCover.shrub"
	},
	{
		label: "Sand",
		featureId: "natural.land.landCover.sand"
	},
	{
		label: "Ice",
		featureId: "natural.land.landCover.ice"
	},
	{
		label: "Dry crops",
		featureId: "natural.land.landCover.dryCrops"
	},
	{
		label: "Tundra",
		featureId: "natural.land.landCover.tundra"
	},
	{
		label: "Commercial",
		featureId: "infrastructure.building.commercial"
	},
	{
		label: "Corridors",
		featureId: "infrastructure.businessCorridor"
	},
	{
		label: "Nature reserve",
		featureId: "pointOfInterest.recreation.natureReserve"
	},
	{
		label: "Golf",
		featureId: "pointOfInterest.recreation.golfCourse"
	},
	{
		label: "Sports complex",
		featureId: "pointOfInterest.recreation.sportsComplex"
	},
	{
		label: "Sports field",
		featureId: "pointOfInterest.recreation.sportsField"
	},
	{
		label: "Zoo",
		featureId: "pointOfInterest.recreation.zoo"
	},
	{
		label: "Cemetery",
		featureId: "pointOfInterest.other.cemetery"
	},
	{
		label: "Hospital",
		featureId: "pointOfInterest.emergency.hospital"
	},
	{
		label: "Airport",
		featureId: "pointOfInterest.transit.airport"
	},
	{
		label: "Reservation",
		featureId: "political.reservation"
	}
];
//#endregion
export { setStroke as C, touchMeta as D, strokeColor as E, setPin as S, setVisible as T, sameLook as _, PRESETS as a, setGround as b, STYLE_STORAGE_KEY as c, labelInk as d, matchingPreset as f, pretty as g, parseCloudStyle as h, PLACES as i, fillColor as l, normHex as m, MORE_CONTROLS as n, PRIMARY_CONTROLS as o, mergeAiStyle as p, NON_STRELSON as r, SIGNAL_NIGHT as s, FEATURE_IDS as t, geometryVisible as u, setBorderColor as v, setVariant as w, setLabelColor as x, setFill as y };
