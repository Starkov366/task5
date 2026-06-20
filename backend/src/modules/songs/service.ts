import seedrandom from "seedrandom";
import { faker as fakerEN } from "@faker-js/faker/locale/en";
import { faker as fakerDE } from "@faker-js/faker/locale/de";
import { faker as fakerUK } from "@faker-js/faker/locale/uk";
import { generateLikes, makeCover, makeLyrics, makePreview, makeReview } from "../../utils/likes";
import { GenerateSongsParams } from "./types";

const fakers = {
    "en-US": fakerEN,
    "de-DE": fakerDE,
    "uk-UA": fakerUK,
} as const;






export function generateSongs({
    seed,
    page,
    limit,
    region,
    likesAvg,
}: GenerateSongsParams) {
    const rng = seedrandom(seed + ":" + page);
    const faker = fakers[region];

    faker.seed(Math.floor(rng() * 1e9));

    return Array.from({ length: limit }, (_, i) => {
        const id = `${seed}-${page}-${i}`;

        return {
            id,

            index: (page - 1) * limit + i + 1,

            title: faker.music.songName(),
            artist: faker.person.fullName(),

            album: rng() > 0.3 ? faker.music.album() : "Single",
            genre: faker.music.genre(),

            likes: generateLikes(likesAvg, rng),

            coverUrl: makeCover(seed, page, i,rng),

            review: makeReview(faker, rng),

            preview: makePreview(seed, page, i, rng),

            lyrics: makeLyrics(faker, rng),
        };
    });
}