"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  clearCart,
  removeItem,
  updateQuantity,
} from "@/lib/features/cart/cartSlice";
import { getFinalPrice } from "@/data/books";
import { ShoppingCart, Trash2 } from "lucide-react";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  // Calculate total price
  const total = items.reduce((sum, item) => {
    const price = getFinalPrice(item.book.price, item.book.discount);
    return sum + price * item.quantity;
  }, 0);

  // Render the cart page
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <Card className="shadow-none rounded-xl border border-gray-200">
          <CardContent className="p-20 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-500 mb-4" />
            <p className="text-gray-500 mb-10">Your cart is empty.</p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const price = getFinalPrice(item.book.price, item.book.discount);
              const line = price * item.quantity;
              return (
                <Card
                  key={item.book.id}
                  className="shadow-none rounded-none border-t-0 border-x-0 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0 last:mb-0"
                >
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 p-4">
                      <Image
                        src={item.book.coverImage}
                        alt={item.book.title}
                        width={120}
                        height={120}
                        className="w-20 h-24 object-cover rounded"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">
                          {item.book.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          by {item.book.author}
                        </p>
                        <p className="text-sm">${price.toFixed(2)} each</p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
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
                            -
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
                            +
                          </Button>
                        </div>
                        <p className="font-semibold">${line.toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          className="text-red-500"
                          onClick={() => dispatch(removeItem(item.book.id))}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div>
            <Card className="shadow-none rounded-xl border border-gray-200 sticky top-24">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => dispatch(clearCart())}
                  className="w-full"
                >
                  Clear Cart
                </Button>
                <Button className="w-full">Checkout</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
