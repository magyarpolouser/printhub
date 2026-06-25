import React, { useState } from 'react';
import { ShoppingCart, User, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';

interface MegaMenuProps {
  onCategoryClick?: (category: string) => void;
  onLoginClick?: () => void;
  onCartClick?: () => void;
  cartCount?: number;
}

export function MegaMenu({ onCategoryClick, onLoginClick, onCartClick, cartCount = 0 }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const menuItems = {
    'T-Shirts': {
      categories: ["Men's T-Shirts", "Women's T-Shirts", 'Kids T-Shirts', 'Oversized Tees'],
      styles: ['Graphic Tees', 'Plain Colors', 'Vintage', 'Sports'],
      featured: ['New Arrivals', 'Best Sellers', 'Limited Edition'],
    },
    'Mugs': {
      categories: ['Coffee Mugs', 'Travel Mugs', 'Magic Mugs', 'Sets'],
      styles: ['Ceramic', 'Stainless Steel', 'Glass', 'Enamel'],
      featured: ['Custom Photo', 'Quotes', 'Personalized'],
    },
    'Home Decor': {
      categories: ['Pillows', 'Wall Art', 'Blankets', 'Tapestries'],
      styles: ['Modern', 'Minimalist', 'Bohemian', 'Abstract'],
      featured: ['Seasonal', 'Designer Collection', 'Best Sellers'],
    },
    'Accessories': {
      categories: ['Phone Cases', 'Tote Bags', 'Stickers', 'Posters'],
      styles: ['Minimalist', 'Colorful', 'Monochrome', 'Artistic'],
      featured: ['Trending', 'New Designs', 'Popular'],
    },
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex gap-6">
            <span>Free Shipping on Orders Over $50</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">24/7 Customer Support</span>
          </div>
          <div className="flex gap-4 text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Track Order</a>
            <a href="#" className="hover:text-white transition-colors">Help</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                PrintHub
              </span>
            </Link>

            {/* Menu items */}
            <div className="hidden md:flex items-center gap-8">
              {Object.keys(menuItems).map((item) => (
                <div
                  key={item}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button
                    onClick={() => navigate('/shop')}
                    className="flex items-center gap-1 py-2 hover:text-purple-400 transition-colors"
                  >
                    {item}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <Link to="/shop" className="hover:text-purple-400 transition-colors">Shop</Link>
              <Link to="/artist-portal" className="hover:text-purple-400 transition-colors">Artists</Link>
              <Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6">
              <Link to="/search" className="hover:text-purple-400 transition-colors">
                <Search className="w-5 h-5" />
              </Link>
              <button
                onClick={onLoginClick ?? (() => navigate('/login'))}
                className="hover:text-purple-400 transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={onCartClick ?? (() => navigate('/cart'))}
                className="hover:text-purple-400 transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mega menu dropdown */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 bg-black border-t border-gray-800 shadow-2xl z-50"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h3 className="text-purple-400 mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {menuItems[activeMenu as keyof typeof menuItems].categories.map((cat) => (
                      <li key={cat}>
                        <Link to="/shop" className="text-gray-300 hover:text-white transition-colors block py-1">{cat}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-pink-400 mb-4">Styles</h3>
                  <ul className="space-y-2">
                    {menuItems[activeMenu as keyof typeof menuItems].styles.map((style) => (
                      <li key={style}>
                        <Link to="/shop" className="text-gray-300 hover:text-white transition-colors block py-1">{style}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-blue-400 mb-4">Featured</h3>
                  <ul className="space-y-2">
                    {menuItems[activeMenu as keyof typeof menuItems].featured.map((feat) => (
                      <li key={feat}>
                        <Link to="/shop" className="text-gray-300 hover:text-white transition-colors block py-1">{feat}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
