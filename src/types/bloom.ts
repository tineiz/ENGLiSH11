export type BloomStepNumber = 1 | 2 | 3 | 4 | 5 | 6;

export interface WordFamily {
  verb: string;
  noun: string;
  adjective: string;
  adverb: string;
}

export type WordRegister = 'Formal' | 'Neutral' | 'Informal' | 'Slang';

export interface VocabularyWord {
  id: string;
  word: string;
  russian: string; // ONLY shown in Step 1
  example: string;
  definition: string; // English only
  synonym: string;
  synonymDistractors: [string, string, string];
  synonymExplanation: string;
  gapSentence: string; // contains {{word}} or placeholder
  sentenceCompletion: {
    prompt: string;
    correctEnding: string;
    distractors: [string, string];
    explanation: string;
  };
  dialogue: {
    speakerA: string;
    speakerB: string;
    targetWord: string;
    distractors: [string, string];
  };
  oddOneOut: {
    words: [string, string, string];
    intruder: string;
    explanation: string;
  };
  wordFamily: WordFamily;
  category: string;
  openQuestion: string;
  sampleOpenAnswer: string;
  register: WordRegister;
  registerExplanation: string;
  agreeDisagreeStatement: string;
  discussionPrompt: string;
}

export interface BloomLevelInfo {
  step: BloomStepNumber;
  name: string;
  verb: string;
  colorName: string;
  hex: string;
  badgeHex: string;
  accentBg: string;
  description: string;
  cognitiveObjective: string;
}

export interface StepProgress {
  step1QuizScore: number;
  step1QuizTotal: number;
  step2PartAScore: number;
  step2PartBScore: number;
  step3PartACompleted: boolean;
  step3PartBCompleted: boolean;
  step3PartCCompleted: boolean;
  step4PartACompleted: boolean;
  step4PartBExplored: boolean;
  step4PartCCompleted: boolean;
  step5PartAAnsweredCount: number;
  step5PartBCompleted: boolean;
  step5PartCAnsweredCount: number;
  step6PartAWrote: boolean;
  step6PartBWrote: boolean;
  step6PartCWrote: boolean;
}
