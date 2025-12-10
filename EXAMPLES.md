# 💡 Примеры кода ÉTT Market

## 🛍 Добавление нового товара

> Примечание: товары теперь хранятся в Supabase и добавляются через админку `/admin`. Примеры ниже показывают старый формат статического массива и могут использоваться только как справочник по полям.

### Минимальный пример

```typescript
// Откройте: data/products.ts

{
  id: "gd-005",
  title: "AirPods Pro 2",
  category: "gadgets",
  shortDescription: "Активное шумоподавление. Прозрачный режим. Адаптивное аудио.",
  images: ["https://images.unsplash.com/photo-..."],
  externalUrl: "https://www.apple.com/airpods-pro/",
  sourceLabel: "Apple Store",
  createdAt: new Date("2025-12-10"),
}
```

### С реферальной ссылкой

```typescript
{
  id: "bk-004",
  title: "The Design of Everyday Things",
  category: "books",
  shortDescription: "Классика UX-дизайна от Дона Нормана.",
  images: ["https://..."],
  externalUrl: "https://ozon.ru/?ref=YOUR_REF_ID",
  sourceLabel: "Ozon",
  isAffiliate: true,  // ← Покажет "Affiliate"
  createdAt: new Date("2025-12-10"),
}
```

### Спонсорский товар

```typescript
{
  id: "sv-004",
  title: "ChatGPT Plus",
  category: "services",
  shortDescription: "GPT-4, DALL-E 3, приоритетный доступ.",
  images: ["https://..."],
  externalUrl: "https://openai.com/chatgpt/plus",
  sourceLabel: "OpenAI",
  isSponsored: true,  // ← Покажет "Sponsored" метку
  createdAt: new Date("2025-12-10"),
}
```

---

## 🏷 Добавление новой категории

### Шаг 1: types/product.ts

```typescript
export type Category =
  | "clothing"
  | "accessories"
  | "gadgets"
  | "apps"
  | "books"
  | "music"
  | "movies"
  | "services"
  | "travel"        // ← Новая категория
  | "food";         // ← Новая категория

export const categoryLabels: Record<Category, string> = {
  // ... существующие
  travel: "Путешествия",
  food: "Еда",
};
```

### Шаг 2: components/Header.tsx

```typescript
const categories: Category[] = [
  "clothing",
  "accessories",
  "gadgets",
  "apps",
  "books",
  "music",
  "movies",
  "services",
  "travel",         // ← Добавьте
  "food",          // ← Добавьте
];
```

### Шаг 3: app/page.tsx

```typescript
const categories: Category[] = [
  "clothing",
  "accessories",
  "gadgets",
  "apps",
  "books",
  "music",
  "movies",
  "services",
  "travel",         // ← Добавьте
  "food",          // ← Добавьте
];
```

### Шаг 4: app/category/[category]/page.tsx

```typescript
export async function generateStaticParams() {
  const categories: Category[] = [
    "clothing",
    "accessories",
    "gadgets",
    "apps",
    "books",
    "music",
    "movies",
    "services",
    "travel",       // ← Добавьте
    "food",        // ← Добавьте
  ];

  return categories.map((category) => ({
    category,
  }));
}
```

---

## 🎨 Изменение цветов

### Пример: сделать тёмную тему

```typescript
// Откройте: tailwind.config.ts

colors: {
  white: "#1A1A1A",         // Тёмный фон
  "gray-lightest": "#2D2D2D",
  "gray-light": "#404040",
  "gray-text": "#A0A0A0",
  "gray-dark": "#FFFFFF",   // Светлый текст
}
```

### Пример: минт-палитра

```typescript
colors: {
  white: "#FFFFFF",
  "gray-lightest": "#F0FDF4",   // Светло-зелёный
  "gray-light": "#D1FAE5",       // Зелёный
  "gray-text": "#6B7280",
  "gray-dark": "#064E3B",        // Тёмно-зелёный
}
```

---

## 📝 Изменение текстов

### Главная страница

```typescript
// Откройте: app/page.tsx

<h1 className="...">
  ÉTT Market  {/* ← Измените название */}
</h1>
<p className="...">
  Curated-витрина интересных вещей...  {/* ← Измените описание */}
</p>
```

### Футер

```typescript
// Откройте: components/Footer.tsx

<p className="...">
  ÉTT Market — curated-витрина интересных вещей.  {/* ← Измените */}
</p>
```

### Кнопка товара

```typescript
// Откройте: components/ProductCard.tsx

<button onClick={handleClick} className="...">
  Перейти к товару  {/* ← Измените текст кнопки */}
</button>
```

---

## 🔧 Настройка метаданных (SEO)

### Главная страница

```typescript
// Откройте: app/layout.tsx

export const metadata: Metadata = {
  title: "ÉTT Market — Curated витрина",  // ← Измените
  description: "...",                   // ← Измените
  keywords: ["curated", "витрина"],    // ← Добавьте ключевые слова
};
```

### Страница категории

```typescript
// Откройте: app/category/[category]/page.tsx

export async function generateMetadata({ params }: CategoryPageProps) {
  // Здесь можно настроить title и description для каждой категории
  return {
    title: `${categoryLabel} — ÉTT Market`,
    description: `Curated подборка: ${categoryLabel}`,
  };
}
```

---

## 📱 Адаптивность

### Сетка товаров

```typescript
// Откройте: components/ProductGrid.tsx

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {/*
    grid-cols-1     → 1 колонка на мобильных
    sm:grid-cols-2  → 2 колонки на планшетах
    lg:grid-cols-3  → 3 колонки на десктопе
    xl:grid-cols-4  → 4 колонки на больших экранах
  */}
</div>
```

Чтобы изменить количество колонок, просто измените числа.

---

## 🖼 Добавление изображений

### Из внешних источников (рекомендуется)

```typescript
images: [
  "https://images.unsplash.com/photo-...",
  "https://cdn.example.com/product.jpg"
]
```

### Из папки public/

```typescript
// 1. Положите изображение в public/images/product.jpg
// 2. Используйте в товаре:

images: ["/images/product.jpg"]
```

---

## 🔍 Фильтрация и поиск (для будущего)

Сейчас фильтрации нет, но можно легко добавить:

```typescript
// В data/products.ts

export const searchProducts = (query: string): Product[] => {
  return products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.shortDescription.toLowerCase().includes(query.toLowerCase())
  );
};

export const filterBySource = (source: string): Product[] => {
  return products.filter((product) =>
    product.sourceLabel === source
  );
};
```

---

## 🌐 Деплой на Vercel

```bash
# 1. Установите Vercel CLI
npm i -g vercel

# 2. Залогиньтесь
vercel login

# 3. Задеплойте проект
vercel

# 4. Продакшен деплой
vercel --prod
```

Или подключите GitHub репозиторий к Vercel — деплой будет автоматическим.

---

Больше информации в [README.md](README.md) и [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
