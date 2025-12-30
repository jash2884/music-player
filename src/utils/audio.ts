export function getBestAudioUrl(
  downloadUrl?: { quality: string; link?: string; url?: string }[]
): string | null {
  if (!downloadUrl || downloadUrl.length === 0) return null;

  const qualities = ["320kbps", "160kbps", "96kbps", "48kbps", "12kbps"];

  for (const q of qualities) {
    const found = downloadUrl.find((d) => d.quality === q);
    if (found?.link) return found.link;
    if (found?.url) return found.url;
  }

  return null;
}
