# Bloom's Taxonomy Vocabulary Mastery

Интерактивная система глубокого изучения английских слов на основе 6 уровней таксономии Блума:
1. **Remembering (Запоминание):** 3D-флешкарты (русский перевод -> английское слово с примером и озвучкой) + тест на распознавание.
2. **Understanding (Понимание):** Сопоставление определений и синонимов (только на английском).
3. **Applying (Применение):** Заполнение пропусков через выпадающие списки, завершение предложений и диалоги.
4. **Analyzing (Анализ):** «Третий лишний», морфологические семьи слов (*verb -> noun -> adjective -> adverb*) и распределение по категориям.
5. **Evaluating (Оценка):** Открытые вопросы с образцами ответов, регистры речи (Formal / Neutral / Informal / Slang) и дебаты Agree / Disagree.
6. **Creating (Творчество):** Личное эссе, деловое письмо и сочинение историй с интерактивным банком слов.

---

## 🚀 Быстрый запуск локально

1. Установите зависимости:
```bash
npm install
```

2. Запустите локальный сервер разработки:
```bash
npm run dev
```

3. Откройте в браузере: `http://localhost:5173` (или указанный в консоли порт).

4. Собрать production-билд:
```bash
npm run build
```

---

## 🌐 Развёртывание на Vercel через GitHub

1. **Создайте репозиторий на GitHub:**
   - Перейдите на [github.com/new](https://github.com/new).
   - Назовите репозиторий (например, `blooms-vocabulary`).
   - Нажмите **Create repository**.

2. **Загрузите код:**
   - Распакуйте скачанный zip-архив в папку на компьютере.
   - Инициализируйте Git и отправьте код в репозиторий:
     ```bash
     git init
     git add .
     git commit -m "Initial commit of Bloom's Taxonomy Vocabulary App"
     git branch -M main
     git remote add origin https://github.com/ВАШ_ЛОГИН/blooms-vocabulary.git
     git push -u origin main
     ```
   *(Или просто перетащите файлы через браузер на странице репозитория GitHub: «uploading an existing file»).*

3. **Развёртывание на Vercel:**
   - Войдите на [vercel.com](https://vercel.com) через ваш GitHub аккаунт.
   - Нажмите **Add New...** -> **Project**.
   - Выберите ваш репозиторий `blooms-vocabulary` и нажмите **Import**.
   - Настройки сборки Vercel определит автоматически (Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`).
   - Нажмите **Deploy**! Через 30 секунд ваш сайт будет доступен в интернете по бесплатному HTTPS-адресу.

---

## 📄 Автономный HTML-файл (Offline Single-File)
В папке проекта также доступен полностью автономный файл `blooms_taxonomy_vocabulary.html`, который не требует Node.js и открывается в любом браузере даже без интернета!
