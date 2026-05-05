export default function random(): string {
  return Math.random().toString(36).substring(2);
}
