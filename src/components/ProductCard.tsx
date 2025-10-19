"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";
import { Book, getFinalPrice } from "@/data/books";
import { useAppDispatch } from "@/lib/hooks";
import { slugify } from "@/lib/utils";
import { addItem, openCart } from "@/lib/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ProductCardProps {
  book: Book;
}

export default function ProductCard({ book }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  // Calculate the final price and discount percentage
  const finalPrice = getFinalPrice(book.price, book.discount);
  const discountPercentage = Math.round(book.discount * 100);

  // Add to cart
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    dispatch(addItem(book));

    // Add a small delay for better UX
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
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  // Render the product card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-xl">
        <div
          className="relative cursor-pointer"
          onClick={() => router.push(`/products/${slugify(book.title)}`)}
        >
          <Image
            src={book.coverImage}
            alt={book.title}
            width={300}
            height={400}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          {book.discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex items-center gap-1 mb-2">
            {renderStars(book.rating)}
            <span className="text-sm text-muted-foreground ml-1">
              ({book.rating})
            </span>
          </div>

          <h3
            className="font-semibold text-lg text-foreground mb-1 line-clamp-2 hover:text-primary transition-colors cursor-pointer"
            onClick={() => router.push(`/products/${slugify(book.title)}`)}
          >
            {book.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                ${finalPrice.toFixed(2)}
              </span>
              {book.discount > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  ${book.price.toFixed(2)}
                </span>
              )}
            </div>
            <Badge variant="secondary">{book.genre}</Badge>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full rounded-lg"
          >
            {isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
