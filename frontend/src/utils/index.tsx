export function generateCover(title: string, artist: string, seed: number) {
  const styles = [
    "shapes",
    "identicon",
    "pixel-art",
    "bottts",
    "lorelei",
    "fun-emoji"
  ];

  const style = styles[seed % styles.length];

  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}-${title}-${artist}`;
}