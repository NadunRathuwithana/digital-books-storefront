"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Star, ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { books, getFinalPrice, Book } from "@/data/books";
import { slugify } from "@/lib/utils";
import { useAppDispatch } from "@/lib/hooks";
import { addItem, openCart } from "@/lib/features/cart/cartSlice";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [book, setBook] = useState<Book | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Find the book by slug from title
  useEffect(() => {
    const foundBook = books.find((b) => slugify(b.title) === slug);
    if (foundBook) {
      setBook(foundBook);
    }
  }, [slug]);

  // If the book is not found, show a message
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Book not found</h1>
          <Button onClick={() => router.push("/")} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Button>
        </div>
      </div>
    );
  }

  // Calculate the final price and discount percentage
  const finalPrice = getFinalPrice(book.price, book.discount);
  const discountPercentage = Math.round(book.discount * 100);

  // Add to cart
  const handleAddToCart = async () => {
    setIsAdding(true);

    // Add multiple quantities
    for (let i = 0; i < quantity; i++) {
      dispatch(addItem(book));
    }

    setTimeout(() => {
      setIsAdding(false);
      dispatch(openCart());
    }, 500);
  };

  // Render the stars
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-5 h-5 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  // Render the product detail page
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 md:mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-0 md:mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="relative"
          >
            <Card className="overflow-hidden rounded-xl shadow-sm">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={600}
                    height={800}
                    className="w-full h-[320px] sm:h-[380px] md:h-[560px] object-cover"
                  />
                  {book.discount > 0 && (
                    <Badge className="absolute top-3 right-3 bg-red-500 text-white text-xs md:text-sm font-bold px-2 py-1 md:px-3 md:py-2">
                      -{discountPercentage}%
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-4 md:space-y-6"
          >
            <div className="flex items-center gap-2 mb-2 md:mb-4">
              {renderStars(book.rating)}
              <span className="text-sm md:text-lg text-muted-foreground">
                ({book.rating})
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
              {book.title}
            </h1>

            <p className="text-base md:text-xl text-muted-foreground">
              by {book.author}
            </p>

            <div className="flex items-center gap-3 md:gap-4">
              <span className="text-2xl md:text-4xl font-bold text-foreground">
                ${finalPrice.toFixed(2)}
              </span>
              {book.discount > 0 && (
                <span className="text-sm md:text-2xl text-muted-foreground line-through">
                  ${book.price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="space-y-2 md:space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Genre: {book.genre}</Badge>
                <Badge variant="secondary">Pages: {book.pages}</Badge>
                <Badge variant="secondary">Lang: {book.language}</Badge>
                <Badge variant="secondary">Format: {book.format}</Badge>
                <Badge variant="secondary">
                  Released: {new Date(book.releaseDate).toLocaleDateString()}
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {book.description}
              </p>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <label className="font-semibold text-foreground">Quantity:</label>
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-3 md:px-4 py-2 border-x border-border min-w-[56px] md:min-w-[60px] text-center text-sm md:text-base">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="hidden md:block">
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                size="lg"
                className="w-full"
              >
                {isAdding ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Adding to Cart...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add {quantity} to Cart - $
                    {(finalPrice * quantity).toFixed(2)}
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile sticky add-to-cart bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/90 backdrop-blur px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold">${finalPrice.toFixed(2)}</span>
          {book.discount > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              ${book.price.toFixed(2)}
            </span>
          )}
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex-1"
        >
          {isAdding ? "Adding..." : `Add ${quantity} to Cart`}
        </Button>
      </div>
    </div>
  );
}
