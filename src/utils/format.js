import i18n from "../i18n";

function getLocale(locale) {
  return locale !== undefined ? locale : i18n?.language || "pt-BR";
}

export function formatDate(value, options = {}, locale) {
  const loc = getLocale(locale);
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(loc, {
    dateStyle: "medium",
    ...options,
  }).format(date);
}

export function formatDateTime(value, options = {}, locale) {
  const loc = getLocale(locale);
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(loc, {
    dateStyle: "short",
    timeStyle: "short",
    ...options,
  }).format(date);
}

export function formatNumber(value, options = {}, locale) {
  const loc = getLocale(locale);
  if (typeof value !== "number" || Number.isNaN(value)) return "";
  return new Intl.NumberFormat(loc, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
}

export function formatCurrency(value, currency = "BRL", options = {}, locale) {
  const loc = getLocale(locale);
  if (typeof value !== "number" || Number.isNaN(value)) return "";
  return new Intl.NumberFormat(loc, {
    style: "currency",
    currency,
    ...options,
  }).format(value);
}

export function formatPercent(value, opts = {}, options = {}, locale) {
  const loc = getLocale(locale);
  if (typeof value !== "number" || Number.isNaN(value)) return "";
  const num = opts.asDecimal ? value : value / 100;
  return new Intl.NumberFormat(loc, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(num);
}

export function formatText(value, mode = "capitalize") {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  switch (mode) {
    case "lower":
      return trimmed.toLowerCase();
    case "upper":
      return trimmed.toUpperCase();
    case "title":
      return trimmed.replace(/\b\w/g, (c) => c.toUpperCase());
    case "capitalize":
    default:
      return trimmed
        ? trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
        : "";
  }
}

export function formatFileSize(bytes, decimals = 1, locale) {
  const loc = getLocale(locale);
  if (typeof bytes !== "number" || bytes < 0 || Number.isNaN(bytes)) return "";
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${formatNumber(value, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }, loc)} ${sizes[i]}`;
}

export function formatCompact(value, options = {}, locale) {
  const loc = getLocale(locale);
  if (typeof value !== "number" || Number.isNaN(value)) return "";
  return new Intl.NumberFormat(loc, {
    notation: "compact",
    maximumFractionDigits: 1,
    ...options,
  }).format(value);
}
