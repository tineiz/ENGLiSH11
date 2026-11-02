import { VocabularyWord } from '../types/bloom';

export function generateStandaloneHtml(words: VocabularyWord[]): string {
  const jsonWords = JSON.stringify(words, null, 2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bloom's Taxonomy Vocabulary Mastery — 6 Levels</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f7f4ee;
      --card-bg: #ffffff;
      --text: #1e293b;
      --border: #e2e8f0;
      --c-purple: #7c3aed;
      --c-blue: #2563eb;
      --c-green: #059669;
      --c-yellow: #d97706;
      --c-orange: #ea580c;
      --c-red: #dc2626;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Nunito', system-ui, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding: 1.5rem 1rem;
    }
    h1, h2, h3, h4 {
      font-family: 'Baloo 2', cursive, sans-serif;
    }
    .container {
      max-width: 960px;
      margin: 0 auto;
    }
    header {
      text-align: center;
      margin-bottom: 2rem;
    }
    header h1 {
      font-size: 2.25rem;
      font-weight: 800;
      color: #0f172a;
    }
    header p {
      color: #64748b;
      font-size: 0.95rem;
      margin-top: 0.25rem;
    }
    
    /* Pyramid */
    .pyramid-wrapper {
      max-width: 480px;
      margin: 0 auto 1.5rem;
    }
    .pyramid-tier {
      cursor: pointer;
      transition: filter 0.2s, transform 0.2s;
    }
    .pyramid-tier:hover {
      filter: brightness(1.08);
    }
    .pyramid-tier.active path {
      stroke: #ffffff;
      stroke-width: 3.5;
      filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.8));
    }
    
    /* Tabs */
    .step-tabs {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 0.5rem;
      margin-bottom: 2rem;
    }
    .tab-btn {
      padding: 0.5rem 0.25rem;
      border: 1px solid var(--border);
      background: #ffffff;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
    }
    .tab-btn.active {
      color: #ffffff;
      border-color: #000000;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    /* Cards & layout */
    .step-section {
      display: none;
    }
    .step-section.active {
      display: block;
    }
    .card-panel {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 1rem;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .panel-header {
      margin-bottom: 1.25rem;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 0.75rem;
    }
    .panel-header h3 {
      font-size: 1.25rem;
      color: #0f172a;
    }
    
    /* Flashcard 3D */
    .flashcard-box {
      perspective: 1000px;
      width: 100%;
      max-width: 480px;
      height: 240px;
      margin: 1rem auto;
      cursor: pointer;
    }
    .flashcard-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.5s;
      transform-style: preserve-3d;
      border-radius: 1rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }
    .flashcard-inner.flipped {
      transform: rotateY(180deg);
    }
    .card-face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 1rem;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      border: 1px solid #ddd6fe;
    }
    .card-front {
      background: #ffffff;
    }
    .card-back {
      background: linear-gradient(135deg, #7c3aed, #4f46e5);
      color: #ffffff;
      transform: rotateY(180deg);
    }
    
    /* Options grid */
    .options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      margin-top: 0.75rem;
    }
    .option-btn {
      padding: 0.6rem 0.8rem;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      background: #ffffff;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.15s;
      text-align: center;
    }
    .option-btn:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
    }
    .option-btn.selected {
      border-color: #7c3aed;
      background: #f5f3ff;
      font-weight: 700;
    }
    .option-btn.correct {
      border-color: #10b981;
      background: #ecfdf5;
      color: #065f46;
      font-weight: 700;
    }
    .option-btn.wrong {
      border-color: #ef4444;
      background: #fef2f2;
      color: #991b1b;
      text-decoration: line-through;
    }

    /* Primary buttons */
    .action-btn {
      padding: 0.65rem 1.25rem;
      font-size: 0.85rem;
      font-weight: 700;
      color: #ffffff;
      background: #2563eb;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: opacity 0.15s;
    }
    .action-btn:hover {
      opacity: 0.9;
    }
    .secondary-btn {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #475569;
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      cursor: pointer;
    }

    /* Word bank chips */
    .chip-btn {
      padding: 0.35rem 0.75rem;
      font-size: 0.8rem;
      border: 1px solid var(--border);
      background: #f8fafc;
      border-radius: 0.5rem;
      cursor: pointer;
      margin: 0.25rem;
      transition: all 0.15s;
    }
    .chip-btn.used {
      background: #059669;
      border-color: #047857;
      color: #ffffff;
      font-weight: 700;
    }

    /* Textarea */
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      font-family: inherit;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }

    .explanation-box {
      margin-top: 0.5rem;
      padding: 0.5rem 0.75rem;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 0.5rem;
      font-size: 0.8rem;
      color: #166534;
    }

    @media (max-width: 640px) {
      .step-tabs { grid-template-columns: repeat(3, 1fr); }
      .options-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Bloom's Taxonomy Vocabulary Mastery</h1>
      <p>Systematic deep vocabulary learning from Knowledge Retrieval up to Creative Synthesis</p>
    </header>

    <!-- SVG Pyramid -->
    <div class="pyramid-wrapper">
      <svg viewBox="0 0 500 375" style="width: 100%; height: auto;">
        <!-- Step 6 Creating -->
        <g class="pyramid-tier" id="pyramid-6" onclick="navigateToStep(6)">
          <path d="M 250 15 L 285 70 L 215 70 Z" fill="#dc2626" />
          <text x="250" y="52" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="700">6. CREATING</text>
        </g>
        <!-- Step 5 Evaluating -->
        <g class="pyramid-tier" id="pyramid-5" onclick="navigateToStep(5)">
          <path d="M 213 74 L 287 74 L 324 128 L 176 128 Z" fill="#ea580c" />
          <text x="250" y="106" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="700">5. EVALUATING</text>
        </g>
        <!-- Step 4 Analyzing -->
        <g class="pyramid-tier" id="pyramid-4" onclick="navigateToStep(4)">
          <path d="M 174 132 L 326 132 L 363 186 L 137 186 Z" fill="#eab308" />
          <text x="250" y="164" text-anchor="middle" fill="#1c1917" font-size="14" font-weight="700">4. ANALYZING</text>
        </g>
        <!-- Step 3 Applying -->
        <g class="pyramid-tier" id="pyramid-3" onclick="navigateToStep(3)">
          <path d="M 135 190 L 365 190 L 402 244 L 98 244 Z" fill="#059669" />
          <text x="250" y="222" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="700">3. APPLYING</text>
        </g>
        <!-- Step 2 Understanding -->
        <g class="pyramid-tier" id="pyramid-2" onclick="navigateToStep(2)">
          <path d="M 96 248 L 404 248 L 441 302 L 59 302 Z" fill="#2563eb" />
          <text x="250" y="280" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="700">2. UNDERSTANDING</text>
        </g>
        <!-- Step 1 Remembering -->
        <g class="pyramid-tier active" id="pyramid-1" onclick="navigateToStep(1)">
          <path d="M 57 306 L 443 306 L 480 360 L 20 360 Z" fill="#7c3aed" />
          <text x="250" y="338" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="700">1. REMEMBERING</text>
        </g>
      </svg>
    </div>

    <!-- Step Navigation Buttons -->
    <div class="step-tabs">
      <button class="tab-btn active" id="tab-1" onclick="navigateToStep(1)" style="background: #7c3aed; color: #fff;">1. Remembering</button>
      <button class="tab-btn" id="tab-2" onclick="navigateToStep(2)">2. Understanding</button>
      <button class="tab-btn" id="tab-3" onclick="navigateToStep(3)">3. Applying</button>
      <button class="tab-btn" id="tab-4" onclick="navigateToStep(4)">4. Analyzing</button>
      <button class="tab-btn" id="tab-5" onclick="navigateToStep(5)">5. Evaluating</button>
      <button class="tab-btn" id="tab-6" onclick="navigateToStep(6)">6. Creating</button>
    </div>

    <!-- STEP 1 CONTAINER -->
    <div class="step-section active" id="step-1-content"></div>

    <!-- STEP 2 CONTAINER -->
    <div class="step-section" id="step-2-content"></div>

    <!-- STEP 3 CONTAINER -->
    <div class="step-section" id="step-3-content"></div>

    <!-- STEP 4 CONTAINER -->
    <div class="step-section" id="step-4-content"></div>

    <!-- STEP 5 CONTAINER -->
    <div class="step-section" id="step-5-content"></div>

    <!-- STEP 6 CONTAINER -->
    <div class="step-section" id="step-6-content"></div>
  </div>

  <script>
    // Embedded vocabulary words
    const RAW_WORDS = ${jsonWords};

    function shuffle(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    let activeStep = 1;
    let currentFlashcardIndex = 0;
    let step1ShuffledWords = [];

    function navigateToStep(stepNum) {
      activeStep = stepNum;
      for (let i = 1; i <= 6; i++) {
        const sec = document.getElementById('step-' + i + '-content');
        const tab = document.getElementById('tab-' + i);
        const pyr = document.getElementById('pyramid-' + i);
        if (sec) sec.classList.toggle('active', i === stepNum);
        if (pyr) pyr.classList.toggle('active', i === stepNum);
        if (tab) {
          tab.classList.toggle('active', i === stepNum);
          tab.style.background = (i === stepNum) ? getStepColor(i) : '#ffffff';
          tab.style.color = (i === stepNum) ? '#ffffff' : '#1e293b';
        }
      }
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }

    function getStepColor(step) {
      const colors = { 1: '#7c3aed', 2: '#2563eb', 3: '#059669', 4: '#d97706', 5: '#ea580c', 6: '#dc2626' };
      return colors[step] || '#2563eb';
    }

    function toggleFlashcard(el) {
      el.classList.toggle('flipped');
    }

    function prevFlashcard() {
      currentFlashcardIndex = (currentFlashcardIndex - 1 + step1ShuffledWords.length) % step1ShuffledWords.length;
      renderFlashcard();
    }

    function nextFlashcard() {
      currentFlashcardIndex = (currentFlashcardIndex + 1) % step1ShuffledWords.length;
      renderFlashcard();
    }

    function renderFlashcard() {
      const container = document.getElementById('flashcard-deck-container');
      if (!container) return;
      const w = step1ShuffledWords[currentFlashcardIndex];
      container.innerHTML = \`
        <div class="flashcard-box" onclick="toggleFlashcard(this.querySelector('.flashcard-inner'))">
          <div class="flashcard-inner">
            <div class="card-face card-front">
              <span style="font-size:0.75rem; color:#7c3aed; font-weight:700;">FRONT · RUSSIAN (Card \${currentFlashcardIndex + 1} of \${step1ShuffledWords.length})</span>
              <div style="font-size:1.75rem; font-weight:800; font-family:'Baloo 2', sans-serif;">\${w.russian}</div>
              <span style="font-size:0.75rem; color:#8b5cf6;">Click anywhere to flip</span>
            </div>
            <div class="card-face card-back">
              <span style="font-size:0.75rem; color:#e0e7ff; font-weight:700;">BACK · ENGLISH</span>
              <div style="font-size:2rem; font-weight:800; font-family:'Baloo 2', sans-serif;">\${w.word}</div>
              <p style="font-style:italic; font-size:0.9rem; opacity:0.95;">"\${w.example}"</p>
              <span style="font-size:0.75rem; color:#c7d2fe;">Click to flip back</span>
            </div>
          </div>
        </div>
        <div style="display:flex; justify-content:center; gap:1rem; margin-top:1rem;">
          <button class="secondary-btn" onclick="prevFlashcard()">← Previous</button>
          <button class="secondary-btn" onclick="nextFlashcard()">Next →</button>
        </div>
      \`;
    }

    // Build Step 1
    function buildStep1() {
      step1ShuffledWords = shuffle(RAW_WORDS);
      const container = document.getElementById('step-1-content');
      let html = \`
        <div class="card-panel">
          <div class="panel-header">
            <h3>Step 1 — Remembering: Flashcards</h3>
            <p style="font-size:0.85rem; color:#64748b;">Flip to reveal the English word and its natural usage example.</p>
          </div>
          <div id="flashcard-deck-container"></div>
        </div>
        <div class="card-panel">
          <div class="panel-header">
            <h3>Memory Retrieval Quiz</h3>
            <p style="font-size:0.85rem; color:#64748b;">Read the Russian meaning and pick the correct English word.</p>
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
      \`;

      step1ShuffledWords.forEach((target, idx) => {
        const others = RAW_WORDS.filter(x => x.id !== target.id);
        const distractors = shuffle(others).slice(0, 3).map(x => x.word);
        const options = shuffle([target.word, ...distractors]);

        html += \`
          <div style="padding:1rem; border:1px solid #e2e8f0; border-radius:0.75rem; background:#f8fafc;" id="s1-q-\${target.id}">
            <div style="font-size:0.75rem; color:#7c3aed; font-weight:700; margin-bottom:0.25rem;">Question \${idx + 1}</div>
            <div style="font-weight:700; font-size:1.1rem; margin-bottom:0.75rem;">"\${target.russian}"</div>
            <div class="options-grid">
              \${options.map(opt => \`
                <button class="option-btn" onclick="selectStep1Quiz('\${target.id}', '\${opt}', '\${target.word}', this)">\${opt}</button>
              \`).join('')}
            </div>
          </div>
        \`;
      });

      html += \`</div></div>\`;
      container.innerHTML = html;
      renderFlashcard();
    }

    function selectStep1Quiz(id, chosen, correct, btn) {
      const parent = document.getElementById('s1-q-' + id);
      const buttons = parent.querySelectorAll('.option-btn');
      buttons.forEach(b => {
        b.disabled = true;
        if (b.innerText === correct) b.classList.add('correct');
        else if (b === btn && chosen !== correct) b.classList.add('wrong');
      });
    }

    // Build Step 2: Understanding
    function buildStep2() {
      const s2Words = shuffle(RAW_WORDS);
      const container = document.getElementById('step-2-content');
      let html = \`
        <div class="card-panel">
          <div class="panel-header">
            <h3>Part A — Match Definition to Word</h3>
            <p style="font-size:0.85rem; color:#64748b;">Read the English definition and choose the target word. (English only)</p>
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
      \`;

      s2Words.forEach((target, idx) => {
        const others = RAW_WORDS.filter(x => x.id !== target.id);
        const distractors = shuffle(others).slice(0, 3).map(x => x.word);
        const options = shuffle([target.word, ...distractors]);

        html += \`
          <div style="padding:1rem; border:1px solid #e2e8f0; border-radius:0.75rem; background:#f8fafc;" id="s2-def-\${target.id}">
            <div style="font-size:0.75rem; color:#2563eb; font-weight:700;">Definition \${idx + 1}</div>
            <p style="font-size:0.9rem; font-style:italic; margin:0.5rem 0;">"\${target.definition}"</p>
            <div class="options-grid">
              \${options.map(opt => \`
                <button class="option-btn" onclick="checkOption(this, '\${opt}', '\${target.word}')">\${opt}</button>
              \`).join('')}
            </div>
          </div>
        \`;
      });

      html += \`</div></div><div class="card-panel"><div class="panel-header"><h3>Part B — Find the Synonym</h3><p style="font-size:0.85rem; color:#64748b;">Select the closest synonym in English.</p></div><div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">\`;

      const s2WordsSyn = shuffle(RAW_WORDS);
      s2WordsSyn.forEach((target, idx) => {
        const options = shuffle([target.synonym, ...target.synonymDistractors]);
        html += \`
          <div style="padding:1rem; border:1px solid #e2e8f0; border-radius:0.75rem; background:#f8fafc;" id="s2-syn-\${target.id}">
            <div style="font-size:0.75rem; color:#2563eb; font-weight:700;">Target Word: <strong style="font-size:1rem;">\${target.word}</strong></div>
            <div class="options-grid">
              \${options.map(opt => \`
                <button class="option-btn" onclick="checkSynonymOption(this, '\${opt}', '\${target.synonym}', '\${target.id}')">\${opt}</button>
              \`).join('')}
            </div>
            <div id="syn-exp-\${target.id}" style="display:none;" class="explanation-box">\${target.synonymExplanation}</div>
          </div>
        \`;
      });

      html += \`</div></div>\`;
      container.innerHTML = html;
    }

    function checkOption(btn, chosen, correct) {
      const parent = btn.parentElement;
      parent.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
        if (b.innerText === correct) b.classList.add('correct');
        else if (b === btn && chosen !== correct) b.classList.add('wrong');
      });
    }

    function checkSynonymOption(btn, chosen, correct, wordId) {
      checkOption(btn, chosen, correct);
      const exp = document.getElementById('syn-exp-' + wordId);
      if (exp) exp.style.display = 'block';
    }

    // Build Step 3: Applying
    function buildStep3() {
      const s3Words = shuffle(RAW_WORDS);
      const container = document.getElementById('step-3-content');
      const allWordList = [...RAW_WORDS].map(w => w.word).sort();

      let html = \`
        <div class="card-panel">
          <div class="panel-header">
            <h3>Part A — Fill in the Gaps</h3>
            <p style="font-size:0.85rem; color:#64748b;">Select the word that accurately completes the full sentence.</p>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
      \`;

      s3Words.forEach((target, idx) => {
        const parts = target.gapSentence.split('{{word}}');
        html += \`
          <div style="padding:0.85rem; border:1px solid #e2e8f0; border-radius:0.5rem; background:#f8fafc;">
            <span>\${idx + 1}. \${parts[0]}</span>
            <select id="gap-\${target.id}" style="padding:0.25rem 0.5rem; font-weight:700; border-radius:4px;">
              <option value="">-- word --</option>
              \${allWordList.map(w => \`<option value="\${w}">\${w}</option>\`).join('')}
            </select>
            <span>\${parts[1] || ''}</span>
            <button class="secondary-btn" style="margin-left:0.5rem; padding:0.25rem 0.5rem;" onclick="checkGap('\${target.id}', '\${target.word}')">Check</button>
            <span id="gap-feedback-\${target.id}" style="font-weight:700; margin-left:0.5rem; font-size:0.8rem;"></span>
          </div>
        \`;
      });

      html += \`</div></div><div class="card-panel"><div class="panel-header"><h3>Part B — Complete the Sentence</h3></div><div style="display:flex; flex-direction:column; gap:1rem;">\`;

      s3Words.forEach((target, idx) => {
        const { prompt, correctEnding, distractors, explanation } = target.sentenceCompletion;
        const options = shuffle([correctEnding, ...distractors]);

        html += \`
          <div style="padding:1rem; border:1px solid #e2e8f0; border-radius:0.75rem; background:#f8fafc;" id="s3-b-\${target.id}">
            <div style="font-weight:700; margin-bottom:0.5rem;">\${idx + 1}. \${prompt}</div>
            <div style="display:flex; flex-direction:column; gap:0.4rem;">
              \${options.map(opt => \`
                <button class="option-btn" style="text-align:left;" onclick="checkSentenceEnding(this, '\${opt.replace(/'/g, "\\\\'")}', '\${correctEnding.replace(/'/g, "\\\\'")}', '\${target.id}')">\${opt}</button>
              \`).join('')}
            </div>
            <div id="ending-exp-\${target.id}" style="display:none;" class="explanation-box">\${explanation}</div>
          </div>
        \`;
      });

      html += \`</div></div>\`;
      container.innerHTML = html;
    }

    function checkGap(id, expected) {
      const sel = document.getElementById('gap-' + id);
      const fb = document.getElementById('gap-feedback-' + id);
      if (sel.value === expected) {
        fb.innerHTML = '<span style="color:#059669;">✓ Correct!</span>';
        sel.style.borderColor = '#059669';
      } else {
        fb.innerHTML = '<span style="color:#dc2626;">✗ Expected: ' + expected + '</span>';
        sel.style.borderColor = '#dc2626';
      }
    }

    function checkSentenceEnding(btn, chosen, correct, wordId) {
      const parent = btn.parentElement;
      parent.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
        if (b.innerText === correct) b.classList.add('correct');
        else if (b === btn && chosen !== correct) b.classList.add('wrong');
      });
      const exp = document.getElementById('ending-exp-' + wordId);
      if (exp) exp.style.display = 'block';
    }

    // Build Step 4: Analyzing
    function buildStep4() {
      const s4Words = shuffle(RAW_WORDS);
      const container = document.getElementById('step-4-content');

      let html = \`
        <div class="card-panel">
          <div class="panel-header">
            <h3>Part A — Odd One Out</h3>
            <p style="font-size:0.85rem; color:#64748b;">Find the word that doesn't share the logical category of the other two.</p>
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
      \`;

      s4Words.forEach((target, idx) => {
        const { words: trio, intruder, explanation } = target.oddOneOut;
        const shuffledTrio = shuffle(trio);

        html += \`
          <div style="padding:1rem; border:1px solid #e2e8f0; border-radius:0.75rem; background:#f8fafc;" id="s4-odd-\${target.id}">
            <div style="font-size:0.75rem; color:#d97706; font-weight:700;">Trio \${idx + 1}</div>
            <div class="options-grid" style="grid-template-columns: repeat(3, 1fr);">
              \${shuffledTrio.map(w => \`
                <button class="option-btn" onclick="checkOdd(this, '\${w}', '\${intruder}', '\${target.id}')">\${w}</button>
              \`).join('')}
            </div>
            <div id="odd-exp-\${target.id}" style="display:none;" class="explanation-box">\${explanation}</div>
          </div>
        \`;
      });

      html += \`</div></div><div class="card-panel"><div class="panel-header"><h3>Part B — Word Families</h3><p style="font-size:0.85rem; color:#64748b;">Verb → Noun → Adjective → Adverb</p></div><div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; font-size:0.85rem;"><tr style="background:#fef3c7; text-align:left;"><th style="padding:0.5rem;">Word</th><th style="padding:0.5rem;">Verb</th><th style="padding:0.5rem;">Noun</th><th style="padding:0.5rem;">Adjective</th><th style="padding:0.5rem;">Adverb</th></tr>\`;

      RAW_WORDS.forEach(w => {
        html += \`
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:0.5rem; font-weight:700;">\${w.word}</td>
            <td style="padding:0.5rem; font-style:italic;">\${w.wordFamily.verb}</td>
            <td style="padding:0.5rem;">\${w.wordFamily.noun}</td>
            <td style="padding:0.5rem;">\${w.wordFamily.adjective}</td>
            <td style="padding:0.5rem; font-family:monospace;">\${w.wordFamily.adverb}</td>
          </tr>
        \`;
      });

      html += \`</table></div></div>\`;
      container.innerHTML = html;
    }

    function checkOdd(btn, chosen, intruder, wordId) {
      checkOption(btn, chosen, intruder);
      const exp = document.getElementById('odd-exp-' + wordId);
      if (exp) exp.style.display = 'block';
    }

    // Build Step 5: Evaluating
    function buildStep5() {
      const s5Words = shuffle(RAW_WORDS);
      const container = document.getElementById('step-5-content');

      let html = \`
        <div class="card-panel">
          <div class="panel-header">
            <h3>Part B — Register Awareness</h3>
            <p style="font-size:0.85rem; color:#64748b;">Classify each word: Formal, Neutral, Informal, or Slang.</p>
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
      \`;

      const registers = ['Formal', 'Neutral', 'Informal', 'Slang'];
      s5Words.forEach((target, idx) => {
        html += \`
          <div style="padding:1rem; border:1px solid #e2e8f0; border-radius:0.75rem; background:#f8fafc;" id="s5-reg-\${target.id}">
            <div style="font-weight:800; font-size:1.1rem; color:#ea580c;">\${target.word}</div>
            <div class="options-grid">
              \${registers.map(r => \`
                <button class="option-btn" onclick="checkRegister(this, '\${r}', '\${target.register}', '\${target.id}')">\${r}</button>
              \`).join('')}
            </div>
            <div id="reg-exp-\${target.id}" style="display:none;" class="explanation-box">\${target.registerExplanation}</div>
          </div>
        \`;
      });

      html += \`</div></div><div class="card-panel"><div class="panel-header"><h3>Part C — Agree or Disagree (Discussion Stimulus)</h3></div><div style="display:flex; flex-direction:column; gap:1rem;">\`;

      s5Words.slice(0, 6).forEach((target, idx) => {
        html += \`
          <div style="padding:1rem; border:1px solid #e2e8f0; border-radius:0.75rem; background:#f8fafc;">
            <p style="font-weight:700; margin-bottom:0.5rem;">"\${target.agreeDisagreeStatement}"</p>
            <div style="display:flex; gap:0.5rem;">
              <button class="action-btn" style="background:#059669;" onclick="revealDebate('\${target.id}', 'Agreed')">AGREE</button>
              <button class="action-btn" style="background:#dc2626;" onclick="revealDebate('\${target.id}', 'Disagreed')">DISAGREE</button>
            </div>
            <div id="debate-\${target.id}" style="display:none; margin-top:0.5rem;" class="explanation-box">
              <strong>Speaking Prompt:</strong> \${target.discussionPrompt}
            </div>
          </div>
        \`;
      });

      html += \`</div></div>\`;
      container.innerHTML = html;
    }

    function checkRegister(btn, chosen, correct, wordId) {
      checkOption(btn, chosen, correct);
      const exp = document.getElementById('reg-exp-' + wordId);
      if (exp) exp.style.display = 'block';
    }

    function revealDebate(wordId, stance) {
      const el = document.getElementById('debate-' + wordId);
      if (el) el.style.display = 'block';
    }

    // Build Step 6: Creating
    function buildStep6() {
      const s6Words = shuffle(RAW_WORDS);
      const container = document.getElementById('step-6-content');

      let html = \`
        <div class="card-panel">
          <div class="panel-header">
            <h3>Part A — Personal Writing (Real Situation)</h3>
            <p style="font-size:0.85rem; color:#64748b;">Write 5–6 sentences about your life or career. Use at least 6 target words.</p>
          </div>
          <div>
            <div style="margin-bottom:0.5rem; font-size:0.8rem; font-weight:700;">Clickable Word Bank:</div>
            <div>
              \${s6Words.map(w => \`
                <button class="chip-btn" onclick="toggleChip(this)">\${w.word}</button>
              \`).join('')}
            </div>
          </div>
          <textarea rows="5" placeholder="Write your reflection here..."></textarea>
          <div style="margin-top:0.75rem;">
            <button class="secondary-btn" onclick="toggleSample('sample-a')">Toggle Sample Answer</button>
            <div id="sample-a" style="display:none; margin-top:0.5rem;" class="explanation-box">
              Last year our team faced a crucial milestone when our database crashed. Many were reluctant to speak up and began to hesitate. As an advocate for transparency, I persuaded our leads to deploy resilient safeguards so our operations could thrive without bottlenecks that would hinder progress.
            </div>
          </div>
        </div>

        <div class="card-panel">
          <div class="panel-header">
            <h3>Part C — Storytelling Prompt</h3>
            <p style="font-size:0.85rem; color:#64748b;">Prompt: "A rainy evening. A café. A phone call. A decision." (Use at least 5 words)</p>
          </div>
          <textarea rows="5" placeholder="Narrate the story..."></textarea>
          <div style="margin-top:0.75rem;">
            <button class="secondary-btn" onclick="toggleSample('sample-c')">Toggle Sample Story</button>
            <div id="sample-c" style="display:none; margin-top:0.5rem;" class="explanation-box">
              A rainy evening in London. Inside the café, Thomas tried not to hesitate as the clock ticked. The phone call was ambiguous, yet its consequences were crucial. With reluctant hands, he agreed to advocate for the whistleblower, knowing only resilient courage could hinder their adversaries.
            </div>
          </div>
        </div>
      \`;

      container.innerHTML = html;
    }

    function toggleChip(btn) {
      btn.classList.toggle('used');
    }

    function toggleSample(id) {
      const el = document.getElementById(id);
      if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }

    // Initialize all steps on page load
    window.addEventListener('DOMContentLoaded', () => {
      buildStep1();
      buildStep2();
      buildStep3();
      buildStep4();
      buildStep5();
      buildStep6();
    });
  </script>
</body>
</html>`;
}
