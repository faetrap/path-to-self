import { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, Info, Plus, Sparkle } from 'lucide-react';

type Chakra = {
  id: string;
  name: string;
  subtitle: string;
  keywords: string;
  color: string;
  element: string;
  location: string;
  gland: string;
  mantra: string;
  top: number;
  x: number;
  summary: string;
  sections: string[];
};

const chakras: Chakra[] = [
  {
    id: '01',
    name: 'Muladhara',
    subtitle: 'The Root Center',
    keywords: 'Root + Grounding + Survival',
    color: '#9c2f2b',
    element: 'Earth',
    location: 'Base of Spine',
    gland: 'Adrenals',
    mantra: 'LAM',
    top: 74,
    x: 35,
    summary:
      'Muladhara is our foundation. It governs our sense of safety, stability, and belonging. When balanced, we feel grounded, supported by life, and present in our bodies.',
    sections: [
      'Psychological Themes',
      'Developmental Stage',
      'Shadow & Blockages',
      'Somatic & Physiology',
      'Nervous System Links',
      'Practices & Meditations',
      'Yoga Poses',
      'Mantras & Sounds',
      'Integration & Contemplation'
    ]
  },
  {
    id: '02',
    name: 'Svadhishthana',
    subtitle: 'The Sacral Center',
    keywords: 'Sacral + Flow + Creativity',
    color: '#c7792d',
    element: 'Water',
    location: 'Lower Abdomen',
    gland: 'Gonads',
    mantra: 'VAM',
    top: 61,
    x: 41,
    summary:
      'Svadhishthana carries feeling, pleasure, and creative flow. It is the fluid intelligence of desire, emotion, intimacy, and the ability to move with life.',
    sections: [
      'Psychological Themes',
      'Creative Flow',
      'Pleasure & Desire',
      'Relationship Patterns',
      'Somatic & Physiology',
      'Practices & Meditations',
      'Yoga Poses',
      'Mantras & Sounds',
      'Integration & Contemplation'
    ]
  },
  {
    id: '03',
    name: 'Manipura',
    subtitle: 'The Solar Plexus Center',
    keywords: 'Solar Plexus + Power + Will',
    color: '#c6aa27',
    element: 'Fire',
    location: 'Solar Plexus',
    gland: 'Pancreas',
    mantra: 'RAM',
    top: 49,
    x: 45,
    summary:
      'Manipura is the inner fire of will, confidence, and selfhood. It turns feeling into action and gives the body a clear center of direction.',
    sections: [
      'Psychological Themes',
      'Power & Will',
      'Boundaries',
      'Digestive Fire',
      'Nervous System Links',
      'Practices & Meditations',
      'Yoga Poses',
      'Mantras & Sounds',
      'Integration & Contemplation'
    ]
  },
  {
    id: '04',
    name: 'Anahata',
    subtitle: 'The Heart Center',
    keywords: 'Heart + Love + Connection',
    color: '#3c8b4a',
    element: 'Air',
    location: 'Heart',
    gland: 'Thymus',
    mantra: 'YAM',
    top: 38,
    x: 49,
    summary:
      'Anahata is the bridge between body and spirit. It holds love, grief, compassion, forgiveness, and the felt truth of connection.',
    sections: [
      'Psychological Themes',
      'Love & Grief',
      'Compassion',
      'Somatic & Physiology',
      'Nervous System Links',
      'Practices & Meditations',
      'Yoga Poses',
      'Mantras & Sounds',
      'Integration & Contemplation'
    ]
  },
  {
    id: '05',
    name: 'Vishuddha',
    subtitle: 'The Throat Center',
    keywords: 'Throat + Expression + Truth',
    color: '#2f82a8',
    element: 'Ether',
    location: 'Throat',
    gland: 'Thyroid',
    mantra: 'HAM',
    top: 28,
    x: 53,
    summary:
      'Vishuddha is the channel of truth. It governs voice, listening, creative expression, and the courage to let the inner world become sound.',
    sections: [
      'Psychological Themes',
      'Voice & Truth',
      'Creative Expression',
      'Listening',
      'Somatic & Physiology',
      'Practices & Meditations',
      'Yoga Poses',
      'Mantras & Sounds',
      'Integration & Contemplation'
    ]
  },
  {
    id: '06',
    name: 'Ajna',
    subtitle: 'The Third Eye Center',
    keywords: 'Third Eye + Insight + Intuition',
    color: '#4d3a90',
    element: 'Light',
    location: 'Brow',
    gland: 'Pituitary',
    mantra: 'OM',
    top: 20,
    x: 60,
    summary:
      'Ajna is the center of perception, pattern recognition, and inner vision. It clarifies intuition and allows the mind to witness itself.',
    sections: [
      'Psychological Themes',
      'Inner Vision',
      'Dreams & Symbols',
      'Discernment',
      'Nervous System Links',
      'Practices & Meditations',
      'Yoga Poses',
      'Mantras & Sounds',
      'Integration & Contemplation'
    ]
  },
  {
    id: '07',
    name: 'Sahasrara',
    subtitle: 'The Crown Center',
    keywords: 'Crown + Unity + Transcendence',
    color: '#83368f',
    element: 'Consciousness',
    location: 'Crown',
    gland: 'Pineal',
    mantra: 'Silence',
    top: 12,
    x: 55,
    summary:
      'Sahasrara opens into meaning, unity, and spacious awareness. It is the thousand-petaled crown where individual identity remembers its source.',
    sections: [
      'Psychological Themes',
      'Meaning & Purpose',
      'Awe & Wonder',
      'Spiritual Practice',
      'Nervous System Links',
      'Practices & Meditations',
      'Yoga Poses',
      'Mantras & Sounds',
      'Integration & Contemplation'
    ]
  }
];

