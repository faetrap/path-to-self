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
