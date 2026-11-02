import React, { useState } from 'react';
import {
  X,
  Download,
  CheckCircle2,
  ExternalLink,
  Github,
  Rocket,
  FileCode,
  Copy,
  Check
} from 'lucide-react';
import { downloadProjectZip } from '../utils/projectZipGenerator';
import { generateStandaloneHtml } from '../utils/exportHtml';
import { VocabularyWord } from '../types/bloom';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  words: VocabularyWord[];
}

export const DeployModal: React.FC<DeployModalProps> = ({ isOpen, onClose, words }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadProjectZip('blooms-taxonomy-vocabulary.zip');
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate zip:', err);
      alert('Ошибка при генерации архива. Пожалуйста, попробуйте снова.');
    } finally {
      setIsDownloading(false);
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
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const gitCommands = `# 1. Распакуйте архив в папку и откройте в ней терминал:
git init
git add .
git commit -m "Bloom Taxonomy Vocabulary App"
git branch -M main
git remote add origin https://github.com/ВАШ_НИКНЕЙМ/blooms-vocabulary.git
git push -u origin main`;

  const copyGitCommands = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-extrabold text-slate-900 leading-tight">
                Скачать архив для GitHub и Vercel
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Готовый чистый архив без повреждений (генерируется прямо в браузере)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Action Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-heading font-extrabold text-slate-900 text-base">
                Архив проекта: blooms-taxonomy-vocabulary.zip
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-md">
                Содержит полный исходный код React 19 + TypeScript + Vite, файл <code>vercel.json</code>, автономный <code>.html</code> и инструкцию.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-6 py-3 rounded-xl text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all flex items-center gap-2 whitespace-nowrap shrink-0 disabled:opacity-50"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Архив скачан!</span>
                </>
              ) : isDownloading ? (
                <span>Формирование архива...</span>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Скачать .zip сейчас</span>
                </>
              )}
            </button>
          </div>

          {/* 3 Step Deployment Guide */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Пошаговая инструкция (3 простых шага):
            </h4>

            {/* Step 1: Unzip */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex gap-3.5">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div className="space-y-1 text-xs text-slate-700">
                <span className="font-bold text-slate-900 text-sm block font-heading">
                  Распакуйте архив на компьютере
                </span>
                <p>
                  Кликните правой кнопкой мыши по скачанному файлу <code>blooms-taxonomy-vocabulary.zip</code> $\to$ <strong>«Извлечь всё...»</strong> (Extract All). Теперь внутри находятся все файлы проекта.
                </p>
              </div>
            </div>

            {/* Step 2: GitHub */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex gap-3.5">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div className="space-y-2 text-xs text-slate-700 w-full">
                <span className="font-bold text-slate-900 text-sm block font-heading">
                  Создайте репозиторий на GitHub
                </span>
                <p>
                  Перейдите на <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-semibold inline-flex items-center gap-0.5">github.com/new <ExternalLink className="w-3 h-3" /></a>, укажите имя репозитория (например, <code>blooms-vocabulary</code>) и нажмите <strong>Create repository</strong>.
                </p>
                <div className="p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] relative">
                  <button
                    type="button"
                    onClick={copyGitCommands}
                    className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Копировать команды"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <pre className="overflow-x-auto whitespace-pre">{gitCommands}</pre>
                </div>
                <p className="text-[11px] text-slate-500">
                  <em>Или просто нажмите «uploading an existing file» на странице GitHub и перетащите все распакованные файлы туда через браузер.</em>
                </p>
              </div>
            </div>

            {/* Step 3: Vercel */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex gap-3.5">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div className="space-y-1.5 text-xs text-slate-700">
                <span className="font-bold text-slate-900 text-sm block font-heading">
                  Разверните на Vercel
                </span>
                <p>
                  Войдите на <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-semibold inline-flex items-center gap-0.5">vercel.com <ExternalLink className="w-3 h-3" /></a> через ваш GitHub, нажмите <strong>Add New... $\to$ Project</strong>, выберите созданный репозиторий и нажмите <strong>Deploy</strong>!
                </p>
                <p className="text-emerald-700 font-semibold text-[11px]">
                  ✓ В проекте уже есть файл <code>vercel.json</code>, поэтому сайт заработает сразу без дополнительных настроек.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            type="button"
            onClick={handleDownloadHtml}
            className="flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800"
          >
            <FileCode className="w-4 h-4" />
            <span>Также можно скачать одиночный .html файл</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
