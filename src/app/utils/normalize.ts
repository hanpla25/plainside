export default function normalize(str: string) {
  return str.replace(/\s/g, "").toLowerCase();
}
