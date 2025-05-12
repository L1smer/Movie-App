export function formatYear(yearStr) {
  if (!yearStr) return "Unknown";
  const cleanStr = yearStr.replace("–", "-");
  const parts = cleanStr.split("-");
  if (parts.length === 2) {
    const [start, end] = parts;
    return end?.trim() === "" ? `${start} – present` : `${start} – ${end}`;
  }
  return yearStr;
}