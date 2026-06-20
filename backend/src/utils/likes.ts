export function generateLikes(avg: number, rng: () => number) {
    let likes = 0;

    for (let i = 0; i < 10; i++) {
        if (rng() < avg / 10) likes++;
    }

    return likes;
}
export function makeCover(seed: string, page: number, i: number) {
    return `https://picsum.photos/seed/${seed}-${page}-${i}/400/400`;
}

export function makeLyrics(faker: any, rng: () => number) {
    if (rng() < 0.4) return [];
    return faker.lorem.lines(5).split("\n").filter(Boolean);
}

export function makeReview(faker: any, rng: () => number) {
    if (rng() < 0.3) return "";
    return faker.lorem.paragraph();
}


export function makePreviewUrl(seed: string, page: number, i: number, rng: () => number) {
  
    const trackId = Math.floor(rng() * 5) + 1;

    return `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${trackId}.mp3`;
}