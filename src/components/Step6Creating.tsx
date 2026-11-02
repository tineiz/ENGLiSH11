import React, { useState, useMemo } from 'react';
import { VocabularyWord } from '../types/bloom';
import { shuffleArray } from '../utils/shuffle';
import { Sparkles, Check, ChevronDown, ChevronUp, Copy, CheckCheck } from 'lucide-react';

interface Step6CreatingProps {
  words: VocabularyWord[];
  onComplete: () => void;
}

export const Step6Creating: React.FC<Step6CreatingProps> = ({ words, onComplete }) => {
  // Independent random shuffle for Step 6 word bank
  const stepWords = useMemo(() => shuffleArray(words), [words]);

  // Part A state
  const [personalText, setPersonalText] = useState('');
  const [manualUsedA, setManualUsedA] = useState<Record<string, boolean>>({});
  const [showSampleA, setShowSampleA] = useState(false);

  // Part B state
  const [scenarioText, setScenarioText] = useState('');
  const [manualUsedB, setManualUsedB] = useState<Record<string, boolean>>({});
  const [showSampleB, setShowSampleB] = useState(false);

  // Part C state
  const [storyText, setStoryText] = useState('');
  const [manualUsedC, setManualUsedC] = useState<Record<string, boolean>>({});
  const [showSampleC, setShowSampleC] = useState(false);

  // Copy feedback
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Auto-detect typed words helper
  const detectUsedWords = (text: string, manualMap: Record<string, boolean>) => {
    const lower = text.toLowerCase();
    const usedSet = new Set<string>();

    words.forEach((w) => {
      // Check if root word or manual click
      if (manualMap[w.id] || lower.includes(w.word.toLowerCase())) {
        usedSet.add(w.id);
      }
    });

    return usedSet;
  };

  const usedA = useMemo(() => detectUsedWords(personalText, manualUsedA), [personalText, manualUsedA, words]);
  const usedB = useMemo(() => detectUsedWords(scenarioText, manualUsedB), [scenarioText, manualUsedB, words]);
  const usedC = useMemo(() => detectUsedWords(storyText, manualUsedC), [storyText, manualUsedC, words]);

  const toggleWordChip = (
    wordId: string,
    setManual: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  ) => {
    setManual((prev) => ({
      ...prev,
      [wordId]: !prev[wordId],
    }));
  };

  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Check completion
  const checkCompletion = () => {
    if (usedA.size >= 6 || usedB.size >= 4 || usedC.size >= 5) {
      onComplete();
    }
  };

  // Model answers
  const samplePersonal = `Last year, our team faced a crucial milestone when our primary database crashed right before product launch. At first, many colleagues were reluctant to take responsibility and began to hesitate about whether we could meet the deadline. However, as an advocate for rapid communication, I persuaded the management to let us run an emergency audit. Fortunately, our engineering group proved remarkably resilient and managed to eliminate the technical bottlenecks that would otherwise hinder customer onboarding. Thanks to subtle adjustments in our deployment pipeline, the updated platform began to thrive within weeks.`;

  const sampleScenario = `Subject: Urgent Proposal: Removing Operational Bottlenecks in Supply Procurement

Dear Operations Committee,

I am writing to advocate for an immediate review of our overseas logistics contract. Currently, the ambiguous clauses surrounding shipping demurrage severely hinder our distribution schedule. Several warehouse supervisors are understandably reluctant to sign off on additional shipments until liability is clarified.

It is crucial that we persuade the vendor to adopt transparent delivery timelines so our seasonal distribution can thrive without further delay. We must not hesitate to renegotiate these terms before the next quarterly review.

Sincerely,
Senior Logistics Lead`;

  const sampleStory = `A rainy evening in London. Inside the dimly lit café, Thomas sat with an untouched espresso, struggling not to hesitate as the clock ticked past eight. The cryptic letter in his coat pocket was dangerously ambiguous, yet its implications were crucial. When his phone finally vibrated, a reluctant voice on the other end warned him that powerful rivals were conspiring to hinder the public release of the laboratory records. To thrive in this dangerous game of corporate espionage, Thomas knew he had to be resilient. He picked up his umbrella, made a subtle nod to the contact by the window, and stepped into the storm to persuade the only journalist who could reveal the truth.`;

  return (
    <div className="space-y-12">
      {/* Intro Header */}
      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-rose-100 shadow-xs">
        <div className="text-xs uppercase tracking-wider font-bold text-rose-700">
          Bloom Level 6 · Creative Synthesis & Discourse
        </div>
        <h2 className="text-2xl font-heading font-bold text-slate-900 mt-1">
          Creating: Personal Essays, Scenarios & Storytelling
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          The summit of Bloom's Taxonomy. Synthesize entirely new texts by actively embedding target vocabulary into personal reflections, professional correspondence, and evocative creative stories.
        </p>
      </div>

      {/* PART A: PERSONAL WRITING */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-rose-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center font-bold">A</span>
              Personal Writing (Real Situation)
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Write <strong>5–6 sentences</strong> about a real challenge, project, or turning point from your life. Use at least <strong>6 target words</strong>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                usedA.size >= 6
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              Target words used: {usedA.size} / 6
            </span>
          </div>
        </div>

        {/* Word Bank Chips */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Interactive Word Bank (Click to toggle marked as used, or type in the box)
          </div>
          <div className="flex flex-wrap gap-2">
            {stepWords.map((item) => {
              const isUsed = usedA.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleWordChip(item.id, setManualUsedA)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                    isUsed
                      ? 'bg-emerald-600 border-emerald-700 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-rose-50 hover:border-rose-300'
                  }`}
                >
                  {isUsed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{item.word}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Writing Box */}
        <div className="space-y-2">
          <textarea
            rows={5}
            value={personalText}
            onChange={(e) => {
              setPersonalText(e.target.value);
              checkCompletion();
            }}
            placeholder="Write 5-6 sentences about a true life or work experience using your target words..."
            className="w-full p-4 text-sm rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-slate-400 leading-relaxed font-sans"
          />
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Words in text: {personalText.trim() ? personalText.trim().split(/\s+/).length : 0}
            </span>
            {personalText && (
              <button
                type="button"
                onClick={() => handleCopy(personalText, 'personal')}
                className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium"
              >
                {copiedSection === 'personal' ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy text</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Sample Answer Toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowSampleA(!showSampleA)}
            className="flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-900 transition-colors"
          >
            <span>{showSampleA ? 'Hide Sample Personal Narrative' : 'Reveal Sample Personal Narrative'}</span>
            {showSampleA ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showSampleA && (
            <div className="mt-3 p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-xs sm:text-sm text-rose-950 leading-relaxed font-normal">
              <span className="font-bold block text-rose-900 mb-1">Model Example:</span>
              <p>{samplePersonal}</p>
            </div>
          )}
        </div>
      </div>

      {/* PART B: SCENARIO WRITING */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-rose-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center font-bold">B</span>
              Scenario Writing (Professional Challenge)
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              <strong>Scenario:</strong> You are writing an urgent email to an organizational director or client to resolve a project bottleneck. Use at least <strong>4 target words</strong>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                usedB.size >= 4
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              Target words used: {usedB.size} / 4
            </span>
          </div>
        </div>

        {/* Word Bank Chips */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Word Bank
          </div>
          <div className="flex flex-wrap gap-2">
            {stepWords.map((item) => {
              const isUsed = usedB.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleWordChip(item.id, setManualUsedB)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                    isUsed
                      ? 'bg-emerald-600 border-emerald-700 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-rose-50 hover:border-rose-300'
                  }`}
                >
                  {isUsed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{item.word}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Writing Box */}
        <div className="space-y-2">
          <textarea
            rows={5}
            value={scenarioText}
            onChange={(e) => {
              setScenarioText(e.target.value);
              checkCompletion();
            }}
            placeholder="Draft your professional email or memo here, integrating at least 4 target words..."
            className="w-full p-4 text-sm rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-slate-400 leading-relaxed font-sans"
          />
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Words in text: {scenarioText.trim() ? scenarioText.trim().split(/\s+/).length : 0}
            </span>
            {scenarioText && (
              <button
                type="button"
                onClick={() => handleCopy(scenarioText, 'scenario')}
                className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium"
              >
                {copiedSection === 'scenario' ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy text</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Sample Answer Toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowSampleB(!showSampleB)}
            className="flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-900 transition-colors"
          >
            <span>{showSampleB ? 'Hide Model Workplace Message' : 'Reveal Model Workplace Message'}</span>
            {showSampleB ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showSampleB && (
            <div className="mt-3 p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-xs sm:text-sm text-rose-950 leading-relaxed whitespace-pre-line">
              <span className="font-bold block text-rose-900 mb-1">Model Workplace Email:</span>
              <p>{sampleScenario}</p>
            </div>
          )}
        </div>
      </div>

      {/* PART C: STORYTELLING */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-rose-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center font-bold">C</span>
              Storytelling Prompt
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              <strong>Story outline:</strong> <em>"A rainy evening. A café. A phone call. A crucial decision."</em> Write <strong>6–8 sentences</strong> telling the narrative. Must use at least <strong>5 target words</strong>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                usedC.size >= 5
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              Target words used: {usedC.size} / 5
            </span>
          </div>
        </div>

        {/* Word Bank Chips */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Word Bank
          </div>
          <div className="flex flex-wrap gap-2">
            {stepWords.map((item) => {
              const isUsed = usedC.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleWordChip(item.id, setManualUsedC)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                    isUsed
                      ? 'bg-emerald-600 border-emerald-700 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-rose-50 hover:border-rose-300'
                  }`}
                >
                  {isUsed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{item.word}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Writing Box */}
        <div className="space-y-2">
          <textarea
            rows={6}
            value={storyText}
            onChange={(e) => {
              setStoryText(e.target.value);
              checkCompletion();
            }}
            placeholder="Bring the scenes to life! 'A rainy evening. A café. A phone call. A crucial decision.'..."
            className="w-full p-4 text-sm rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-slate-400 leading-relaxed font-sans"
          />
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Words in text: {storyText.trim() ? storyText.trim().split(/\s+/).length : 0}
            </span>
            {storyText && (
              <button
                type="button"
                onClick={() => handleCopy(storyText, 'story')}
                className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium"
              >
                {copiedSection === 'story' ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy text</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Sample Answer Toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowSampleC(!showSampleC)}
            className="flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-900 transition-colors"
          >
            <span>{showSampleC ? 'Hide Model Story' : 'Reveal Model Story'}</span>
            {showSampleC ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showSampleC && (
            <div className="mt-3 p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-xs sm:text-sm text-rose-950 leading-relaxed">
              <span className="font-bold block text-rose-900 mb-1">Model Storytelling Example:</span>
              <p>{sampleStory}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
