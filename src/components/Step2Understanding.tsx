import React, { useState, useMemo } from 'react';
import { VocabularyWord } from '../types/bloom';
import { shuffleArray, shuffleOptions, speakEnglish } from '../utils/shuffle';
import { CheckCircle2, XCircle, Info, Volume2 } from 'lucide-react';

interface Step2UnderstandingProps {
  words: VocabularyWord[];
  onComplete: () => void;
}

export const Step2Understanding: React.FC<Step2UnderstandingProps> = ({ words, onComplete }) => {
  // Independent random shuffle for Step 2
  const stepWords = useMemo(() => shuffleArray(words), [words]);

  // Part A questions: Match definition to word
  const partAQuestions = useMemo(() => {
    return stepWords.map((target) => {
      const distractors = shuffleArray(words.filter((w) => w.id !== target.id))
        .slice(0, 3)
        .map((w) => w.word);
      const options = shuffleOptions(target.word, distractors);
      return {
        target,
        definition: target.definition,
        options,
      };
    });
  }, [stepWords, words]);

  // Part B questions: Find the synonym
  const partBQuestions = useMemo(() => {
    // Shuffle stepWords again so Part B order is different
    const shuffledForB = shuffleArray(stepWords);
    return shuffledForB.map((target) => {
      const options = shuffleOptions(target.synonym, target.synonymDistractors);
      return {
        target,
        options,
        correctSynonym: target.synonym,
        explanation: target.synonymExplanation,
      };
    });
  }, [stepWords]);

  // States for Part A
  const [partAAnswers, setPartAAnswers] = useState<Record<string, string>>({});
  const [partARevealed, setPartARevealed] = useState(false);

  // States for Part B
  const [partBAnswers, setPartBAnswers] = useState<Record<string, string>>({});
  const [partBRevealed, setPartBRevealed] = useState(false);

  // Handlers for Part A
  const handleSelectA = (wordId: string, option: string) => {
    setPartAAnswers((prev) => ({ ...prev, [wordId]: option }));
  };

  const handleCheckPartA = () => {
    setPartARevealed(true);
    checkOverallCompletion(true, partBRevealed);
  };

  const handleResetPartA = () => {
    setPartAAnswers({});
    setPartARevealed(false);
  };

  // Handlers for Part B
  const handleSelectB = (wordId: string, option: string) => {
    setPartBAnswers((prev) => ({ ...prev, [wordId]: option }));
  };

  const handleCheckPartB = () => {
    setPartBRevealed(true);
    checkOverallCompletion(partARevealed, true);
  };

  const handleResetPartB = () => {
    setPartBAnswers({});
    setPartBRevealed(false);
  };

  const checkOverallCompletion = (aDone: boolean, bDone: boolean) => {
    if (aDone && bDone) {
      onComplete();
    }
  };

  const scoreA = useMemo(() => {
    return partAQuestions.filter((q) => partAAnswers[q.target.id] === q.target.word).length;
  }, [partAQuestions, partAAnswers]);

  const scoreB = useMemo(() => {
    return partBQuestions.filter((q) => partBAnswers[q.target.id] === q.correctSynonym).length;
  }, [partBQuestions, partBAnswers]);

  return (
    <div className="space-y-12">
      {/* Header Intro */}
      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-blue-100 shadow-xs">
        <div className="text-xs uppercase tracking-wider font-bold text-blue-700">
          Bloom Level 2 · Semantic Comprehension
        </div>
        <h2 className="text-2xl font-heading font-bold text-slate-900 mt-1">
          Understanding: Definitions & Synonyms
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Construct meaning without relying on translation. Match exact English definitions to words, then discover closest synonyms with contextual explanations.
        </p>
      </div>

      {/* PART A: MATCH DEFINITION TO WORD */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">A</span>
              Match Definition to Word
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Read each English definition and select the target word that fits best. (English only)
            </p>
          </div>
          {partARevealed && (
            <div className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900">
              Score: {scoreA} / {partAQuestions.length}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partAQuestions.map((q, idx) => {
            const userChoice = partAAnswers[q.target.id];
            const isCorrect = userChoice === q.target.word;

            return (
              <div
                key={q.target.id}
                className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3.5"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="font-semibold text-blue-700">Definition #{idx + 1}</span>
                  {partARevealed && (
                    <span>
                      {isCorrect ? (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="text-rose-600 font-semibold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Answer: {q.target.word}
                        </span>
                      )}
                    </span>
                  )}
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    "{q.definition}"
                  </p>
                </div>

                {/* 4 Shuffled Options */}
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((option) => {
                    const isSelected = userChoice === option;
                    let btnStyle = 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/40';

                    if (partARevealed) {
                      if (option === q.target.word) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-300';
                      } else if (isSelected) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 line-through';
                      } else {
                        btnStyle = 'opacity-50 border-slate-200 bg-white text-slate-500';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-2 ring-blue-300';
                    }

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectA(q.target.id, option)}
                        disabled={partARevealed}
                        className={`py-2 px-3 text-sm rounded-lg border text-center transition-all ${btnStyle}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Part A Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            {Object.keys(partAAnswers).length} of {partAQuestions.length} answered
          </span>
          <div className="flex items-center gap-3">
            {partARevealed ? (
              <button
                type="button"
                onClick={handleResetPartA}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Reset Part A
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckPartA}
                disabled={Object.keys(partAAnswers).length === 0}
                className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Check Definitions
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PART B: FIND THE SYNONYM */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">B</span>
              Find the Closest Synonym
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Select the word closest in meaning to the target word. Brief explanations are revealed upon checking.
            </p>
          </div>
          {partBRevealed && (
            <div className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900">
              Score: {scoreB} / {partBQuestions.length}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partBQuestions.map((q, idx) => {
            const userChoice = partBAnswers[q.target.id];
            const isCorrect = userChoice === q.correctSynonym;

            return (
              <div
                key={q.target.id}
                className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3.5"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="font-semibold text-blue-700">Item #{idx + 1}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => speakEnglish(q.target.word)}
                      className="text-slate-400 hover:text-slate-600"
                      title="Pronounce target word"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    {partBRevealed && (
                      <span>
                        {isCorrect ? (
                          <span className="text-emerald-600 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="text-rose-600 font-semibold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Answer: {q.correctSynonym}
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                      Target Word
                    </span>
                    <span className="text-xl font-heading font-extrabold text-blue-950">
                      {q.target.word}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 italic">Find synonym</span>
                </div>

                {/* 4 Shuffled Synonym Options */}
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((option) => {
                    const isSelected = userChoice === option;
                    let btnStyle = 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/40';

                    if (partBRevealed) {
                      if (option === q.correctSynonym) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-300';
                      } else if (isSelected) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 line-through';
                      } else {
                        btnStyle = 'opacity-50 border-slate-200 bg-white text-slate-500';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-2 ring-blue-300';
                    }

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectB(q.target.id, option)}
                        disabled={partBRevealed}
                        className={`py-2 px-3 text-sm rounded-lg border text-center transition-all ${btnStyle}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation revealed */}
                {partBRevealed && (
                  <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-lg text-xs text-blue-900 flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Part B Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            {Object.keys(partBAnswers).length} of {partBQuestions.length} answered
          </span>
          <div className="flex items-center gap-3">
            {partBRevealed ? (
              <button
                type="button"
                onClick={handleResetPartB}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Reset Part B
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckPartB}
                disabled={Object.keys(partBAnswers).length === 0}
                className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Check Synonyms
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
