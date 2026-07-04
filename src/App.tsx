import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Info, Plus, Sparkle, X } from 'lucide-react';
import { chakras, type Chakra } from './data/chakras';

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
            <path className="icon-shape" d="M31 48 A21 21 0 0 0 69 48 A27 27 0 0 1 31 48 Z" />
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

const bodyHalf = [
  // head (right half, crown to chin)
  'M180 58 C202 58 209 76 208 94 C207 112 196 128 180 132',
  // ear
  'M207 86 C212 85 213 95 208 100',
  // neck into trapezius and shoulder
  'M191 127 C193 139 196 147 206 151 C220 156 232 160 240 168',
  // outer arm: shoulder, elbow, wrist, fingertips
  'M240 168 C248 184 250 216 248 252 C246 288 250 318 251 344 C252 362 250 376 245 386',
  // inner arm from armpit down to fingertips
  'M214 192 C228 214 234 236 236 258 C238 288 240 318 242 344 C243 362 244 376 245 386',
  // finger hint
  'M239 366 C239 374 240 380 242 384',
  // torso side: armpit, chest, waist, hip
  'M214 192 C222 214 223 242 219 268 C216 288 213 302 214 316 C217 334 223 344 226 352',
  // clavicle
  'M184 160 C198 162 212 160 224 154',
  // outer leg: hip, thigh, knee, calf, ankle
  'M226 352 C232 384 226 420 219 448 C213 470 214 492 217 514 C220 538 214 574 205 606 C204 610 203 612 203 614',
  // inner leg: crotch, knee, calf, ankle
  'M182 402 C187 424 191 448 194 470 C196 492 194 516 192 540 C190 566 190 590 190 612',
  // foot, angled slightly outward
  'M203 614 C210 626 221 634 232 639 C234 641 232 643 230 643 L193 643 C189 641 188 632 190 614'
];

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
      <svg className="body-art" viewBox="0 0 360 720" role="img" aria-label="Standing human figure with the seven chakra centers along the spine">
        <g className="sacred-lines">
          <line x1="180" y1="36" x2="180" y2="704" />
          <line x1="34" y1="360" x2="326" y2="360" />
          <ellipse cx="180" cy="356" rx="150" ry="318" />
          <ellipse cx="180" cy="356" rx="112" ry="272" />
          <circle cx="180" cy="94" r="52" />
        </g>
        <g className="ticks">
          {[52, 95, 150, 205, 270, 330, 395].map((y) => (
            <circle key={y} cx="180" cy={y} r="2.2" />
          ))}
          {[48, 90, 270, 312].map((x) => (
            <circle key={x} cx={x} cy="360" r="2.1" />
          ))}
        </g>
        <g className="human">
          {bodyHalf.map((d) => (
            <path key={d} d={d} />
          ))}
          <g transform="translate(360 0) scale(-1 1)">
            {bodyHalf.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </g>
        <g className="root-lines">
          {Array.from({ length: 15 }, (_, index) => {
            const x0 = 110 + index * 10;
            const drift = (x0 < 180 ? -22 : 22) + (index % 2 ? 12 : -12);
            return <path key={index} d={`M${x0} 648 C${x0} 664 ${x0 + drift} 676 ${x0 + drift} 702`} />;
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

function AboutOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="about-overlay" role="dialog" aria-modal="true" aria-label="About this system" onClick={onClose}>
      <div className="about-card" onClick={(event) => event.stopPropagation()}>
        <button className="about-close" onClick={onClose} aria-label="Close">
          <X size={18} strokeWidth={1.6} />
        </button>
        <div className="micro-row">
          <Sparkle size={16} strokeWidth={1.4} />
          <span>About This System</span>
        </div>
        <h3>An Anatomy of Consciousness</h3>
        <p>
          The chakra system is a map from the yogic traditions of India, first described in tantric
          texts over a thousand years ago. It charts seven centers along the spine, each associated
          with an element, a stage of development, a set of psychological themes, and a region of
          the body.
        </p>
        <p>
          This site treats the chakras as a contemplative map, not a claim of physical anatomy —
          a way of organizing attention toward the full range of human experience: safety, feeling,
          will, love, truth, insight, and meaning. Where the material touches physiology and the
          nervous system, it draws on contemporary somatic and contemplative research as a
          complement to the traditional framework.
        </p>
        <p className="about-note">
          Nothing here is medical or psychological advice. Practices are invitations — move at the
          pace of your own body, and seek qualified support where support is needed.
        </p>
        <div className="about-hint">Navigate with the arrow keys, or select any center on the figure.</div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [aboutOpen, setAboutOpen] = useState(false);
  const active = chakras[activeIndex];
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  function chooseChakra(index: number) {
    setActiveIndex(index);
    setOpenSection(0);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setAboutOpen(false);
        return;
      }
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea')) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        chooseChakra(Math.min(chakras.length - 1, activeIndexRef.current + 1));
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        chooseChakra(Math.max(0, activeIndexRef.current - 1));
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

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
          <span className="footer-soon">Journal<small>Soon</small></span>
          <span className="footer-soon">Library<small>Soon</small></span>
          <button className="footer-link" onClick={() => setAboutOpen(true)}>
            About <Info size={16} strokeWidth={1.4} />
          </button>
        </footer>
      </section>

      <section className="center-panel">
        <BodyFigure activeIndex={activeIndex} onSelect={chooseChakra} />
      </section>

      <section className="right-panel">
        <header className="about-row">
          <button className="footer-link" onClick={() => setAboutOpen(true)}>
            <span>About This System</span>
            <Info size={16} strokeWidth={1.4} />
          </button>
        </header>

        <div className="active-kicker">Active Chakra</div>
        <div className="chakra-number" style={{ color: active.color }}>{active.id}</div>
        <h2>{active.name}</h2>
        <p className="subtitle">{active.subtitle}</p>
        <p className="meaning">{active.meaning}</p>
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
            <div key={section.title} className={`accordion-item${openSection === index ? ' open' : ''}`}>
              <button
                className="accordion-row"
                aria-expanded={openSection === index}
                onClick={() => setOpenSection(openSection === index ? null : index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{section.title}</strong>
                <Plus size={19} strokeWidth={1.5} />
              </button>
              <div className="accordion-content">
                <div className="accordion-inner">
                  <p>{section.body}</p>
                  {section.list && (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeIndex < chakras.length - 1 ? (
          <button className="coming-soon" onClick={() => chooseChakra(activeIndex + 1)}>
            <span>Continue the path</span>
            <strong>
              {chakras[activeIndex + 1].id} · {chakras[activeIndex + 1].name}
            </strong>
            <em>{chakras[activeIndex + 1].keywords.toLowerCase()}</em>
            <ArrowRight size={20} strokeWidth={1.4} />
          </button>
        ) : (
          <button className="coming-soon" onClick={() => chooseChakra(0)}>
            <span>The path returns</span>
            <strong>01 · Muladhara</strong>
            <em>begin again at the root</em>
            <ArrowRight size={20} strokeWidth={1.4} />
          </button>
        )}
      </section>

      {aboutOpen && <AboutOverlay onClose={() => setAboutOpen(false)} />}
    </main>
  );
}
