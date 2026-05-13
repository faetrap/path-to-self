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
    top: 72,
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
    top: 50,
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
    top: 39,
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
    top: 29,
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
          <line x1="180" y1="0" x2="180" y2="720" />
          <line x1="70" y1="338" x2="290" y2="338" />
          <ellipse cx="180" cy="342" rx="126" ry="304" />
          <ellipse cx="180" cy="342" rx="92" ry="248" />
          <ellipse cx="180" cy="342" rx="58" ry="192" />
          <path d="M180 36 C70 168 70 480 180 690 C290 480 290 168 180 36" />
          <path d="M180 36 C104 210 104 456 180 690 C256 456 256 210 180 36" />
        </g>
        <g className="ticks">
          {[54, 144, 252, 338, 456, 606, 696].map((y) => (
            <circle key={y} cx="180" cy={y} r="2.2" />
          ))}
          {[70, 102, 258, 290].map((x) => (
            <circle key={x} cx={x} cy="338" r="2.1" />
          ))}
        </g>
        <g className="human" filter="url(#softInk)">
          <ellipse cx="180" cy="122" rx="30" ry="38" />
          <path d="M156 118 C160 96 170 82 180 82 C191 82 201 96 204 119" />
          <path d="M162 106 C169 100 176 99 180 100 C184 99 191 100 198 106" />
          <path d="M162 118 C167 115 172 115 176 118 M184 118 C188 115 193 115 198 118" />
          <path d="M178 120 C176 128 177 132 181 133" />
          <path d="M166 135 C174 142 187 142 196 135" />
          <path d="M169 112 L191 112 M172 126 L188 126" />
          <path d="M171 149 C176 153 184 153 190 149" />
          <path d="M166 158 C158 174 141 184 119 194 C108 199 100 212 98 226 C94 263 94 302 98 340" />
          <path d="M194 158 C202 174 219 184 241 194 C252 199 260 212 262 226 C266 263 266 302 262 340" />
          <path d="M121 198 C144 214 160 221 180 222 C200 221 216 214 239 198" />
          <path d="M136 218 C151 244 162 258 180 260 C198 258 209 244 224 218" />
          <path d="M128 204 C127 270 130 335 142 396 C149 430 151 494 143 586" />
          <path d="M232 204 C233 270 230 335 218 396 C211 430 209 494 217 586" />
          <path d="M142 396 C154 408 166 414 180 414 C194 414 206 408 218 396" />
          <path d="M144 216 C156 236 166 253 180 254 C194 253 204 236 216 216" />
          <path d="M143 250 C160 270 200 270 217 250" />
          <path d="M142 312 C164 326 196 326 218 312" />
          <path d="M151 346 C166 353 194 353 209 346" />
          <path d="M151 382 C165 392 195 392 209 382" />
          <path d="M119 194 C110 256 106 330 116 405 C121 440 127 493 125 552" />
          <path d="M241 194 C250 256 254 330 244 405 C239 440 233 493 235 552" />
          <path d="M116 405 C119 459 121 520 114 632" />
          <path d="M244 405 C241 459 239 520 246 632" />
          <path d="M151 420 C157 469 156 533 148 621" />
          <path d="M209 420 C203 469 204 533 212 621" />
          <path d="M169 420 C166 476 164 548 159 650" />
          <path d="M191 420 C194 476 196 548 201 650" />
          <path d="M143 586 C137 617 131 646 122 672" />
          <path d="M217 586 C223 617 229 646 238 672" />
          <path d="M114 632 C107 648 94 664 73 674 C92 680 113 678 128 668" />
          <path d="M246 632 C253 648 266 664 287 674 C268 680 247 678 232 668" />
          <path d="M99 340 C87 368 83 408 82 443 C82 460 74 472 62 474 C55 468 55 451 64 440" />
          <path d="M261 340 C273 368 277 408 278 443 C278 460 286 472 298 474 C305 468 305 451 296 440" />
          <path d="M82 443 C72 458 67 477 62 498 M278 443 C288 458 293 477 298 498" />
          <path d="M63 475 C60 484 60 493 62 502 M70 474 C68 488 68 497 70 506 M290 474 C292 488 292 497 290 506 M297 475 C300 484 300 493 298 502" />
          <path d="M151 170 C167 181 193 181 209 170" />
          <path d="M150 694 C166 704 194 704 210 694" />
        </g>
        <g className="root-lines">
          {Array.from({ length: 28 }, (_, index) => {
            const x = 180 + (index - 13.5) * 8;
            const bend = 180 + (index - 13.5) * 4;
            return <path key={index} d={`M180 674 C${bend} 690 ${x} 700 ${x + (index % 2 ? 24 : -24)} 714`} />;
          })}
        </g>
      </svg>

      <div className="spine-line" />
      {chakras.map((chakra, index) => (
        <button
          key={chakra.id}
          className={`body-chakra${index === activeIndex ? ' selected' : ''}`}
          style={{ top: `${chakra.top}%`, '--chakra': chakra.color } as React.CSSProperties}
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
