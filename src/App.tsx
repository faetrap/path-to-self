import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Compass, Info, Library, NotebookPen, Plus, Sparkle, X } from 'lucide-react';
import { chakras, type Chakra } from './data/chakras';
import Quiz from './Quiz';

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

type OrbPos = { top: number; x: number };

const FLECKS = Array.from({ length: 18 }, (_, i) => {
  const angle = (360 / 18) * i + (i % 2 ? 14 : -10);
  const dist = 40 + (i % 3) * 18;
  return {
    dx: Math.cos((angle * Math.PI) / 180) * dist,
    dy: Math.sin((angle * Math.PI) / 180) * dist,
    size: 3 + (i % 3),
    delay: (i % 4) * 25
  };
});

function BodyFigure({
  activeIndex,
  onSelect,
  coords,
  calibrate,
  onMove,
  burst
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  coords: OrbPos[];
  calibrate: boolean;
  onMove: (index: number, top: number, x: number) => void;
  burst: number;
}) {
  // The frame is locked to the artwork's aspect ratio and sized to fit the
  // viewport (letterboxed, not cropped), so orbs can be placed by percentage
  // and stay pinned to the painted orbs at any window size.
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<number | null>(null);

  const clamp = (v: number) => Math.max(0, Math.min(100, v));

  function moveTo(index: number, clientX: number, clientY: number) {
    const r = frameRef.current?.getBoundingClientRect();
    if (!r) return;
    onMove(index, clamp(((clientY - r.top) / r.height) * 100), clamp(((clientX - r.left) / r.width) * 100));
  }

  return (
    <div className="figure-backdrop">
      <div className={`figure-frame${calibrate ? ' calibrate' : ''}`} ref={frameRef}>
        <img
          className="figure-art"
          src={`${import.meta.env.BASE_URL}figure.jpg`}
          alt="Meditating figure seated in a lotus, seven chakras glowing along the spine"
        />
        <div className="figure-veil" aria-hidden="true" />
        {chakras.map((chakra, index) => (
          <button
            key={chakra.id}
            className={`body-chakra${index === activeIndex ? ' selected' : ''}`}
            style={
              {
                left: `${coords[index].x}%`,
                top: `${coords[index].top}%`,
                '--chakra': chakra.color
              } as React.CSSProperties
            }
            onClick={() => onSelect(index)}
            onPointerDown={
              calibrate
                ? (event) => {
                    event.preventDefault();
                    event.currentTarget.setPointerCapture(event.pointerId);
                    dragging.current = index;
                    onSelect(index);
                  }
                : undefined
            }
            onPointerMove={
              calibrate
                ? (event) => {
                    if (dragging.current !== index) return;
                    moveTo(index, event.clientX, event.clientY);
                  }
                : undefined
            }
            onPointerUp={calibrate ? () => (dragging.current = null) : undefined}
            aria-label={`Select ${chakra.name}`}
          >
            <span className="orb" />
            {calibrate && <span className="orb-crosshair" />}
          </button>
        ))}
        {!calibrate && burst > 0 && (
          <div
            key={burst}
            className="fleck-burst"
            style={
              {
                left: `${coords[activeIndex].x}%`,
                top: `${coords[activeIndex].top}%`,
                '--chakra': chakras[activeIndex].color
              } as React.CSSProperties
            }
            aria-hidden="true"
          >
            {FLECKS.map((f, i) => (
              <span
                key={i}
                className="fleck"
                style={
                  {
                    '--dx': `${f.dx}px`,
                    '--dy': `${f.dy}px`,
                    width: `${f.size}px`,
                    height: `${f.size}px`,
                    marginLeft: `${-f.size / 2}px`,
                    marginTop: `${-f.size / 2}px`,
                    animationDelay: `${f.delay}ms`
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CalibratePanel({ coords, onReset }: { coords: OrbPos[]; onReset: () => void }) {
  const text = chakras
    .map((c, i) => `${c.id} ${c.name.padEnd(14)} top: ${coords[i].top.toFixed(1)}, x: ${coords[i].x.toFixed(1)}`)
    .join('\n');
  const [copied, setCopied] = useState(false);

  return (
    <div className="calibrate-panel">
      <div className="calibrate-title">Orb Calibration</div>
      <p className="calibrate-hint">
        Drag each glowing dot onto its painted orb. When they all line up, copy the numbers below and
        paste them to me.
      </p>
      <pre className="calibrate-coords">{text}</pre>
      <div className="calibrate-actions">
        <button
          onClick={() => {
            navigator.clipboard?.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? 'Copied ✓' : 'Copy coordinates'}
        </button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}

function JournalOverlay({ chakra, onClose }: { chakra: Chakra; onClose: () => void }) {
  const storageKey = `path-to-self-journal-${chakra.id}`;
  const [entry, setEntry] = useState(() => localStorage.getItem(storageKey) ?? '');

  useEffect(() => {
    setEntry(localStorage.getItem(storageKey) ?? '');
  }, [storageKey]);

  function update(value: string) {
    setEntry(value);
    localStorage.setItem(storageKey, value);
  }

  const prompts =
    chakra.sections.find((section) => section.title === 'Integration & Contemplation')?.list ?? [];

  return (
    <div className="about-overlay" role="dialog" aria-modal="true" aria-label="Journal" onClick={onClose}>
      <div className="about-card" onClick={(event) => event.stopPropagation()}>
        <button className="about-close" onClick={onClose} aria-label="Close">
          <X size={18} strokeWidth={1.6} />
        </button>
        <div className="micro-row">
          <Sparkle size={16} strokeWidth={1.4} />
          <span>Journal · {chakra.id}</span>
        </div>
        <h3>{chakra.name}</h3>
        <div className="journal-prompts">
          {prompts.map((prompt) => (
            <p key={prompt}>{prompt}</p>
          ))}
        </div>
        <textarea
          className="journal-entry"
          value={entry}
          onChange={(event) => update(event.target.value)}
          placeholder="Write freely. No one reads this but you."
          rows={9}
        />
        <div className="about-hint">Saved privately in this browser, one page per chakra.</div>
      </div>
    </div>
  );
}

const library = [
  {
    group: 'Traditional Sources',
    books: [
      'The Serpent Power — Arthur Avalon (Sir John Woodroffe); the classic translation of the Sat-Cakra-Nirupana',
      'Kundalini Tantra — Swami Satyananda Saraswati; the Bihar school’s practice manual',
      'The Radiance Sutras — Lorin Roche; a poet’s rendering of the Vijnana Bhairava Tantra'
    ]
  },
  {
    group: 'The Psychological Bridge',
    books: [
      'Wheels of Life — Anodea Judith; the fullest modern map of the chakra system',
      'Eastern Body, Western Mind — Anodea Judith; chakras read through developmental psychology',
      'The Body Keeps the Score — Bessel van der Kolk; trauma, memory, and the body'
    ]
  },
  {
    group: 'Body & Nervous System',
    books: [
      'Light on Yoga — B.K.S. Iyengar; the reference for the asanas named in this site',
      'The Polyvagal Theory — Stephen Porges; the science behind the nervous-system links',
      'Waking the Tiger — Peter Levine; completing what the body could not finish'
    ]
  }
];

function LibraryOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="about-overlay" role="dialog" aria-modal="true" aria-label="Library" onClick={onClose}>
      <div className="about-card" onClick={(event) => event.stopPropagation()}>
        <button className="about-close" onClick={onClose} aria-label="Close">
          <X size={18} strokeWidth={1.6} />
        </button>
        <div className="micro-row">
          <Sparkle size={16} strokeWidth={1.4} />
          <span>Library</span>
        </div>
        <h3>Further Reading</h3>
        {library.map((shelf) => (
          <div key={shelf.group} className="library-shelf">
            <div className="library-group">{shelf.group}</div>
            <ul>
              {shelf.books.map((book) => (
                <li key={book}>{book}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="about-hint">A starting shelf, not a syllabus — one book taken slowly beats ten skimmed.</div>
      </div>
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
  const [overlay, setOverlay] = useState<'about' | 'journal' | 'library' | null>(null);
  const [view, setView] = useState<'map' | 'quiz'>('map');
  const calibrate =
    typeof window !== 'undefined' && window.location.hash.toLowerCase().includes('calibrate');
  const [coords, setCoords] = useState<OrbPos[]>(() => chakras.map((c) => ({ top: c.top, x: c.x })));
  const [burst, setBurst] = useState(0);
  const active = chakras[activeIndex];
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const viewRef = useRef(view);
  viewRef.current = view;

  function chooseChakra(index: number) {
    setActiveIndex(index);
    setOpenSection(0);
    setBurst((n) => n + 1);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOverlay(null);
        setView('map');
        return;
      }
      if (viewRef.current !== 'map') return;
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

  if (view === 'quiz') {
    return (
      <Quiz
        onClose={() => setView('map')}
        onExplore={(index) => {
          chooseChakra(index);
          setView('map');
        }}
      />
    );
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
              style={{ '--chakra': chakra.color } as React.CSSProperties}
              onClick={() => chooseChakra(index)}
            >
              <span className="nav-id">{chakra.id}</span>
              <ChakraSigil chakra={chakra} active={index === activeIndex} />
              <strong>{chakra.name}</strong>
              <em>{chakra.keywords.split(' + ').join(' · ')}</em>
            </button>
          ))}
        </nav>

        <button className="quiz-cta" onClick={() => setView('quiz')}>
          <Compass size={20} strokeWidth={1.4} />
          <span className="quiz-cta-text">
            <strong>Take the Chakra Quiz</strong>
            <em>Find where your energy is asking for attention</em>
          </span>
          <ArrowRight size={18} strokeWidth={1.5} />
        </button>

        <footer>
          <button className="footer-link" onClick={() => setOverlay('journal')}>
            <NotebookPen size={15} strokeWidth={1.5} /> Journal
          </button>
          <button className="footer-link" onClick={() => setOverlay('library')}>
            <Library size={15} strokeWidth={1.5} /> Library
          </button>
          <button className="footer-link" onClick={() => setOverlay('about')}>
            <Info size={15} strokeWidth={1.5} /> About
          </button>
        </footer>
      </section>

      <section className="center-panel">
        <p className="tap-hint">Tap a chakra to explore</p>
        <BodyFigure
          activeIndex={activeIndex}
          onSelect={chooseChakra}
          coords={coords}
          calibrate={calibrate}
          onMove={(index, top, x) =>
            setCoords((prev) => prev.map((p, i) => (i === index ? { top, x } : p)))
          }
          burst={burst}
        />
        <button className="quiz-cta quiz-cta-mobile" onClick={() => setView('quiz')}>
          <Compass size={20} strokeWidth={1.4} />
          <span className="quiz-cta-text">
            <strong>Take the Chakra Quiz</strong>
            <em>Find where your energy is asking for attention</em>
          </span>
          <ArrowRight size={18} strokeWidth={1.5} />
        </button>
      </section>

      <section className="right-panel">
        <div className="right-inner" key={active.id}>
        <div className="right-header">
          <div className="active-kicker">Active Chakra</div>
          <div className="chakra-lockup">
            <span className="chakra-number" style={{ color: active.color }}>{active.id}</span>
            <div>
              <h2
                style={{
                  fontSize:
                    active.name.length > 11
                      ? 'clamp(28px, 2.5vw, 40px)'
                      : active.name.length > 8
                        ? 'clamp(32px, 2.8vw, 46px)'
                        : 'clamp(38px, 3vw, 52px)'
                }}
              >
                {active.name}
              </h2>
              <p className="subtitle" style={{ color: active.color }}>{active.subtitle}</p>
            </div>
          </div>
          <p className="meaning">{active.meaning}</p>

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
        </div>

        <div className="right-scroll">
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
            <em>{chakras[activeIndex + 1].keywords.toLowerCase().split(' + ').join(' · ')}</em>
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
        </div>
        </div>
      </section>

      <footer className="mobile-footer">
        <button className="footer-link" onClick={() => setOverlay('journal')}>
          <NotebookPen size={15} strokeWidth={1.5} /> Journal
        </button>
        <button className="footer-link" onClick={() => setOverlay('library')}>
          <Library size={15} strokeWidth={1.5} /> Library
        </button>
        <button className="footer-link" onClick={() => setOverlay('about')}>
          <Info size={15} strokeWidth={1.5} /> About
        </button>
      </footer>

      {overlay === 'about' && <AboutOverlay onClose={() => setOverlay(null)} />}
      {overlay === 'journal' && <JournalOverlay chakra={active} onClose={() => setOverlay(null)} />}
      {overlay === 'library' && <LibraryOverlay onClose={() => setOverlay(null)} />}
      {calibrate && (
        <CalibratePanel
          coords={coords}
          onReset={() => setCoords(chakras.map((c) => ({ top: c.top, x: c.x })))}
        />
      )}
    </main>
  );
}
