import React, { useState, createContext, useContext } from "react";
import { Outlet, useNavigate } from "react-router";
import { MegaMenu } from "./components/MegaMenu";
import { AnimatedLights } from "./components/AnimatedLights";
import { Footer } from "./components/Footer";

interface CartItem {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  total: number;
}

export const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQty: () => {},
  total: 0,
});

export function useCart() {
  return useContext(CartContext);
}

export function Root() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) { removeItem(id); return; }
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i));
  };

  const total = cartItems.reduce((sum, i) => sum + parseFloat(i.price.replace("$", "")) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items: cartItems, addItem, removeItem, updateQty, total }}>
      <div className="min-h-screen bg-white">
        <AnimatedLights />
        <MegaMenu
          onLoginClick={() => navigate("/login")}
          cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
          onCartClick={() => navigate("/cart")}
        />
        <Outlet />
        <Footer />
      </div>
    </CartContext.Provider>
  );
}
