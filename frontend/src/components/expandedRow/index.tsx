import { useRef, useState } from "react";
import styles from "./styled.module.scss";
import type { Song } from "../../types/index";
import { AiFillLike } from "react-icons/ai";
import { FaCirclePause } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";

interface ExpandedRowProps {
  song: Song;
}

export function ExpandedRow({ song }: ExpandedRowProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const playSong = () => {
    if (!song.preview) return;

    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }

    const ctx = ctxRef.current;
    const now = ctx.currentTime;

    const bpm = song.preview.bpm;
    const step = 60 / bpm;

    const scale = [
      261.6, 293.6, 329.6, 349.2, 392, 440, 493.9
    ];

 
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsPlaying(true);

    song.preview.pattern.forEach((n, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";

      const freq = scale[(n + song.preview.root) % scale.length];
      osc.frequency.value = freq;

      gain.gain.value = 0.05;

      osc.connect(gain);
      gain.connect(ctx.destination);

      const start = now + i * step;
      const stop = start + 0.2;

      osc.start(start);
      osc.stop(stop);
    });

    timeoutRef.current = window.setTimeout(() => {
      setIsPlaying(false);
    }, step * song.preview.pattern.length * 1000);
  };

  const stopSong = () => {
    if (ctxRef.current) {
      ctxRef.current.close();
      ctxRef.current = null;
    }

    setIsPlaying(false);
  };

  return (
    <div className={styles.expandedRow}>
      <div className={styles.coverSide}>
        <img className={styles.cover} src={song.coverUrl} alt={song.title} />

        <button className={styles.likeBtn} type="button">
          <AiFillLike/> {song.likes}
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.playerRow}>
          <h3 className={styles.title}>{song.title}</h3>

          <button
            className={styles.playBtn}
            type="button"
            onClick={() => {
              if (isPlaying) stopSong();
              else playSong();
            }}
          >
            {isPlaying ? <FaCirclePause/> : <FaPlayCircle/>}
          </button>

          <span className={styles.duration}>
            {Math.round((60 / song.preview.bpm) * song.preview.pattern.length)}s
          </span>
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