import React, { useState, useEffect, useRef } from 'react';
import { VocabularyWord } from '../types/bloom';
import {
  X,
  Download,
  Upload,
  FileText,
  Plus,
  Trash2,
  FolderOpen,
  CheckCircle2,
  Sparkles,
  Save,
  BookOpen
} from 'lucide-react';
import { generateStandaloneHtml } from '../utils/exportHtml';
import { downloadProjectZip } from '../utils/projectZipGenerator';
import {
  loadAllCollections,
  saveCustomCollection,
  deleteCustomCollection,
  parseWordListInput,
  enrichSimpleWord,
  VocabularyCollection
} from '../utils/vocabularyStorage';

interface WordListModalProps {
  isOpen: boolean;
  onClose: () => void;
  words: VocabularyWord[];
  onUpdateWords: (newWords: VocabularyWord[]) => void;
}

export const WordListModal: React.FC<WordListModalProps> = ({
  isOpen,
  onClose,
  words,
  onUpdateWords,
}) => {
  const [activeTab, setActiveTab] = useState<'collections' | 'view' | 'upload' | 'paste' | 'add'>('collections');
  const [collections, setCollections] = useState<VocabularyCollection[]>([]);
  const [pasteText, setPasteText] = useState('');
  const [newDeckName, setNewDeckName] = useState('');
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  // Single word form state
  const [newWord, setNewWord] = useState('');
  const [newRussian, setNewRussian] = useState('');
  const [newExample, setNewExample] = useState('');
  const [newDefinition, setNewDefinition] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCollections(loadAllCollections());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectCollection = (col: VocabularyCollection) => {
    onUpdateWords(col.words);
    onClose();
  };

  const handleSaveCurrentAsDeck = () => {
    if (!newDeckName.trim()) {
      alert('Пожалуйста, введите название колоды.');
      return;
    }
    const created = saveCustomCollection(newDeckName, `Набор из ${words.length} слов`, words);
    setCollections(loadAllCollections());
    setNewDeckName('');
    alert(`Колода "${created.name}" успешно сохранена в базу!`);
  };

  const handleDeleteCollection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Удалить эту колоду из базы?')) {
      deleteCustomCollection(id);
      setCollections(loadAllCollections());
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      const parsed = parseWordListInput(content);
      if (parsed.length === 0) {
        setUploadFeedback('Не удалось распознать слова. Проверьте формат файла.');
        return;
      }

      onUpdateWords(parsed);
      setUploadFeedback(`Успешно загружено ${parsed.length} слов из файла "${file.name}"!`);
      setTimeout(() => {
        setUploadFeedback(null);
        setActiveTab('view');
      }, 1500);
    };
    reader.readAsText(file);
  };

  const handleProcessPastedWords = () => {
    const parsed = parseWordListInput(pasteText);
    if (parsed.length === 0) {
      alert('Пожалуйста, вставьте слова в поле ввода.');
      return;
    }
    onUpdateWords(parsed);
    setPasteText('');
    setActiveTab('view');
  };

  const handleAddSingleWord = () => {
    if (!newWord.trim() || !newRussian.trim()) return;
    const enriched = enrichSimpleWord(newWord, newRussian);
    if (newExample.trim()) enriched.example = newExample.trim();
    if (newDefinition.trim()) enriched.definition = newDefinition.trim();

    onUpdateWords([...words, enriched]);
    setNewWord('');
    setNewRussian('');
    setNewExample('');
    setNewDefinition('');
    setActiveTab('view');
  };

  const handleDeleteWord = (id: string) => {
    if (words.length <= 4) {
      alert('Рекомендуется оставить хотя бы 4 слова для корректной работы тестов и упражнений.');
      return;
    }
    onUpdateWords(words.filter((w) => w.id !== id));
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(words, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = 'vocabulary_deck.json';
    a.click();
  };

  const handleExportTxt = () => {
    const lines = words.map((w) => `${w.word} - ${w.russian}`).join('\n');
    const dataStr = 'data:text/plain;charset=utf-8,' + encodeURIComponent(lines);
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = 'vocabulary_words.txt';
    a.click();
  };

  const handleDownloadHtml = () => {
    const htmlContent = generateStandaloneHtml(words);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'blooms-taxonomy-vocabulary.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-purple-700 flex items-center gap-1.5">
              <FolderOpen className="w-3.5 h-3.5" />
              <span>База слов и колод · Vocabulary Manager</span>
            </div>
            <h3 className="text-xl font-heading font-extrabold text-slate-900 mt-0.5">
              Управление словарным запасом ({words.length} слов активно)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-2 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 bg-white">
          <div className="flex gap-1 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('collections')}
              className={`py-2.5 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'collections'
                  ? 'border-purple-600 text-purple-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Колоды из базы ({collections.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('view')}
              className={`py-2.5 px-3.5 text-xs font-bold border-b-2 transition-all ${
                activeTab === 'view'
                  ? 'border-purple-600 text-purple-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Текущие слова ({words.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`py-2.5 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'border-purple-600 text-purple-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Загрузить файл</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('paste')}
              className={`py-2.5 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'paste'
                  ? 'border-purple-600 text-purple-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Вставить списком</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('add')}
              className={`py-2.5 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'add'
                  ? 'border-purple-600 text-purple-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+1 Слово</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: COLLECTIONS LIBRARY */}
          {activeTab === 'collections' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600">
                  Выберите готовую тематическую базу слов или переключитесь на свою сохранённую колоду:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {collections.map((col) => (
                  <div
                    key={col.id}
                    onClick={() => handleSelectCollection(col)}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-purple-400 bg-white hover:bg-purple-50/30 transition-all cursor-pointer shadow-xs flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-purple-700 flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" /> {col.wordCount} слов
                        </span>
                        {col.isCustom && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                            Ваша колода
                          </span>
                        )}
                      </div>
                      <h4 className="font-heading font-extrabold text-base text-slate-900 group-hover:text-purple-900">
                        {col.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {col.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-purple-600 group-hover:translate-x-0.5 transition-transform">
                        Загрузить в пирамиду →
                      </span>
                      {col.isCustom && (
                        <button
                          type="button"
                          onClick={(e) => handleDeleteCollection(col.id, e)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Удалить колоду"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Save current words as a new deck */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5 text-purple-600" />
                  <span>Сохранить текущий набор из {words.length} слов как новую колоду в базе</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDeckName}
                    onChange={(e) => setNewDeckName(e.target.value)}
                    placeholder="Например: 'Урок 4: Глаголы движения' или 'Мои сложные слова'"
                    className="flex-1 p-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={handleSaveCurrentAsDeck}
                    className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-2xs whitespace-nowrap"
                  >
                    Сохранить в базу
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CURRENT WORDS LIST */}
          {activeTab === 'view' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Эти слова используются сейчас во всех 6 ступенях пирамиды Блума</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleExportTxt}
                    className="hover:text-slate-900 underline"
                  >
                    Экспорт в .txt
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="hover:text-slate-900 underline"
                  >
                    Экспорт в .json
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-100 max-h-[50vh] overflow-y-auto pr-1">
                {words.map((w, idx) => (
                  <div key={w.id} className="py-3 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                        <span className="font-heading font-extrabold text-base text-slate-900">
                          {w.word}
                        </span>
                        <span className="text-xs text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded">
                          {w.russian}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 italic">
                        "{w.example}"
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        <strong>Def:</strong> {w.definition}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteWord(w.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      title="Удалить слово"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: UPLOAD FILE */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="p-8 border-2 border-dashed border-slate-300 hover:border-purple-400 rounded-3xl text-center space-y-3 bg-slate-50/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-slate-900">
                    Загрузите файл со словами
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Поддерживаются файлы <strong>.txt</strong>, <strong>.csv</strong> или <strong>.json</strong>.
                  </p>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".txt,.csv,.json"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-sm transition-all"
                >
                  Выбрать файл на компьютере
                </button>
              </div>

              {uploadFeedback && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{uploadFeedback}</span>
                </div>
              )}

              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-purple-900 block flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Как оформить файл?
                </span>
                <p>Достаточно текстового файла (.txt), где каждая строка оформлена как:</p>
                <code className="block bg-white p-2 rounded border border-purple-200 font-mono text-[11px] text-slate-800">
                  hesitate - сомневаться<br />
                  persuade - убеждать<br />
                  reluctant - неохотный<br />
                  thrive - процветать
                </code>
                <p className="text-[11px] text-slate-500 pt-1">
                  Приложение автоматически сгенерирует для каждого слова упражнения всех 6 ступеней пирамиды!
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: PASTE LIST */}
          {activeTab === 'paste' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Вставьте сюда список слов (из учебника, Google Docs, Quizlet или заметок).
                <br />Формат: <code>слово - перевод</code> (или просто список английских слов по одному в строке).
              </p>
              <textarea
                rows={8}
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder={`negotiate - вести переговоры\ndelegate - поручать задачи\nstreamline - оптимизировать\nviable - жизнеспособный\nconsensus - единодушие`}
                className="w-full p-3 font-mono text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={handleProcessPastedWords}
                disabled={!pasteText.trim()}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs disabled:opacity-40"
              >
                Импортировать список и подготовить 6 уровней Блума
              </button>
            </div>
          )}

          {/* TAB 5: ADD SINGLE WORD */}
          {activeTab === 'add' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Добавьте одно слово вручную в текущую сессию:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Слово на английском *</label>
                  <input
                    type="text"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    placeholder="e.g. advocate"
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Перевод на русский (Шаг 1) *</label>
                  <input
                    type="text"
                    value={newRussian}
                    onChange={(e) => setNewRussian(e.target.value)}
                    placeholder="e.g. защищать, отстаивать"
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Пример предложения (необязательно)</label>
                <input
                  type="text"
                  value={newExample}
                  onChange={(e) => setNewExample(e.target.value)}
                  placeholder="e.g. She decided to advocate for clean energy initiatives."
                  className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Определение на английском (необязательно)</label>
                <input
                  type="text"
                  value={newDefinition}
                  onChange={(e) => setNewDefinition(e.target.value)}
                  placeholder="e.g. To publicly support or recommend a particular cause or policy."
                  className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="button"
                onClick={handleAddSingleWord}
                disabled={!newWord.trim() || !newRussian.trim()}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs disabled:opacity-40"
              >
                Добавить слово в цикл обучения
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => downloadProjectZip('blooms-taxonomy-vocabulary.zip')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs transition-colors"
              title="Скачать полный проект архивом .zip для загрузки на GitHub и Vercel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Скачать проект (.zip)</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadHtml}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-colors"
              title="Скачать полностью автономный HTML файл с текущими словами"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Скачать .html</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};
