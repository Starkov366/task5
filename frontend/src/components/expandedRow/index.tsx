import { useRef, useState } from "react";
import styles from "./styled.module.scss";
import type { Song } from "../../types/index";

interface ExpandedRowProps {
  song: Song;
}

export function ExpandedRow({ song }: ExpandedRowProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!song.previewUrl) return;


    if (!audioRef.current) {
      audioRef.current = new Audio(song.previewUrl);

      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }

    const audio = audioRef.current;

    
    if (audio.src !== song.previewUrl) {
      audio.src = song.previewUrl;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={styles.expandedRow}>
      <div className={styles.coverSide}>
        <img className={styles.cover} src={song.coverUrl} alt={song.title} />

        <button className={styles.likeBtn} type="button">
          👍 {song.likes}
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.playerRow}>
          <h3 className={styles.title}>{song.title}</h3>

       
          <button
            className={styles.playBtn}
            type="button"
            onClick={togglePlay}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <span className={styles.duration}>2:12</span>
        </div>

        <div className={styles.meta}>
          from <b>{song.album}</b> by <i>{song.artist}</i>
        </div>

        <div className={styles.lyricsBox}>
          {song.lyrics?.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div className={styles.review}>{song.review}</div>
      </div>
    </div>
  );
}