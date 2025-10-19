# Digital Books Storefront

A modern e-commerce platform for selling digital books, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Product Catalog**: Browse a curated collection of digital books with beautiful cover images
- **Product Details**: View detailed information about each book including description, ratings, and specifications
- **Shopping Cart**: Add, remove, and update quantities of books in your cart
- **Persistent Cart**: Cart contents are saved in localStorage and persist between page reloads
- **Responsive Design**: Optimized for both mobile and desktop devices
- **Dark Mode Support**: Automatic dark/light mode based on system preferences
- **Price Calculations**: Automatic discount calculations and total price computation

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with localStorage persistence
- **UI Components**: Custom React components
- **Images**: Next.js Image optimization

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── Header.tsx      # Site header with cart
│   ├── ProductCard.tsx # Individual book card
│   ├── ProductCatalog.tsx # Book grid layout
│   ├── ProductDetailModal.tsx # Book detail modal
│   └── ShoppingCart.tsx # Shopping cart modal
├── data/              # Static data
│   └── books.ts       # Book catalog data
└── lib/               # Utilities
    └── cart-store.ts  # Zustand cart store
```

## Features Implemented

✅ **Product Catalog**: Grid layout displaying books with cover images, titles, authors, and prices
✅ **Product Details**: Modal with comprehensive book information
✅ **Add to Cart**: Add books to shopping cart with quantity selection
✅ **Cart Management**: View, update quantities, and remove items from cart
✅ **Price Calculations**: Discount calculations and total price display
✅ **Responsive Design**: Mobile-first design that works on all screen sizes
✅ **Cart Persistence**: Cart state saved in localStorage
✅ **Modern UI**: Clean, professional design with hover effects and animations

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

## Development

The project uses modern React patterns including:

- Functional components with hooks
- TypeScript for type safety
- Zustand for state management
- Tailwind CSS for styling
- Next.js Image optimization

## License

This project is created for assessment purposes.
