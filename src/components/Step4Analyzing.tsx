import React, { useState, useMemo } from 'react';
import { VocabularyWord } from '../types/bloom';
import { shuffleArray } from '../utils/shuffle';
import { CheckCircle2, XCircle, Info, Sparkles, ArrowRight } from 'lucide-react';

interface Step4AnalyzingProps {
  words: VocabularyWord[];
  onComplete: () => void;
}

export const Step4Analyzing: React.FC<Step4AnalyzingProps> = ({ words, onComplete }) => {
  // Independent random shuffle for Step 4
  const stepWords = useMemo(() => shuffleArray(words), [words]);

  // Part A: Odd one out (each row has 3 shuffled words, with 1 intruder)
  const oddOneOutItems = useMemo(() => {
    return stepWords.map((item) => {
      const { words: trio, intruder, explanation } = item.oddOneOut;
      const shuffledTrio = shuffleArray(trio);
      return {
        id: item.id,
        targetWord: item.word,
        words: shuffledTrio,
        intruder,
        explanation,
      };
    });
  }, [stepWords]);

  // Part C: Sort into categories
  // 3 distinct categories present in DEFAULT_VOCABULARY
  const categories = useMemo(() => {
    const set = new Set<string>();
    words.forEach((w) => set.add(w.category));
    return Array.from(set);
  }, [words]);

  // States for Part A
  const [oddSelected, setOddSelected] = useState<Record<string, string>>({});
  const [oddRevealed, setOddRevealed] = useState(false);

  // States for Part B (Active word family inspected or tested)
  const [selectedFamilyWordId, setSelectedFamilyWordId] = useState<string>(stepWords[0]?.id || '');
  const [revealedAllFamilies, setRevealedAllFamilies] = useState(false);

  // States for Part C: Sort words into categories
  // assigned: wordId -> categoryName
  const [assignedCategories, setAssignedCategories] = useState<Record<string, string>>({});
  const [categoryRevealed, setCategoryRevealed] = useState(false);

  const handleSelectOdd = (itemId: string, word: string) => {
    setOddSelected((prev) => ({ ...prev, [itemId]: word }));
  };

  const handleCheckOdd = () => {
    setOddRevealed(true);
    checkCompletion(true, categoryRevealed);
  };

  const handleAssignCategory = (wordId: string, category: string) => {
    setAssignedCategories((prev) => {
      // If clicked the same category, unassign it; otherwise assign
      if (prev[wordId] === category) {
        const copy = { ...prev };
        delete copy[wordId];
        return copy;
      }
      return { ...prev, [wordId]: category };
    });
  };

  const handleCheckCategories = () => {
    setCategoryRevealed(true);
    checkCompletion(oddRevealed, true);
  };

  const checkCompletion = (oddDone: boolean, catDone: boolean) => {
    if (oddDone && catDone) {
      onComplete();
    }
  };

  const oddScore = useMemo(() => {
    return oddOneOutItems.filter((item) => oddSelected[item.id] === item.intruder).length;
  }, [oddOneOutItems, oddSelected]);

  const catScore = useMemo(() => {
    return words.filter((w) => assignedCategories[w.id] === w.category).length;
  }, [words, assignedCategories]);

  const activeFamilyWord = words.find((w) => w.id === selectedFamilyWordId) || words[0];

  return (
    <div className="space-y-12">
      {/* Intro Header */}
      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-amber-100 shadow-xs">
        <div className="text-xs uppercase tracking-wider font-bold text-amber-700">
          Bloom Level 4 · Structural & Lexical Analysis
        </div>
        <h2 className="text-2xl font-heading font-bold text-slate-900 mt-1">
          Analyzing: Odd One Out, Word Families & Categorization
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Deconstruct vocabulary patterns. Identify semantic outliers, analyze morphological derivations across grammatical classes, and classify words into thematic taxonomies.
        </p>
      </div>

      {/* PART A: ODD ONE OUT */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-900 text-xs flex items-center justify-center font-bold">A</span>
              Odd One Out (Find the Intruder)
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Three English words per row. Two share a distinct semantic property; one doesn't belong. Select the odd word.
            </p>
          </div>
          {oddRevealed && (
            <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
              Score: {oddScore} / {oddOneOutItems.length}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {oddOneOutItems.map((item, idx) => {
            const userChoice = oddSelected[item.id];
            const isCorrect = userChoice === item.intruder;

            return (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3.5"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-amber-700">Trio #{idx + 1}</span>
                  {oddRevealed && (
                    <span>
                      {isCorrect ? (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="text-rose-600 font-semibold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Odd: {item.intruder}
                        </span>
                      )}
                    </span>
                  )}
                </div>

                {/* 3 Words Row */}
                <div className="grid grid-cols-3 gap-2">
                  {item.words.map((word) => {
                    const isSelected = userChoice === word;
                    let btnStyle = 'border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:bg-amber-50/40';

                    if (oddRevealed) {
                      if (word === item.intruder) {
                        btnStyle = 'border-amber-500 bg-amber-100 text-amber-950 font-bold ring-2 ring-amber-400';
                      } else if (isSelected) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 line-through';
                      } else {
                        btnStyle = 'opacity-60 border-slate-200 bg-white text-slate-500';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-amber-500 bg-amber-100 text-amber-950 font-bold ring-2 ring-amber-300';
                    }

                    return (
                      <button
                        key={word}
                        type="button"
                        onClick={() => handleSelectOdd(item.id, word)}
                        disabled={oddRevealed}
                        className={`py-2.5 px-3 text-sm rounded-lg border text-center transition-all ${btnStyle}`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {oddRevealed && (
                  <div className="p-3 bg-amber-50 border border-amber-200/90 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{item.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Part A Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            {Object.keys(oddSelected).length} of {oddOneOutItems.length} selected
          </span>
          <div className="flex items-center gap-3">
            {oddRevealed ? (
              <button
                type="button"
                onClick={() => {
                  setOddSelected({});
                  setOddRevealed(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Reset Part A
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckOdd}
                disabled={Object.keys(oddSelected).length === 0}
                className="px-6 py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Check Odd One Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PART B: WORD FAMILIES */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-900 text-xs flex items-center justify-center font-bold">B</span>
              Word Families (Morphological Derivations)
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Inspect how each target word transforms across the four primary grammatical categories: <em>verb → noun → adjective → adverb</em>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRevealedAllFamilies(!revealedAllFamilies)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100"
          >
            {revealedAllFamilies ? 'Show Single Word Explorer' : 'Expand Full Matrix Table'}
          </button>
        </div>

        {revealedAllFamilies ? (
          /* Full Word Family Table */
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-amber-50/80 text-xs font-bold text-amber-900 uppercase tracking-wider border-b border-amber-200">
                <tr>
                  <th className="p-3">Target Word</th>
                  <th className="p-3">Verb</th>
                  <th className="p-3">Noun</th>
                  <th className="p-3">Adjective</th>
                  <th className="p-3">Adverb</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {words.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 font-bold text-slate-900 font-heading">{item.word}</td>
                    <td className="p-3 text-slate-700 italic">{item.wordFamily.verb}</td>
                    <td className="p-3 text-slate-700 font-medium">{item.wordFamily.noun}</td>
                    <td className="p-3 text-slate-700 font-medium">{item.wordFamily.adjective}</td>
                    <td className="p-3 text-slate-700 font-mono text-xs">{item.wordFamily.adverb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Interactive Word Family Card Explorer */
          <div className="space-y-4">
            {/* Word selector tabs */}
            <div className="flex flex-wrap gap-1.5">
              {words.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedFamilyWordId(item.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    selectedFamilyWordId === item.id
                      ? 'bg-amber-400 border-amber-500 text-slate-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50'
                  }`}
                >
                  {item.word}
                </button>
              ))}
            </div>

            {/* Display active family */}
            {activeFamilyWord && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50/60 via-orange-50/30 to-yellow-50/50 border border-amber-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span className="text-xs uppercase tracking-wider font-bold text-amber-800">
                      Family for "{activeFamilyWord.word}"
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 italic">verb → noun → adj → adv</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Verb
                    </div>
                    <div className="text-base font-bold text-slate-800 font-heading">
                      {activeFamilyWord.wordFamily.verb}
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Noun
                    </div>
                    <div className="text-base font-bold text-slate-800 font-heading">
                      {activeFamilyWord.wordFamily.noun}
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Adjective
                    </div>
                    <div className="text-base font-bold text-slate-800 font-heading">
                      {activeFamilyWord.wordFamily.adjective}
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Adverb
                    </div>
                    <div className="text-base font-bold text-slate-800 font-heading">
                      {activeFamilyWord.wordFamily.adverb}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/80 rounded-xl border border-amber-100 text-xs text-slate-600 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Example context: <em>"{activeFamilyWord.example}"</em>
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* PART C: SORT INTO CATEGORIES */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-900 text-xs flex items-center justify-center font-bold">C</span>
              Sort into Categories
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Click any word below, then click a category column to sort it. Reveal correct sorting with explanation.
            </p>
          </div>
          {categoryRevealed && (
            <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
              Score: {catScore} / {words.length} correctly sorted
            </div>
          )}
        </div>

        {/* Word Pool (Unassigned or All) */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
            <span>Vocabulary Words (Click category button under each word to assign)</span>
            <span>{Object.keys(assignedCategories).length} of {words.length} assigned</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {words.map((w) => {
              const currentAssignment = assignedCategories[w.id];
              const isCorrect = currentAssignment === w.category;

              return (
                <div
                  key={w.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    categoryRevealed
                      ? isCorrect
                        ? 'bg-emerald-50 border-emerald-300'
                        : 'bg-rose-50 border-rose-300'
                      : currentAssignment
                      ? 'bg-amber-50/70 border-amber-300'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-heading font-bold text-base text-slate-900">
                      {w.word}
                    </span>
                    {categoryRevealed && (
                      <span className="text-[11px] font-semibold">
                        {isCorrect ? (
                          <span className="text-emerald-700">✓ Correct</span>
                        ) : (
                          <span className="text-rose-700">Category: {w.category}</span>
                        )}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {categories.map((cat) => {
                      const isCatChosen = currentAssignment === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleAssignCategory(w.id, cat)}
                          disabled={categoryRevealed}
                          className={`text-[11px] px-2 py-1 rounded-md border transition-all ${
                            isCatChosen
                              ? 'bg-amber-400 border-amber-500 text-slate-900 font-bold shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Bins View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          {categories.map((cat) => {
            const wordsInThisCat = words.filter((w) => assignedCategories[w.id] === cat);
            const actualCorrectWords = words.filter((w) => w.category === cat);

            return (
              <div
                key={cat}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between"
              >
                <div>
                  <div className="font-heading font-bold text-slate-800 text-base mb-1">
                    {cat}
                  </div>
                  <div className="text-xs text-slate-500 mb-3">
                    Assigned: {wordsInThisCat.length}
                  </div>

                  <div className="flex flex-wrap gap-1.5 min-h-[48px]">
                    {wordsInThisCat.map((w) => (
                      <span
                        key={w.id}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-white border border-slate-300 text-slate-800 shadow-2xs"
                      >
                        {w.word}
                      </span>
                    ))}
                    {wordsInThisCat.length === 0 && (
                      <span className="text-xs text-slate-400 italic">No words assigned yet</span>
                    )}
                  </div>
                </div>

                {categoryRevealed && (
                  <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs text-slate-600">
                    <span className="font-bold text-slate-700 block mb-1">Official category words:</span>
                    <span className="font-medium text-amber-900">
                      {actualCorrectWords.map((w) => w.word).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Part C Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            {Object.keys(assignedCategories).length} of {words.length} categorized
          </span>
          <div className="flex items-center gap-3">
            {categoryRevealed ? (
              <button
                type="button"
                onClick={() => {
                  setAssignedCategories({});
                  setCategoryRevealed(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Reset Categories
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckCategories}
                disabled={Object.keys(assignedCategories).length === 0}
                className="px-6 py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Reveal Correct Sorting
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
