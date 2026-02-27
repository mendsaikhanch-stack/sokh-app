# E-commerce Site-д Зориулсан Claude Prompt

## Prompt

```
Build a complete, modern e-commerce single-page application as a React component (.jsx file).

## Core Features:
1. **Product Catalog** — Grid layout showing products with image placeholders, name, price, rating, and "Add to Cart" button. Include category filtering and search bar.

2. **Shopping Cart** — Slide-out cart panel showing added items, quantity controls (+/-), item removal, subtotal per item, and order total. Cart icon in header shows item count badge.

3. **Product Detail Modal** — Clicking a product opens a modal with larger image, full description, size/variant selector, quantity picker, and "Add to Cart".

4. **Checkout Flow** — Multi-step checkout: Shipping info → Payment info → Order review → Confirmation. Form validation on each step.

5. **User Auth UI** — Login/Register modal with form fields (no real backend needed, just UI + local state).

6. **Responsive Design** — Fully responsive: mobile-first with hamburger menu, works on all screen sizes.

## Design Requirements:
- Use Tailwind CSS utility classes only
- Clean, modern aesthetic with a professional color scheme (e.g., indigo/slate or your choice)
- Smooth transitions and hover effects
- Proper spacing, typography hierarchy
- Loading states and empty states

## State Management:
- Use React useState/useReducer for all state
- Persist cart state in component state (no localStorage)
- Include at least 12 sample products across 4+ categories with realistic names, descriptions, and prices

## Additional UI Elements:
- Hero banner section with CTA
- Newsletter signup footer
- Breadcrumb navigation
- Toast notifications for cart actions
- Wishlist functionality
- Sort by price/rating/name

Make it production-quality, visually polished, and fully interactive. All in a single .jsx file with default export.
```

---

## Git Push Сануулга

Код бэлэн болсны дараа дараах command-уудыг **заавал** ажиллуулаарай:

```bash
# Өөрчлөлтүүдээ нэмэх
git add .

# Commit хийх (мессежээ ойлгомжтой бичих)
git commit -m "feat: add e-commerce site with cart, checkout, and product catalog"

# Push хийх
git push origin main
```

### Зөвлөгөө

- Commit message-ээ **Conventional Commits** форматаар бичвэл сайн (`feat:`, `fix:`, `style:` гэх мэт)
- Том feature бол branch үүсгээд PR нээх нь дээр: `git checkout -b feature/ecommerce-site`
- `.gitignore` файлдаа `node_modules/`, `.env` зэргийг нэмсэн эсэхээ шалгаарай
