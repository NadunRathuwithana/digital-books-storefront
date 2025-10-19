# Digital Books Storefront

A modern e-commerce storefront for digital books built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Redux Toolkit, and Framer Motion.

## Features

- **Product catalog**: Grid of books with cover, title, author, price, rating
- **Product details (slug routes)**: `/products/<slug>` with compact mobile-first UI
- **Mini cart (side drawer)**: Quick view/update with smooth animations
- **Cart page**: Update quantities, remove items, subtotal, clear cart
- **Persistent cart**: Saved to `localStorage` (survives refresh)
- **Responsive design**: Mobile-first; sticky mobile add-to-cart on product page
- **Price calculations**: Discount + final price shown consistently

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4 syntax in globals), shadcn/ui components
- **State**: Redux Toolkit with `localStorage` persistence
- **Animations**: Framer Motion
- **Icons**: lucide-react
- **Images**: Next.js Image (remote: `images.unsplash.com`, `picsum.photos`)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open the URL printed by Next.js (often `http://localhost:3001` if 3000 is busy)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout (Header, SideCart, Footer)
│   ├── page.tsx              # Home page (catalog)
│   ├── cart/page.tsx         # Full cart page
│   ├── products/[slug]/page.tsx # Product details by slug
│   └── globals.css           # Global styles
├── components/
│   ├── Header.tsx            # Sticky header with cart badge
│   ├── SideCart.tsx          # Mini cart (drawer)
│   ├── ProductCatalog.tsx    # Catalog grid
│   └── ProductCard.tsx       # Book card
├── data/
│   └── books.ts              # Book dataset (single-line entries)
└── lib/
    ├── store.ts              # Redux store with persistence
    ├── features/cart/cartSlice.ts # Cart slice (add/remove/update)
    ├── hooks.ts              # Typed Redux hooks
    └── utils.ts              # `cn` and `slugify`
```

## Implemented

✅ Catalog grid with ratings/discounts
✅ Product details via slug with sticky mobile add-to-cart bar
✅ Mini cart (drawer) and full cart page
✅ Quantity updates, remove, clear cart
✅ `localStorage` persistence
✅ Responsive, modern UI with shadcn/ui and Framer Motion

## Bonus Features

- **Quantity Updates**: Users can adjust quantities in both the cart and product detail modal
- **Total Price Display**: Real-time calculation of cart total
- **Loading States**: Visual feedback during cart operations
- **Star Ratings**: Visual representation of book ratings
- **Discount Badges**: Clear display of discount percentages
- **Genre Tags**: Book categorization for better organization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- Functional components with hooks (client components where needed)
- Redux Toolkit for state management
- Tailwind CSS + shadcn/ui for consistent, accessible UI
- Framer Motion for subtle animations
- Slug routing helper `slugify(title)` keeps links and lookup in sync

### Routing

- Home: `/`
- Product: `/products/<slug>` (e.g., `/products/the-art-of-focus`)
- Cart: `/cart`

## License

This project is created for assessment purposes.
