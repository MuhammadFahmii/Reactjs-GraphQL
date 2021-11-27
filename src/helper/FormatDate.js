export default function FormatDate(time) {
  const date = new Date(time);
  return date.toISOString().substring(0, 10);
}