const sectionDetails: Record<string, string> = {
  'Psychological Themes':
    'The beliefs, emotional patterns, and identity structures governed by this center. Use this section to trace how the chakra appears in daily behavior.',
  'Developmental Stage':
    'The life stage where this center is most strongly imprinted, including early needs, unmet experiences, and the capacities that mature through integration.',
  'Shadow & Blockages':
    'The compensations, defenses, and recurring symptoms that appear when this center is under-expressed, over-expressed, or disconnected from the body.',
  'Somatic & Physiology':
    'The body regions, organs, muscular patterns, and sensory cues commonly associated with this center.',
  'Nervous System Links':
    'How this center relates to regulation, threat response, social connection, shutdown, activation, and embodied safety.',
  'Practices & Meditations':
    'Grounded contemplative practices for working with this center through breath, attention, ritual, movement, and awareness.',
  'Yoga Poses':
    'Postures and movement patterns that help open, stabilize, or clarify the energy of this center.',
  'Mantras & Sounds':
    'Seed sounds, tonal practices, and vibrational cues used to tune attention toward this center.',
  'Integration & Contemplation':
    'Questions and reflections for turning insight into lived behavior, relationship, and embodied choice.'
};

function sectionCopy(title: string, chakra: Chakra) {
  return sectionDetails[title] ?? `A focused lens for exploring ${chakra.name} through ${title.toLowerCase()}.`;
}

