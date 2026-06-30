'use client';

import FadeContent from '@/components/FadeContent';
import { PATIENT_TESTIMONIAL } from '@/lib/constants';

export function HomeTestimonial() {
  return (
    <section id="voices" aria-labelledby="testimonial-heading" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeContent blur threshold={0.1}>
          <figure className="text-center">
            <p id="testimonial-heading" className="sr-only">
              Patient testimonial
            </p>
            <blockquote className="font-display text-3xl italic leading-snug text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              &ldquo;{PATIENT_TESTIMONIAL.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8">
              <cite className="text-base not-italic text-recall-sky md:text-lg">
                {PATIENT_TESTIMONIAL.attribution}
              </cite>
              <p className="mt-1 text-sm text-white/40 md:text-base">{PATIENT_TESTIMONIAL.context}</p>
            </figcaption>
          </figure>
        </FadeContent>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </section>
  );
}
