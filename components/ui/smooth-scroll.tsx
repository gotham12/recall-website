'use client';

import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SCROLLER = typeof document !== 'undefined' ? document.documentElement : undefined;

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    const instance = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: window.matchMedia('(pointer: coarse)').matches ? false : true,
      touchMultiplier: 1.4,
    });
    setLenis(instance);

    const onScroll = () => ScrollTrigger.update();
    instance.on('scroll', onScroll);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });

    const tickerFn = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener('load', refresh);
    window.addEventListener('resize', refresh);
    window.dispatchEvent(new Event('lenis-ready'));

    document.documentElement.classList.add('lenis');
    document.body.classList.remove('loading');

    return () => {
      window.removeEventListener('load', refresh);
      window.removeEventListener('resize', refresh);
      instance.off('scroll', onScroll);
      gsap.ticker.remove(tickerFn);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.defaults({ scroller: window });
      instance.destroy();
      setLenis(null);
      document.documentElement.classList.remove('lenis');
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export default SmoothScroll;
