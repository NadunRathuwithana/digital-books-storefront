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
import { useAppDispatch } from "@/lib/hooks";
import { addItem, openCart } from "@/lib/features/cart/cartSlice";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [book, setBook] = useState<Book | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Find the book
  useEffect(() => {
    const foundBook = books.find((b) => b.id === params.id);
    if (foundBook) {
      setBook(foundBook);
    }
  }, [params.id]);

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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={600}
                    height={800}
                    className="w-full h-[600px] object-cover"
                  />
                  {book.discount > 0 && (
                    <Badge className="absolute top-4 right-4 bg-red-500 text-white text-lg font-bold px-3 py-2">
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
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-4">
              {renderStars(book.rating)}
              <span className="text-lg text-muted-foreground">
                ({book.rating})
              </span>
            </div>

            <h1 className="text-4xl font-bold text-foreground">{book.title}</h1>

            <p className="text-xl text-muted-foreground">by {book.author}</p>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-foreground">
                ${finalPrice.toFixed(2)}
              </span>
              {book.discount > 0 && (
                <span className="text-2xl text-muted-foreground line-through">
                  ${book.price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Genre:</span>
                <Badge variant="secondary">{book.genre}</Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Pages:</span>
                <span className="text-muted-foreground">{book.pages}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Language:</span>
                <span className="text-muted-foreground">{book.language}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Format:</span>
                <span className="text-muted-foreground">{book.format}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">
                  Release Date:
                </span>
                <span className="text-muted-foreground">
                  {new Date(book.releaseDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
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
                <span className="px-4 py-2 border-x border-border min-w-[60px] text-center">
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
                  Add {quantity} to Cart - ${(finalPrice * quantity).toFixed(2)}
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
