# 💡 Примеры и подсказки для ÉTT Market

## Категории и лейблы (frontend)

`types/product.ts`:
```ts
import type { Category } from "../lib/types";

export const categoryLabels: Record<Category, string> = {
  clothing: "Одежда",
  accessories: "Аксессуары",
  gadgets: "Гаджеты",
  home: "Дом",
};
```

Использование:
```tsx
import { categoryLabels } from "@/types/product";

const label = categoryLabels[product.category];
```

## Метаданные страницы категории

`app/category/[category]/page.tsx`:
```ts
export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryKey = categoryFromSlug(category);

  if (!categoryKey) {
    return { title: "Категория не найдена — ÉTT Market" };
  }

  const categoryLabel = categoryLabels[categoryKey];
  return {
    title: `${categoryLabel} — ÉTT Market`,
    description: `Подборка товаров категории: ${categoryLabel}.`,
  };
}
```

## Метки в карточке товара

```tsx
{product.is_sponsored && <p className="so-meta">Реклама</p>}
{product.is_affiliate && <p className="so-meta">Партнерский товар</p>}
```

## Превью видео в админке

В `/admin` изображения поддерживают mp4:
```tsx
const isVideo = (src: string) => /\.mp4(\?|$)/i.test(src);
<video src={img} autoPlay loop muted playsInline />
```

## Быстрый чек-лист перед деплоем

- Все тексты на русском, бренд — ÉTT Market  
- Категории в коде на английском, лейблы на русском  
- `.env.local` содержит Supabase URL + anon key и `ADMIN_PASSWORD`  
- `npm run lint && npm run build` проходит
