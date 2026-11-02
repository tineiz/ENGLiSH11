import React, { useState, useMemo } from 'react';
import { VocabularyWord, WordRegister } from '../types/bloom';
import { shuffleArray } from '../utils/shuffle';
import { MessageSquare, CheckCircle2, XCircle, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, Info } from 'lucide-react';

interface Step5EvaluatingProps {
  words: VocabularyWord[];
  onComplete: () => void;
}

export const Step5Evaluating: React.FC<Step5EvaluatingProps> = ({ words, onComplete }) => {
  // Independent random shuffle for Step 5
  const stepWords = useMemo(() => shuffleArray(words), [words]);

  // Registers options
  const registers: WordRegister[] = ['Formal', 'Neutral', 'Informal', 'Slang'];

  // Part A: Open questions
  const [openAnswers, setOpenAnswers] = useState<Record<string, string>>({});
  const [revealedSampleAnswers, setRevealedSampleAnswers] = useState<Record<string, boolean>>({});

  // Part B: Register awareness
  const [registerSelections, setRegisterSelections] = useState<Record<string, WordRegister>>({});
  const [registerRevealed, setRegisterRevealed] = useState(false);

  // Part C: Agree / Disagree (6-8 statements)
  const agreeDisagreeItems = useMemo(() => {
    return stepWords.slice(0, 8);
  }, [stepWords]);

  // item.id -> 'AGREE' | 'DISAGREE'
  const [stanceSelections, setStanceSelections] = useState<Record<string, 'AGREE' | 'DISAGREE'>>({});

  const toggleSampleAnswer = (wordId: string) => {
    setRevealedSampleAnswers((prev) => ({
      ...prev,
      [wordId]: !prev[wordId],
    }));
  };

  const handleSelectRegister = (wordId: string, reg: WordRegister) => {
    setRegisterSelections((prev) => ({ ...prev, [wordId]: reg }));
  };

  const handleCheckRegisters = () => {
    setRegisterRevealed(true);
    checkCompletion(true, Object.keys(stanceSelections).length >= 4);
  };

  const handleSelectStance = (itemId: string, stance: 'AGREE' | 'DISAGREE') => {
    setStanceSelections((prev) => ({ ...prev, [itemId]: stance }));
    checkCompletion(registerRevealed, true);
  };

  const checkCompletion = (regDone: boolean, stanceDone: boolean) => {
    if (regDone && stanceDone) {
      onComplete();
    }
  };

  const registerScore = useMemo(() => {
    return words.filter((w) => registerSelections[w.id] === w.register).length;
  }, [words, registerSelections]);

  return (
    <div className="space-y-12">
      {/* Intro Header */}
      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-orange-100 shadow-xs">
        <div className="text-xs uppercase tracking-wider font-bold text-orange-700">
          Bloom Level 5 · Critical Appraisal & Discourse
        </div>
        <h2 className="text-2xl font-heading font-bold text-slate-900 mt-1">
          Evaluating: Open Reflection, Register & Stance Debate
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Make nuanced linguistic and ethical judgments. Reflect on open prompts requiring target vocabulary, identify register formality, and defend stances on thought-provoking statements.
        </p>
      </div>

      {/* PART A: OPEN QUESTIONS */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-orange-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">A</span>
              Open Reflection Questions
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              One question per vocabulary word. Formulate your response in English, using the target word naturally. Toggle the sample answer for a model response.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            {Object.keys(openAnswers).filter((k) => openAnswers[k].trim().length > 0).length} of {stepWords.length} written
          </div>
        </div>

        <div className="space-y-6">
          {stepWords.map((item, idx) => {
            const isSampleOpen = !!revealedSampleAnswers[item.id];
            const studentText = openAnswers[item.id] || '';
            const usedWord = studentText.toLowerCase().includes(item.word.toLowerCase());

            return (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-orange-700">Question #{idx + 1}</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-100 text-orange-900">
                      Target: {item.word}
                    </span>
                  </div>
                  {usedWord && (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Word used in your response!
                    </span>
                  )}
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                    {item.openQuestion}
                  </p>
                </div>

                {/* Response Textarea */}
                <div className="space-y-1.5">
                  <textarea
                    rows={2}
                    value={studentText}
                    onChange={(e) =>
                      setOpenAnswers((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                    placeholder={`Type your reflection here, incorporating the word "${item.word}"...`}
                    className="w-full p-3 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Sample Answer Toggle Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => toggleSampleAnswer(item.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-orange-700 hover:text-orange-900 transition-colors"
                  >
                    <span>{isSampleOpen ? 'Hide Sample Answer' : 'Reveal Sample Answer'}</span>
                    {isSampleOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isSampleOpen && (
                    <div className="mt-2.5 p-3.5 rounded-lg bg-orange-50 border border-orange-200 text-xs text-orange-950 leading-relaxed">
                      <span className="font-bold block text-orange-900 mb-1">Model Example:</span>
                      "{item.sampleOpenAnswer}"
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PART B: REGISTER AWARENESS */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-orange-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">B</span>
              Register Awareness (Formality Appraisal)
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Decide whether each word is Formal, Neutral, Informal, or Slang. Check your assessment to reveal the linguistic explanation.
            </p>
          </div>
          {registerRevealed && (
            <div className="px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-xs font-bold text-orange-900">
              Score: {registerScore} / {words.length}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {words.map((w, idx) => {
            const userChoice = registerSelections[w.id];
            const isCorrect = userChoice === w.register;

            return (
              <div
                key={w.id}
                className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3.5"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-orange-700">Word #{idx + 1}</span>
                  {registerRevealed && (
                    <span>
                      {isCorrect ? (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct: {w.register}
                        </span>
                      ) : (
                        <span className="text-rose-600 font-semibold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Actually: {w.register}
                        </span>
                      )}
                    </span>
                  )}
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-heading font-extrabold text-slate-900">
                      {w.word}
                    </span>
                    <span className="text-xs text-slate-500 block italic mt-0.5">
                      "{w.example}"
                    </span>
                  </div>
                </div>

                {/* 4 Register Labels */}
                <div className="grid grid-cols-4 gap-2">
                  {registers.map((reg) => {
                    const isSelected = userChoice === reg;
                    let btnStyle = 'border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50/40';

                    if (registerRevealed) {
                      if (reg === w.register) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-300';
                      } else if (isSelected) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 line-through';
                      } else {
                        btnStyle = 'opacity-50 border-slate-200 bg-white text-slate-500';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-orange-600 bg-orange-50 text-orange-900 font-bold ring-2 ring-orange-300';
                    }

                    return (
                      <button
                        key={reg}
                        type="button"
                        onClick={() => handleSelectRegister(w.id, reg)}
                        disabled={registerRevealed}
                        className={`py-2 px-1 text-xs rounded-lg border text-center font-medium transition-all ${btnStyle}`}
                      >
                        {reg}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {registerRevealed && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-950 flex items-start gap-2">
                    <Info className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>{w.registerExplanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Part B Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            {Object.keys(registerSelections).length} of {words.length} classified
          </span>
          <div className="flex items-center gap-3">
            {registerRevealed ? (
              <button
                type="button"
                onClick={() => {
                  setRegisterSelections({});
                  setRegisterRevealed(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Reset Registers
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckRegisters}
                disabled={Object.keys(registerSelections).length === 0}
                className="px-6 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Check Register Labels
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PART C: AGREE OR DISAGREE */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-orange-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">C</span>
              Agree or Disagree (Speaking & Debate Catalyst)
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Statements in English using the target vocabulary. Click AGREE or DISAGREE to reveal a speaking and reasoning challenge. (No right or wrong answer!)
            </p>
          </div>
          <span className="text-xs text-slate-500">
            {Object.keys(stanceSelections).length} of {agreeDisagreeItems.length} responded
          </span>
        </div>

        <div className="space-y-4">
          {agreeDisagreeItems.map((item, idx) => {
            const userStance = stanceSelections[item.id];

            return (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3.5 transition-all"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-orange-700">Statement #{idx + 1}</span>
                  <span className="text-slate-400 font-medium">Target: {item.word}</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-base font-semibold text-slate-900 leading-relaxed">
                    "{item.agreeDisagreeStatement}"
                  </p>
                </div>

                {/* Stance Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelectStance(item.id, 'AGREE')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold border transition-all ${
                      userStance === 'AGREE'
                        ? 'bg-emerald-600 border-emerald-700 text-white shadow-xs'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>I AGREE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectStance(item.id, 'DISAGREE')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold border transition-all ${
                      userStance === 'DISAGREE'
                        ? 'bg-rose-600 border-rose-700 text-white shadow-xs'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-rose-50 hover:border-rose-300'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>I DISAGREE</span>
                  </button>
                </div>

                {/* Discussion prompt revealed upon clicking */}
                {userStance && (
                  <div className="p-3.5 rounded-lg bg-orange-50/80 border border-orange-200 text-xs text-orange-950 flex items-start gap-2.5 animate-fadeIn">
                    <MessageSquare className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-orange-900 block mb-0.5">
                        Speaking Challenge ({userStance === 'AGREE' ? 'Defend Agreement' : 'Defend Disagreement'}):
                      </span>
                      <span>{item.discussionPrompt}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
