export function formatDateTime(value: string | Date) {
  const d = new Date(value);
  return d.toLocaleString("uz-UZ", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function excerpt(text: string | undefined, max = 160) {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max).trimEnd() + "…" : clean;
}

export function statusLabel(status: string) {
  if (status === "started") return "Boshlangan";
  if (status === "open") return "Ariza ochiq";
  return status;
}

export function modeLabel(mode: string) {
  if (mode === "solo") return "Yakka";
  if (mode === "team") return "Jamoa";
  return mode;
}

export function capacityText(item: { capacity?: number; registered?: number }) {
  if (!item.capacity) return "";
  return `${item.registered ?? 0} / ${item.capacity} o‘yinchi`;
}