import React, { useState, useMemo } from 'react';
import { VocabularyWord } from '../types/bloom';
import { shuffleArray, shuffleOptions, speakEnglish } from '../utils/shuffle';
import { Volume2, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Grid, Layers } from 'lucide-react';

interface Step1RememberingProps {
  words: VocabularyWord[];
  onComplete: () => void;
}

export const Step1Remembering: React.FC<Step1RememberingProps> = ({ words, onComplete }) => {
  // Independent random shuffle for Step 1 flashcards & quiz
  const stepWords = useMemo(() => shuffleArray(words), [words]);

  // Flashcard states
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  const [flippedGridCards, setFlippedGridCards] = useState<Record<string, boolean>>({});

  // Quiz states
  const quizQuestions = useMemo(() => {
    return stepWords.map((target) => {
      // 3 distractors from the remaining words
      const otherWords = words.filter((w) => w.id !== target.id);
      const shuffledOthers = shuffleArray(otherWords).slice(0, 3);
      const distractors = shuffledOthers.map((w) => w.word);
      const options = shuffleOptions(target.word, distractors);
      return {
        target,
        options,
      };
    });
  }, [stepWords, words]);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [revealedQuiz, setRevealedQuiz] = useState(false);

  const currentCard = stepWords[currentCardIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % stepWords.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + stepWords.length) % stepWords.length);
  };

  const toggleGridFlip = (id: string) => {
    setFlippedGridCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectQuizOption = (wordId: string, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [wordId]: option,
    }));
  };

  const handleCheckQuiz = () => {
    setRevealedQuiz(true);
    const score = quizQuestions.filter((q) => selectedAnswers[q.target.id] === q.target.word).length;
    if (score >= Math.ceil(quizQuestions.length * 0.7)) {
      onComplete();
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setRevealedQuiz(false);
  };

  const quizScore = useMemo(() => {
    return quizQuestions.filter((q) => selectedAnswers[q.target.id] === q.target.word).length;
  }, [quizQuestions, selectedAnswers]);

  return (
    <div className="space-y-12">
      {/* Header Intro */}
      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-purple-100 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-purple-700">
              Bloom Level 1 · Knowledge Retrieval
            </div>
            <h2 className="text-2xl font-heading font-bold text-slate-900 mt-1">
              Remembering: Flashcards & Recognition Quiz
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Recall English words from Russian translations. Russian is shown on the front of flashcards;
              flip to reveal the English word and a natural example sentence.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'single' ? 'grid' : 'single')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition-colors"
            >
              {viewMode === 'single' ? <Grid className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
              <span>{viewMode === 'single' ? 'View All Cards' : 'Single Card Deck'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* FLASHCARDS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">1</span>
            Interactive Memory Flashcards
          </h3>
          <span className="text-xs text-slate-500 font-medium">Click card to flip</span>
        </div>

        {viewMode === 'single' ? (
          <div className="flex flex-col items-center">
            {/* 3D Single Flashcard */}
            <div className="w-full max-w-xl h-64 perspective-1000">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsFlipped(!isFlipped);
                  }
                }}
                className={`relative w-full h-full duration-500 transform-style-3d cursor-pointer select-none rounded-2xl shadow-md border border-purple-200/80 transition-all ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT: Russian translation only */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl p-8 flex flex-col justify-between items-center text-center">
                  <div className="w-full flex items-center justify-between text-xs text-purple-600/80 font-semibold">
                    <span>FRONT · RUSSIAN</span>
                    <span>Card {currentCardIndex + 1} of {stepWords.length}</span>
                  </div>

                  <div className="my-auto">
                    <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                      Russian Meaning
                    </div>
                    <div className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-800">
                      {currentCard.russian}
                    </div>
                  </div>

                  <div className="text-xs text-purple-500 font-medium flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Click anywhere to flip for English</span>
                  </div>
                </div>

                {/* BACK: English word + short example sentence */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-purple-700 to-indigo-800 text-white rounded-2xl p-8 flex flex-col justify-between items-center text-center shadow-lg">
                  <div className="w-full flex items-center justify-between text-xs text-purple-200 font-medium">
                    <span>BACK · ENGLISH</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakEnglish(currentCard.word);
                      }}
                      className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                      title="Listen to pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="my-auto space-y-2">
                    <div className="text-3xl sm:text-4xl font-heading font-extrabold tracking-wide text-white">
                      {currentCard.word}
                    </div>
                    <p className="text-sm sm:text-base text-purple-100 italic max-w-md mx-auto leading-relaxed">
                      "{currentCard.example}"
                    </p>
                  </div>

                  <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Click to flip back to Russian</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deck Navigation Controls */}
            <div className="flex items-center gap-4 mt-6">
              <button
                type="button"
                onClick={handlePrevCard}
                className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
                aria-label="Previous flashcard"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                {stepWords.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setIsFlipped(false);
                      setCurrentCardIndex(idx);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentCardIndex ? 'w-6 bg-purple-600' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Jump to card ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextCard}
                className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
                aria-label="Next flashcard"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          /* Grid View for all cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stepWords.map((item, idx) => {
              const flipped = !!flippedGridCards[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleGridFlip(item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleGridFlip(item.id);
                    }
                  }}
                  className={`h-52 perspective-1000 cursor-pointer select-none rounded-xl`}
                >
                  <div
                    className={`relative w-full h-full duration-500 transform-style-3d rounded-xl shadow-xs border border-purple-200 ${
                      flipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-xl p-5 flex flex-col justify-between text-center">
                      <div className="text-[11px] text-purple-600 font-bold uppercase tracking-wider flex justify-between">
                        <span>Card {idx + 1}</span>
                        <span>Russian Front</span>
                      </div>
                      <div className="text-xl font-heading font-bold text-slate-800">
                        {item.russian}
                      </div>
                      <div className="text-[11px] text-purple-500 font-medium">Click to flip</div>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-purple-700 text-white rounded-xl p-5 flex flex-col justify-between text-center">
                      <div className="flex justify-between items-center text-[11px] text-purple-200">
                        <span>English Back</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakEnglish(item.word);
                          }}
                          className="p-1 hover:bg-white/20 rounded"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div>
                        <div className="text-2xl font-heading font-extrabold text-white">
                          {item.word}
                        </div>
                        <p className="text-xs text-purple-100 italic mt-1 line-clamp-2">
                          "{item.example}"
                        </p>
                      </div>
                      <div className="text-[11px] text-purple-300">Click to flip back</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* QUIZ SECTION (below flashcards) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-purple-100 shadow-xs space-y-8">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                Memory Retrieval Quiz
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Read the Russian meaning and select the correct English word from the 4 shuffled options.
              </p>
            </div>
            {revealedQuiz && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200">
                <span className="text-xs font-bold text-purple-900">
                  Score: {quizScore} / {quizQuestions.length} ({Math.round((quizScore / quizQuestions.length) * 100)}%)
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizQuestions.map((q, idx) => {
            const userChoice = selectedAnswers[q.target.id];
            const isCorrect = userChoice === q.target.word;

            return (
              <div
                key={q.target.id}
                className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3.5"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="font-semibold text-purple-700">Question {idx + 1} of {quizQuestions.length}</span>
                  {revealedQuiz && (
                    <span className="flex items-center gap-1 font-semibold">
                      {isCorrect ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="text-rose-600 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Answer: {q.target.word}
                        </span>
                      )}
                    </span>
                  )}
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-center">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Russian Prompt
                  </div>
                  <div className="text-lg font-heading font-bold text-slate-900">
                    "{q.target.russian}"
                  </div>
                </div>

                {/* 4 Shuffled Options */}
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((option) => {
                    const isSelected = userChoice === option;
                    let btnStyle = 'border-slate-200 bg-white text-slate-700 hover:border-purple-300 hover:bg-purple-50/40';

                    if (revealedQuiz) {
                      if (option === q.target.word) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-400/40';
                      } else if (isSelected) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 line-through';
                      } else {
                        btnStyle = 'opacity-50 border-slate-200 bg-white text-slate-500';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-purple-600 bg-purple-50 text-purple-900 font-bold ring-2 ring-purple-300';
                    }

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectQuizOption(q.target.id, option)}
                        disabled={revealedQuiz}
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

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            {Object.keys(selectedAnswers).length} of {quizQuestions.length} answered
          </div>
          <div className="flex items-center gap-3">
            {revealedQuiz ? (
              <button
                type="button"
                onClick={handleResetQuiz}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Try Again
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="px-6 py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Check Quiz Answers
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
