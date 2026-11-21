export function getScoreBand(score: number) {
  if (score >= 85) {
    return { label: "Excellent", text: "text-green-400", stroke: "stroke-green-400", bar: "bg-green-400" };
  }
  if (score >= 70) {
    return { label: "Good", text: "text-green-400", stroke: "stroke-green-400", bar: "bg-green-400" };
  }
  if (score >= 50) {
    return { label: "Fair", text: "text-amber-400", stroke: "stroke-amber-400", bar: "bg-amber-400" };
  }
  return { label: "Needs work", text: "text-red-400", stroke: "stroke-red-400", bar: "bg-red-400" };
}
