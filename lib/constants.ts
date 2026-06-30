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

export const HERO_COPY = {
  headline: 'When the world goes quiet, a name remains.',
  subhead:
    'For the person losing the thread of a day — and the daughter holding the rest together. Recall gives Margaret a voice that remembers, and Susan a signal she can trust.',
  scrollHint: 'Scroll — and watch memory bloom back into color.',
} as const;

/** Home stats band — verify figures before major press pushes. */
export const HOME_STATS = [
  {
    id: 'global-dementia',
    value: 55,
    suffix: 'M+',
    label: 'People worldwide living with dementia',
    source: 'WHO / Alzheimer\u2019s Disease International · 2025',
  },
  {
    id: 'caregivers',
    value: 12,
    suffix: 'M',
    label: 'Unpaid U.S. caregivers supporting someone with dementia',
    source: 'Alzheimer\u2019s Association · 2025 Facts & Figures',
  },
  {
    id: 'on-device',
    value: 100,
    suffix: '%',
    prefix: '',
    label: 'Health data stored on-device first — before anything leaves Margaret\u2019s phone',
    source: 'Dexie (IndexedDB) offline-first architecture',
  },
] as const;

export const PATIENT_TESTIMONIAL = {
  quote:
    'When I forget a name, the room feels empty. Clara says it back to me — softly, like someone who was there all along.',
  attribution: 'Margaret, 81',
  context: 'Living at home · daughter Susan nearby',
} as const;

export const CAREGIVER_TESTIMONIAL = {
  quote:
    'I didn\u2019t know Mom had skipped her afternoon meds until she called me crying at 8 PM. By then we were already talking about the ER — and I had nothing to show the doctor except my memory of the day.',
  attribution: 'Susan M.',
  context: 'Composite caregiver scenario inspired by families Recall is built for',
} as const;

export const HOME_FEATURES = [
  {
    id: 'clara',
    title: 'Clara',
    tag: 'Voice companion',
    description:
      'Margaret never feels like she failed a test — Clara talks like family, remembers her routines, and gently orients her when the day blurs. Edge AI voice on Cloudflare Workers, refreshed before every reply.',
  },
  {
    id: 'meds',
    title: 'Vision-verified medication',
    tag: 'Safety without shame',
    description:
      'Susan stops guessing whether Mom took her pills — the camera reads the bottle, confirms the dose, and blocks a dangerous double-take with a warm voice, not an alarm.',
  },
  {
    id: 'acse',
    title: 'ACSE score & Comfort Mode',
    tag: 'Early signal',
    description:
      'Families act before crisis — the engine scores repeat questions, missed meds, and disorientation in real time; when stability drops, Comfort Mode de-escalates with grounding voice and breath before sundowning becomes an ER visit.',
  },
  {
    id: 'vitals',
    title: 'Apple Health vitals',
    tag: 'Whole-person picture',
    description:
      'Caregivers see more than mood — heart rate, steps, and sleep from Apple Health surface alongside cognitive signal so Susan walks into the doctor with data, not dread.',
  },
  {
    id: 'privacy',
    title: 'On-device privacy',
    tag: 'Trust by design',
    description:
      'Margaret keeps dignity and control — meds, routines, and Clara conversations live in Dexie on her device first; edge inference handles AI without storing patient audio for training.',
  },
] as const;

export const HOME_SCREENSHOTS = [
  {
    image: '/screenshots/patient-clara.png',
    title: 'Clara',
    subtitle: 'Patient',
    desc: 'A voice that remembers her name when she cannot.',
  },
  {
    image: '/screenshots/supervisor-recall-ai.png',
    title: 'Recall AI',
    subtitle: 'Caregiver',
    desc: 'Plain-English briefings when Susan needs answers fast.',
  },
  {
    image: '/screenshots/patient-today.png',
    title: 'Today',
    subtitle: 'Patient',
    desc: 'One gentle view of meds, moments, and the day ahead.',
  },
] as const;

/** Legacy stats — used on /problem page */
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

export const PITCH_SUMMARY = {
  headline: 'Cognitive care that catches decline before crisis.',
  body: 'Recall gives patients a warm voice companion (Clara), gives caregivers a live AI advisor (Recall AI), and scores cognitive stability in real time (ACSE) — so families act on signal, not panic.',
  bullets: [
    'Clara keeps Margaret oriented — voice, meds, photos, without shame',
    'Recall AI briefs Susan in plain English — meds, alerts, checkup prep',
    'ACSE catches drift early — Comfort Mode before crisis',
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

export const PAGE_BACKGROUNDS = {
  problemBrain: '/screenshots/problem-brain-atmosphere.png',
} as const;
