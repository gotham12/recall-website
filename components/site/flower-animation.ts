import { gsap } from 'gsap';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Map bloom progress 0→1 to organic petal open state (for scroll scrub + reduced motion). */
export function applyBloomProgress(stage: HTMLElement, progress: number) {
  const p = gsap.utils.clamp(0, 1, progress);
  const bud = stage.querySelector<SVGGElement>('.flower-bud');
  const petals = stage.querySelectorAll<SVGGElement>('.flower-petal');
  const center = stage.querySelector<SVGGElement>('.flower-center');
  const leaves = stage.querySelector<SVGGElement>('.flower-leaves');
  const glow = stage.querySelector<SVGElement>('.flower-glow');
  const particles = stage.querySelector<SVGGElement>('.flower-particles');
  const stem = stage.querySelector<SVGGElement>('.flower-stem');

  const grayscale = gsap.utils.interpolate(1, 0, p);
  const brightness = gsap.utils.interpolate(0.62, 1.08, p);
  const saturate = gsap.utils.interpolate(0.15, 1.15, p);

  gsap.set(stage, {
    filter: `grayscale(${grayscale}) brightness(${brightness}) saturate(${saturate})`,
  });

  if (bud) {
    gsap.set(bud, {
      opacity: gsap.utils.interpolate(1, 0, gsap.utils.clamp(0, 1, p * 2.2)),
      scale: gsap.utils.interpolate(1, 0.82, p),
      transformOrigin: '50% 50%',
    });
  }

  petals.forEach((petal) => {
    const wrap = petal.closest('.flower-petal-wrap') as HTMLElement | null;
    const bloomAt = parseFloat(wrap?.dataset.bloomAt ?? '0.5');
    const tuck = parseFloat(wrap?.dataset.tuck ?? '10');
    const local = gsap.utils.clamp(0, 1, (p - bloomAt * 0.55) / (1 - bloomAt * 0.55 + 0.08));
    const eased = gsap.parseEase('power2.out')(local);

    gsap.set(petal, {
      scaleX: gsap.utils.interpolate(0.32, 1, eased),
      scaleY: gsap.utils.interpolate(0.12, 1, eased),
      rotation: gsap.utils.interpolate(-tuck, 4 + (wrap?.dataset.index ? Number(wrap.dataset.index) % 3 : 0), eased),
      opacity: gsap.utils.interpolate(0, 1, eased),
      transformOrigin: '0px 0px',
    });
  });

  if (center) {
    const cp = gsap.utils.clamp(0, 1, (p - 0.52) / 0.35);
    gsap.set(center, {
      opacity: cp,
      scale: gsap.utils.interpolate(0.35, 1, cp),
      transformOrigin: '50% 50%',
    });
  }

  if (leaves) {
    const lp = gsap.utils.clamp(0, 1, (p - 0.45) / 0.4);
    gsap.set(leaves, { opacity: lp * 0.9 });
  }

  if (stem) {
    gsap.set(stem, { opacity: gsap.utils.interpolate(0.55, 0.92, p) });
  }

  if (glow) {
    gsap.set(glow, {
      opacity: gsap.utils.interpolate(0, 0.72, gsap.utils.clamp(0, 1, (p - 0.35) / 0.65)),
      attr: { rx: gsap.utils.interpolate(80, 120, p) },
    });
  }

  if (particles) {
    gsap.set(particles, {
      opacity: gsap.utils.interpolate(0, 0.85, gsap.utils.clamp(0, 1, (p - 0.78) / 0.22)),
    });
  }
}

/** Wilt progress 0→1 — used after full bloom on continued scroll. */
export function applyWiltProgress(stage: HTMLElement, progress: number) {
  const p = gsap.utils.clamp(0, 1, progress);
  const petals = stage.querySelectorAll<SVGGElement>('.flower-petal');
  const center = stage.querySelector<SVGGElement>('.flower-center');
  const leaves = stage.querySelector<SVGGElement>('.flower-leaves');
  const glow = stage.querySelector<SVGElement>('.flower-glow');
  const particles = stage.querySelector<SVGGElement>('.flower-particles');

  gsap.set(stage, {
    filter: `grayscale(${gsap.utils.interpolate(0, 0.95, p)}) brightness(${gsap.utils.interpolate(1.08, 0.42, p)}) saturate(${gsap.utils.interpolate(1.15, 0.28, p)}) sepia(${gsap.utils.interpolate(0, 0.35, p)})`,
    y: gsap.utils.interpolate(0, 28, p),
  });

  petals.forEach((petal, i) => {
    gsap.set(petal, {
      rotation: gsap.utils.interpolate(4, 38 + (i % 5) * 4, p),
      scaleY: gsap.utils.interpolate(1, 0.55, p),
      opacity: gsap.utils.interpolate(1, 0.18, p),
      transformOrigin: '0px 0px',
    });
  });

  if (center) gsap.set(center, { opacity: gsap.utils.interpolate(1, 0.1, p), y: p * 18 });
  if (leaves) gsap.set(leaves, { opacity: gsap.utils.interpolate(0.9, 0.08, p) });
  if (glow) gsap.set(glow, { opacity: gsap.utils.interpolate(0.72, 0.08, p) });
  if (particles) gsap.set(particles, { opacity: gsap.utils.interpolate(0.85, 0, p) });
}

export function initClosedState(stage: HTMLElement) {
  applyBloomProgress(stage, 0);
}

export function initWiltedState(stage: HTMLElement) {
  applyBloomProgress(stage, 1);
  applyWiltProgress(stage, 1);
}

let ambientStarted = false;

export function startAmbientMotion(stage: HTMLElement) {
  if (ambientStarted || prefersReducedMotion()) return;
  ambientStarted = true;

  gsap.to(stage, {
    rotation: 1.2,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    transformOrigin: '50% 46%',
  });

  const glow = stage.querySelector('.flower-glow');
  if (glow) {
    gsap.to(glow, {
      opacity: 0.55,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  stage.querySelectorAll<SVGCircleElement>('.flower-particle').forEach((dot, i) => {
    gsap.to(dot, {
      y: -12 - (i % 4) * 6,
      x: `+=${(i % 2 === 0 ? 1 : -1) * (4 + (i % 3))}`,
      opacity: 0,
      duration: 3.5 + (i % 5) * 0.4,
      repeat: -1,
      delay: i * 0.22,
      ease: 'sine.out',
    });
  });
}

export function resetAmbientMotion() {
  ambientStarted = false;
}
