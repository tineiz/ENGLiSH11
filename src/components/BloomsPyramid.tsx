import React from 'react';
import { BloomStepNumber } from '../types/bloom';
import { BLOOM_LEVELS } from '../data/defaultVocabulary';

interface BloomsPyramidProps {
  currentStep: BloomStepNumber;
  onSelectStep: (step: BloomStepNumber) => void;
  completedSteps: Set<BloomStepNumber>;
}

export const BloomsPyramid: React.FC<BloomsPyramidProps> = ({
  currentStep,
  onSelectStep,
  completedSteps,
}) => {
  // SVG coordinates for a 6-tier pyramid from top (step 6) to bottom (step 1)
  // Total width: 500, height: 360
  // Peak at (250, 10), Base at Y=350 from X=30 to X=470
  // 6 tiers, height per tier ~ 55px
  const tiers = [
    {
      step: 6 as BloomStepNumber,
      level: BLOOM_LEVELS[5], // Creating - Red
      yTop: 15,
      yBottom: 70,
      path: 'M 250 15 L 285 70 L 215 70 Z',
      labelY: 52,
      labelText: '6. CREATING',
      subText: 'Synthesize & Produce',
      color: '#dc2626',
      hoverColor: '#b91c1c',
      textColor: '#ffffff',
    },
    {
      step: 5 as BloomStepNumber,
      level: BLOOM_LEVELS[4], // Evaluating - Orange
      yTop: 74,
      yBottom: 128,
      path: 'M 213 74 L 287 74 L 324 128 L 176 128 Z',
      labelY: 106,
      labelText: '5. EVALUATING',
      subText: 'Judge & Justify',
      color: '#ea580c',
      hoverColor: '#c2410c',
      textColor: '#ffffff',
    },
    {
      step: 4 as BloomStepNumber,
      level: BLOOM_LEVELS[3], // Analyzing - Yellow
      yTop: 132,
      yBottom: 186,
      path: 'M 174 132 L 326 132 L 363 186 L 137 186 Z',
      labelY: 164,
      labelText: '4. ANALYZING',
      subText: 'Differentiate & Categorize',
      color: '#eab308',
      hoverColor: '#ca8a04',
      textColor: '#1c1917',
    },
    {
      step: 3 as BloomStepNumber,
      level: BLOOM_LEVELS[2], // Applying - Green
      yTop: 190,
      yBottom: 244,
      path: 'M 135 190 L 365 190 L 402 244 L 98 244 Z',
      labelY: 222,
      labelText: '3. APPLYING',
      subText: 'Execute & Contextualize',
      color: '#059669',
      hoverColor: '#047857',
      textColor: '#ffffff',
    },
    {
      step: 2 as BloomStepNumber,
      level: BLOOM_LEVELS[1], // Understanding - Blue
      yTop: 248,
      yBottom: 302,
      path: 'M 96 248 L 404 248 L 441 302 L 59 302 Z',
      labelY: 280,
      labelText: '2. UNDERSTANDING',
      subText: 'Comprehend & Clarify',
      color: '#2563eb',
      hoverColor: '#1d4ed8',
      textColor: '#ffffff',
    },
    {
      step: 1 as BloomStepNumber,
      level: BLOOM_LEVELS[0], // Remembering - Purple
      yTop: 306,
      yBottom: 360,
      path: 'M 57 306 L 443 306 L 480 360 L 20 360 Z',
      labelY: 338,
      labelText: '1. REMEMBERING',
      subText: 'Recall & Recognize',
      color: '#7c3aed',
      hoverColor: '#6d28d9',
      textColor: '#ffffff',
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* SVG Pyramid */}
      <div className="relative w-full max-w-[480px] drop-shadow-md transition-all duration-300">
        <svg
          viewBox="0 0 500 375"
          className="w-full h-auto overflow-visible select-none"
          role="img"
          aria-label="Bloom's Taxonomy Pyramid showing 6 cognitive levels from Remembering to Creating"
        >
          <defs>
            <filter id="pyramid-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#000000" floodOpacity="0.35" />
            </filter>
            <filter id="active-pulse" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#f59e0b" floodOpacity="0.8" />
            </filter>
          </defs>

          {tiers.map((tier) => {
            const isActive = currentStep === tier.step;
            const isCompleted = completedSteps.has(tier.step);

            return (
              <g
                key={tier.step}
                className="cursor-pointer group transition-transform duration-200"
                onClick={() => onSelectStep(tier.step)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`Step ${tier.step}: ${tier.labelText} - ${tier.subText}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectStep(tier.step);
                  }
                }}
              >
                {/* Band Path */}
                <path
                  d={tier.path}
                  fill={tier.color}
                  stroke={isActive ? '#ffffff' : 'rgba(255,255,255,0.45)'}
                  strokeWidth={isActive ? 3.5 : 1.5}
                  filter={isActive ? 'url(#active-pulse)' : undefined}
                  className={`transition-all duration-200 ${
                    isActive
                      ? 'brightness-110 drop-shadow-lg'
                      : 'opacity-90 hover:opacity-100 hover:brightness-105'
                  }`}
                />

                {/* Band Label */}
                <text
                  x="250"
                  y={tier.labelY - (tier.step === 6 ? 0 : 4)}
                  textAnchor="middle"
                  fill={tier.textColor}
                  fontSize={tier.step === 6 ? '12.5' : '14'}
                  fontWeight={isActive ? '800' : '700'}
                  letterSpacing="0.06em"
                  className="font-heading pointer-events-none drop-shadow-sm"
                >
                  {tier.labelText} {isCompleted ? '✓' : ''}
                </text>

                {/* Subtitle if space permits */}
                {tier.step <= 4 && (
                  <text
                    x="250"
                    y={tier.labelY + 11}
                    textAnchor="middle"
                    fill={tier.textColor}
                    fontSize="9.5"
                    opacity="0.9"
                    fontWeight="500"
                    className="pointer-events-none"
                  >
                    {tier.subText}
                  </text>
                )}

                {/* Active arrow indicator on right edge */}
                {isActive && (
                  <circle
                    cx={tier.step === 6 ? 250 : 250}
                    cy={tier.labelY - (tier.step === 6 ? 16 : 14)}
                    r="4"
                    fill="#ffffff"
                    className="animate-ping opacity-75"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile & Accessible Quick Step Tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 w-full mt-3">
        {BLOOM_LEVELS.map((level) => {
          const isActive = currentStep === level.step;
          const isDone = completedSteps.has(level.step);
          return (
            <button
              key={level.step}
              type="button"
              onClick={() => onSelectStep(level.step)}
              className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center transition-all flex flex-col items-center justify-center border ${
                isActive
                  ? 'border-slate-800 shadow-md font-bold'
                  : 'border-slate-200/80 bg-white/70 hover:bg-white text-slate-700'
              }`}
              style={{
                backgroundColor: isActive ? level.hex : undefined,
                color: isActive ? '#ffffff' : undefined,
              }}
            >
              <div className="flex items-center gap-1">
                <span>Step {level.step}</span>
                {isDone && <span className="text-[10px]">✓</span>}
              </div>
              <span className="text-[11px] truncate max-w-full opacity-90">{level.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
