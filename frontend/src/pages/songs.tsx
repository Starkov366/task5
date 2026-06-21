import { useEffect, useRef, useState } from "react";
import { getSongs } from "../api/index";
import type { Region } from "../types";
import { Toolbar } from "../components/toolbar";
import { SongsTable } from "../components/table";
import { Gallery } from "../components/gallery";
import type { Song } from "../types/index"
import type{ ViewMode } from "../types";
import { generateCover } from "../utils";



export default function SongsPage() {
    const [region, setRegion] = useState<Region>("en-US");
    const [seed, setSeed] = useState("58933423");
    const [likes, setLikes] = useState(4);

    const [viewMode, setViewMode] = useState<ViewMode>("table");

    const [page, setPage] = useState(1);
    const [galleryPage, setGalleryPage] = useState(1);

    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(false);

    const [expandedId, setExpandedId] = useState<string | null>(null);

    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let cancelled = false;
    
        async function loadSongs() {
            try {
                setLoading(true);
    
                const data = await getSongs({
                    seed,
                    page: viewMode === "table" ? page : galleryPage,
                    limit: viewMode === "table" ? 20 : 24,
                    region,
                    likes,
                });
    
                if (cancelled) return;
    
                const dataWithCovers = data.map((song) => ({
                    ...song,
                    coverUrl: generateCover(
                        song.title,
                        song.artist,
                        Number(seed) + song.index
                    ),
                }));
    
                if (viewMode === "table") {
                    setSongs(dataWithCovers);
                } else {
                    setSongs((prev) =>
                        galleryPage === 1
                            ? dataWithCovers
                            : [...prev, ...dataWithCovers]
                    );
                }
            } catch (error) {
                console.error(error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }
    
        loadSongs();
    
        return () => {
            cancelled = true;
        };
    }, [seed, region, likes, page, galleryPage, viewMode]);

 
    useEffect(() => {
        setPage(1);
        setGalleryPage(1);
        setExpandedId(null);
        setSongs([]);
    }, [seed, region]);


    useEffect(() => {
        setExpandedId(null);

        if (viewMode === "table") {
            setPage(1);
        } else {
            setGalleryPage(1);
            setSongs([]);
        }
    }, [viewMode]);

 
    useEffect(() => {
        if (viewMode !== "gallery") return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loading) {
                    setGalleryPage((prev) => prev + 1);
                }
            },
            {
                rootMargin: "300px",
            }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [loading, viewMode]);

    return (
        <>
            <Toolbar
                region={region}
                seed={seed}
                likes={likes}
                viewMode={viewMode}
                onRegionChange={setRegion}
                onSeedChange={setSeed}
                onLikesChange={setLikes}
                onViewModeChange={setViewMode}
                onRandomSeed={() =>
                    setSeed(
                        String(
                            Math.floor(
                                Math.random() * Number.MAX_SAFE_INTEGER
                            )
                        )
                    )
                }
            />

            {viewMode === "table" ? (
                <SongsTable
                    songs={songs}
                    page={page}
                    expandedId={expandedId}
                    loading={loading}
                    onToggleExpanded={(id) =>
                        setExpandedId((prev) => (prev === id ? null : id))
                    }
                    onPageChange={setPage}
                />
            ) : (
                <>
                    <Gallery songs={songs} loading={loading} />
                    <div ref={observerRef} />
                </>
            )}
        </>
    );
}
