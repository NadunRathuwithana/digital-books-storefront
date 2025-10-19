"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openCart } from "@/lib/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <Link href="/" className="flex items-center gap-2">
              {/* <Image
                src="/images/logo.png"
                className="w-8 h-8"
                alt="Digital Books"
                width={100}
                height={100}
              /> */}
              <h1 className="text-xl font-bold text-foreground">
                Digital Books
              </h1>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              onClick={() => dispatch(openCart())}
              className="relative"
              variant="outline"
            >
              <ShoppingCart className="w-4 h-4" />
              <Badge
                className={cn(
                  "absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center",
                  (!mounted || totalItems === 0) && "opacity-0"
                )}
                aria-hidden={!mounted || totalItems === 0}
                suppressHydrationWarning
              >
                {mounted ? totalItems : null}
              </Badge>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
