/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { BloomStepNumber, VocabularyWord } from './types/bloom';
import { DEFAULT_VOCABULARY, BLOOM_LEVELS } from './data/defaultVocabulary';
import { BloomsPyramid } from './components/BloomsPyramid';
import { Step1Remembering } from './components/Step1Remembering';
import { Step2Understanding } from './components/Step2Understanding';
import { Step3Applying } from './components/Step3Applying';
import { Step4Analyzing } from './components/Step4Analyzing';
import { Step5Evaluating } from './components/Step5Evaluating';
import { Step6Creating } from './components/Step6Creating';
import { WordListModal } from './components/WordListModal';
import { DeployModal } from './components/DeployModal';
import { generateStandaloneHtml } from './utils/exportHtml';
import { downloadProjectZip } from './utils/projectZipGenerator';
import {
  BookOpen,
  Download,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  List,
  Sparkles,
  Trophy,
  Rocket
} from 'lucide-react';

import { loadActiveWordList, saveActiveWordList } from './utils/vocabularyStorage';

export default function App() {
  const [words, setWords] = useState<VocabularyWord[]>(() => loadActiveWordList());
  const [currentStep, setCurrentStep] = useState<BloomStepNumber>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<BloomStepNumber>>(new Set());
  const [isWordListModalOpen, setIsWordListModalOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const handleUpdateWords = (newWords: VocabularyWord[]) => {
    setWords(newWords);
    saveActiveWordList(newWords);
  };

  const handleDownloadProjectZip = async () => {
    setIsDeployModalOpen(true);
    try {
      await downloadProjectZip('blooms-taxonomy-vocabulary.zip');
    } catch (err) {
      console.error('ZIP generation error:', err);
    }
  };

  // Active Bloom Level info
  const activeLevel = useMemo(() => {
    return BLOOM_LEVELS.find((l) => l.step === currentStep) || BLOOM_LEVELS[0];
  }, [currentStep]);

  // Handle step completion
  const handleStepComplete = (step: BloomStepNumber) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.add(step);
      return next;
    });
  };

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => (prev + 1) as BloomStepNumber);
      window.scrollTo({ top: 320, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as BloomStepNumber);
      window.scrollTo({ top: 320, behavior: 'smooth' });
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Reset your progress and restart from Step 1?')) {
      setCompletedSteps(new Set());
      setCurrentStep(1);
    }
  };

  const handleDownloadHtml = () => {
    const html = generateStandaloneHtml(words);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blooms-taxonomy-vocabulary.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Progress percentage calculation
  const progressPercentage = Math.round((completedSteps.size / 6) * 100);

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-slate-800 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#f7f4ee]/90 backdrop-blur-md border-b border-amber-900/10 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-xs transition-colors"
              style={{ backgroundColor: activeLevel.hex, color: '#ffffff' }}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-heading font-extrabold tracking-tight text-slate-900 leading-none">
                Bloom's Taxonomy Vocabulary
              </h1>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block mt-0.5">
                6-Stage Deep Learning Pyramid
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadProjectZip}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-xs"
              title="Скачать весь проект архивом .zip для загрузки на GitHub и Vercel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Скачать .zip (для GitHub/Vercel)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsWordListModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <List className="w-3.5 h-3.5" />
              <span>База слов ({words.length})</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadHtml}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-2xs"
              title="Скачать одиночный файл .html"
            >
              <span>.html</span>
            </button>

            <button
              type="button"
              onClick={handleResetAll}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors"
              title="Reset progress"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Header Hero Banner with Pyramid */}
        <section className="bg-white/70 backdrop-blur rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-100/70 text-amber-900 border border-amber-200/60">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Pedagogical Vocabulary Engine</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 leading-tight">
                Master Words Across <br />
                <span style={{ color: activeLevel.hex }} className="transition-colors duration-300">
                  Step {currentStep}: {activeLevel.name}
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {activeLevel.description} Every step shuffles options and orders independently to ensure deep, lasting acquisition.
              </p>

              {/* Overall Progress Bar */}
              <div className="pt-2 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    Pyramid Mastery: {completedSteps.size} of 6 Levels
                  </span>
                  <span>{progressPercentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progressPercentage}%`,
                      backgroundColor: activeLevel.hex,
                    }}
                  />
                </div>
              </div>

              {/* Step Navigation Pill Indicator */}
              <div className="pt-2 flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Current Cognitive Level:</span>
                <span
                  className="px-2.5 py-0.5 rounded-md text-xs font-bold text-white shadow-2xs"
                  style={{ backgroundColor: activeLevel.hex }}
                >
                  {activeLevel.verb}
                </span>
              </div>
            </div>

            {/* Right Column: Visual Bloom's Pyramid */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <BloomsPyramid
                currentStep={currentStep}
                onSelectStep={(step) => {
                  setCurrentStep(step);
                  window.scrollTo({ top: 320, behavior: 'smooth' });
                }}
                completedSteps={completedSteps}
              />
            </div>
          </div>
        </section>

        {/* Dynamic Step View */}
        <section className="relative">
          {currentStep === 1 && (
            <Step1Remembering
              words={words}
              onComplete={() => handleStepComplete(1)}
            />
          )}

          {currentStep === 2 && (
            <Step2Understanding
              words={words}
              onComplete={() => handleStepComplete(2)}
            />
          )}

          {currentStep === 3 && (
            <Step3Applying
              words={words}
              onComplete={() => handleStepComplete(3)}
            />
          )}

          {currentStep === 4 && (
            <Step4Analyzing
              words={words}
              onComplete={() => handleStepComplete(4)}
            />
          )}

          {currentStep === 5 && (
            <Step5Evaluating
              words={words}
              onComplete={() => handleStepComplete(5)}
            />
          )}

          {currentStep === 6 && (
            <Step6Creating
              words={words}
              onComplete={() => handleStepComplete(6)}
            />
          )}
        </section>

        {/* Bottom Step Progression Controls */}
        <nav aria-label="Step Navigation" className="bg-white/80 backdrop-blur rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Level</span>
          </button>

          <div className="text-center">
            <span className="text-xs text-slate-500 font-medium block">Bloom's Taxonomy</span>
            <span className="text-sm font-heading font-extrabold text-slate-900">
              Level {currentStep} of 6: {activeLevel.name}
            </span>
          </div>

          <button
            type="button"
            onClick={handleNextStep}
            disabled={currentStep === 6}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            style={{
              backgroundColor: currentStep === 6 ? '#64748b' : activeLevel.hex,
            }}
          >
            <span>Next Level</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-amber-900/10 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Bloom's Taxonomy Pyramid Vocabulary Learning</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsWordListModalOpen(true)}
              className="hover:text-slate-800 underline underline-offset-2"
            >
              Manage Words
            </button>
            <button
              type="button"
              onClick={handleDownloadHtml}
              className="hover:text-slate-800 underline underline-offset-2"
            >
              Export Standalone HTML
            </button>
          </div>
        </div>
      </footer>

      {/* Word List and Customization Modal */}
      <WordListModal
        isOpen={isWordListModalOpen}
        onClose={() => setIsWordListModalOpen(false)}
        words={words}
        onUpdateWords={handleUpdateWords}
      />

      {/* Deploy to GitHub & Vercel Modal */}
      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        words={words}
      />
    </div>
  );
}
