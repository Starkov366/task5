export function generateLikes(avg: number, rng: () => number) {
    let likes = 0;

    for (let i = 0; i < 10; i++) {
        if (rng() < avg / 10) likes++;
    }

    return likes;
}
export function makeCover(seed: string, page: number, i: number, rng: () => number) {
    return {
      seed: Math.floor(rng() * 1e9),
      hue: Math.floor(rng() * 360),
    };
  }
export function makeLyrics(faker: any, rng: () => number) {
    if (rng() < 0.4) return [];
    return faker.lorem.lines(5).split("\n").filter(Boolean);
}

export function makeReview(faker: any, rng: () => number) {
    if (rng() < 0.3) return "";
    return faker.lorem.paragraph();
}


export function makePreview(seed: string, page: number, i: number, rng: () => number) {
    return {
      bpm: 80 + Math.floor(rng() * 100),
      root: Math.floor(rng() * 12),
      pattern: Array.from({ length: 16 }, () => Math.floor(rng() * 8)),
    };
  }