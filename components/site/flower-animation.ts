import { gsap } from 'gsap';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Map bloom progress 0→1 — petals unfurl, grey gives way to blue. */
export function applyBloomProgress(stage: HTMLElement, progress: number) {
  const p = gsap.utils.clamp(0, 1, progress);
  const bud = stage.querySelector<HTMLElement>('.flower-bud');
  const bloomPhoto = stage.querySelector<HTMLElement>('.flower-bloom-photo');
  const petals = stage.querySelectorAll<HTMLElement>('.flower-petal');
  const center = stage.querySelector<HTMLElement>('.flower-center');
  const leaves = stage.querySelector<HTMLElement>('.flower-leaves');
  const glow = stage.querySelector<HTMLElement>('.flower-glow');
  const particles = stage.querySelector<HTMLElement>('.flower-particles');
  const stem = stage.querySelector<HTMLElement>('.flower-stem');

  const grayscale = gsap.utils.interpolate(1, 0, p);
  const brightness = gsap.utils.interpolate(0.58, 1.06, p);
  const saturate = gsap.utils.interpolate(0.12, 1.25, p);

  gsap.set(stage, {
    filter: `grayscale(${grayscale}) brightness(${brightness}) saturate(${saturate})`,
  });

  if (bud) {
    gsap.set(bud, {
      opacity: gsap.utils.interpolate(1, 0, gsap.utils.clamp(0, 1, p * 2.4)),
      scale: gsap.utils.interpolate(1, 0.78, p),
      transformOrigin: '50% 50%',
    });
  }

  if (bloomPhoto) {
    const photoP = gsap.utils.clamp(0, 1, (p - 0.55) / 0.45);
    gsap.set(bloomPhoto, {
      opacity: photoP * 0.95,
      scale: gsap.utils.interpolate(0.92, 1, photoP),
      transformOrigin: '50% 50%',
    });
  }

  petals.forEach((petal) => {
    const bloomAt = parseFloat(petal.dataset.bloomAt ?? '0.4');
    const tuck = parseFloat(petal.dataset.tuck ?? '22');
    const local = gsap.utils.clamp(0, 1, (p - bloomAt * 0.5) / (1 - bloomAt * 0.5 + 0.06));
    const eased = gsap.parseEase('power2.out')(local);
    const photoP = gsap.utils.clamp(0, 1, (p - 0.55) / 0.45);

    gsap.set(petal, {
      scaleX: gsap.utils.interpolate(0.28, 1, eased),
      scaleY: gsap.utils.interpolate(0.1, 1, eased),
      rotation: gsap.utils.interpolate(-tuck, 2 + (Number(petal.dataset.index) % 3), eased),
      opacity: gsap.utils.interpolate(0, 1, eased) * (1 - photoP * 0.92),
      transformOrigin: '50% 94%',
    });
  });

  if (center) {
    const cp = gsap.utils.clamp(0, 1, (p - 0.38) / 0.35);
    gsap.set(center, {
      opacity: cp,
      scale: gsap.utils.interpolate(0.3, 1, cp),
      transformOrigin: '50% 50%',
    });
  }

  if (leaves) {
    const lp = gsap.utils.clamp(0, 1, (p - 0.42) / 0.38);
    gsap.set(leaves, { opacity: lp * 0.88 });
  }

  if (stem) {
    gsap.set(stem, { opacity: gsap.utils.interpolate(0.5, 0.9, p) });
  }

  if (glow) {
    gsap.set(glow, {
      opacity: gsap.utils.interpolate(0, 0.65, gsap.utils.clamp(0, 1, (p - 0.3) / 0.7)),
    });
  }

  if (particles) {
    gsap.set(particles, {
      opacity: gsap.utils.interpolate(0, 0.75, gsap.utils.clamp(0, 1, (p - 0.72) / 0.28)),
    });
  }
}

/** Petals tuck back together — scroll phase after full bloom. */
export function applyCloseProgress(stage: HTMLElement, progress: number) {
  const p = gsap.utils.clamp(0, 1, progress);
  const bud = stage.querySelector<HTMLElement>('.flower-bud');
  const bloomPhoto = stage.querySelector<HTMLElement>('.flower-bloom-photo');
  const petals = stage.querySelectorAll<HTMLElement>('.flower-petal');
  const center = stage.querySelector<HTMLElement>('.flower-center');
  const leaves = stage.querySelector<HTMLElement>('.flower-leaves');
  const glow = stage.querySelector<HTMLElement>('.flower-glow');
  const particles = stage.querySelector<HTMLElement>('.flower-particles');

  gsap.set(stage, {
    filter: `grayscale(${gsap.utils.interpolate(0, 0.88, p)}) brightness(${gsap.utils.interpolate(1.06, 0.55, p)}) saturate(${gsap.utils.interpolate(1.25, 0.18, p)})`,
  });

  if (bloomPhoto) {
    gsap.set(bloomPhoto, {
      opacity: gsap.utils.interpolate(0.92, 0, p * 1.1),
      scale: gsap.utils.interpolate(1, 0.86, p),
      transformOrigin: '50% 50%',
    });
  }

  if (bud) {
    gsap.set(bud, {
      opacity: gsap.utils.interpolate(0, 1, gsap.utils.clamp(0, 1, (p - 0.35) / 0.65)),
      scale: gsap.utils.interpolate(0.78, 1, gsap.utils.clamp(0, 1, (p - 0.35) / 0.65)),
      transformOrigin: '50% 50%',
    });
  }

  petals.forEach((petal, i) => {
    const tuck = parseFloat(petal.dataset.tuck ?? '22');
    gsap.set(petal, {
      opacity: gsap.utils.interpolate(0.4, 1, 1 - p * 0.5) * (1 - p * 0.6),
      scaleX: gsap.utils.interpolate(1, 0.22, p),
      scaleY: gsap.utils.interpolate(1, 0.08, p),
      rotation: gsap.utils.interpolate(2, -tuck - 8 - (i % 3) * 4, p),
      transformOrigin: '50% 94%',
    });
  });

  if (center) gsap.set(center, { opacity: gsap.utils.interpolate(1, 0, p), scale: gsap.utils.interpolate(1, 0.25, p) });
  if (leaves) gsap.set(leaves, { opacity: gsap.utils.interpolate(0.88, 0, p) });
  if (glow) gsap.set(glow, { opacity: gsap.utils.interpolate(0.65, 0, p) });
  if (particles) gsap.set(particles, { opacity: gsap.utils.interpolate(0.75, 0, p) });
}

/** Legacy wilt — problem page ghost state */
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

  gsap.to(stage, {
    rotation: 0.8,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    transformOrigin: '50% 44%',
  });

  const glow = stage.querySelector('.flower-glow');
  if (glow) {
    gsap.to(glow, {
      opacity: 0.5,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  stage.querySelectorAll<HTMLElement>('.flower-particle').forEach((dot, i) => {
    gsap.to(dot, {
      y: -10 - (i % 4) * 5,
      x: `+=${(i % 2 === 0 ? 1 : -1) * (3 + (i % 3))}`,
      opacity: 0,
      duration: 3.2 + (i % 5) * 0.35,
      repeat: -1,
      delay: i * 0.2,
      ease: 'sine.out',
    });
  });
}

export function resetAmbientMotion() {
  ambientStarted = false;
}
