import { createServerFn } from "@tanstack/react-start";
import { FEATURE_IDS, mergeAiStyle, type CloudStyle } from "@/lib/cloud-style";

export type ComposeResult = { ok: true; style: CloudStyle } | { ok: false; error: string };

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = (fenced?.[1] ?? text).trim();
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start === -1 || end <= start) {
    throw new Error("The model returned a style I couldn't read. Try a more specific brief.");
  }
  return JSON.parse(body.slice(start, end + 1)) as unknown;
}

export const composeCloudStyle = createServerFn({ method: "POST" })
  .validator((input: { brief: string; lang?: string }) => {
    if (!input || typeof input.brief !== "string") {
      throw new Error("Describe a mood first.");
    }
    const brief = input.brief.trim();
    if (brief.length < 3) throw new Error("Describe a mood first.");
    if (brief.length > 500) throw new Error("Keep the brief under 500 characters.");
    const lang = input.lang === "en" ? "en" : "ru";
    return { brief, lang };
  })
  .handler(async ({ data }): Promise<ComposeResult> => {
    const say = (ru: string, en: string) => (data.lang === "ru" ? ru : en);
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        ok: false,
        error: say("Компоновщик стиля в этом просмотре недоступен.", "AI composing isn't available in this preview."),
      };
    }

    const system = [
      "You author Google Maps Platform cloud-based map styles.",
      "Return one JSON object and nothing else.",
      "Shape:",
      '{"variant":"dark"|"light","backgroundColor":"#rrggbb","styles":[{"id":"...","geometry":{"visible":true,"fillColor":"#rrggbb","strokeColor":"#rrggbb","color":"#rrggbb"},"label":{"visible":true,"textFillColor":"#rrggbb","textStrokeColor":"#rrggbb","pinFillColor":"#rrggbb"}}]}',
      "Use only these feature ids, and include every one:",
      FEATURE_IDS.join("\n"),
      "Rules:",
      "- All colors are 6-digit hex.",
      "- political.border uses geometry.color, not fillColor.",
      "- Highways are the most legible roads. Arterials sit between highways and local roads.",
      "- Label text must contrast with the surface it sits on. Halo (textStrokeColor) matches the nearby ground or water.",
      "- Use a tight palette: about four to six hues. No rainbow unless the brief asks.",
      "- variant is dark for night or ink moods, light for paper or day moods.",
      "- backgroundColor is the base canvas and should match natural.land.",
      "- Keep geometry.visible true unless the brief asks to hide a layer.",
      "- pointOfInterest.label.pinFillColor is the place-pin color.",
    ].join("\n");

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        signal: AbortSignal.timeout(45000),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          temperature: 0.6,
          max_tokens: 5000,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: system },
            { role: "user", content: data.brief },
          ],
        }),
      });

      if (res.status === 401 || res.status === 403) {
        return { ok: false, error: say("Компоновщик стиля в этом просмотре недоступен.", "AI composing isn't available in this preview.") };
      }
      if (!res.ok) {
        return {
          ok: false,
          error: say(
            `Сервис стиля ответил ошибкой (${res.status}). Подождите и повторите.`,
            `The style service returned an error (${res.status}). Wait a moment and try again.`,
          ),
        };
      }

      const body = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = body.choices?.[0]?.message?.content ?? "";
      const style = mergeAiStyle(extractJson(text));
      if (!style) {
        return {
          ok: false,
          error: say("Не удалось прочитать стиль. Уточните бриф.", "The model returned a style I couldn't read. Try a more specific brief."),
        };
      }
      return { ok: true, style };
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (message.includes("couldn't read") || message.includes("JSON")) {
        return { ok: false, error: say("Не удалось прочитать стиль. Уточните бриф.", "The model returned a style I couldn't read. Try a more specific brief.") };
      }
      return { ok: false, error: say("Сервис стиля не ответил. Повторите.", "The style service didn't answer. Try again.") };
    }
  });
