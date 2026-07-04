import { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkle, X } from 'lucide-react';
import { chakras } from './data/chakras';

// Two statements per chakra, interleaved so the pattern isn't obvious.
const questions: { chakra: number; text: string }[] = [
  { chakra: 0, text: 'I feel anxious about money, home, or security — even when things are objectively okay.' },
  { chakra: 3, text: 'I keep people at a distance to avoid being hurt.' },
  { chakra: 1, text: 'I struggle to let myself enjoy things without guilt.' },
  { chakra: 4, text: 'I swallow what I really think to keep the peace.' },
  { chakra: 2, text: 'I have trouble saying no, even when I want to.' },
  { chakra: 5, text: 'I second-guess my gut feelings, even when they turn out to be right.' },
  { chakra: 6, text: 'Life has felt flat or meaningless lately.' },
  { chakra: 0, text: 'I feel scattered or "not in my body" during the day.' },
  { chakra: 3, text: 'There is a grief I have never fully let myself feel.' },
  { chakra: 1, text: 'My emotions feel either numb or overwhelming — rarely in between.' },
  { chakra: 4, text: 'Speaking in front of others makes my throat tighten.' },
  { chakra: 2, text: 'I start things with energy but struggle to finish them.' },
  { chakra: 5, text: 'I find it hard to imagine a future that excites me.' },
  { chakra: 6, text: 'I rarely feel wonder or awe anymore.' }
];

const scale = ['Not really', 'Sometimes', 'Often', 'Almost always'];

const readings: string[] = [
  'Your answers gather at the foundation — safety, stability, and the body’s basic trust in life. Nothing above the root can settle while the ground is uncertain, so begin low and slow: weight, breath, contact, routine.',
  'Your answers point to the feeling body — pleasure, emotion, and creative flow. Something in you learned to dam the current. The way back is not force but permission: small doses of enjoyment, taken without apology.',
  'Your answers point to the fire of will — boundaries, confidence, and follow-through. The energy is there; it is either leaking through unheld boundaries or turned inward as self-criticism. One clean "no" is worth a month of resolutions.',
  'Your answers gather at the heart — love, grief, and the courage to stay open. The chest tightens around what it could not mourn. Softening is not weakness; it is the armor finally being allowed to rest.',
  'Your answers point to the throat — truth, voice, and honest expression. What goes unsaid does not disappear; it is stored. Start with one true sentence a day, spoken aloud, to someone who matters.',
  'Your answers point to the inner eye — intuition, imagination, and clear seeing. You may be overriding what you already know. The practice is not learning to see more, but trusting what is already seen.',
  'Your answers reach toward the crown — meaning, wonder, and the sense of being part of something larger. Cynicism is often exhausted longing. Begin with awe: seek what dwarfs you, and let that be a relief.'
];

type Stage = 'intro' | 'result' | number;

export default function Quiz({ onClose, onExplore }: { onClose: () => void; onExplore: (index: number) => void }) {
  const [stage, setStage] = useState<Stage>('intro');
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));

  function answer(value: number) {
    if (typeof stage !== 'number') return;
    const next = [...answers];
    next[stage] = value;
    setAnswers(next);
    if (stage + 1 < questions.length) {
      setStage(stage + 1);
    } else {
      const totals = chakras.map((_, i) =>
        questions.reduce((sum, q, qi) => (q.chakra === i ? sum + Math.max(0, next[qi]) : sum), 0)
      );
      localStorage.setItem(
        'path-to-self-quiz',
        JSON.stringify({ when: new Date().toISOString(), totals })
      );
      setStage('result');
    }
  }

  const totals = chakras.map((_, i) =>
    questions.reduce((sum, q, qi) => (q.chakra === i ? sum + Math.max(0, answers[qi]) : sum), 0)
  );
  const maxTotal = Math.max(...totals, 1);
  const topIndex = totals.indexOf(Math.max(...totals));
  const top = chakras[topIndex];

  return (
    <div className="quiz-shell">
      <header className="quiz-header">
        <div className="micro-row">
          <Sparkle size={16} strokeWidth={1.4} />
          <span>Path to Self · Chakra Quiz</span>
        </div>
        <button className="about-close" onClick={onClose} aria-label="Back to the map">
          <X size={18} strokeWidth={1.6} />
        </button>
      </header>

      {stage === 'intro' && (
        <div className="quiz-body">
          <div className="active-kicker">A Short Self-Inquiry</div>
          <h1 className="quiz-title">
            Where is your energy
            <br />
            asking for attention?
          </h1>
          <p className="quiz-lead">
            Fourteen statements, about three minutes. For each, answer with how true it has felt
            over the last month — first instinct, no overthinking. Your answers never leave this
            browser.
          </p>
          <button className="quiz-primary" onClick={() => setStage(0)}>
            Begin <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      )}

      {typeof stage === 'number' && (
        <div className="quiz-body">
          <div className="quiz-progress">
            <span>
              {String(stage + 1).padStart(2, '0')} / {questions.length}
            </span>
            <div className="quiz-bar">
              <div className="quiz-bar-fill" style={{ width: `${(stage / questions.length) * 100}%` }} />
            </div>
          </div>
          <h2 className="quiz-question">{questions[stage].text}</h2>
          <div className="quiz-options">
            {scale.map((label, value) => (
              <button
                key={label}
                className={`quiz-option${answers[stage] === value ? ' chosen' : ''}`}
                onClick={() => answer(value)}
              >
                {label}
              </button>
            ))}
          </div>
          {stage > 0 && (
            <button className="quiz-back" onClick={() => setStage(stage - 1)}>
              <ArrowLeft size={14} strokeWidth={1.5} /> Previous
            </button>
          )}
        </div>
      )}

      {stage === 'result' && (
        <div className="quiz-body">
          <div className="active-kicker">Your Result</div>
          <div className="quiz-result-number" style={{ color: top.color }}>
            {top.id}
          </div>
          <h1 className="quiz-title" style={{ marginTop: 0 }}>
            {top.name}
          </h1>
          <p className="quiz-result-sub" style={{ color: top.color }}>
            {top.subtitle}
          </p>
          <p className="quiz-lead">{readings[topIndex]}</p>

          <div className="quiz-chart" aria-label="Scores for all seven centers">
            {chakras.map((chakra, i) => (
              <div key={chakra.id} className="quiz-chart-row">
                <span className="quiz-chart-label">
                  {chakra.id} {chakra.name}
                </span>
                <div className="quiz-chart-track">
                  <div
                    className="quiz-chart-fill"
                    style={{ width: `${(totals[i] / maxTotal) * 100}%`, background: chakra.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="quiz-actions">
            <button className="quiz-primary" onClick={() => onExplore(topIndex)}>
              Explore {top.name} <ArrowRight size={18} strokeWidth={1.5} />
            </button>
            <button
              className="quiz-back"
              onClick={() => {
                setAnswers(Array(questions.length).fill(-1));
                setStage('intro');
              }}
            >
              Retake the quiz
            </button>
          </div>
          <p className="quiz-note">
            A reflection prompt, not a diagnosis — every center deserves attention; this is simply
            where to begin.
          </p>
        </div>
      )}
    </div>
  );
}
