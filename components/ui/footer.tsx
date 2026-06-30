import React from 'react';
import Link from 'next/link';
import { CONTACT_EMAIL, DEMO_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';

const Footer: React.FC<{ variant?: 'dark' | 'light' }> = ({ variant = 'dark' }) => {
  const light = variant === 'light';

  return (
    <footer
      className={cn(
        'relative w-full min-h-[520px] flex flex-col overflow-hidden pt-20 px-6 md:px-12 lg:px-24',
        light ? 'bg-product-100 text-product-950' : 'bg-black text-white'
      )}
    >
      <article id="lighting-wrap">
        <article id="lightings">
          <section id="light-one" className="lighting-section">
            <section id="light-two" className="lighting-section">
              <section id="light-three" className="lighting-section">
                <section id="light-four" className="lighting-section">
                  <section id="light-five" className="lighting-section" />
                </section>
              </section>
            </section>
          </section>
        </article>
      </article>

      <div className="flex flex-col lg:flex-row justify-between w-full h-full pb-20 z-10 relative">
        <div className="flex flex-col mb-32 lg:mb-28 max-w-xl">
          <div className="mb-8">
            <span
              className={cn(
                'inline-block px-4 py-1.5 rounded-full text-[10px] font-medium tracking-[0.2em] uppercase',
                light ? 'bg-white text-recall-blue' : 'bg-zinc-900 text-zinc-400'
              )}
            >
              Recall
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif-elegant leading-tight">
            AI-native cognitive care
            <br />
            for families who
            <br />
            need early signal
          </h2>

          <p className={cn('mt-6 text-sm leading-relaxed max-w-md', light ? 'text-product-800/70' : 'text-zinc-400')}>
            Recall extends caregivers with Clara for patients, Recall AI for supervisors, and the ACSE engine that
            catches decline before crisis.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className={cn(
              'mt-4 inline-block text-sm font-medium transition hover:opacity-80',
              light ? 'text-recall-blue' : 'text-recall-sky'
            )}
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
          <div className="flex flex-col space-y-6">
            <h3 className={cn('text-[11px] font-medium tracking-[0.2em] uppercase', light ? 'text-product-800/50' : 'text-zinc-500')}>
              Explore
            </h3>
            <ul className="flex flex-col space-y-3">
              <li><FooterLink href="/problem/" light={light}>The problem</FooterLink></li>
              <li><FooterLink href="/product/" light={light}>The product</FooterLink></li>
              <li><FooterLink href="/#team" light={light}>Team</FooterLink></li>
              <li><FooterLink href={DEMO_URL} light={light}>Live app</FooterLink></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className={cn('text-[11px] font-medium tracking-[0.2em] uppercase', light ? 'text-product-800/50' : 'text-zinc-500')}>
              Contact
            </h3>
            <ul className="flex flex-col space-y-3">
              <li>
                <FooterLink href={`mailto:${CONTACT_EMAIL}`} light={light}>
                  Email
                </FooterLink>
              </li>
              <li><FooterLink href="/#contact" light={light}>Get in touch</FooterLink></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className={cn('text-[11px] font-medium tracking-[0.2em] uppercase', light ? 'text-product-800/50' : 'text-zinc-500')}>
              Code
            </h3>
            <ul className="flex flex-col space-y-3">
              <li><FooterLink href="https://github.com/gotham12/recall-website" light={light}>Website repo</FooterLink></li>
              <li><FooterLink href="https://github.com/AlmightyTamer/recall" light={light}>App repo</FooterLink></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none flex justify-center overflow-hidden">
        <h1 className="text-[18vw] font-serif-elegant leading-none translate-y-[0%] tracking-tighter whitespace-nowrap wordmark-gradient">
          Recall
        </h1>
      </div>

      <div className="mt-auto pb-8 z-10 text-center w-full relative">
        <p className={cn('text-[10px] tracking-[0.2em] font-medium uppercase', light ? 'text-product-800/40' : 'text-zinc-700')}>
          © 2026 Recall — Built by Advaith & Param
        </p>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, light }) => {
  const className = cn(
    'text-sm tracking-wide transition-colors duration-200 ease-in-out block',
    light ? 'text-product-800 hover:text-recall-blue' : 'text-zinc-200 hover:text-white'
  );

  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
      {children}
    </a>
  );
};

export default Footer;
