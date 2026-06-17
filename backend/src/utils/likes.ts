export function generateLikes(avg: number, rng: () => number) {
    let likes = 0;

    for (let i = 0; i < 10; i++) {
        if (rng() < avg / 10) likes++;
    }

    return likes;
}