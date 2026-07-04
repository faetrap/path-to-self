export type ChakraSection = {
  title: string;
  body: string;
  list?: string[];
};

export type Chakra = {
  id: string;
  name: string;
  meaning: string;
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
  sections: ChakraSection[];
};

export const chakras: Chakra[] = [
  {
    id: '01',
    name: 'Muladhara',
    meaning: '"Root support"',
    subtitle: 'The Root Center',
    keywords: 'Root + Grounding + Survival',
    color: '#9c2f2b',
    element: 'Earth',
    location: 'Base of Spine',
    gland: 'Adrenals',
    mantra: 'LAM',
    top: 54.9,
    x: 50,
    summary:
      'Muladhara is our foundation. It governs our sense of safety, stability, and belonging. When balanced, we feel grounded, supported by life, and present in our bodies.',
    sections: [
      {
        title: 'Psychological Themes',
        body:
          'The root holds our most basic convictions: I am safe. I belong here. There is enough. It shapes our relationship to money, home, food, family, and the body itself. When this center is steady, the world feels solid underfoot and we can take risks from a place of support rather than scarcity. When it is shaken, everything above it — feeling, will, love, voice — is built on unstable ground.'
      },
      {
        title: 'Developmental Stage',
        body:
          'Muladhara is imprinted earliest, from the womb through roughly the first year of life. Before we have language, we learn through skin, milk, warmth, and the steadiness of the arms that hold us whether the world can be trusted. A held, fed, welcomed infant records "existence is safe" in the body. Early chaos, neglect, or medical trauma records the opposite — and the nervous system carries that verdict forward until it is consciously revised.'
      },
      {
        title: 'Shadow & Blockages',
        body:
          'The demon of the root is fear. A deficient root shows up as chronic anxiety, restlessness, difficulty staying in one place or one body — a subtle sense of not quite landing in life. An excessive root shows up as rigidity: hoarding, over-attachment to security, resistance to any change. Both are strategies for surviving a world that once felt unsafe.',
        list: [
          'Deficient — anxiety, spaciness, disembodiment, chronic scarcity thinking, feeling unwanted',
          'Excessive — rigidity, hoarding, overeating, workaholism around security, fear of change',
          'Core wound — "my existence is not supported"'
        ]
      },
      {
        title: 'Somatic & Physiology',
        body:
          'The root governs the densest structures of the body: bones, legs, feet, the base of the spine, and the large intestine. It is associated with the adrenal glands — the organs of survival response. Chronic root stress often speaks through the body first.',
        list: [
          'Regions — feet, legs, knees, pelvic floor, sacrum, coccyx',
          'Systems — skeletal structure, elimination, adrenal function',
          'Common signals — low-back pain, cold feet, digestive sluggishness, exhaustion that rest does not touch'
        ]
      },
      {
        title: 'Nervous System Links',
        body:
          'In nervous-system language, Muladhara is the felt sense of safety — what polyvagal theory calls neuroception. A regulated root corresponds to a baseline where the body is not scanning for threat. A dysregulated root corresponds to a stuck fight-flight (restlessness, hypervigilance) or freeze (numbness, collapse). Root work is fundamentally regulation work: teaching the body, through repeated experience, that it is safe now.'
      },
      {
        title: 'Practices & Meditations',
        body:
          'Root practices are slow, heavy, rhythmic, and physical. The instruction is almost always downward: feel weight, feel contact, feel ground.',
        list: [
          'Stand or walk barefoot on earth for ten minutes, attention in the soles of the feet',
          'Body scan meditation, moving from feet upward, naming each point of contact',
          'Extended-exhale breathing — inhale 4, exhale 8 — to settle the survival response',
          'Eat one meal a day slowly, with no screen, tasting everything',
          'Tend something physical: a garden, a room, a loaf of bread'
        ]
      },
      {
        title: 'Yoga Poses',
        body:
          'Root asanas emphasize the legs, the pelvic floor, and unhurried holds. Stay in each pose long enough for the body to stop bracing.',
        list: [
          'Tadasana — Mountain, the reference point for standing in one’s own ground',
          'Malasana — deep squat, releasing the pelvic floor toward the earth',
          'Virabhadrasana I & II — Warrior, strength rooted through the legs',
          'Balasana — Child’s pose, forehead to floor, surrender of weight',
          'Setu Bandhasana — Bridge, pressing the feet down to lift the spine',
          'Savasana — full weight given to the ground'
        ]
      },
      {
        title: 'Mantras & Sounds',
        body:
          'The seed syllable is LAM. Chanted low and slow, its vibration is felt at the base of the spine and pelvic floor. Practice on a comfortable exhale: inhale fully, then sound "lahm" letting the M hum die out completely before the next breath. Low drumming, deep humming, and any sound that vibrates the lower body serve the same purpose — bringing awareness down into the base.'
      },
      {
        title: 'Crystals & Stones',
        body:
          'Tradition pairs each center with stones — not as machines that do the work, but as anchors: a color for the eye, a weight for the hand, holding attention where the practice wants it. Root stones are dark, dense, and iron-rich.',
        list: [
          'Red Jasper — slow, steady vitality; the classic grounding stone',
          'Hematite — iron weight in the palm; presence and containment',
          'Black Tourmaline — the traditional stone of protection and boundaries',
          'Smoky Quartz — settling scattered energy downward',
          'Garnet — warmth and endurance at the foundation'
        ]
      },
      {
        title: 'Related Centers',
        body:
          'No chakra works alone. The root is the condition for everything above it — and the ground the highest centers must return to.',
        list: [
          'With Sahasrara (07) — root and crown are the poles of the whole axis: earth and sky, matter and awareness. Deep grounding is what makes transcendence safe rather than escapist',
          'With Svadhishthana (02) — feeling can only flow where footing is secure; a shaky root freezes the water above it',
          'With Anahata (04) — intimacy asks for ground: the heart opens to another only as far as the body trusts its base'
        ]
      },
      {
        title: 'Integration & Contemplation',
        body:
          'Insight becomes root strength only through repetition — the nervous system trusts patterns, not ideas. Sit with these questions in writing or in stillness:',
        list: [
          'Where in my life do I feel most unshakably safe? What is present there?',
          'What does "enough" actually mean to me — in money, food, home, love?',
          'When I feel ungrounded, what is the first thing my body does? What does it need instead?',
          'What did my family teach me, without words, about survival?'
        ]
      }
    ]
  },
  {
    id: '02',
    name: 'Svadhishthana',
    meaning: '"One’s own dwelling place"',
    subtitle: 'The Sacral Center',
    keywords: 'Sacral + Flow + Creativity',
    color: '#c7792d',
    element: 'Water',
    location: 'Lower Abdomen',
    gland: 'Gonads',
    mantra: 'VAM',
    top: 45.8,
    x: 50,
    summary:
      'Svadhishthana carries feeling, pleasure, and creative flow. It is the fluid intelligence of desire, emotion, intimacy, and the ability to move with life.',
    sections: [
      {
        title: 'Psychological Themes',
        body:
          'The sacral center governs the feeling life: emotion, pleasure, desire, sensuality, and creativity. Where the root asks "am I safe?", the sacral asks "what do I feel, and what do I want?" It is the capacity to be moved — by beauty, by another person, by an impulse to make something. A healthy second chakra lets experience flow through without either damming it up or drowning in it.'
      },
      {
        title: 'Developmental Stage',
        body:
          'Svadhishthana develops roughly from six months to two years, as the child separates from the caregiver and discovers a world of sensation and preference. This is the age of reaching, tasting, and delighting. If a child’s feelings and pleasure are welcomed, emotion becomes trustworthy. If they are punished, shamed, or ignored — "don’t cry," "don’t touch" — the child learns to distrust the very current of feeling, and the split between what we feel and what we show begins.'
      },
      {
        title: 'Shadow & Blockages',
        body:
          'The demon of the sacral center is guilt — the feeling that desire itself is wrong. Guilt freezes flow: pleasure becomes suspicious, emotions become dangerous, creativity becomes self-indulgent. The imbalances run in both directions.',
        list: [
          'Deficient — emotional numbness, rigidity, fear of pleasure, difficulty knowing what one wants',
          'Excessive — emotional flooding, drama, addiction to stimulation, poor boundaries around intimacy',
          'Core wound — "what I feel and want is not acceptable"'
        ]
      },
      {
        title: 'Somatic & Physiology',
        body:
          'The second chakra lives in the bowl of the pelvis — the body’s reservoir of fluid and movement. It is associated with the gonads and the water systems of the body.',
        list: [
          'Regions — hips, sacrum, lower abdomen, low back, inner thighs',
          'Systems — reproductive organs, bladder, kidneys, lymph and bodily fluids',
          'Common signals — chronically tight hips, low-back ache, menstrual and urinary issues, loss of appetite for pleasure'
        ]
      },
      {
        title: 'Nervous System Links',
        body:
          'The sacral center corresponds to interoception — the felt sense of the body from within — and to the emotional circuitry of wanting and enjoying. Trauma and chronic stress commonly mute this signal: the body downregulates sensation to avoid feeling what once overwhelmed it. Restoring the second chakra is largely the practice of titrated feeling — letting sensation and emotion return in doses small enough to stay present with, until aliveness is safe again.'
      },
      {
        title: 'Practices & Meditations',
        body:
          'Sacral practices restore movement and savoring. Water, rhythm, and pleasure taken slowly are the medicine.',
        list: [
          'Free movement — put on music and let the hips lead for one song, no choreography, no mirror',
          'Savoring practice — take one pleasure a day (taste, warmth, scent) and stay with it for a full minute',
          'Emotion-naming meditation — locate a feeling in the body, describe its texture without a story',
          'Make something with no audience and no standard: draw, cook, hum, garden badly',
          'Baths, swimming, time near water — let the element teach flow'
        ]
      },
      {
        title: 'Yoga Poses',
        body:
          'Sacral asanas open the hips and pelvis and invite fluid, wave-like movement rather than held effort.',
        list: [
          'Baddha Konasana — Bound Angle, knees releasing outward like an opening book',
          'Eka Pada Rajakapotasana — Pigeon, the great hip surrender',
          'Anjaneyasana — low lunge, softening the front of the pelvis',
          'Utkata Konasana — Goddess, wide and rooted with a mobile pelvis',
          'Cat–Cow with slow pelvic circles — the spine remembering it is a wave'
        ]
      },
      {
        title: 'Mantras & Sounds',
        body:
          'The seed syllable is VAM. Chant it in the mid-low register and let the vibration settle just below the navel. Rolling, watery sounds serve this center: ocean recordings, rain, the sway of a slow 6/8 rhythm. Sounding while gently rocking the pelvis joins vibration to movement — the two languages this chakra speaks.'
      },
      {
        title: 'Crystals & Stones',
        body:
          'Sacral stones carry the colors of low sun and warm water — translucent oranges and milky whites, traditionally paired with feeling, tide, and creative warmth.',
        list: [
          'Carnelian — the classic sacral stone; warmth, appetite, creative fire',
          'Orange Calcite — gentle brightness for a numbed feeling life',
          'Moonstone — tides, cycles, and the permission to feel',
          'Sunstone — pleasure and lightness reclaimed',
          'Amber — ancient warmth; life preserved in gold'
        ]
      },
      {
        title: 'Related Centers',
        body:
          'The second chakra sits between ground and fire — it receives stability from below and hands desire upward to be acted on.',
        list: [
          'With Muladhara (01) — safety is the riverbed, feeling is the river; ground first, then feel',
          'With Manipura (03) — desire without will stays a daydream; the sacral supplies the wanting that the solar plexus turns into action',
          'With Vishuddha (05) — the throat is the sacral’s higher octave: what is felt and imagined here becomes expression there'
        ]
      },
      {
        title: 'Integration & Contemplation',
        body:
          'The sacral question is not "what should I want?" but "what do I actually want?" Let these sit longer than is comfortable:',
        list: [
          'What did I love doing as a child that I no longer allow myself?',
          'Which emotions am I fluent in — and which do I never let finish?',
          'Where does guilt arrive the moment pleasure does?',
          'What would I create if no one would ever see it?'
        ]
      }
    ]
  },
  {
    id: '03',
    name: 'Manipura',
    meaning: '"City of jewels"',
    subtitle: 'The Solar Plexus Center',
    keywords: 'Solar Plexus + Power + Will',
    color: '#c6aa27',
    element: 'Fire',
    location: 'Solar Plexus',
    gland: 'Pancreas',
    mantra: 'RAM',
    top: 37.5,
    x: 50,
    summary:
      'Manipura is the inner fire of will, confidence, and selfhood. It turns feeling into action and gives the body a clear center of direction.',
    sections: [
      {
        title: 'Psychological Themes',
        body:
          'Manipura is the seat of agency: will, confidence, boundaries, and the capacity to act. Where the sacral center feels and wants, the solar plexus decides and does. It governs self-definition — the ability to say "I am this, I am not that," to hold a boundary without apology, and to metabolize experience into direction. Healthy fire is warm and steady: purposeful without domination, confident without armor.'
      },
      {
        title: 'Developmental Stage',
        body:
          'The third chakra forms roughly between eighteen months and four years — the age of "no," of "I do it myself." The child is testing whether their will is allowed to exist. When autonomy is met with respect and workable limits, will matures into healthy self-direction. When it is crushed by control or shaming, or left with no limits at all, the child learns either that power is dangerous or that power is everything — the two classic distortions of this center.'
      },
      {
        title: 'Shadow & Blockages',
        body:
          'The demon of the solar plexus is shame — the collapse of the sense that "I am adequate." Shame turns fire inward, where it burns as self-attack, or hardens outward into control.',
        list: [
          'Deficient — passivity, chronic fatigue, victim identity, weak boundaries, difficulty finishing things',
          'Excessive — domination, need to control, competitiveness, explosive anger, burnout from over-driving',
          'Core wound — "who I am is not enough, so I must shrink or force"'
        ]
      },
      {
        title: 'Somatic & Physiology',
        body:
          'Manipura sits at the body’s metabolic engine — the transformation of matter into energy mirrors the transformation of intention into action.',
        list: [
          'Regions — solar plexus, stomach, mid-spine, core musculature, diaphragm',
          'Systems — digestion, liver, pancreas, blood-sugar regulation, metabolism',
          'Common signals — knots in the stomach under conflict, digestive issues, core weakness or armored rigidity, tension in the diaphragm'
        ]
      },
      {
        title: 'Nervous System Links',
        body:
          'The third chakra maps to healthy sympathetic mobilization — the clean rise of energy that lets us act, assert, and complete. Trauma distorts this in two directions: energy that rises but cannot discharge becomes chronic anger and anxiety; energy that was punished into stillness becomes collapse and learned helplessness. The repair is completing thwarted impulses — letting the body finish the push, the "no," the run that it once had to swallow.'
      },
      {
        title: 'Practices & Meditations',
        body:
          'Fire practices build heat, rhythm, and follow-through. The theme is clean effort: exertion that ends in rest, boundaries that end in peace.',
        list: [
          'Kapalabhati (breath of fire) — three rounds of thirty pumps, on an empty stomach, then stillness',
          'Boundary practice — say one small honest "no" each day and stay in the discomfort without repairing it',
          'Completion practice — choose one stalled task, finish it fully, and mark the completion consciously',
          'Vigorous exercise with a clear end — sprint, chop wood, scrub a floor — then deliberate rest',
          'Sit with the belly soft for five minutes; unclench the place that braces to perform'
        ]
      },
      {
        title: 'Yoga Poses',
        body:
          'Solar-plexus asanas build core heat and steadiness — the strength to hold a line without gripping.',
        list: [
          'Navasana — Boat, the core holding the self upright',
          'Phalakasana — Plank, steady fire over time',
          'Virabhadrasana III — Warrior III, will balanced on one leg',
          'Ardha Matsyendrasana — seated twist, wringing the digestive fire',
          'Surya Namaskar — Sun Salutations, rhythm as sustainable power'
        ]
      },
      {
        title: 'Mantras & Sounds',
        body:
          'The seed syllable is RAM. Chant it with crisp attack in the middle register and feel the vibration behind the navel. Sharp, rhythmic sound suits this center — clapping, strong drum pulses, the audible "ha!" exhale of exertion. Sounding RAM while gently drawing the navel in on the exhale ties the syllable to the muscle of intention.'
      },
      {
        title: 'Crystals & Stones',
        body:
          'Solar-plexus stones are the golds — bright, sun-colored minerals traditionally paired with confidence, resolve, and a clean-burning will.',
        list: [
          'Citrine — sunlight in mineral form; confidence without heat',
          'Tiger’s Eye — focused will, banded like held tension released',
          'Yellow Jasper — steady, unglamorous perseverance',
          'Pyrite — resolve; the glint of decision',
          'Golden Calcite — warmth for a fire that has gone out'
        ]
      },
      {
        title: 'Related Centers',
        body:
          'The third chakra is the hinge between the feeling body below and the relational heart above.',
        list: [
          'With Svadhishthana (02) — will runs on desire; fire needs the fuel of genuine wanting or it burns as empty discipline',
          'With Anahata (04) — power without love hardens into control; love without power collapses into pleasing. Each keeps the other honest',
          'With Muladhara (01) — grounded confidence stands, ungrounded striving runs; the root decides whether the fire is steady or anxious'
        ]
      },
      {
        title: 'Integration & Contemplation',
        body:
          'The work of Manipura is turning insight into act. Answer these on paper, then let one answer become a behavior this week:',
        list: [
          'Where in my life am I waiting for permission I could give myself?',
          'What does my anger know that I have not been willing to act on?',
          'Which boundary, if I held it for a month, would change everything?',
          'When did I last feel proud of myself — and what was I doing?'
        ]
      }
    ]
  },
  {
    id: '04',
    name: 'Anahata',
    meaning: '"Unstruck sound"',
    subtitle: 'The Heart Center',
    keywords: 'Heart + Love + Connection',
    color: '#3c8b4a',
    element: 'Air',
    location: 'Heart',
    gland: 'Thymus',
    mantra: 'YAM',
    top: 28.5,
    x: 50,
    summary:
      'Anahata is the bridge between body and spirit. It holds love, grief, compassion, forgiveness, and the felt truth of connection.',
    sections: [
      {
        title: 'Psychological Themes',
        body:
          'Anahata is the center of relationship — love given and received, compassion, forgiveness, and the balance between self and other. It sits at the midpoint of the system: three chakras of earth and body below, three of mind and spirit above, and the heart as the bridge. Its core competency is staying open: to love without losing oneself, to grieve without closing, to hold both self-respect and tenderness in the same breath.'
      },
      {
        title: 'Developmental Stage',
        body:
          'The heart center develops roughly between four and seven years, as the child moves from "me" into "we" — family roles, friendships, the first experience of social love. Here we learn the local rules of love: whether it is freely given or earned by performance, whether affection is safe or volatile. The relational patterns rehearsed in these years — pleasing, withdrawing, caretaking, testing — tend to run unexamined in adult intimacy until the heart center is worked with directly.'
      },
      {
        title: 'Shadow & Blockages',
        body:
          'The demon of the heart is grief — love that had nowhere to go. Unfelt grief becomes armor: the chest literally tightens around what it could not mourn.',
        list: [
          'Deficient — withdrawal, coldness, fear of intimacy, loneliness defended as independence',
          'Excessive — codependency, rescuing, losing self in others, love as anxious grasping',
          'Core wound — "love is conditional, so I must earn it or wall it out"'
        ]
      },
      {
        title: 'Somatic & Physiology',
        body:
          'The heart center governs the chest and everything that reaches out from it — the arms and hands are its instruments of contact.',
        list: [
          'Regions — heart, lungs, chest, upper back, shoulders, arms, hands',
          'Systems — circulation, respiration, thymus and immune function',
          'Common signals — collapsed or armored chest, shallow breath, tension between the shoulder blades, the physical heaviness of grief'
        ]
      },
      {
        title: 'Nervous System Links',
        body:
          'Anahata corresponds to the ventral vagal system — the social-engagement circuitry through which mammals co-regulate. Warm eye contact, a kind voice, a hand on the shoulder: these are heart-chakra events that measurably settle the nervous system. The breath is the bridge; it is the one heart-region rhythm we can steer directly, and slow, even breathing raises heart-rate variability — a physiological signature of an open, resilient heart.'
      },
      {
        title: 'Practices & Meditations',
        body:
          'Heart practices work in two directions: softening the armor, and actively extending warmth.',
        list: [
          'Metta (loving-kindness) meditation — extend "may you be well" from self, to loved ones, to strangers, to difficult people',
          'Gratitude practice — three specific things nightly, felt in the chest rather than listed in the head',
          'Grief ritual — set aside time to actively mourn a named loss: photos, letters, tears allowed',
          'Coherent breathing — five to six breaths per minute for ten minutes, hand on the heart',
          'Forgiveness work — begin with small debts; forgiveness is releasing the claim, not excusing the act'
        ]
      },
      {
        title: 'Yoga Poses',
        body:
          'Heart asanas open the front body and unwind the protective curl of the shoulders — done gently, they can release stored grief.',
        list: [
          'Bhujangasana — Cobra, the chest lifting open from the ground',
          'Ustrasana — Camel, the full exposure of the front body',
          'Matsyasana — Fish, throat and heart offered upward',
          'Setu Bandhasana — Bridge, heart raised above the head',
          'Gomukhasana arms — unbinding the shoulders',
          'Supported heart opener — lying over a rolled blanket, arms wide, simply breathing'
        ]
      },
      {
        title: 'Mantras & Sounds',
        body:
          'The seed syllable is YAM. Chant it warmly in the middle register and feel the vibration spread across the sternum. The heart also answers to unstruck sound — anahata means exactly that — so silence after chanting matters as much as the chant. Sustained humming, choral music, and singing with others (co-regulation through shared vibration) are all heart-center practices.'
      },
      {
        title: 'Crystals & Stones',
        body:
          'Heart stones run pink and green — the traditional colors of tenderness toward the self and openness toward the world.',
        list: [
          'Rose Quartz — the classic heart stone; kindness turned inward first',
          'Green Aventurine — openness, and the willingness to be lucky',
          'Malachite — transformation through grief; the heart’s deep work',
          'Rhodonite — forgiveness and the mending of old ruptures',
          'Jade — steadiness in love; affection that lasts weather'
        ]
      },
      {
        title: 'Related Centers',
        body:
          'The heart is the system’s middle term — every axis crosses here.',
        list: [
          'With Manipura (03) — boundaries make compassion sustainable; the heart stays open longest where the will can say no',
          'With Vishuddha (05) — love and grief need voice; what the heart cannot say, the throat stores',
          'With the triads above and below — the heart translates instinct into meaning and meaning into care; when it closes, body and spirit stop speaking to each other'
        ]
      },
      {
        title: 'Integration & Contemplation',
        body:
          'The heart integrates by being brought, gently, to the places it has closed. Contemplate:',
        list: [
          'Whom do I love easily — and who has to earn it? What is the difference?',
          'What grief have I never given its full hour?',
          'Where do I give in order to be needed, rather than from overflow?',
          'What would it mean to include myself among the people I am kind to?'
        ]
      }
    ]
  },
  {
    id: '05',
    name: 'Vishuddha',
    meaning: '"Especially pure"',
    subtitle: 'The Throat Center',
    keywords: 'Throat + Expression + Truth',
    color: '#2f82a8',
    element: 'Ether',
    location: 'Throat',
    gland: 'Thyroid',
    mantra: 'HAM',
    top: 20.8,
    x: 50,
    summary:
      'Vishuddha is the channel of truth. It governs voice, listening, creative expression, and the courage to let the inner world become sound.',
    sections: [
      {
        title: 'Psychological Themes',
        body:
          'Vishuddha governs expression and truth: the passage through which inner life becomes outer form. Speaking is only half of it — deep listening, timing, and honest silence belong to this center too. Its psychological core is congruence: whether what we say matches what we know, whether our outer voice carries our inner one. Every unspoken truth is stored here, and the throat keeps the ledger.'
      },
      {
        title: 'Developmental Stage',
        body:
          'The throat center develops roughly between seven and twelve years, as the child finds their voice in the wider world — classrooms, friendships, the first audiences. The key imprint is whether speaking up was met with interest or with ridicule and silencing. "Children should be seen and not heard," mockery of a young voice, or family secrets that could not be named all teach the throat to constrict — a constriction that later reads as stage fright, a tight jaw, or the chronic swallowing of one’s own opinion.'
      },
      {
        title: 'Shadow & Blockages',
        body:
          'The demon of the throat is lies — including the quiet ones we tell by omission, and the ones we tell ourselves. Every incongruence between inner and outer life passes through, and burdens, this center.',
        list: [
          'Deficient — fear of speaking, weak or swallowed voice, secrets held for years, chronic "I don’t know what to say"',
          'Excessive — talking over others, gossip, oversharing as armor, inability to hold silence',
          'Core wound — "my truth, spoken, will cost me connection"'
        ]
      },
      {
        title: 'Somatic & Physiology',
        body:
          'The throat is the narrowest passage in the body’s midline — everything moving between head and heart crosses here, and constriction is felt immediately.',
        list: [
          'Regions — throat, neck, jaw, mouth, ears, shoulders where they meet the neck',
          'Systems — thyroid and metabolism, vocal apparatus, hearing',
          'Common signals — lump in the throat, tight jaw and TMJ tension, neck stiffness, a voice that thins under pressure'
        ]
      },
      {
        title: 'Nervous System Links',
        body:
          'The vagus nerve passes directly through the throat and innervates the larynx — which is why the voice trembles under threat and why vocalizing regulates. Humming, chanting, and slow singing stimulate vagal tone measurably; a long spoken exhale settles the heart. Freeze states classically grip the throat: the scream that could not happen, the words that were not safe to say. Recovering the voice is, quite literally, nervous-system repair.'
      },
      {
        title: 'Practices & Meditations',
        body:
          'Throat practices move in both directions of the channel: expression outward, listening inward.',
        list: [
          'Daily hum — five minutes of sustained humming, feeling the vibration in the throat and skull',
          'Morning pages — three longhand pages of unedited truth, for no reader',
          'One true sentence — once a day, say aloud to someone something you would normally soften or skip',
          'Deep listening practice — one conversation where you only reflect back, adding nothing of your own',
          'Deliberate silence — a half day without speaking, noticing every impulse to fill the air'
        ]
      },
      {
        title: 'Yoga Poses',
        body:
          'Throat asanas alternately compress and expose the neck, flushing the region with attention and release.',
        list: [
          'Sarvangasana — Shoulder Stand, chin to chest, the classic vishuddha pose',
          'Halasana — Plough, deep folding of the throat passage',
          'Matsyasana — Fish, the throat’s counter-opening',
          'Simhasana — Lion’s Breath, the face and voice released without dignity',
          'Slow neck rolls and Ujjayi breath — the whispered ocean sound kept at the throat'
        ]
      },
      {
        title: 'Mantras & Sounds',
        body:
          'The seed syllable is HAM. Chant it in a clear, higher-middle register and feel the vibration in the hollow of the throat. This is the center where all mantra practice lives, so any chanting serves it — but the subtler practice is listening: after each sound, attend to the silence it leaves. Alternating sound and silence trains the throat’s two skills at once.'
      },
      {
        title: 'Crystals & Stones',
        body:
          'Throat stones are the blues — sky and water colors long associated with calm, clarity, and the courage of honest speech.',
        list: [
          'Blue Lace Agate — soft-spoken calm; the gentlest of the blues',
          'Sodalite — clarity of thought before the word is chosen',
          'Aquamarine — flowing, unforced expression; the sailor’s stone',
          'Lapis Lazuli — the old royal stone of truth-telling',
          'Amazonite — courage to be heard without armor'
        ]
      },
      {
        title: 'Related Centers',
        body:
          'The throat gives outward form to everything gathered below it.',
        list: [
          'With Anahata (04) — true speech is the heart made audible; a closed heart makes a clever but hollow voice',
          'With Svadhishthana (02) — creativity is conceived in the sacral and delivered at the throat; block either and the other backs up',
          'With Ajna (06) — we can only say what we allow ourselves to see; clarity of vision precedes honesty of speech'
        ]
      },
      {
        title: 'Integration & Contemplation',
        body:
          'The throat integrates through spoken and written truth, delivered in doses. Consider:',
        list: [
          'What is the sentence I have needed to say for years, and to whom?',
          'Where do I edit myself before anyone has asked me to?',
          'Do I listen to reply, or to understand? Who taught me that?',
          'What would my voice sound like if I trusted it completely?'
        ]
      }
    ]
  },
  {
    id: '06',
    name: 'Ajna',
    meaning: '"To perceive, to command"',
    subtitle: 'The Third Eye Center',
    keywords: 'Third Eye + Insight + Intuition',
    color: '#4d3a90',
    element: 'Light',
    location: 'Brow',
    gland: 'Pituitary',
    mantra: 'OM',
    top: 13.2,
    x: 50,
    summary:
      'Ajna is the center of perception, pattern recognition, and inner vision. It clarifies intuition and allows the mind to witness itself.',
    sections: [
      {
        title: 'Psychological Themes',
        body:
          'Ajna governs seeing — outer perception, inner imagery, intuition, and the witnessing awareness that can observe the mind itself. It is where pattern recognition becomes insight: the sudden reorganization of the familiar into the true. Its psychological work is discernment — telling perception from projection, intuition from fear, vision from fantasy. A clear third eye does not see more things; it sees things as they are.'
      },
      {
        title: 'Developmental Stage',
        body:
          'The third-eye center matures through adolescence, when abstract thought comes online and the young person begins to question the inherited picture of reality. Worldview forms here: the capacity to imagine other ways of living, to read symbols and meanings, to see oneself from outside. Families and cultures that punish questioning — "because I said so" — teach the eye to close; those that welcome inquiry teach it to trust its own seeing.'
      },
      {
        title: 'Shadow & Blockages',
        body:
          'The demon of the third eye is illusion — the comfortable image preferred over the difficult truth. Its distortions are subtle because they occur in the very instrument we see with.',
        list: [
          'Deficient — poor imagination, denial of the obvious, insensitivity to pattern, "I only believe what I can touch"',
          'Excessive — fantasy replacing action, dissociation, paranoia of hidden meanings, spiritual bypass of ordinary life',
          'Core wound — "what I see is not welcome, so I will see what I am told"'
        ]
      },
      {
        title: 'Somatic & Physiology',
        body:
          'Ajna is seated at the brow, associated with the pituitary — the master gland that conducts the endocrine orchestra below it, just as perception conducts the centers below.',
        list: [
          'Regions — brow, eyes, forehead, base of the skull',
          'Systems — pituitary function, vision, sleep-wake cycles, the brain’s imagery networks',
          'Common signals — eye strain and tension headaches, a furrowed brow held for years, insomnia, the fatigue of over-screened vision'
        ]
      },
      {
        title: 'Nervous System Links',
        body:
          'The third eye corresponds to the brain’s attention and imagery systems — including the default mode network, whose chatter quiets in deep meditation. Visualization is not mystical garnish: motor and perceptual circuits activate during vivid imagery much as they do in the real act, which is why rehearsal in the mind’s eye works. Sleep and dreaming are this center’s nightly practice; chronic sleep debt is, in this language, a starved sixth chakra.'
      },
      {
        title: 'Practices & Meditations',
        body:
          'Third-eye practices train steady attention and clean seeing — and rest the eye from the flood of manufactured images.',
        list: [
          'Trataka — candle-flame gazing: steady eyes on the flame, then closed eyes on the after-image',
          'Brow-point meditation — rest attention lightly at the space between the eyebrows and breathe',
          'Dream journal — record dreams immediately on waking; reread monthly for patterns',
          'Visualization practice — build one simple scene in the mind’s eye daily and hold it for two minutes',
          'Image fast — one day a week with no feeds, letting perception rest on the actual world'
        ]
      },
      {
        title: 'Yoga Poses',
        body:
          'Ajna asanas bring the brow into contact or turn the gaze inward — the body bowing to its own seeing.',
        list: [
          'Balasana — Child’s pose with the brow resting on the earth',
          'Adho Mukha Svanasana — Downward Dog, the head below the heart',
          'Uttanasana — standing forward fold, releasing the skull downward',
          'Seated meditation — the spine as the third eye’s tripod',
          'Yoga Nidra — the practice of conscious sleep, imagery witnessed from stillness'
        ]
      },
      {
        title: 'Mantras & Sounds',
        body:
          'The seed syllable is OM — the sound tradition holds to contain all others. Chant it slowly in three phases, A-U-M, and let the final hum rise from chest to skull, feeling it settle behind the brow. Practiced with eyes closed, attention at the eyebrow center, OM becomes a carrier wave for the witnessing state: the sound is watched as much as it is made.'
      },
      {
        title: 'Crystals & Stones',
        body:
          'Third-eye stones run indigo and violet — deep, translucent minerals traditionally kept as companions for meditation and inner sight.',
        list: [
          'Amethyst — the meditator’s stone; quiet for a crowded mind',
          'Lapis Lazuli — inner vision; the night sky held in the hand',
          'Labradorite — intuition; grey until the light turns, then fire',
          'Fluorite — mental clarity and the ordering of thought',
          'Iolite — the Viking compass stone; direction in fog'
        ]
      },
      {
        title: 'Related Centers',
        body:
          'The third eye refines what rises from below and steadies what descends from above.',
        list: [
          'With Vishuddha (05) — insight unexpressed turns to pressure; the throat gives seeing its consequence',
          'With Sahasrara (07) — the sixth center sees things, the seventh is the seeing itself; perception ripening into awareness',
          'With Muladhara (01) — vision needs ground or it drifts into fantasy; the root keeps intuition embodied and testable'
        ]
      },
      {
        title: 'Integration & Contemplation',
        body:
          'The third eye integrates by checking its own lens. Sit with these, and answer more slowly than feels natural:',
        list: [
          'Where in my life am I refusing to see something I already know?',
          'Which of my strongest opinions have I never actually examined?',
          'When has my intuition been right — and how did it feel, physically, at the time?',
          'What recurring image or dream keeps returning, and what might it be organizing?'
        ]
      }
    ]
  },
  {
    id: '07',
    name: 'Sahasrara',
    meaning: '"Thousand-petaled"',
    subtitle: 'The Crown Center',
    keywords: 'Crown + Unity + Transcendence',
    color: '#83368f',
    element: 'Consciousness',
    location: 'Crown',
    gland: 'Pineal',
    mantra: 'Silence',
    top: 7.2,
    x: 50,
    summary:
      'Sahasrara opens into meaning, unity, and spacious awareness. It is the thousand-petaled crown where individual identity remembers its source.',
    sections: [
      {
        title: 'Psychological Themes',
        body:
          'Sahasrara governs meaning, unity, and awareness itself — the dimension of life that asks not "what do I want?" but "what is all this?" It is the seat of the drive toward transcendence: awe, devotion, the intuition that consciousness is larger than the person carrying it. Psychologically it holds our relationship to meaning — and its collapse, the flat "so what?" of existential depression, is as much a crown issue as any mystical opening.'
      },
      {
        title: 'Developmental Stage',
        body:
          'The crown has no single window; it matures across the whole of life, quickening at the thresholds — birth, loss, love, confrontations with death — where ordinary identity proves too small. Childhood carries its first imprint in the capacity for wonder, and in whatever the family did with the big questions: welcomed them, handed down fixed answers, or ridiculed the asking. Traditions place its fullest development in the second half of life, when the questions of meaning can no longer be deferred.'
      },
      {
        title: 'Shadow & Blockages',
        body:
          'The demon of the crown is attachment — clinging to a fixed self and fixed answers in the face of a reality that is larger than both. Its distortions include the ways spirituality itself can become a hiding place.',
        list: [
          'Deficient — cynicism, meaninglessness, closed-mindedness, learning as accumulation without transformation',
          'Excessive — spiritual addiction, dissociation from body and world, superiority ("more awakened than you"), bypassing grief and anger with cosmic language',
          'Core wound — "I am my roles and beliefs; without them I am nothing"'
        ]
      },
      {
        title: 'Somatic & Physiology',
        body:
          'The crown is associated with the top of the head, the cerebral cortex, and the pineal gland — keeper of circadian rhythm, the body’s clock of light and darkness.',
        list: [
          'Regions — crown of the head, cerebral cortex, whole-body integration',
          'Systems — pineal function, melatonin and circadian rhythm, the global coordination of the nervous system',
          'Common signals — chronic disconnection from the body, sleep-rhythm disruption, the heaviness of a life felt to be meaningless'
        ]
      },
      {
        title: 'Nervous System Links',
        body:
          'Contemplative neuroscience finds the crown’s signatures in deep meditation: quieting of the default mode network, dissolving of the brain’s self-boundaries, states of absorption marked by distinct gamma and theta activity in long-term practitioners. Self-transcendent states — through meditation, awe, prayer — reliably reduce rumination and fear responses. The crown is not an escape from the nervous system but its widest setting: awareness resting as the context of experience rather than its captive.'
      },
      {
        title: 'Practices & Meditations',
        body:
          'Crown practices subtract rather than add: less doing, less commentary, more open awareness.',
        list: [
          'Silent sitting — begin with ten minutes of open awareness: not focusing on anything, simply being the space in which experience appears',
          'Awe practice — regularly seek what dwarfs you: night sky, old forest, vast music — and let the smallness be relief',
          'Prayer or surrender practice — in whatever vocabulary is honest, hand over what you cannot control',
          'Sacred study — read a wisdom text slowly, a paragraph a day, as encounter rather than information',
          'Service without credit — one act of anonymous care a week; the crown opens when the self steps aside'
        ]
      },
      {
        title: 'Yoga Poses',
        body:
          'Crown asanas either crown the head to the earth or dissolve effort entirely — the posture becomes stillness itself.',
        list: [
          'Padmasana — Lotus, or any seat the body can forget, for meditation',
          'Sirsasana — Headstand, the crown grounded, the world inverted (only with experience and care)',
          'Sasangasana — Rabbit, the crown gently touching the earth',
          'Savasana — the daily rehearsal of letting everything go',
          'Stillness itself — the final asana of every tradition'
        ]
      },
      {
        title: 'Mantras & Sounds',
        body:
          'The mantra of the crown is silence. Traditions approach it through OM — sounding the syllable and then attending to the hush that follows, the "fourth part" of the mantra, longer each round. Practice: chant OM three times, then sit in the resonance until it fades entirely, and remain. What listens after the sound has ended is the object of this center’s study.'
      },
      {
        title: 'Crystals & Stones',
        body:
          'Crown stones are the clear and luminous ones — pale, light-carrying minerals paired with stillness, spaciousness, and unclouded awareness.',
        list: [
          'Clear Quartz — clarity itself; the blank light all colors live in',
          'Selenite — luminous stillness; named for the moon',
          'Amethyst — the bridge stone between third eye and crown',
          'Lepidolite — lithium-bearing calm; peace for an anxious summit',
          'Howlite — the quieting of the commentary'
        ]
      },
      {
        title: 'Related Centers',
        body:
          'The crown gathers the whole column — and pours it back down.',
        list: [
          'With Muladhara (01) — the great polarity: no crown without root; the higher the reach, the deeper the required ground',
          'With Ajna (06) — the sixth chakra is the lens, the seventh the light; discernment opening into pure awareness',
          'With all centers — integration means the current runs both ways: transcendence that returns as kindness, presence, and ordinary responsibility'
        ]
      },
      {
        title: 'Integration & Contemplation',
        body:
          'The crown integrates downward: transcendence that does not return as kindness, embodiment, and ordinary responsibility is incomplete. Contemplate:',
        list: [
          'Who am I when every role — job, family, story — is set aside for one minute?',
          'What has my life been trying to be about? Is that what I have been doing?',
          'How does the fact that this ends change how I want to live this week?',
          'Where can awareness itself — not effort — be the thing I bring into the room?'
        ]
      }
    ]
  }
];
