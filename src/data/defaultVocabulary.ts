import { VocabularyWord, BloomLevelInfo } from '../types/bloom';

export const BLOOM_LEVELS: BloomLevelInfo[] = [
  {
    step: 1,
    name: 'Remembering',
    verb: 'Recall & Recognize',
    colorName: 'Purple',
    hex: '#7c3aed',
    badgeHex: '#6d28d9',
    accentBg: 'bg-purple-50 text-purple-900 border-purple-200',
    description: 'Retrieve knowledge from memory. Flashcards and recognition quiz.',
    cognitiveObjective: 'Recognize form, Russian equivalent, and recall basic English context.'
  },
  {
    step: 2,
    name: 'Understanding',
    verb: 'Comprehend & Clarify',
    colorName: 'Blue',
    hex: '#2563eb',
    badgeHex: '#1d4ed8',
    accentBg: 'bg-blue-50 text-blue-900 border-blue-200',
    description: 'Demonstrate comprehension of English definitions and semantic synonyms without translation.',
    cognitiveObjective: 'Interpret definitions and pair lexical synonyms purely in English.'
  },
  {
    step: 3,
    name: 'Applying',
    verb: 'Execute & Contextualize',
    colorName: 'Green',
    hex: '#059669',
    badgeHex: '#047857',
    accentBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    description: 'Use target vocabulary in syntax, sentence completions, and spoken mini-dialogues.',
    cognitiveObjective: 'Apply the correct grammatical form in varied conversational and situational contexts.'
  },
  {
    step: 4,
    name: 'Analyzing',
    verb: 'Differentiate & Categorize',
    colorName: 'Yellow',
    hex: '#d97706',
    badgeHex: '#b45309',
    accentBg: 'bg-amber-50 text-amber-900 border-amber-200',
    description: 'Deconstruct word families, spot anomalies in odd-one-out sets, and sort into thematic buckets.',
    cognitiveObjective: 'Analyze semantic nuances, morphological derivations, and lexical groupings.'
  },
  {
    step: 5,
    name: 'Evaluating',
    verb: 'Judge & Justify',
    colorName: 'Orange',
    hex: '#ea580c',
    badgeHex: '#c2410c',
    accentBg: 'bg-orange-50 text-orange-900 border-orange-200',
    description: 'Appraise register appropriateness, critique perspectives, and respond to deep open questions.',
    cognitiveObjective: 'Make reasoned linguistic judgments on formality and defend personal stances.'
  },
  {
    step: 6,
    name: 'Creating',
    verb: 'Synthesize & Produce',
    colorName: 'Red',
    hex: '#dc2626',
    badgeHex: '#b91c1c',
    accentBg: 'bg-rose-50 text-rose-900 border-rose-200',
    description: 'Synthesize original essays, workplace messages, and descriptive storytelling using target word banks.',
    cognitiveObjective: 'Generate novel coherent discourse actively integrating at least 4-6 target words.'
  }
];

