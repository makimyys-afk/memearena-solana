# MemeArena Website - Инструкция по установке и запуску

## 📦 Содержимое проекта

Полноценный веб-сайт MemeArena (SOL Edition) с:
- ✅ 6 страниц (Home, Arena, MemeDex, Leaderboard, Rewards, LiveBattle)
- ✅ 87 изображений (персонажи, иконки, фоны, UI элементы, эффекты)
- ✅ Адаптивный дизайн (desktop + mobile)
- ✅ Анимации (Framer Motion)
- ✅ Neon Solana стиль (#9945FF purple, #14F195 green)

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
cd memearena-website
pnpm install
```

(Если нет pnpm: `npm install -g pnpm`)

### 2. Запуск dev-сервера

```bash
pnpm run dev
```

Сайт откроется на `http://localhost:5173`

### 3. Сборка для продакшена

```bash
pnpm run build
```

Готовые файлы будут в папке `dist/`

## 📁 Структура проекта

```
memearena-website/
├── src/
│   ├── assets/              # Все изображения и данные
│   │   ├── characters/      # 20 главных артов бойцов
│   │   ├── icons/           # 20 иконок для UI
│   │   ├── backgrounds/     # 20 градиентных фонов
│   │   ├── ui-assets/       # Лого, кнопки, медали
│   │   ├── effects/         # Боевые эффекты
│   │   ├── meme-data.json   # Данные всех 20 бойцов
│   │   └── leaderboard-sample.json
│   │
│   ├── components/
│   │   ├── ui/              # shadcn/ui компоненты
│   │   └── Navigation.jsx   # Навигация сайта
│   │
│   ├── pages/
│   │   ├── HomePage.jsx     # Главная страница
│   │   ├── ArenaPage.jsx    # Арена боёв
│   │   ├── MemeDexPage.jsx  # Каталог бойцов
│   │   ├── LeaderboardPage.jsx  # Таблица лидеров
│   │   ├── RewardsPage.jsx  # Награды и казна
│   │   └── LiveBattlePage.jsx   # Живой бой
│   │
│   ├── App.jsx              # Главный компонент с роутингом
│   ├── App.css              # Стили (Tailwind + кастом)
│   └── main.jsx             # Точка входа
│
├── index.html               # HTML шаблон
├── package.json             # Зависимости
└── vite.config.js           # Конфиг Vite
```

## 🎨 Технологии

- **React** - UI библиотека
- **Vite** - Сборщик
- **React Router** - Навигация
- **Tailwind CSS** - Стили
- **shadcn/ui** - UI компоненты
- **Framer Motion** - Анимации
- **Lucide Icons** - Иконки

## 📄 Страницы сайта

### 1. HomePage (`/`)
- Hero секция с логотипом
- 3 featured бойца (BONK, WIF, POPCAT)
- "How It Works" секция
- CTA кнопки

### 2. ArenaPage (`/arena`)
- Список активных боёв
- Статистика (Active Battles, Players Online, Prize Pool)
- Кнопка "Create New Battle"
- Превью режимов (Airdrop Mode, Rug War Mode)

### 3. MemeDexPage (`/memedex`)
- Сетка всех 20 бойцов
- Фильтрация по типу (Canine, Cat, Token Lord, AI Entity)
- Модальное окно с деталями бойца
- Статистика каждого бойца

### 4. LeaderboardPage (`/leaderboard`)
- Топ-3 подиум с медалями
- Полная таблица лидеров
- Статистика (Wins, Losses, Win Rate, Earned SOL)
- Общая статистика

### 5. RewardsPage (`/rewards`)
- Визуализация казны (Treasury Vault)
- Статистика платформы
- Распределение комиссии (3% / 97%)
- "How to Earn" секция

### 6. LiveBattlePage (`/battle/:id`)
- 3 фазы: intro, fighting, result
- Анимации боя
- Эффекты (energy collision, pump it, victory flash)
- Результат с призом

## 🎮 Данные бойцов

Все 20 бойцов в `src/assets/meme-data.json`:

**Canine Warriors (5):**
1. BONK - Bonk the Barklord
2. WIF - WIF the Hat God
3. MYRO - MYRO the Loyal
4. SAMO - SAMO the Samoyed
5. HAMS - HAMS the Hamster

**Feline Fighters (4):**
6. POPCAT - POPCAT the Clicker
7. MEW - MEW the Mystic
8. CHONK - CHONK the Absolute Unit
9. MOONCAT - MOONCAT the Lunar

**Token Lords (7):**
10. BOME - BOME the Book
11. HONEY - HONEY the Sweet
12. FARTCOIN - FARTCOIN the Gaseous
13. GUAC - GUAC the Green
14. SLERF - SLERF the Accidental
15. MOG - MOG the Mogul
16. CHIP - CHIP the Chipper

**AI Entities (4):**
17. TAIKO - TAIKO the Drummer
18. TNSR - TNSR the Tensor
19. SC - SC the Strategist
20. TOSHI - TOSHI the Wise

Все бойцы имеют равные характеристики:
- Power: 80
- Speed: 80
- Luck: 80
- MemeEnergy: 80

## 🎨 Дизайн система

### Цвета
- **Primary Purple**: `#9945FF` (Solana brand)
- **Primary Green**: `#14F195` (Solana brand)
- **Accent Gold**: `#FFD700` (rewards)
- **Background**: `#000000` (black)

### Эффекты
- Neon glow на кнопках и границах
- Drop shadows с цветами Solana
- Hover анимации (scale, lift)
- Плавные transitions

### Шрифты
- System fonts (оптимизация)
- Bold weights для заголовков
- Gradient text для акцентов

## 🔌 Интеграция с Solana (TODO)

Для подключения к Solana blockchain:

1. Установить зависимости:
```bash
pnpm add @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-wallets @coral-xyz/anchor
```

2. Создать Anchor программу (смарт-контракт)

3. Добавить Wallet Adapter в App.jsx

4. Подключить транзакции в ArenaPage

## 📱 Адаптивность

Сайт полностью адаптивен:
- Desktop (1920px+)
- Tablet (768px - 1920px)
- Mobile (320px - 768px)

Мобильное меню с hamburger icon.

## 🚀 Деплой

### Vercel
```bash
pnpm run build
vercel --prod
```

### Netlify
```bash
pnpm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
pnpm run build
# Загрузить dist/ в gh-pages branch
```

## 📝 Лицензия

Все ассеты созданы специально для проекта MemeArena.

## 🎯 Следующие шаги

1. ✅ Фронтенд готов
2. ⏳ Создать Anchor программу (смарт-контракт)
3. ⏳ Интегрировать Wallet Adapter
4. ⏳ Подключить транзакции SOL
5. ⏳ Добавить реальные данные с блокчейна
6. ⏳ Тестирование на Devnet
7. ⏳ Деплой на Mainnet

---

**Создано для Solana community ❤️**

**Powered by React + Vite + Tailwind CSS**
