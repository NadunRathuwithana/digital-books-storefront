"use client";

import { motion } from "framer-motion";
import { books } from "@/data/books";
import ProductCatalog from "@/components/ProductCatalog";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Digital Books Collection
          </h2>
          <p className="text-muted-foreground">
            Discover our curated selection of digital books across various
            genres
          </p>
        </motion.div>

        <ProductCatalog books={books} />
      </main>
    </div>
  );
}