function ChakraSigil({ chakra, active = false }: { chakra: Chakra; active?: boolean }) {
  const petal = 'M50 8 C59 15 62 29 50 38 C38 29 41 15 50 8Z';
  const petals = (count: number, radiusScale = 1) =>
    Array.from({ length: count }, (_, index) => (
      <path
        key={index}
        d={petal}
        transform={`rotate(${(360 / count) * index} 50 50) translate(0 ${radiusScale === 1 ? 0 : 3}) scale(${radiusScale}) translate(${50 * (1 - radiusScale)} ${50 * (1 - radiusScale)})`}
      />
    ));

  const icon = (() => {
    switch (chakra.id) {
      case '01':
        return (
          <>
            <g className="icon-petals">{petals(4, 1.08)}</g>
            <rect className="icon-shape" x="25" y="25" width="50" height="50" />
            <circle className="icon-shape" cx="50" cy="50" r="28" />
            <path className="icon-shape" d="M50 70 L31 36 H69 Z" />
          </>
        );
      case '02':
        return (
          <>
            <g className="icon-petals">{petals(6, 1.06)}</g>
            <circle className="icon-shape" cx="50" cy="50" r="29" />
            <path className="icon-shape" d="M33 39 C40 55 60 55 67 39 C64 66 36 66 33 39Z" />
            <circle className="icon-shape" cx="50" cy="43" r="15" />
          </>
        );
      case '03':
        return (
          <>
            <g className="icon-petals">{petals(10, 1.05)}</g>
            <circle className="icon-shape" cx="50" cy="50" r="30" />
            <path className="icon-shape" d="M50 70 L29 34 H71 Z" />
          </>
        );
      case '04':
        return (
          <>
            <g className="icon-petals">{petals(12, 1.04)}</g>
            <circle className="icon-shape" cx="50" cy="50" r="30" />
            <path className="icon-shape" d="M50 25 L72 63 H28 Z" />
            <path className="icon-shape" d="M50 75 L28 37 H72 Z" />
          </>
        );
      case '05':
        return (
          <>
            <g className="icon-petals">{petals(16, 1.02)}</g>
            <circle className="icon-shape" cx="50" cy="50" r="31" />
            <path className="icon-shape" d="M50 72 L27 32 H73 Z" />
            <circle className="icon-shape" cx="50" cy="50" r="15" />
          </>
        );
      case '06':
        return (
          <>
            <path className="icon-shape icon-wing" d="M13 52 C24 27 40 20 50 34 C38 46 28 57 13 52Z" />
            <path className="icon-shape icon-wing" d="M87 52 C76 27 60 20 50 34 C62 46 72 57 87 52Z" />
            <circle className="icon-shape" cx="50" cy="50" r="28" />
            <path className="icon-shape" d="M50 70 L29 34 H71 Z" />
            <path className="icon-shape" d="M26 32 H74" />
          </>
        );
      default:
        return (
          <>
            <g className="icon-petals outer-lotus">{petals(16, 1.03)}</g>
            <g className="icon-petals inner-lotus">{petals(8, 0.72)}</g>
            <circle className="icon-shape" cx="50" cy="50" r="18" />
          </>
        );
    }
  })();

  return (
    <svg
      className={`sigil${active ? ' is-active' : ''}`}
      style={{ '--chakra': chakra.color } as React.CSSProperties}
      aria-hidden="true"
      viewBox="0 0 100 100"
    >
      {icon}
    </svg>
  );
}

