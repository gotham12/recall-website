import { gsap } from 'gsap';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Single-image bloom: closed bud → open bloom → petals close (same photo throughout). */
export function applyBloomProgress(stage: HTMLElement, progress: number) {
  const p = gsap.utils.clamp(0, 1, progress);
  const master = stage.querySelector<HTMLElement>('.flower-master');
  const masterImg = stage.querySelector<HTMLElement>('.flower-master-img');
  const glow = stage.querySelector<HTMLElement>('.flower-glow');
  const particles = stage.querySelector<HTMLElement>('.flower-particles');

  const grayscale = gsap.utils.interpolate(1, 0, p);
  const brightness = gsap.utils.interpolate(0.52, 1.05, p);
  const saturate = gsap.utils.interpolate(0.08, 1.2, p);
  const scale = gsap.utils.interpolate(0.34, 1, gsap.parseEase('power2.out')(p));
  const scaleY = gsap.utils.interpolate(0.62, 1, gsap.parseEase('power2.out')(p));
  const clip = gsap.utils.interpolate(42, 0, gsap.parseEase('power2.inOut')(p));

  const filter = `grayscale(${grayscale}) brightness(${brightness}) saturate(${saturate})`;

  if (master) {
    gsap.set(master, {
      scale,
      scaleY,
      rotation: gsap.utils.interpolate(-6, 0, p),
      transformOrigin: '50% 58%',
      filter,
      clipPath: `inset(${clip}% ${clip * 0.85}% ${clip * 1.1}% ${clip * 0.85}% round 48%)`,
    });
  }

  if (masterImg) {
    gsap.set(masterImg, { filter: 'none' });
  }

  if (glow) {
    gsap.set(glow, {
      opacity: gsap.utils.interpolate(0, 0.7, gsap.utils.clamp(0, 1, (p - 0.25) / 0.75)),
      scale: gsap.utils.interpolate(0.85, 1.12, p),
      transformOrigin: '50% 50%',
    });
  }

  if (particles) {
    gsap.set(particles, {
      opacity: gsap.utils.interpolate(0, 0.8, gsap.utils.clamp(0, 1, (p - 0.7) / 0.3)),
    });
  }
}

/** Reverse bloom — same image tucks closed again. */
export function applyCloseProgress(stage: HTMLElement, progress: number) {
  const p = gsap.utils.clamp(0, 1, progress);
  const master = stage.querySelector<HTMLElement>('.flower-master');
  const glow = stage.querySelector<HTMLElement>('.flower-glow');
  const particles = stage.querySelector<HTMLElement>('.flower-particles');

  const grayscale = gsap.utils.interpolate(0, 0.92, p);
  const brightness = gsap.utils.interpolate(1.05, 0.48, p);
  const saturate = gsap.utils.interpolate(1.2, 0.1, p);
  const scale = gsap.utils.interpolate(1, 0.32, gsap.parseEase('power2.in')(p));
  const scaleY = gsap.utils.interpolate(1, 0.58, gsap.parseEase('power2.in')(p));
  const clip = gsap.utils.interpolate(0, 44, gsap.parseEase('power2.inOut')(p));

  if (master) {
    gsap.set(master, {
      scale,
      scaleY,
      rotation: gsap.utils.interpolate(0, -8, p),
      transformOrigin: '50% 58%',
      filter: `grayscale(${grayscale}) brightness(${brightness}) saturate(${saturate})`,
      clipPath: `inset(${clip}% ${clip * 0.85}% ${clip * 1.1}% ${clip * 0.85}% round 48%)`,
    });
  }

  if (glow) gsap.set(glow, { opacity: gsap.utils.interpolate(0.7, 0, p) });
  if (particles) gsap.set(particles, { opacity: gsap.utils.interpolate(0.8, 0, p) });
}

export function applyWiltProgress(stage: HTMLElement, progress: number) {
  applyCloseProgress(stage, progress);
}

export function initClosedState(stage: HTMLElement) {
  applyBloomProgress(stage, 0);
}

export function initWiltedState(stage: HTMLElement) {
  applyCloseProgress(stage, 1);
}

let ambientStarted = false;

export function startAmbientMotion(stage: HTMLElement) {
  if (ambientStarted || prefersReducedMotion()) return;
  ambientStarted = true;

  const master = stage.querySelector('.flower-master');
  if (master) {
    gsap.to(master, {
      rotation: 1.5,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      transformOrigin: '50% 58%',
    });
  }

  const glow = stage.querySelector('.flower-glow');
  if (glow) {
    gsap.to(glow, {
      opacity: 0.55,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  stage.querySelectorAll<HTMLElement>('.flower-particle').forEach((dot, i) => {
    gsap.to(dot, {
      y: -8 - (i % 3) * 4,
      opacity: 0,
      duration: 3,
      repeat: -1,
      delay: i * 0.18,
      ease: 'sine.out',
    });
  });
}

export function resetAmbientMotion() {
  ambientStarted = false;
}
