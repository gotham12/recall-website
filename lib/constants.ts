export const SITE_URL = 'https://gotham12.github.io/recall-website';
export const DEMO_URL = 'https://almightytamer.github.io/recall/';
export const VIDEO_ID = 'Xh_k-GUBmmA';
export const CONTACT_EMAIL = 'avijayasankaran@gmail.com';

export const FOUNDERS = {
  names: 'Advaith Vijayasankaran & Param Tyagi',
  shortNames: 'Advaith & Param',
  title: 'Co-Founders',
  creditLine: 'Founded by Advaith Vijayasankaran & Param Tyagi',
  copyrightLine: '© 2026 Recall — Founded by Advaith Vijayasankaran & Param Tyagi',
} as const;

export const GITHUB_LINKS = {
  website: 'https://github.com/gotham12/recall-website',
  app: 'https://github.com/AlmightyTamer/recall',
} as const;

export const KEY_STATS = [
  {
    value: '6.9M',
    label: 'Americans 65+ living with Alzheimer\u2019s dementia',
    source: 'Alzheimer\u2019s Association · 2025',
  },
  {
    value: '12M',
    label: 'Unpaid U.S. caregivers supporting someone with dementia',
    source: 'Alzheimer\u2019s Association · 2025',
  },
  {
    value: '$413B',
    label: 'Annual value of unpaid dementia caregiving',
    source: '19B hours of family labor',
  },
] as const;

export const CAREGIVER_TESTIMONIAL = {
  quote:
    'I didn\u2019t know Mom had skipped her afternoon meds until she called me crying at 8 PM. By then we were already talking about the ER \u2014 and I had nothing to show the doctor except my memory of the day.',
  attribution: 'Susan M.',
  context: 'Composite caregiver scenario inspired by families Recall is built for',
} as const;

export const PITCH_SUMMARY = {
  headline: 'Cognitive care that catches decline before crisis.',
  body: 'Recall gives patients a warm voice companion (Clara), gives caregivers a live AI advisor (Recall AI), and scores cognitive stability in real time (ACSE) \u2014 so families act on signal, not panic. Offline-first. Voice-first. Built for dignity at home.',
  bullets: [
    'Clara for patients \u2014 voice, meds, photos, orientation without shame',
    'Recall AI for caregivers \u2014 briefings, transcripts, checkup prep in plain English',
    'ACSE engine \u2014 live cognitive scoring; Comfort Mode before sundowning becomes crisis',
  ],
} as const;

export const PRIVACY_TRUST = {
  headline: 'Private by design',
  points: [
    'Health data stays on-device first \u2014 Dexie (IndexedDB) offline storage before anything syncs',
    'Edge AI inference on Cloudflare Workers; no patient audio stored for model training',
    'Human-in-the-loop fallbacks for med verification and escalation \u2014 not black-box autopilot',
    'Built for HIPAA-ready deployment patterns; we treat cognitive data as clinical-grade sensitive',
  ],
  disclaimer:
    'Recall is pre-production health software. Pilot partners receive a full data-handling brief before onboarding.',
} as const;

export const TEAM = [
  {
    name: 'Advaith Vijayasankaran',
    role: 'Co-Founder & CEO',
    photo: '/screenshots/advaith-vijayasankaran.png',
    bio: 'Advaith built Recall end to end — Clara for Margaret, Recall AI for Susan, and the ACSE engine that scores cognitive stability in real time. He designed the offline-first care graph, edge AI on Cloudflare, vision med verification, Comfort Mode de-escalation, and the Recall Cascade that turns early signal into action before crisis. Recall is his answer to watching families carry dementia care alone: AI-native infrastructure that preserves dignity, catches decline early, and gives caregivers plain-English signal instead of guesswork.',
  },
  {
    name: 'Param Tyagi',
    role: 'Co-Founder & CTO',
    photo: '/screenshots/param-tyagi.png',
    bio: 'Param co-founded Recall as CTO and owns the production engineering stack — the React and TypeScript client, Capacitor iOS shell, Dexie offline database, and Cloudflare Workers that run LLM, TTS, and vision inference at the edge. He built the sync layer that keeps Margaret\u2019s and Susan\u2019s experiences consistent, the GitHub Pages and CI pipeline that ships the live demo, and the observability patterns that make Recall reliable when families need it most. He turns clinical requirements into systems that actually ship.',
  },
] as const;

export const HERO_FLOWER = {
  bud: '/screenshots/flower-bud-closed.png',
  bloom: '/screenshots/flower-peony-hyperreal.png',
} as const;
