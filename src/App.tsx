import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Info, Plus, Sparkle, X } from 'lucide-react';
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

function BodyFigure({ activeIndex, onSelect }: { activeIndex: number; onSelect: (index: number) => void }) {
  return (
    <div className="figure-stage">
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
          style={{ top: `${chakra.top}%`, left: `${chakra.x}%`, '--chakra': chakra.color } as React.CSSProperties}
          onClick={() => onSelect(index)}
          aria-label={`Select ${chakra.name}`}
        >
          <span className="orb" />
        </button>
      ))}
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
  const active = chakras[activeIndex];
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const viewRef = useRef(view);
  viewRef.current = view;

  function chooseChakra(index: number) {
    setActiveIndex(index);
    setOpenSection(0);
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

        <footer>
          <button className="footer-link" onClick={() => setOverlay('journal')}>Journal</button>
          <button className="footer-link" onClick={() => setOverlay('library')}>Library</button>
          <button className="footer-link" onClick={() => setView('quiz')}>
            Chakra Quiz <Sparkle size={15} strokeWidth={1.4} />
          </button>
        </footer>
      </section>

      <section className="center-panel">
        <BodyFigure activeIndex={activeIndex} onSelect={chooseChakra} />
      </section>

      <section className="right-panel">
        <header className="about-row">
          <button className="footer-link" onClick={() => setOverlay('about')}>
            <span>About This System</span>
            <Info size={16} strokeWidth={1.4} />
          </button>
        </header>

        <div className="panel-content" key={active.id}>
        <div className="active-kicker">Active Chakra</div>
        <div className="chakra-number" style={{ color: active.color }}>{active.id}</div>
        <h2>{active.name}</h2>
        <p className="subtitle" style={{ color: active.color }}>{active.subtitle}</p>
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
      </section>

      {overlay === 'about' && <AboutOverlay onClose={() => setOverlay(null)} />}
      {overlay === 'journal' && <JournalOverlay chakra={active} onClose={() => setOverlay(null)} />}
      {overlay === 'library' && <LibraryOverlay onClose={() => setOverlay(null)} />}
    </main>
  );
}
