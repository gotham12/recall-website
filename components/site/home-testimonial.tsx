'use client';

import FadeContent from '@/components/FadeContent';
import { PATIENT_TESTIMONIAL } from '@/lib/constants';

export function HomeTestimonial() {
  return (
    <section id="voices" aria-labelledby="testimonial-heading" className="relative py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <FadeContent blur threshold={0.1}>
          <figure className="relative">
            {/* Large open-quote mark as design element, not a section eyebrow */}
            <div
              aria-hidden
              className="mb-4 font-display text-[6rem] font-bold leading-none text-recall-blue/20 md:text-[8rem]"
            >
              &ldquo;
            </div>

            <blockquote
              id="testimonial-heading"
              className="font-display text-3xl font-semibold leading-[1.2] tracking-tight text-white md:text-4xl lg:text-5xl"
            >
              {PATIENT_TESTIMONIAL.quote}
            </blockquote>

            <figcaption className="mt-8 flex items-center gap-4">
              <div className="h-px w-10 bg-white/20" />
              <div>
                <cite className="text-base font-semibold not-italic text-recall-sky">
                  {PATIENT_TESTIMONIAL.attribution}
                </cite>
                <p className="mt-0.5 text-sm text-white/40">{PATIENT_TESTIMONIAL.context}</p>
              </div>
            </figcaption>
          </figure>
        </FadeContent>
      </div>
    </section>
  );
}