function BodyFigure({ activeIndex, onSelect }: { activeIndex: number; onSelect: (index: number) => void }) {
  const rings = useMemo(() => Array.from({ length: 9 }, (_, index) => index), []);

  return (
    <div className="figure-stage">
      <div className="geometry geometry-top">
        {rings.map((ring) => (
          <span key={ring} style={{ width: `${24 + ring * 9}%`, height: `${18 + ring * 11}%` }} />
        ))}
      </div>
      <div className="geometry geometry-base">
        {Array.from({ length: 10 }, (_, ring) => (
          <span key={ring} style={{ width: `${18 + ring * 8}%`, height: `${8 + ring * 4}%` }} />
        ))}
      </div>
      <svg className="body-art" viewBox="0 0 360 720" role="img" aria-label="Human anatomy diagram with chakra centers">
        <defs>
          <filter id="softInk">
            <feGaussianBlur stdDeviation="0.12" />
          </filter>
        </defs>
        <g className="sacred-lines">
          <line x1="155" y1="70" x2="155" y2="672" />
          <line x1="62" y1="338" x2="302" y2="338" />
          <ellipse cx="166" cy="360" rx="118" ry="290" />
          <ellipse cx="166" cy="360" rx="84" ry="235" />
          <path d="M160 80 C70 188 66 460 130 670 C245 548 272 242 160 80" />
          <path d="M156 100 C102 232 96 462 132 650 C220 520 242 250 156 100" />
        </g>
        <g className="ticks">
          {[92, 146, 204, 278, 356, 438, 570, 666].map((y) => (
            <circle key={y} cx="155" cy={y} r="2.2" />
          ))}
          {[70, 106, 236, 282].map((x) => (
            <circle key={x} cx={x} cy="338" r="2.1" />
          ))}
        </g>
        <g className="human seated-human" filter="url(#softInk)">
          <path d="M122 640 C86 617 82 548 93 491 C102 440 93 398 85 356 C74 300 80 238 104 176 C122 128 147 94 190 76 C216 87 236 103 249 127" />
          <path d="M249 127 C252 150 250 166 245 183 C231 180 217 176 205 169" />
          <path d="M205 169 C190 197 175 231 165 278 C151 345 149 420 158 488 C164 538 151 600 122 640" />
          <path d="M205 169 C214 183 222 194 229 202" />
          <path d="M229 202 C219 209 209 210 198 205" />
          <path d="M219 157 C229 160 238 160 245 157" />
          <path d="M220 146 C226 149 232 149 238 146" />
          <path d="M218 122 C226 117 235 118 243 124" />
          <path d="M235 128 C233 138 233 145 239 151" />
          <path d="M228 166 C231 169 237 170 242 167" />
          <path d="M179 109 C172 148 169 190 176 222" />
          <path d="M137 207 C163 205 190 204 218 212" />
          <path d="M150 227 C171 233 189 244 203 264" />
          <path d="M161 260 C174 300 183 354 180 416" />
          <path d="M139 323 C147 371 150 420 146 470" />
          <path d="M146 470 C174 490 224 493 282 478 C306 472 332 473 348 489" />
          <path d="M159 496 C204 507 254 511 308 507 C333 505 351 520 357 542" />
          <path d="M180 535 C214 524 254 525 298 542 C323 552 339 572 336 593" />
          <path d="M136 499 C174 544 232 582 314 612" />
          <path d="M314 612 C296 626 260 629 221 620 C183 611 147 623 122 640" />
          <path d="M336 593 C351 613 344 634 323 642 C313 639 304 633 299 623" />
          <path d="M333 596 C320 599 309 598 300 591" />
          <path d="M161 496 C127 517 107 517 88 499" />
          <path d="M158 488 C147 520 145 558 152 596" />
          <path d="M152 596 C137 613 128 627 122 640" />
          <path d="M86 356 C103 371 119 376 136 369" />
          <path d="M99 491 C112 504 127 507 146 501" />
          <path d="M164 279 C148 260 132 250 113 251" />
          <path d="M114 238 C123 225 133 220 146 222" />
          <path d="M215 437 C249 449 285 454 323 450" />
          <path d="M321 450 C334 454 343 465 348 489" />
          <path d="M292 497 C318 490 340 496 357 542" />
          <path d="M324 642 C315 653 299 653 288 643 C299 637 310 636 324 642" />
        </g>
        <g className="spine-detail">
          <path d="M174 103 C154 142 143 197 132 252 C120 314 116 377 129 438 C140 489 133 555 117 626" />
          <path d="M158 118 C139 170 127 226 117 292 C108 352 108 414 119 472 C128 520 123 575 108 622" />
          {Array.from({ length: 25 }, (_, index) => {
            const y = 134 + index * 18.4;
            const x = 161 - Math.sin(index / 3) * 22 - index * 1.8;
            return <path key={index} d={`M${x.toFixed(1)} ${y.toFixed(1)} C${(x - 10).toFixed(1)} ${(y + 4).toFixed(1)} ${(x - 8).toFixed(1)} ${(y + 12).toFixed(1)} ${(x + 2).toFixed(1)} ${(y + 12).toFixed(1)}`} />;
          })}
        </g>
        <g className="root-lines seated-ground">
          {Array.from({ length: 18 }, (_, index) => {
            const x = 126 + (index - 8.5) * 10;
            return <path key={index} d={`M126 640 C${x} 658 ${x + (index % 2 ? 38 : -28)} 676 ${x + (index % 2 ? 58 : -46)} 696`} />;
          })}
        </g>
      </svg>

      {chakras.map((chakra, index) => (
        <button
          key={chakra.id}
          className={`body-chakra${index === activeIndex ? ' selected' : ''}`}
          style={{ top: `${chakra.top}%`, left: `${chakra.x}%`, '--chakra': chakra.color } as React.CSSProperties}
          onClick={() => onSelect(index)}
          aria-label={`Select ${chakra.name}`}
        >
          <ChakraSigil chakra={chakra} active={index === activeIndex} />
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openSection, setOpenSection] = useState<number | null>(0);
  const active = chakras[activeIndex];

  function chooseChakra(index: number) {
    setActiveIndex(index);
    setOpenSection(0);
  }

  return (
    <main className="app-shell">
      <section className="left-panel">
        <header className="micro-row">
          <Sparkle size={18} strokeWidth={1.4} />
          <span>An Anatomy of Consciousness</span>
        </header>

        <h1>Path<br />to Self</h1>
        <div className="rule" />
        <p className="intro">
          An interactive journey through the chakras, the energy centers that shape our physiology,
          psychology and spiritual evolution.
        </p>

        <div className="map-label">
          <Sparkle size={18} strokeWidth={1.2} />
          <div>
            <span>An Experimental Map</span>
            <strong>Select a chakra to begin</strong>
          </div>
          <ArrowDown size={16} strokeWidth={1.4} />
        </div>

        <nav className="chakra-list" aria-label="Chakra navigation">
          {chakras.map((chakra, index) => (
            <button
              key={chakra.id}
              className={index === activeIndex ? 'active' : ''}
                onClick={() => chooseChakra(index)}
            >
              <span className="nav-id">{chakra.id}</span>
              <ChakraSigil chakra={chakra} active={index === activeIndex} />
              <strong>{chakra.name}</strong>
              <em>{chakra.keywords}</em>
            </button>
          ))}
        </nav>

        <footer>
          <a>Journal</a>
          <a>Library</a>
          <a>About</a>
          <Info size={16} strokeWidth={1.4} />
        </footer>
      </section>

      <section className="center-panel">
        <BodyFigure activeIndex={activeIndex} onSelect={chooseChakra} />
      </section>

      <section className="right-panel">
        <header className="about-row">
          <span>About This System</span>
          <Info size={16} strokeWidth={1.4} />
        </header>

        <div className="active-kicker">Active Chakra</div>
        <div className="chakra-number" style={{ color: active.color }}>{active.id}</div>
        <h2>{active.name}</h2>
        <p className="subtitle">{active.subtitle}</p>
        <div className="rule" />

        <dl className="facts">
          <div>
            <dt>Element</dt>
            <dd>{active.element}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{active.location}</dd>
          </div>
          <div>
            <dt>Gland</dt>
            <dd>{active.gland}</dd>
          </div>
          <div>
            <dt>Mantra</dt>
            <dd>{active.mantra}</dd>
          </div>
        </dl>

        <p className="summary">{active.summary}</p>

        <div className="accordion">
          {active.sections.map((section, index) => (
            <div key={section} className={`accordion-item${openSection === index ? ' open' : ''}`}>
              <button
                className="accordion-row"
                aria-expanded={openSection === index}
                onClick={() => setOpenSection(openSection === index ? null : index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{section}</strong>
                <Plus size={19} strokeWidth={1.5} />
              </button>
              <div className="accordion-content">
                <p>{sectionCopy(section, active)}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="coming-soon">
          <span>Coming Soon</span>
          <strong>Asanas & Somatic Practices</strong>
          <em>Yoga poses, breathwork, meditations</em>
          <ArrowRight size={20} strokeWidth={1.4} />
        </button>
      </section>
    </main>
  );
}
