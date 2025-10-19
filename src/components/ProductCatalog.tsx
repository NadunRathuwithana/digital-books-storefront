"use client";

import { motion } from "framer-motion";
import { Book } from "@/data/books";
import ProductCard from "./ProductCard";

interface ProductCatalogProps {
  books: Book[];
}

export default function ProductCatalog({ books }: ProductCatalogProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {books.map((book) => (
        <ProductCard key={book.id} book={book} />
      ))}
    </motion.div>
  );
}
