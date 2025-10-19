import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

const STORAGE_KEY = "cart-state-v1";

function loadState() {
  if (typeof window === "undefined") return undefined;
  try {
    const serialized = window.localStorage.getItem(STORAGE_KEY);
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch {
    return undefined;
  }
}

const rootReducer = combineReducers({
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const preloaded = loadState() as Partial<RootState> | undefined;

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloaded,
});

// Persist to localStorage on changes (browser only)
if (typeof window !== "undefined") {
  store.subscribe(() => {
    const state = store.getState();
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ cart: state.cart })
      );
    } catch {
      // ignore quota errors
    }
  });
}

export type AppDispatch = typeof store.dispatch;
