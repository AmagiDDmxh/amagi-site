"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { AudioData, useAudioPlayer } from "./audio-provider";
import { ForwardButton } from "./forward-button";
import { MuteButton } from "./mute-button";
import { PlaybackRateButton } from "./playback-rate-button";
import { PlayButton } from "./play-button";
import { RewindButton } from "./rewind-button";
import { Slider } from "./slider";

function parseTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds = seconds - hours * 3600 - minutes * 60;
  return [hours, minutes, seconds];
}

function formatHumanTime(seconds: number) {
  const [h, m, s] = parseTime(seconds);
  return `${h} hour${h === 1 ? "" : "s"}, ${m} minute${
    m === 1 ? "" : "s"
  }, ${s} second${s === 1 ? "" : "s"}`;
}

type AudioPlayerProps = {
  data?: AudioData;
};

export function AudioPlayer({ data }: AudioPlayerProps) {
  const player = useAudioPlayer(data);
  const wasPlayingRef = useRef(false);
  const [currentTime, setCurrentTime] = useState(player.currentTime);

  useEffect(() => {
    setCurrentTime(undefined);
  }, [player.currentTime]);

  const numberFormatter = {
    format: formatHumanTime,
    resolvedOptions: Intl.NumberFormat().resolvedOptions,
  };

  if (!player.meta) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 bg-white/90 py-2 pb-4 md:pb-2 px-3 md:px-4 shadow shadow-neutral-200/80 ring-1 ring-neutral-900/5 backdrop-blur-lg dark:bg-neutral-900/90 dark:shadow-neutral-800/70 dark:ring-neutral-100/5 rounded-lg relative">
      <div className="hidden md:block">
        <PlayButton player={player} size="small" />
      </div>
      <div className="mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-2 md:gap-0 overflow-hidden p-1">
        {player.meta.link ? (
          <Link
            href={player.meta.link}
            className="truncate text-center text-sm font-bold leading-6 md:text-left"
            title={player.meta.title}
          >
            {player.meta.title}
          </Link>
        ) : (
          <p
            className="truncate text-center text-sm font-bold leading-6 md:text-left !my-0"
            title={player.meta.title}
          >
            {player.meta.title}
          </p>
        )}

        <Slider
          label="Current Time"
          maxValue={player.duration}
          step={1}
          value={currentTime ?? player.currentTime ?? 0}
          onChange={(v) => setCurrentTime(v)}
          onChangeEnd={(value) => {
            player.seek?.(value);
            if (wasPlayingRef.current) {
              player.play();
            }
          }}
          numberFormatter={numberFormatter as any}
          onChangeStart={() => {
            wasPlayingRef.current = player.playing;
            player.pause?.();
          }}
        />

        <div className="flex justify-between gap-6">
          <div className="flex items-center md:hidden">
            <MuteButton player={player} />
          </div>
          <div className="flex flex-none items-center gap-2">
            <RewindButton player={player} />
            <div className="md:hidden">
              <PlayButton player={player} size="small" />
            </div>
            <ForwardButton player={player} />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <PlaybackRateButton player={player} />
            </div>
            <div className="hidden items-center md:flex">
              <MuteButton player={player} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
