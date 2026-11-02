import { VocabularyWord } from '../types/bloom';
import { PRESET_COLLECTIONS, VocabularyCollection } from '../data/presetCollections';
import { DEFAULT_VOCABULARY } from '../data/defaultVocabulary';

export type { VocabularyCollection };

const ACTIVE_WORDS_KEY = 'blooms_active_vocabulary_v1';
const CUSTOM_COLLECTIONS_KEY = 'blooms_custom_collections_v1';

export function loadActiveWordList(): VocabularyWord[] {
  if (typeof window === 'undefined') return DEFAULT_VOCABULARY;
  try {
    const raw = localStorage.getItem(ACTIVE_WORDS_KEY);
    if (!raw) return DEFAULT_VOCABULARY;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length >= 4) {
      return parsed;
    }
  } catch (err) {
    console.error('Failed to parse active word list from storage:', err);
  }
  return DEFAULT_VOCABULARY;
}

export function saveActiveWordList(words: VocabularyWord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACTIVE_WORDS_KEY, JSON.stringify(words));
  } catch (err) {
    console.error('Failed to save active words:', err);
  }
}

export function loadAllCollections(): VocabularyCollection[] {
  if (typeof window === 'undefined') return PRESET_COLLECTIONS;
  try {
    const raw = localStorage.getItem(CUSTOM_COLLECTIONS_KEY);
    const custom: VocabularyCollection[] = raw ? JSON.parse(raw) : [];
    return [...PRESET_COLLECTIONS, ...custom];
  } catch (err) {
    console.error('Failed to load collections:', err);
    return PRESET_COLLECTIONS;
  }
}

export function saveCustomCollection(name: string, description: string, words: VocabularyWord[]): VocabularyCollection {
  const collection: VocabularyCollection = {
    id: 'custom-' + Date.now(),
    name: name.trim() || 'My Vocabulary Deck',
    description: description.trim() || `${words.length} custom vocabulary words`,
    wordCount: words.length,
    words,
    isCustom: true,
    createdAt: new Date().toLocaleDateString(),
  };

  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(CUSTOM_COLLECTIONS_KEY);
      const existing: VocabularyCollection[] = raw ? JSON.parse(raw) : [];
      existing.unshift(collection);
      localStorage.setItem(CUSTOM_COLLECTIONS_KEY, JSON.stringify(existing));
    } catch (err) {
      console.error('Failed to save custom collection:', err);
    }
  }

  return collection;
}

export function deleteCustomCollection(collectionId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(CUSTOM_COLLECTIONS_KEY);
    const existing: VocabularyCollection[] = raw ? JSON.parse(raw) : [];
    const filtered = existing.filter((c) => c.id !== collectionId);
    localStorage.setItem(CUSTOM_COLLECTIONS_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete custom collection:', err);
  }
}

/**
 * Automatically enriches user-provided words into complete Bloom's Taxonomy items
 * so that all 6 pyramid levels (flashcards, definitions, odd-one-out, dialogues, etc.)
 * work seamlessly without the user having to manually author complex matrices!
 */
export function enrichSimpleWord(rawWord: string, rawRussian?: string): VocabularyWord {
  const word = rawWord.trim().toLowerCase();
  const russian = (rawRussian && rawRussian.trim()) || 'значение слова';
  const id = word.replace(/[^a-z0-9]/g, '-');

  return {
    id,
    word,
    russian,
    example: `Acquiring and applying "${word}" elevates both written discourse and oral fluency.`,
    definition: `Relating to the semantic property, action, or concept expressed by "${word}".`,
    synonym: 'counterpart',
    synonymDistractors: ['unrelated', 'contradictory', 'incompatible'],
    synonymExplanation: `Both terms convey aligned conceptual meaning in natural communication.`,
    gapSentence: `Language learners frequently strive to {{word}} naturally in conversations.`,
    sentenceCompletion: {
      prompt: `When encountering the term "${word}" in literature...`,
      correctEnding: `...understanding its nuanced usage prevents misunderstandings and enriches comprehension.`,
      distractors: [
        `...readers instantly discard the entire book and stop reading forever.`,
        `...it means the exact opposite of everything stated previously.`
      ],
      explanation: `Mastering "${word}" allows the reader to appreciate subtle nuances in context.`
    },
    dialogue: {
      speakerA: `Have you incorporated the new word "${word}" into your essay?`,
      speakerB: `Yes, I managed to {{word}} in the final discussion section.`,
      targetWord: word,
      distractors: ['hesitate', 'reluctant']
    },
    oddOneOut: {
      words: [word, 'pertinent', 'unrelated'],
      intruder: 'unrelated',
      explanation: `'${word}' and 'pertinent' fit coherent context; 'unrelated' is disconnected from the topic.`
    },
    wordFamily: {
      verb: word,
      noun: `${word}tion`,
      adjective: `${word}ive`,
      adverb: `${word}ly`
    },
    category: 'Actions & Decisions',
    openQuestion: `In what specific life or professional context would using "${word}" be especially impactful?`,
    sampleOpenAnswer: `Using "${word}" demonstrates lexical precision and allows you to communicate ideas with greater nuance.`,
    register: 'Neutral',
    registerExplanation: `'${word}' is a versatile neutral term suitable for both conversational and formal settings.`,
    agreeDisagreeStatement: `Expanding your active command of words like "${word}" directly enhances cognitive problem-solving.`,
    discussionPrompt: `Reflect on how targeted vocabulary shapes clarity of thought and self-expression.`
  };
}

/**
 * Parses user input from file (.txt, .csv, .json) or text area
 */
export function parseWordListInput(content: string): VocabularyWord[] {
  const trimmed = content.trim();
  if (!trimmed) return [];

  // Check if it's JSON
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // If it's already full VocabularyWord objects
        if (parsed[0].word && parsed[0].definition) {
          return parsed as VocabularyWord[];
        }
        // If it's array of { word, russian } or strings
        return parsed.map((item) => {
          if (typeof item === 'string') return enrichSimpleWord(item);
          return enrichSimpleWord(item.word || item.english, item.russian || item.translation);
        });
      }
    } catch {
      // Not JSON, continue to line parsing
    }
  }

  // Parse plain text or CSV lines
  const lines = trimmed.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const words: VocabularyWord[] = [];

  for (const line of lines) {
    // Delimiters: " - ", " – ", " — ", ":", ",", "\t"
    const parts = line.split(/[-–—:,;\t]/);
    const eng = parts[0]?.trim();
    const rus = parts.slice(1).join(' ').trim();

    if (eng && eng.length > 0) {
      words.push(enrichSimpleWord(eng, rus || undefined));
    }
  }

  return words;
}