export const DEFAULT_VOCABULARY: VocabularyWord[] = [
  {
    id: 'hesitate',
    word: 'hesitate',
    russian: 'колебаться, сомневаться',
    example: 'Please do not hesitate to contact our team if any unexpected problems arise.',
    definition: 'To pause before saying or doing something, often because you are uncertain or reluctant.',
    synonym: 'waver',
    synonymDistractors: ['accelerate', 'command', 'celebrate'],
    synonymExplanation: "Both 'hesitate' and 'waver' denote pausing momentarily due to uncertainty or hesitation before committing to an action.",
    gapSentence: 'She noticed smoke coming from the engine and did not {{word}} for a second before pulling over.',
    sentenceCompletion: {
      prompt: 'When offered the leadership role overseas, Marco began to hesitate...',
      correctEnding: '...because he was worried about how the sudden relocation would disrupt his family.',
      distractors: [
        '...because he had already packed all his luggage two months in advance.',
        '...so he instantly signed the contract with absolute joy and certainty.'
      ],
      explanation: "'Hesitate' indicates second thoughts or uncertainty; worrying about family upheaval explains the pause."
    },
    dialogue: {
      speakerA: 'Are you coming with us to the presentation, or do you need more time?',
      speakerB: "Don't {{word}} on my account—go ahead, and I'll catch up in five minutes.",
      targetWord: 'hesitate',
      distractors: ['thrive', 'advocate']
    },
    oddOneOut: {
      words: ['hesitate', 'falter', 'persist'],
      intruder: 'persist',
      explanation: "'Hesitate' and 'falter' convey stopping, wavering, or pausing in uncertainty; 'persist' means pushing forward firmly without stopping."
    },
    wordFamily: {
      verb: 'hesitate',
      noun: 'hesitation',
      adjective: 'hesitant',
      adverb: 'hesitantly'
    },
    category: 'Actions & Decisions',
    openQuestion: 'Describe a significant choice in your career or studies where you did not hesitate at all. What gave you that clarity?',
    sampleOpenAnswer: 'When I received the scholarship to study abroad, I did not hesitate for a second because I knew such an opportunity would never appear twice.',
    register: 'Neutral',
    registerExplanation: "'Hesitate' is neutral and versatile: appropriate in everyday conversations as well as formal correspondence ('Do not hesitate to reach out').",
    agreeDisagreeStatement: 'In modern business, leaders who hesitate even for one day will inevitably lose out to bolder competitors.',
    discussionPrompt: 'Why do you take this position? Discuss whether deliberate hesitation is sometimes wiser than impulsive speed.'
  },
  {
    id: 'persuade',
    word: 'persuade',
    russian: 'убеждать, склонять',
    example: 'Her presentation was so well-researched that she managed to persuade the entire board.',
    definition: 'To convince someone to do or believe something through reasoning, evidence, or argument.',
    synonym: 'convince',
    synonymDistractors: ['intimidate', 'confuse', 'forbid'],
    synonymExplanation: "Both 'persuade' and 'convince' involve changing someone's opinion or decision through rational reasoning or appeal.",
    gapSentence: 'The scientist used verifiable climate data to {{word}} skeptical lawmakers to fund the renewable project.',
    sentenceCompletion: {
      prompt: 'The negotiator brought detailed economic figures to the meeting in order to persuade the council...',
      correctEnding: '...that investing in solar public transport would yield substantial savings within three years.',
      distractors: [
        '...to cancel all discussions permanently without looking at the proposal.',
        '...that numbers and financial audits are completely irrelevant to budget decisions.'
      ],
      explanation: "Persuading someone requires demonstrating tangible benefits or sound reasoning, such as long-term financial savings."
    },
    dialogue: {
      speakerA: 'Did Liam agree to lead the workshop next weekend?',
      speakerB: 'Not yet, but I think a short phone call from you will {{word}} him.',
      targetWord: 'persuade',
      distractors: ['hinder', 'subtle']
    },
    oddOneOut: {
      words: ['persuade', 'influence', 'coerce'],
      intruder: 'coerce',
      explanation: "'Persuade' and 'influence' rely on reasoning, attraction, or voluntary agreement; 'coerce' implies forcing someone against their will."
    },
    wordFamily: {
      verb: 'persuade',
      noun: 'persuasion',
      adjective: 'persuasive',
      adverb: 'persuasively'
    },
    category: 'Actions & Decisions',
    openQuestion: 'Can you recall a time when someone managed to persuade you to change your mind about an important issue?',
    sampleOpenAnswer: 'My mentor managed to persuade me that stepping outside my comfort zone was the only way to master public speaking.',
    register: 'Neutral',
    registerExplanation: "'Persuade' is standard neutral English, widely utilized in academic essays, legal arguments, and casual dialogues.",
    agreeDisagreeStatement: 'It is far more valuable to persuade others through emotional storytelling than through dry statistical evidence.',
    discussionPrompt: 'Do you agree or disagree? Explain which tool you find more compelling when making personal purchasing decisions.'
  },
  {
    id: 'reluctant',
    word: 'reluctant',
    russian: 'неохотный, сопротивляющийся',
    example: 'He was reluctant to admit that he had made a critical mistake in the financial spreadsheet.',
    definition: 'Feeling or showing hesitation, unwillingness, or disinclination to do something.',
    synonym: 'unwilling',
    synonymDistractors: ['eager', 'enthusiastic', 'fearless'],
    synonymExplanation: "Both 'reluctant' and 'unwilling' describe a person who hesitates or resists performing an action due to reservations.",
    gapSentence: 'Although exhausted, the doctor was {{word}} to leave the patient until the vital signs stabilized.',
    sentenceCompletion: {
      prompt: 'The young author was initially reluctant to share her draft with the publisher...',
      correctEnding: '...fearing that harsh editorial criticism might crush her confidence before the book was finished.',
      distractors: [
        '...because she had already distributed ten thousand printed copies across the city.',
        '...since she loved nothing more than having strangers read her private diary.'
      ],
      explanation: "A person is 'reluctant' when they harbor reservations or fears, such as anxiety over critical feedback."
    },
    dialogue: {
      speakerA: 'Did the department head approve our budget request?',
      speakerB: 'She was {{word}} at first, but agreed after we showed the projected cost reductions.',
      targetWord: 'reluctant',
      distractors: ['ambiguous', 'crucial']
    },
    oddOneOut: {
      words: ['reluctant', 'hesitant', 'keen'],
      intruder: 'keen',
      explanation: "'Reluctant' and 'hesitant' signify reluctance and hesitation; 'keen' means eager, enthusiastic, and ready to act."
    },
    wordFamily: {
      verb: '(none - state)',
      noun: 'reluctance',
      adjective: 'reluctant',
      adverb: 'reluctantly'
    },
    category: 'States & Mindset',
    openQuestion: 'What is a task or responsibility that you are usually reluctant to begin, and how do you overcome that hesitation?',
    sampleOpenAnswer: 'I am often reluctant to organize my tax receipts, but setting a 20-minute timer helps me start without dread.',
    register: 'Neutral',
    registerExplanation: "'Reluctant' is standard neutral vocabulary, ideal for formal reporting as well as casual character descriptions.",
    agreeDisagreeStatement: 'Employees who are reluctant to adopt generative AI tools will become obsolete within the next five years.',
    discussionPrompt: 'Reflect on whether hesitation around new technology is justified caution or self-destructive resistance.'
  },
  {
    id: 'thrive',
    word: 'thrive',
    russian: 'процветать, преуспевать',
    example: 'Independent bookstores continue to thrive by hosting community gatherings and author book clubs.',
    definition: 'To grow vigorously, develop well, or flourish successfully in a supportive environment.',
    synonym: 'flourish',
    synonymDistractors: ['deteriorate', 'shrink', 'stagnate'],
    synonymExplanation: "Both 'thrive' and 'flourish' express robust healthy growth, outstanding success, and prosperous development.",
    gapSentence: 'Children generally {{word}} in environments where they receive consistent encouragement and clear guidance.',
    sentenceCompletion: {
      prompt: 'After transferring to the smaller laboratory, the young biochemist began to thrive...',
      correctEnding: '...because she finally had direct mentorship and unrestricted access to advanced sequencing equipment.',
      distractors: [
        '...despite having every single resource and grant abruptly cancelled on day one.',
        '...so she gave up all scientific research and moved to a deserted island.'
      ],
      explanation: "'Thrive' means flourishing; having direct mentorship and high-grade equipment provides the ideal fertile environment to thrive."
    },
    dialogue: {
      speakerA: 'How is your new boutique café performing on the quiet side street?',
      speakerB: 'Surprisingly, we {{word}} on word-of-mouth recommendations and loyal neighborhood regulars.',
      targetWord: 'thrive',
      distractors: ['hesitate', 'hinder']
    },
    oddOneOut: {
      words: ['thrive', 'prosper', 'languish'],
      intruder: 'languish',
      explanation: "'Thrive' and 'prosper' describe blooming and flourishing; 'languish' means losing vitality, suffering, or deteriorating."
    },
    wordFamily: {
      verb: 'thrive',
      noun: '(thriving/prosperity)',
      adjective: 'thriving',
      adverb: 'thrivingly'
    },
    category: 'Qualities & Impact',
    openQuestion: 'In what kind of working environment do you personally thrive the most: highly structured or completely autonomous?',
    sampleOpenAnswer: 'I thrive most in an autonomous environment where outcomes are measured rather than hours spent sitting at a desk.',
    register: 'Neutral',
    registerExplanation: "'Thrive' is an elegant neutral word used in biology, economics, psychology, and personal conversations.",
    agreeDisagreeStatement: 'High levels of workplace stress are an unavoidable prerequisite for ambitious professionals to thrive.',
    discussionPrompt: 'Do you believe pressure pushes people to peak achievement, or does chronic stress prevent sustainable flourishing?'
  },
  {
    id: 'ambiguous',
    word: 'ambiguous',
    russian: 'двусмысленный, неясный',
    example: 'The contract contained ambiguous language regarding who was responsible for international shipping fees.',
    definition: 'Open to more than one interpretation; having a double or unclear meaning; vague.',
    synonym: 'equivocal',
    synonymDistractors: ['lucid', 'unmistakable', 'explicit'],
    synonymExplanation: "Both 'ambiguous' and 'equivocal' refer to statements or signals that can be understood in multiple ways and lack clarity.",
    gapSentence: 'The politician gave an {{word}} answer when asked whether she would support the tax reform bill.',
    sentenceCompletion: {
      prompt: 'Because the instructions on the chemistry exam were ambiguous...',
      correctEnding: '...half the students solved for molarity while the other half calculated total pressure.',
      distractors: [
        '...every single student achieved exactly one hundred percent without asking a single question.',
        '...the laboratory director wrote an apology letter for being excessively clear and concise.'
      ],
      explanation: "Ambiguous instructions produce divergent interpretations, leading students to answer in two completely different ways."
    },
    dialogue: {
      speakerA: 'Did the client confirm whether we should launch the campaign on Friday?',
      speakerB: 'Her email was rather {{word}}—she said "proceed if all feels right", so I will call for clarification.',
      targetWord: 'ambiguous',
      distractors: ['resilient', 'reluctant']
    },
    oddOneOut: {
      words: ['ambiguous', 'obscure', 'transparent'],
      intruder: 'transparent',
      explanation: "'Ambiguous' and 'obscure' denote lack of clarity or multiple interpretations; 'transparent' means clear, plain, and obvious."
    },
    wordFamily: {
      verb: '(none)',
      noun: 'ambiguity',
      adjective: 'ambiguous',
      adverb: 'ambiguously'
    },
    category: 'Qualities & Impact',
    openQuestion: 'Why is ambiguous feedback from a supervisor often more frustrating than negative but direct feedback?',
    sampleOpenAnswer: 'Ambiguous feedback leaves you second-guessing what needs improvement, whereas direct feedback gives a concrete roadmap for change.',
    register: 'Formal',
    registerExplanation: "'Ambiguous' leans formal and analytical; frequently used in legal, academic, linguistic, and policy discourse.",
    agreeDisagreeStatement: 'Great poetry and art must remain ambiguous; once a poem has a single definitive meaning, it loses its magic.',
    discussionPrompt: 'Defend whether artistic ambiguity enriches the viewer’s experience or merely disguises intellectual laziness.'
  },
  {
    id: 'crucial',
    word: 'crucial',
    russian: 'решающий, ключевой',
    example: 'Getting sufficient deep sleep is crucial for long-term memory consolidation and immune defense.',
    definition: 'Decisive or critical, especially in the success or failure of something; of supreme importance.',
    synonym: 'pivotal',
    synonymDistractors: ['trivial', 'incidental', 'optional'],
    synonymExplanation: "Both 'crucial' and 'pivotal' characterize something upon which a critical outcome hinges.",
    gapSentence: 'Maintaining strict quality standards was {{word}} to retaining our ISO certification this year.',
    sentenceCompletion: {
      prompt: 'Early detection of software vulnerabilities is crucial...',
      correctEnding: '...because fixing bugs after customer deployment costs twenty times more and damages corporate reputation.',
      distractors: [
        '...since nobody ever cares if sensitive user passwords leak onto the dark web.',
        '...so developers can ignore code reviews and deploy untested patches directly to production.'
      ],
      explanation: "Something is 'crucial' when overlooking it carries catastrophic consequences, such as massive security costs."
    },
    dialogue: {
      speakerA: 'Should we rush the beta release before the holiday weekend?',
      speakerB: 'I advise against it; thorough stress testing is {{word}} before thousands of users log on.',
      targetWord: 'crucial',
      distractors: ['hesitate', 'persuade']
    },
    oddOneOut: {
      words: ['crucial', 'essential', 'negligible'],
      intruder: 'negligible',
      explanation: "'Crucial' and 'essential' express paramount importance; 'negligible' signifies something so minor it can be disregarded."
    },
    wordFamily: {
      verb: '(none)',
      noun: 'crucialness',
      adjective: 'crucial',
      adverb: 'crucially'
    },
    category: 'Qualities & Impact',
    openQuestion: 'What is one crucial piece of advice you would offer to someone starting their first professional role?',
    sampleOpenAnswer: 'A crucial habit is asking clarifying questions early instead of pretending you understand when you are unsure.',
    register: 'Neutral',
    registerExplanation: "'Crucial' is a strong neutral-to-formal adjective, widely welcomed across academic, clinical, and conversational settings.",
    agreeDisagreeStatement: 'Technical competence is far more crucial to career progression than emotional intelligence.',
    discussionPrompt: 'Weigh technical domain expertise against interpersonal skills in high-stakes organizational environments.'
  },
  {
    id: 'resilient',
    word: 'resilient',
    russian: 'стойкий, жизнестойкий',
    example: 'The island community proved remarkably resilient, rebuilding their homes within months of the typhoon.',
    definition: 'Able to withstand or recover quickly from difficult conditions, adversity, or shock.',
    synonym: 'tenacious',
    synonymDistractors: ['fragile', 'vulnerable', 'yielding'],
    synonymExplanation: "Both 'resilient' and 'tenacious' refer to staying strong and bouncing back from setbacks without collapsing.",
    gapSentence: 'Modern distributed cloud architectures are engineered to be {{word}} against sudden server outages.',
    sentenceCompletion: {
      prompt: 'Despite losing her primary client in the first quarter, the resilient startup founder...',
      correctEnding: '...pivoted her marketing strategy and secured three enterprise contracts before the year ended.',
      distractors: [
        '...shut down all operations, declared bankruptcy, and refused to answer phone calls ever again.',
        '...celebrated by throwing all financial records into the garbage can.'
      ],
      explanation: "A 'resilient' person responds to disaster with constructive recovery, adaptability, and persevering effort."
    },
    dialogue: {
      speakerA: 'I heard Maya fractured her ankle right before the championship.',
      speakerB: "She's incredibly {{word}}—she's already in physical therapy and coaching her teammates from the bench.",
      targetWord: 'resilient',
      distractors: ['ambiguous', 'reluctant']
    },
    oddOneOut: {
      words: ['resilient', 'hardy', 'delicate'],
      intruder: 'delicate',
      explanation: "'Resilient' and 'hardy' describe the ability to endure hardship and spring back; 'delicate' means easily damaged or frail."
    },
    wordFamily: {
      verb: '(resile - rare)',
      noun: 'resilience',
      adjective: 'resilient',
      adverb: 'resiliently'
    },
    category: 'States & Mindset',
    openQuestion: 'Think of someone you admire for being resilient. What specific habit or mindset makes them bounce back from adversity?',
    sampleOpenAnswer: 'My grandmother is remarkably resilient; she treats setbacks as temporary detours rather than permanent defeats.',
    register: 'Neutral',
    registerExplanation: "'Resilient' is widely used across psychology, engineering, ecology, and daily life to denote toughness and recovery.",
    agreeDisagreeStatement: 'Resilience is not an innate genetic trait; it is a mental discipline that can be deliberately trained through discomfort.',
    discussionPrompt: 'Share whether you believe hardship naturally builds emotional resilience, or if some hardships simply traumatize.'
  },
  {
    id: 'advocate',
    word: 'advocate',
    russian: 'выступать за, отстаивать',
    example: 'She has continued to advocate for stricter privacy regulations on artificial intelligence companies.',
    definition: 'To publicly recommend or support a particular cause, policy, or course of action.',
    synonym: 'champion',
    synonymDistractors: ['oppose', 'denounce', 'undermine'],
    synonymExplanation: "Both 'advocate' and 'champion' describe publicly standing up for, defending, and advancing a cause or proposal.",
    gapSentence: 'Many pediatricians {{word}} limiting recreational screen time for toddlers under two years old.',
    sentenceCompletion: {
      prompt: 'Urban planners consistently advocate for protected bicycle lanes...',
      correctEnding: '...to reduce traffic fatalities and encourage carbon-neutral commuter travel across dense city centers.',
      distractors: [
        '...so that automobiles can drive on sidewalks and eliminate pedestrian walking completely.',
        '...because they believe cycling should be outlawed on all public streets.'
      ],
      explanation: "'Advocating' for something means promoting its benefits, such as highway safety and lower carbon emissions."
    },
    dialogue: {
      speakerA: 'Who brought up the proposal for flexible summer hours?',
      speakerB: 'Elena decided to {{word}} for the whole department during the quarterly staff meeting.',
      targetWord: 'advocate',
      distractors: ['hinder', 'hesitate']
    },
    oddOneOut: {
      words: ['advocate', 'endorse', 'condemn'],
      intruder: 'condemn',
      explanation: "'Advocate' and 'endorse' mean giving public approval and support; 'condemn' means expressing complete disapproval or censure."
    },
    wordFamily: {
      verb: 'advocate',
      noun: 'advocacy',
      adjective: 'advocatory',
      adverb: 'advocatingly'
    },
    category: 'Actions & Decisions',
    openQuestion: 'What is one educational or community policy that you would passionately advocate for in your hometown?',
    sampleOpenAnswer: 'I would advocate for municipal funding for free adult coding and language workshops at every public library.',
    register: 'Formal',
    registerExplanation: "'Advocate' is predominantly formal and academic, frequently seen in policy debates, legal proceedings, and public advocacy.",
    agreeDisagreeStatement: 'Scientists should remain purely objective observers and never openly advocate for political policies.',
    discussionPrompt: 'Discuss whether researchers have an ethical obligation to advocate for evidence-based legislation or maintain neutral distance.'
  },
  {
    id: 'hinder',
    word: 'hinder',
    russian: 'препятствовать, мешать',
    example: 'Excessive bureaucratic regulations hinder small business owners from launching innovative services.',
    definition: 'To create difficulties for someone or something, resulting in delay, obstruction, or impediment.',
    synonym: 'impede',
    synonymDistractors: ['facilitate', 'accelerate', 'promote'],
    synonymExplanation: "Both 'hinder' and 'impede' mean placing obstacles in the path of progress or slowing someone down.",
    gapSentence: 'Heavy snowfall and low visibility threaten to {{word}} rescue operations in the northern mountain range.',
    sentenceCompletion: {
      prompt: 'Micromanagement within a software team tends to hinder productivity...',
      correctEnding: '...because engineers spend more time writing justification reports than building functional features.',
      distractors: [
        '...which instantly accelerates product delivery and makes all programmers extraordinarily happy.',
        '...since no developer ever needs autonomy or creative freedom when writing complex logic.'
      ],
      explanation: "'Hinder' means creating bottlenecks or drag; excessive oversight hampers flow and wastes valuable engineering hours."
    },
    dialogue: {
      speakerA: 'Will the subway strike affect our supplier delivery schedule?',
      speakerB: 'It will definitely {{word}} cargo distribution across the metro region for a few days.',
      targetWord: 'hinder',
      distractors: ['thrive', 'persuade']
    },
    oddOneOut: {
      words: ['hinder', 'obstruct', 'expedite'],
      intruder: 'expedite',
      explanation: "'Hinder' and 'obstruct' mean slowing down or blocking; 'expedite' means speeding up an action or process."
    },
    wordFamily: {
      verb: 'hinder',
      noun: 'hindrance',
      adjective: 'hindering',
      adverb: 'hinderingly'
    },
    category: 'Actions & Decisions',
    openQuestion: 'What bad digital habit most severely hinders your personal focus when studying or working remotely?',
    sampleOpenAnswer: 'Keeping social media notification badges active on my desktop hinders my focus by fracturing my concentration every few minutes.',
    register: 'Neutral',
    registerExplanation: "'Hinder' is a standard neutral verb, common in business analyses, scientific papers, and everyday discussions.",
    agreeDisagreeStatement: 'Failures and setbacks do not hinder true mastery; they are the fastest catalyst for intellectual growth.',
    discussionPrompt: 'Debate whether structural obstacles stimulate creativity or simply burn out motivated individuals.'
  },
  {
    id: 'subtle',
    word: 'subtle',
    russian: 'тонкий, едва уловимый',
    example: 'There was a subtle change in his tone of voice that indicated he was not entirely convinced.',
    definition: 'So delicate or precise as to be difficult to analyze, notice, or describe; understated.',
    synonym: 'nuanced',
    synonymDistractors: ['glaring', 'blatant', 'overt'],
    synonymExplanation: "Both 'subtle' and 'nuanced' describe qualities that are faint, delicate, fine-grained, and easily missed by casual observers.",
    gapSentence: 'The chef added a {{word}} hint of grated nutmeg to elevate the creamy squash soup.',
    sentenceCompletion: {
      prompt: 'A master chess player detects subtle positional weaknesses in the opponent’s defense...',
      correctEnding: '...long before a beginner realizes that any threat has even materialized on the board.',
      distractors: [
        '...by screaming loudly and throwing all the pieces into the audience.',
        '...only when the referee blows a giant whistle to announce checkmate.'
      ],
      explanation: "A 'subtle' weakness is hidden and delicate; expert insight recognizes it before it becomes blatant or obvious."
    },
    dialogue: {
      speakerA: 'Did you notice any difference in the remastered recording of the album?',
      speakerB: "Yes, the acoustic balance has a {{word}} warmth that was missing in the original mix.",
      targetWord: 'subtle',
      distractors: ['reluctant', 'ambiguous']
    },
    oddOneOut: {
      words: ['subtle', 'understated', 'conspicuous'],
      intruder: 'conspicuous',
      explanation: "'Subtle' and 'understated' represent delicate, unobtrusive details; 'conspicuous' means standing out clearly and attracting immediate notice."
    },
    wordFamily: {
      verb: '(subtilize - literary)',
      noun: 'subtlety',
      adjective: 'subtle',
      adverb: 'subtly'
    },
    category: 'Qualities & Impact',
    openQuestion: 'Why is mastering subtle nuances of body language or tone so important in cross-cultural diplomacy or business?',
    sampleOpenAnswer: 'In international diplomacy, a subtle smile or brief pause can communicate agreement or firm refusal without causing embarrassment.',
    register: 'Neutral',
    registerExplanation: "'Subtle' is a classic literary and conversational adjective, prized in art criticism, psychology, and polite conversation.",
    agreeDisagreeStatement: 'Subtle persuasion is always more enduring than overt dominance in leadership.',
    discussionPrompt: 'Explore whether quiet, understated influence creates deeper loyalty than loud, explicit authority.'
  }
];

export const THEMATIC_PACKS: { id: string; name: string; description: string; words: VocabularyWord[] }[] = [
  {
    id: 'core-b2-c1',
    name: 'Advanced Impact & Action (Default)',
    description: '10 versatile academic & professional verbs, adjectives, and concepts.',
    words: DEFAULT_VOCABULARY
  }
];
