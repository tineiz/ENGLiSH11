import React, { useState, useMemo } from 'react';
import { VocabularyWord } from '../types/bloom';
import { shuffleArray, shuffleOptions } from '../utils/shuffle';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface Step3ApplyingProps {
  words: VocabularyWord[];
  onComplete: () => void;
}

export const Step3Applying: React.FC<Step3ApplyingProps> = ({ words, onComplete }) => {
  // Independent random shuffle for Step 3
  const stepWords = useMemo(() => shuffleArray(words), [words]);

  // All word options for dropdowns (alphabetical or shuffled for easy selection)
  const dropdownWordList = useMemo(() => {
    return [...words].map((w) => w.word).sort();
  }, [words]);

  // Part A: Gap sentences
  const partAItems = useMemo(() => {
    return stepWords.map((item) => {
      // Split by {{word}}
      const parts = item.gapSentence.split('{{word}}');
      return {
        id: item.id,
        targetWord: item.word,
        prefix: parts[0] || '',
        suffix: parts[1] || '',
      };
    });
  }, [stepWords]);

  // Part B: Sentence completions (3 options each, shuffled)
  const partBItems = useMemo(() => {
    const shuffledForB = shuffleArray(stepWords);
    return shuffledForB.map((item) => {
      const { prompt, correctEnding, distractors, explanation } = item.sentenceCompletion;
      const options = shuffleOptions(correctEnding, distractors);
      return {
        id: item.id,
        targetWord: item.word,
        prompt,
        correctEnding,
        options,
        explanation,
      };
    });
  }, [stepWords]);

  // Part C: Mini dialogues (4-5 dialogues)
  const partCItems = useMemo(() => {
    const shuffledForC = shuffleArray(stepWords).slice(0, 5);
    return shuffledForC.map((item) => {
      const { speakerA, speakerB, targetWord, distractors } = item.dialogue;
      const options = shuffleOptions(targetWord, distractors);
      const bParts = speakerB.split('{{word}}');
      return {
        id: item.id,
        speakerA,
        bPrefix: bParts[0] || '',
        bSuffix: bParts[1] || '',
        targetWord,
        options,
      };
    });
  }, [stepWords]);

  // User responses
  const [partAAnswers, setPartAAnswers] = useState<Record<string, string>>({});
  const [partARevealed, setPartARevealed] = useState(false);

  const [partBAnswers, setPartBAnswers] = useState<Record<string, string>>({});
  const [partBRevealed, setPartBRevealed] = useState(false);

  const [partCAnswers, setPartCAnswers] = useState<Record<string, string>>({});
  const [partCRevealed, setPartCRevealed] = useState(false);

  const handleCheckPartA = () => {
    setPartARevealed(true);
    evaluateCompletion(true, partBRevealed, partCRevealed);
  };

  const handleCheckPartB = () => {
    setPartBRevealed(true);
    evaluateCompletion(partARevealed, true, partCRevealed);
  };

  const handleCheckPartC = () => {
    setPartCRevealed(true);
    evaluateCompletion(partARevealed, partBRevealed, true);
  };

  const evaluateCompletion = (a: boolean, b: boolean, c: boolean) => {
    if (a && b && c) {
      onComplete();
    }
  };

  const scoreA = useMemo(
    () => partAItems.filter((item) => partAAnswers[item.id] === item.targetWord).length,
    [partAItems, partAAnswers]
  );

  const scoreB = useMemo(
    () => partBItems.filter((item) => partBAnswers[item.id] === item.correctEnding).length,
    [partBItems, partBAnswers]
  );

  const scoreC = useMemo(
    () => partCItems.filter((item) => partCAnswers[item.id] === item.targetWord).length,
    [partCItems, partCAnswers]
  );

  return (
    <div className="space-y-12">
      {/* Intro Header */}
      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-emerald-100 shadow-xs">
        <div className="text-xs uppercase tracking-wider font-bold text-emerald-700">
          Bloom Level 3 · Contextual Execution
        </div>
        <h2 className="text-2xl font-heading font-bold text-slate-900 mt-1">
          Applying: Syntax, Completions & Dialogues
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Execute target vocabulary in natural English syntax. Fill blanks in complex sentences, select coherent clause completions, and finish conversational dialogues.
        </p>
      </div>

      {/* PART A: FILL IN THE GAPS */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">A</span>
              Fill in the Gaps
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Read each full English sentence and choose the correct target word from the dropdown. (English only)
            </p>
          </div>
          {partARevealed && (
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
              Score: {scoreA} / {partAItems.length}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {partAItems.map((item, idx) => {
            const userChoice = partAAnswers[item.id] || '';
            const isCorrect = userChoice === item.targetWord;

            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="text-sm text-slate-800 leading-relaxed flex-1">
                  <span className="font-bold text-emerald-700 mr-2">{idx + 1}.</span>
                  <span>{item.prefix}</span>
                  <span className="inline-block mx-1">
                    <select
                      value={userChoice}
                      onChange={(e) =>
                        setPartAAnswers((prev) => ({ ...prev, [item.id]: e.target.value }))
                      }
                      disabled={partARevealed}
                      aria-label={`Select word for sentence ${idx + 1}`}
                      className={`text-sm font-semibold rounded-lg px-2.5 py-1 border transition-colors ${
                        partARevealed
                          ? isCorrect
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                            : 'bg-rose-100 border-rose-500 text-rose-900'
                          : userChoice
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                          : 'bg-white border-slate-300 text-slate-700 hover:border-emerald-400'
                      }`}
                    >
                      <option value="">-- select word --</option>
                      {dropdownWordList.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </span>
                  <span>{item.suffix}</span>
                </div>

                {partARevealed && (
                  <div className="shrink-0 text-xs font-semibold flex items-center gap-1.5">
                    {isCorrect ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Correct
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Expected: {item.targetWord}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Part A Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            {Object.keys(partAAnswers).filter((k) => partAAnswers[k]).length} of {partAItems.length} selected
          </span>
          <div className="flex items-center gap-3">
            {partARevealed ? (
              <button
                type="button"
                onClick={() => {
                  setPartAAnswers({});
                  setPartARevealed(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Reset Part A
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckPartA}
                disabled={Object.keys(partAAnswers).length === 0}
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Check Gap Sentences
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PART B: COMPLETE THE SENTENCE */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">B</span>
              Complete the Sentence
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Read the beginning of the sentence containing the target word and select the best logical ending from 3 options.
            </p>
          </div>
          {partBRevealed && (
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
              Score: {scoreB} / {partBItems.length}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {partBItems.map((item, idx) => {
            const userChoice = partBAnswers[item.id];
            const isCorrect = userChoice === item.correctEnding;

            return (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3.5"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-emerald-700">Sentence #{idx + 1}</span>
                  {partBRevealed && (
                    <span>
                      {isCorrect ? (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="text-rose-600 font-semibold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </span>
                  )}
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                  <p className="text-base font-medium text-slate-900">
                    {item.prompt}
                  </p>
                </div>

                {/* 3 Shuffled Option Endings */}
                <div className="space-y-2">
                  {item.options.map((option, optIdx) => {
                    const isSelected = userChoice === option;
                    let btnStyle = 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/30';

                    if (partBRevealed) {
                      if (option === item.correctEnding) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-300';
                      } else if (isSelected) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 line-through';
                      } else {
                        btnStyle = 'opacity-50 border-slate-200 bg-white text-slate-500';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() =>
                          setPartBAnswers((prev) => ({ ...prev, [item.id]: option }))
                        }
                        disabled={partBRevealed}
                        className={`w-full text-left p-3 text-sm rounded-lg border transition-all ${btnStyle}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {partBRevealed && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold">Why this ending works: </strong>
                      {item.explanation}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Part B Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            {Object.keys(partBAnswers).length} of {partBItems.length} answered
          </span>
          <div className="flex items-center gap-3">
            {partBRevealed ? (
              <button
                type="button"
                onClick={() => {
                  setPartBAnswers({});
                  setPartBRevealed(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Reset Part B
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckPartB}
                disabled={Object.keys(partBAnswers).length === 0}
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Check Sentence Completions
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PART C: MINI DIALOGUES */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">C</span>
              Mini Dialogues
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Short two-line dialogues in natural conversational English. Select the word that correctly fits Speaker B's reply.
            </p>
          </div>
          {partCRevealed && (
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
              Score: {scoreC} / {partCItems.length}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partCItems.map((item, idx) => {
            const userChoice = partCAnswers[item.id];
            const isCorrect = userChoice === item.targetWord;

            return (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-emerald-700">Dialogue #{idx + 1}</span>
                    {partCRevealed && (
                      <span>
                        {isCorrect ? (
                          <span className="text-emerald-600 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="text-rose-600 font-semibold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Answer: {item.targetWord}
                          </span>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Dialogue Bubble */}
                  <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
                    <div className="text-sm text-slate-800">
                      <span className="font-bold text-indigo-700 mr-1.5">A:</span>
                      <span>"{item.speakerA}"</span>
                    </div>
                    <div className="text-sm text-slate-900 font-medium pt-1 border-t border-slate-100">
                      <span className="font-bold text-emerald-700 mr-1.5">B:</span>
                      <span>"{item.bPrefix}</span>
                      <span className="underline decoration-emerald-500 decoration-2 font-bold text-emerald-900 px-1">
                        [{userChoice || '_____'}]
                      </span>
                      <span>{item.bSuffix}"</span>
                    </div>
                  </div>
                </div>

                {/* 3 Options */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {item.options.map((opt) => {
                    const isSelected = userChoice === opt;
                    let btnStyle = 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/40';

                    if (partCRevealed) {
                      if (opt === item.targetWord) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-300';
                      } else if (isSelected) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 line-through';
                      } else {
                        btnStyle = 'opacity-50 border-slate-200 bg-white text-slate-500';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300';
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          setPartCAnswers((prev) => ({ ...prev, [item.id]: opt }))
                        }
                        disabled={partCRevealed}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Part C Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            {Object.keys(partCAnswers).length} of {partCItems.length} answered
          </span>
          <div className="flex items-center gap-3">
            {partCRevealed ? (
              <button
                type="button"
                onClick={() => {
                  setPartCAnswers({});
                  setPartCRevealed(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Reset Part C
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckPartC}
                disabled={Object.keys(partCAnswers).length === 0}
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Check Dialogues
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
