"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  closeCart,
  removeItem,
  updateQuantity,
  clearCart,
} from "@/lib/features/cart/cartSlice";
import { getFinalPrice } from "@/data/books";

// Calculate total price
export default function SideCart() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);

  const totalPrice = items.reduce((total, item) => {
    const finalPrice = getFinalPrice(item.book.price, item.book.discount);
    return total + finalPrice * item.quantity;
  }, 0);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => dispatch(closeCart())}
          />

          {/* Side Cart */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Cart ({totalItems})</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch(closeCart())}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-muted-foreground">
                    Add some books to get started!
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => {
                    const finalPrice = getFinalPrice(
                      item.book.price,
                      item.book.discount
                    );
                    const itemTotal = finalPrice * item.quantity;

                    return (
                      <motion.div
                        key={item.book.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="shadow-none rounded-none border-t-0 border-x-0 pb-4 border-b border-gray-200">
                          <CardContent className="p-0">
                            <div className="flex items-center gap-4">
                              <Image
                                src={item.book.coverImage}
                                alt={item.book.title}
                                width={120}
                                height={120}
                                className="w-18 h-20 object-cover rounded"
                              />

                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground truncate">
                                  {item.book.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  by {item.book.author}
                                </p>
                                <p className="text-sm font-medium text-foreground">
                                  ${finalPrice.toFixed(2)} each
                                </p>
                              </div>

                              <div className="flex flex-col items-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    dispatch(removeItem(item.book.id))
                                  }
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>

                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      dispatch(
                                        updateQuantity({
                                          bookId: item.book.id,
                                          quantity: item.quantity - 1,
                                        })
                                      )
                                    }
                                    className="w-8 h-8 p-0"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="w-8 text-center text-sm">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      dispatch(
                                        updateQuantity({
                                          bookId: item.book.id,
                                          quantity: item.quantity + 1,
                                        })
                                      )
                                    }
                                    className="w-8 h-8 p-0"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </div>

                                <p className="font-semibold text-foreground text-sm">
                                  ${itemTotal.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-border p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-foreground">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => dispatch(clearCart())}
                    className="flex-1"
                  >
                    Clear Cart
                  </Button>
                  <Link href="/cart" className="flex-1">
                    <Button
                      onClick={() => dispatch(closeCart())}
                      className="w-full"
                    >
                      Go to Cart
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
