'use client';

import { BEATS, RESOLVE, clamp01, lerp } from '@/lib/brain-palette';
import { assetPath } from '@/lib/asset-path';
import { HERO_INTRO_VIDEO } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

type HeroIntroVideoProps = {
  progress: number;
  reducedMotion?: boolean;
  mobile?: boolean;
  className?: string;
};

function syncVideoTime(video: HTMLVideoElement, progress: number) {
  const duration = video.duration;
  if (!duration || !Number.isFinite(duration)) return;

  const target = clamp01(progress) * Math.max(duration - 0.05, 0);
  if (Math.abs(video.currentTime - target) > 0.04) {
    video.currentTime = target;
  }
}

/** Scroll-scrubbed hero intro — maps scroll progress to video currentTime. */
export function HeroIntroVideo({
  progress,
  reducedMotion = false,
  mobile = false,
  className,
}: HeroIntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const p = reducedMotion ? 1 : clamp01(progress);
  const resolveT = reducedMotion ? 0 : clamp01((p - RESOLVE.sceneFade) / (BEATS.resolveEnd - RESOLVE.sceneFade));
  const sceneOpacity = lerp(1, 0.35, resolveT);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => setReady(true);

    video.addEventListener('loadedmetadata', onReady);
    if (video.readyState >= 1) onReady();

    return () => video.removeEventListener('loadedmetadata', onReady);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready) return;
    syncVideoTime(video, reducedMotion ? 1 : progress);
  }, [progress, reducedMotion, ready]);

  return (
    <div
      className={cn('relative mx-auto w-full select-none', className)}
      style={{
        maxWidth: mobile ? 360 : 720,
        opacity: sceneOpacity,
      }}
      aria-hidden
    >
      <div
        className="overflow-hidden rounded-2xl"
        style={{
          boxShadow: '0 0 80px rgba(0,0,0,0.55)',
        }}
      >
        <video
          ref={videoRef}
          src={assetPath(HERO_INTRO_VIDEO)}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="block h-auto w-full bg-black object-contain"
          style={{ aspectRatio: '16 / 9' }}
        />
      </div>
    </div>
  );
}
