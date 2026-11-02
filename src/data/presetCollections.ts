import { VocabularyWord } from '../types/bloom';
import { DEFAULT_VOCABULARY } from './defaultVocabulary';

export interface VocabularyCollection {
  id: string;
  name: string;
  description: string;
  wordCount: number;
  words: VocabularyWord[];
  isCustom?: boolean;
  createdAt?: string;
}

export const PRESET_COLLECTIONS: VocabularyCollection[] = [
  {
    id: 'core-b2-c1',
    name: 'Advanced Impact & Action (Default)',
    description: '10 versatile academic & professional verbs, adjectives, and core concepts.',
    wordCount: 10,
    words: DEFAULT_VOCABULARY,
  },
  {
    id: 'business-negotiations',
    name: 'Business, Career & Negotiations',
    description: 'High-frequency corporate verbs and strategic decision-making vocabulary.',
    wordCount: 10,
    words: [
      {
        id: 'negotiate',
        word: 'negotiate',
        russian: 'вести переговоры, договариваться',
        example: 'Both sides met late into the night to negotiate a fair merger agreement.',
        definition: 'To try to reach an agreement or compromise by discussion and give-and-take.',
        synonym: 'bargain',
        synonymDistractors: ['dictate', 'ignore', 'surrender'],
        synonymExplanation: "Both 'negotiate' and 'bargain' involve mutual discussion to reach consensus on terms.",
        gapSentence: 'Senior executives will {{word}} terms for the international licensing contract next week.',
        sentenceCompletion: {
          prompt: 'When negotiating international supply terms...',
          correctEnding: '...it is vital to understand both logistical costs and cultural etiquette.',
          distractors: [
            '...one should refuse to speak and walk away immediately.',
            '...no agreement has ever been concluded in business history.'
          ],
          explanation: "Successful negotiation balances cost calculations with mutual understanding."
        },
        dialogue: {
          speakerA: 'Can we lower the licensing fees on this contract?',
          speakerB: "We are willing to {{word}} if you commit to a three-year partnership.",
          targetWord: 'negotiate',
          distractors: ['delegate', 'jeopardize']
        },
        oddOneOut: {
          words: ['negotiate', 'confer', 'impose'],
          intruder: 'impose',
          explanation: "'Negotiate' and 'confer' rely on collaborative discussion; 'impose' forces a decision unilaterally."
        },
        wordFamily: { verb: 'negotiate', noun: 'negotiation', adjective: 'negotiable', adverb: 'negotiably' },
        category: 'Actions & Decisions',
        openQuestion: 'What strategy do you use when you need to negotiate a deadline or salary increase?',
        sampleOpenAnswer: 'I prepare documented metrics of my contributions so I can negotiate from a position of objective value.',
        register: 'Neutral',
        registerExplanation: "'Negotiate' is standard in business, legal, and everyday contexts.",
        agreeDisagreeStatement: 'In modern business, everything is negotiable if you understand the other party’s underlying fears.',
        discussionPrompt: 'Debate whether all professional terms are truly flexible or if core principles must remain non-negotiable.'
      },
      {
        id: 'delegate',
        word: 'delegate',
        russian: 'делегировать, поручать',
        example: 'A skilled manager knows how to delegate routine tasks to empower team members.',
        definition: 'To entrust a task or responsibility to another person, typically a subordinate.',
        synonym: 'assign',
        synonymDistractors: ['hoard', 'withhold', 'cancel'],
        synonymExplanation: "Both 'delegate' and 'assign' mean handing responsibility for a task to someone else.",
        gapSentence: 'If you want to prevent burnout, you must learn to {{word}} key project deliverables.',
        sentenceCompletion: {
          prompt: 'Leaders who refuse to delegate operational tasks...',
          correctEnding: '...frequently become organizational bottlenecks and exhaust themselves.',
          distractors: [
            '...always finish all company work in under ten minutes.',
            '...automatically double their department budget every single month.'
          ],
          explanation: "Failing to delegate creates severe operational bottlenecks."
        },
        dialogue: {
          speakerA: 'I feel completely overwhelmed by these fifteen client reports.',
          speakerB: 'You should {{word}} the data gathering to our junior analysts.',
          targetWord: 'delegate',
          distractors: ['compromise', 'streamline']
        },
        oddOneOut: {
          words: ['delegate', 'entrust', 'retain'],
          intruder: 'retain',
          explanation: "'Delegate' and 'entrust' hand responsibilities outward; 'retain' keeps them for oneself."
        },
        wordFamily: { verb: 'delegate', noun: 'delegation', adjective: 'delegable', adverb: '(none)' },
        category: 'Actions & Decisions',
        openQuestion: 'Why do many new managers struggle to delegate responsibilities effectively?',
        sampleOpenAnswer: 'New managers often fear loss of control or believe they can complete the task faster on their own.',
        register: 'Neutral',
        registerExplanation: "'Delegate' is widely used in corporate and administrative settings.",
        agreeDisagreeStatement: 'Delegating difficult decisions is often an excuse for poor leadership to evade responsibility.',
        discussionPrompt: 'Discuss the boundary between healthy delegation and dodging accountability.'
      },
      {
        id: 'streamline',
        word: 'streamline',
        russian: 'оптимизировать, упрощать',
        example: 'The company redesigned its customer support portal to streamline ticket resolution.',
        definition: 'To make an organization, process, or system more efficient and effective by employing faster or simpler methods.',
        synonym: 'optimize',
        synonymDistractors: ['complicate', 'hinder', 'convolute'],
        synonymExplanation: "Both 'streamline' and 'optimize' mean eliminating redundancies to achieve maximum efficiency.",
        gapSentence: 'Automating customer invoices will {{word}} our monthly accounting workflow.',
        sentenceCompletion: {
          prompt: 'The operations committee decided to streamline procurement procedures...',
          correctEnding: '...to eliminate three layers of unnecessary paperwork and shorten delivery wait times.',
          distractors: [
            '...in order to make ordering pencils take nine additional months.',
            '...so that no employee could ever buy equipment again.'
          ],
          explanation: "Streamlining focuses on cutting redundant bureaucracy to accelerate results."
        },
        dialogue: {
          speakerA: 'Why does shipping take so long to approve?',
          speakerB: 'We need to {{word}} the sign-off process by moving it online.',
          targetWord: 'streamline',
          distractors: ['jeopardize', 'hesitate']
        },
        oddOneOut: {
          words: ['streamline', 'simplify', 'encumber'],
          intruder: 'encumber',
          explanation: "'Streamline' and 'simplify' reduce friction; 'encumber' burdens or slows down."
        },
        wordFamily: { verb: 'streamline', noun: 'streamlining', adjective: 'streamlined', adverb: '(none)' },
        category: 'Actions & Decisions',
        openQuestion: 'What daily routine in your studies or job could you streamline to save several hours each week?',
        sampleOpenAnswer: 'I could streamline my morning email triage by creating automated sorting filters.',
        register: 'Neutral',
        registerExplanation: "'Streamline' is common in corporate, technical, and conversational English.",
        agreeDisagreeStatement: 'Excessive efforts to streamline organizations often eliminate human empathy and creativity.',
        discussionPrompt: 'Discuss whether extreme procedural efficiency can stifle serendipitous innovation.'
      },
      {
        id: 'viable',
        word: 'viable',
        russian: 'жизнеспособный, практичный',
        example: 'Before investing millions, the venture capitalists demanded proof that the technology was commercially viable.',
        definition: 'Capable of working successfully or developing into a sustainable reality; feasible.',
        synonym: 'feasible',
        synonymDistractors: ['impractical', 'futile', 'worthless'],
        synonymExplanation: "Both 'viable' and 'feasible' signify ideas or plans that can realistically succeed in practice.",
        gapSentence: 'Without substantial private funding, the proposed high-speed rail line is not financially {{word}}.',
        sentenceCompletion: {
          prompt: 'To prove that an electric aircraft prototype is viable...',
          correctEnding: '...engineers must demonstrate safe battery endurance under harsh weather conditions.',
          distractors: [
            '...they must keep it hidden in a dark warehouse and never test it.',
            '...investors must immediately give up all commercial aspirations.'
          ],
          explanation: "Viability requires empirical demonstration of reliability and real-world performance."
        },
        dialogue: {
          speakerA: 'Can we build this feature in our two-week sprint?',
          speakerB: 'It seems barely {{word}}; let us reduce the scope first to ensure delivery.',
          targetWord: 'viable',
          distractors: ['reluctant', 'ambiguous']
        },
        oddOneOut: {
          words: ['viable', 'workable', 'untenable'],
          intruder: 'untenable',
          explanation: "'Viable' and 'workable' indicate realistic feasibility; 'untenable' cannot be maintained or justified."
        },
        wordFamily: { verb: '(none)', noun: 'viability', adjective: 'viable', adverb: 'viably' },
        category: 'Qualities & Impact',
        openQuestion: 'What criteria do you use to evaluate whether a personal project idea is truly viable?',
        sampleOpenAnswer: 'I check whether the project has a clear audience and whether the required time fits my weekly schedule.',
        register: 'Formal',
        registerExplanation: "'Viable' is formal and analytical, frequent in business, finance, and biology.",
        agreeDisagreeStatement: 'A bold visionary idea does not need to be commercially viable immediately to deserve public funding.',
        discussionPrompt: 'Weigh pragmatic commercial viability against foundational speculative research.'
      },
      {
        id: 'compromise',
        word: 'compromise',
        russian: 'идти на компромисс, соглашение',
        example: 'In effective partnerships, both leaders must occasionally compromise to reach a shared milestone.',
        definition: 'An agreement reached by each side making concessions, or the act of accepting lower standards.',
        synonym: 'concession',
        synonymDistractors: ['stalemate', 'ultimatum', 'conquest'],
        synonymExplanation: "Both 'compromise' and 'concession' involve yielding ground to achieve harmony.",
        gapSentence: 'After two weeks of deadlock, the union and management reached a mutually acceptable {{word}}.',
        sentenceCompletion: {
          prompt: 'When negotiating high-stakes contracts, leaders who refuse to compromise...',
          correctEnding: '...frequently cause negotiations to collapse without resolving the core problem.',
          distractors: [
            '...always get one hundred percent of their demands accepted instantly.',
            '...celebrate by permanently shutting down their own company.'
          ],
          explanation: "Absolute refusal to compromise often terminates negotiations entirely."
        },
        dialogue: {
          speakerA: 'Neither team wants to change their launch schedule.',
          speakerB: 'Both must {{word}} by meeting halfway on the beta release date.',
          targetWord: 'compromise',
          distractors: ['delegate', 'thrive']
        },
        oddOneOut: {
          words: ['compromise', 'accommodate', 'defy'],
          intruder: 'defy',
          explanation: "'Compromise' and 'accommodate' involve mutual adjustment; 'defy' means openly resisting or refusing."
        },
        wordFamily: { verb: 'compromise', noun: 'compromise', adjective: 'compromising', adverb: 'compromisingly' },
        category: 'Actions & Decisions',
        openQuestion: 'Can you think of a situation where you had to compromise with a colleague or family member?',
        sampleOpenAnswer: 'When planning our group presentation, I compromised on the visual slide template to preserve team cohesion.',
        register: 'Neutral',
        registerExplanation: "'Compromise' is standard neutral vocabulary in both politics and daily dialogue.",
        agreeDisagreeStatement: 'Compromising on core ethical standards for financial gain is never acceptable.',
        discussionPrompt: 'Explore whether practical compromises in business ever risk eroding corporate integrity.'
      },
      {
        id: 'consensus',
        word: 'consensus',
        russian: 'консенсус, единодушие',
        example: 'After hours of vigorous debate, the committee finally reached a broad consensus.',
        definition: 'A general agreement or accord among a group of people.',
        synonym: 'accord',
        synonymDistractors: ['discord', 'dissent', 'schism'],
        synonymExplanation: "Both 'consensus' and 'accord' signify shared agreement and collective unity among stakeholders.",
        gapSentence: 'Scientific {{word}} strongly supports immediate action to curb greenhouse gas emissions.',
        sentenceCompletion: {
          prompt: 'Building consensus among diverse stakeholders requires...',
          correctEnding: '...listening carefully to competing priorities and finding common ground.',
          distractors: [
            '...shouting down anyone who disagrees with your personal preference.',
            '...ignoring all feedback and forging signed signatures.'
          ],
          explanation: "True consensus emerges from mutual dialogue and respectful alignment of interests."
        },
        dialogue: {
          speakerA: 'Did the board approve the expansion plan?',
          speakerB: 'Yes, there was overwhelming {{word}} that expanding into Asia was our best move.',
          targetWord: 'consensus',
          distractors: ['compromise', 'hinder']
        },
        oddOneOut: {
          words: ['consensus', 'harmony', 'friction'],
          intruder: 'friction',
          explanation: "'Consensus' and 'harmony' mean unified accord; 'friction' means conflict or tension."
        },
        wordFamily: { verb: '(none)', noun: 'consensus', adjective: 'consensual', adverb: 'consensually' },
        category: 'States & Mindset',
        openQuestion: 'Why is consensus often harder to reach in remote teams compared to in-person meetings?',
        sampleOpenAnswer: 'Remote communication lacks subtle body language cues, making it easier for misunderstandings to delay consensus.',
        register: 'Formal',
        registerExplanation: "'Consensus' is a formal term common in political analysis, science, and board meetings.",
        agreeDisagreeStatement: 'Seeking total consensus slows down innovation; visionary leaders must make unpopular executive decisions.',
        discussionPrompt: 'Compare collective consensus decision-making with authoritarian executive leadership.'
      },
      {
        id: 'jeopardize',
        word: 'jeopardize',
        russian: 'ставить под угрозу, рисковать',
        example: 'Leaking confidential proprietary research would jeopardize the entire patent application.',
        definition: 'To put someone or something into a situation in which there is a danger of loss, harm, or failure.',
        synonym: 'endanger',
        synonymDistractors: ['safeguard', 'protect', 'fortify'],
        synonymExplanation: "Both 'jeopardize' and 'endanger' mean exposing something of value to critical hazard or failure.",
        gapSentence: 'Cutting safety inspections to save money will ultimately {{word}} customer trust.',
        sentenceCompletion: {
          prompt: 'Rushing an unverified product into the market could jeopardize...',
          correctEnding: '...years of brand reputation and expose the organization to legal liabilities.',
          distractors: [
            '...the laws of universal gravitation permanently.',
            '...nothing whatsoever because customers never care about product quality.'
          ],
          explanation: "Premature launches jeopardize corporate reputation and invite regulatory scrutiny."
        },
        dialogue: {
          speakerA: 'Should we skip the secondary quality audit to ship before Friday?',
          speakerB: 'No, that shortcut could {{word}} our entire certification.',
          targetWord: 'jeopardize',
          distractors: ['thrive', 'advocate']
        },
        oddOneOut: {
          words: ['jeopardize', 'threaten', 'shield'],
          intruder: 'shield',
          explanation: "'Jeopardize' and 'threaten' introduce peril; 'shield' provides defense and safety."
        },
        wordFamily: { verb: 'jeopardize', noun: 'jeopardy', adjective: '(jeopardizing)', adverb: '(none)' },
        category: 'Actions & Decisions',
        openQuestion: 'What workplace behavior is most likely to jeopardize a young professional’s credibility?',
        sampleOpenAnswer: 'Consistently failing to deliver promised tasks without early communication quickly jeopardizes credibility.',
        register: 'Formal',
        registerExplanation: "'Jeopardize' is formal and analytical, widely utilized in journalism and risk assessment.",
        agreeDisagreeStatement: 'To achieve extraordinary breakthroughs, one must be willing to jeopardize comfortable job security.',
        discussionPrompt: 'Debate whether calculated reckless risks are necessary for transformative career leaps.'
      },
      {
        id: 'lucrative',
        word: 'lucrative',
        russian: 'прибыльный, выгодный',
        example: 'The software company secured a lucrative contract with the federal defense agency.',
        definition: 'Producing a great deal of profit; commercially highly advantageous.',
        synonym: 'profitable',
        synonymDistractors: ['unproductive', 'lossmaking', 'bankrupt'],
        synonymExplanation: "Both 'lucrative' and 'profitable' describe endeavors yielding large financial gains.",
        gapSentence: 'Transitioning to cloud services proved to be an extraordinarily {{word}} business decision.',
        sentenceCompletion: {
          prompt: 'While the venture was projected to be highly lucrative...',
          correctEnding: '...the founders hesitated because of its questionable environmental impact.',
          distractors: [
            '...they instantly decided to give all their revenue away to strangers.',
            '...it was simultaneously guaranteed to lose all money overnight.'
          ],
          explanation: "High profitability (lucrative) is sometimes weighed against ethical or ecological costs."
        },
        dialogue: {
          speakerA: 'Why did the architect switch to renewable retrofitting?',
          speakerB: 'It became a far more {{word}} sector with government subsidies.',
          targetWord: 'lucrative',
          distractors: ['reluctant', 'ambiguous']
        },
        oddOneOut: {
          words: ['lucrative', 'remunerative', 'unfruitful'],
          intruder: 'unfruitful',
          explanation: "'Lucrative' and 'remunerative' yield high gain; 'unfruitful' produces zero return."
        },
        wordFamily: { verb: '(none)', noun: 'lucrativeness', adjective: 'lucrative', adverb: 'lucratively' },
        category: 'Qualities & Impact',
        openQuestion: 'Should university students choose majors based primarily on lucrative career paths or personal passions?',
        sampleOpenAnswer: 'A balanced approach is best: targeting a field with viable economic prospects while honoring genuine interest.',
        register: 'Neutral',
        registerExplanation: "'Lucrative' is standard in business, career, and conversational English.",
        agreeDisagreeStatement: 'Pursuing the most lucrative industry is a rational moral obligation to provide for one’s family.',
        discussionPrompt: 'Discuss the ethical hierarchy between monetary wealth and vocational fulfillment.'
      },
      {
        id: 'implement',
        word: 'implement',
        russian: 'внедрять, реализовывать',
        example: 'The hospital plans to implement a new electronic health records system next month.',
        definition: 'To put a decision, plan, agreement, or policy into effect.',
        synonym: 'execute',
        synonymDistractors: ['abandon', 'postpone', 'suppress'],
        synonymExplanation: "Both 'implement' and 'execute' mean translating theoretical plans into active practical reality.",
        gapSentence: 'Management agreed to {{word}} flexible working hours beginning this autumn.',
        sentenceCompletion: {
          prompt: 'It is one thing to design an ambitious strategy, but another to implement it...',
          correctEnding: '...when unexpected supply constraints and resource shortages arise.',
          distractors: [
            '...because thinking about a strategy automatically finishes all work.',
            '...since implementing plans is illegal in every country.'
          ],
          explanation: "Implementation is where practical operational friction tests theoretical designs."
        },
        dialogue: {
          speakerA: 'When will the new cybersecurity protocols take effect?',
          speakerB: 'We will {{word}} them across all workstations on Monday morning.',
          targetWord: 'implement',
          distractors: ['compromise', 'hesitate']
        },
        oddOneOut: {
          words: ['implement', 'enact', 'derail'],
          intruder: 'derail',
          explanation: "'Implement' and 'enact' bring plans to fruition; 'derail' ruins or interrupts them."
        },
        wordFamily: { verb: 'implement', noun: 'implementation', adjective: 'implementable', adverb: '(none)' },
        category: 'Actions & Decisions',
        openQuestion: 'What is the most effective habit you have implemented in your weekly schedule this year?',
        sampleOpenAnswer: 'I implemented a Sunday planning session to outline my priority milestones for the upcoming week.',
        register: 'Neutral',
        registerExplanation: "'Implement' is standard across technology, governance, and daily life.",
        agreeDisagreeStatement: 'Execution and implementation are infinitely more valuable than original idea generation.',
        discussionPrompt: 'Debate the classic dilemma: does genius lie in the idea or in its relentless execution?'
      },
      {
        id: 'benchmark',
        word: 'benchmark',
        russian: 'ориентир, критерий оценки',
        example: 'Our quarterly customer satisfaction rating serves as an industry benchmark for excellence.',
        definition: 'A standard or point of reference against which things may be compared or assessed.',
        synonym: 'criterion',
        synonymDistractors: ['anomaly', 'aberration', 'guess'],
        synonymExplanation: "Both 'benchmark' and 'criterion' provide measurable standards for appraisal and comparison.",
        gapSentence: 'The engineering team set an ambitious performance {{word}} for system latency.',
        sentenceCompletion: {
          prompt: 'Companies benchmark their manufacturing efficiency against global competitors...',
          correctEnding: '...to identify productivity gaps and modernize lagging production facilities.',
          distractors: [
            '...so they can ensure their products remain defective forever.',
            '...because nobody cares about production costs in manufacturing.'
          ],
          explanation: "Benchmarking helps organizations discover operational gaps and elevate standards."
        },
        dialogue: {
          speakerA: 'How do we know if our response time is competitive?',
          speakerB: 'We will use the top three cloud providers as our {{word}}.',
          targetWord: 'benchmark',
          distractors: ['consensus', 'hinder']
        },
        oddOneOut: {
          words: ['benchmark', 'standard', 'deviation'],
          intruder: 'deviation',
          explanation: "'Benchmark' and 'standard' establish reference norms; 'deviation' departs from the norm."
        },
        wordFamily: { verb: 'benchmark', noun: 'benchmark', adjective: 'benchmarked', adverb: '(none)' },
        category: 'Qualities & Impact',
        openQuestion: 'What personal benchmark do you use to measure whether you have had a productive week?',
        sampleOpenAnswer: 'My benchmark is whether I completed my two primary creative projects before responding to routine messages.',
        register: 'Formal',
        registerExplanation: "'Benchmark' is common in corporate analytics, sports, and software engineering.",
        agreeDisagreeStatement: 'Constantly benchmarking yourself against others breeds insecurity rather than genuine excellence.',
        discussionPrompt: 'Contrast external comparative benchmarking with internal self-referential progress.'
      }
    ]
  }
];
