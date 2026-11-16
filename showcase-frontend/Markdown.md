# Витрина проектов — Frontend

Фронтенд-часть платформы «Витрина проектов». 
**Автор:** Студент 3 курса. 
**Стек:** React (TypeScript), Vite, Tailwind CSS, Axios, React Router.

---

## 🚀 Быстрый старт (для разработчика)

1. **Клонируй репозиторий и установи зависимости:**
   ```bash
   git clone <ссылка_на_репозиторий>
   cd пд_витрина_фронт
   npm install

   ## 📁 Структура проекта (Дерево папок)

```text
пд_витрина_фронт/
├── public/                 # Статические файлы (не обрабатываются Vite)
│   ├── 1.png               # Картинка для шапки формы
│   └── favicon.svg         # Иконка сайта
│
├── src/                    # Исходный код
│   ├── api/                # Настройка запросов к серверу
│   │   └── instance.ts     # Инстанс Axios (baseURL из .env, withCredentials)
│   │
│   ├── components/         # Компоненты React
│   │   ├── showcase/       # Компоненты для страницы витрины
│   │   │   └── CreateApplicationProject.tsx # Форма подачи заявки (логика + UI)
│   │   ├── ui/             # Переиспользуемые UI-элементы
│   │   │   └── Button.tsx  # Кнопка
│   │   └── Header.tsx      # Шапка сайта (навигация)
│   │
│   ├── types/              # TypeScript-типы
│   │   └── index.ts        # Интерфейс ProjectApplicationPayload (описание JSON)
│   │
│   ├── App.tsx             # Главный компонент, роутинг (Routes)
│   ├── endpoints.ts        # Константы путей к API (ENDPOINTS)
│   ├── index.css           # Глобальные стили, подключение Tailwind
│   └── main.tsx            # Точка входа (обертка BrowserRouter)
│
├── .env                    # Переменные окружения (URL бэкенда)
├── index.html              # HTML-шаблон
├── package.json            # Зависимости и скрипты
├── tailwind.config.js      # Настройки Tailwind CSS
└── vite.config.ts          # Настройки сборщика Vite (прокси, порт)