import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "@/data/books";

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Book>) => {
      const existingItem = state.items.find(
        (item) => item.book.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ book: action.payload, quantity: 1 });
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.book.id !== action.payload
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ bookId: string; quantity: number }>
    ) => {
      const { bookId, quantity } = action.payload;
      const item = state.items.find((item) => item.book.id === bookId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.book.id !== bookId);
        } else {
          item.quantity = quantity;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
