import React, { useState } from 'react';
import { ShoppingCart, User, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MegaMenuProps {
  onCategoryClick?: (category: string) => void;
}

export function MegaMenu({ onCategoryClick }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = {
    'T-Shirts': {
      categories: ['Men\'s T-Shirts', 'Women\'s T-Shirts', 'Kids T-Shirts', 'Oversized Tees'],
      styles: ['Graphic Tees', 'Plain Colors', 'Vintage', 'Sports'],
      featured: ['New Arrivals', 'Best Sellers', 'Limited Edition']
    },
    'Mugs': {
      categories: ['Coffee Mugs', 'Travel Mugs', 'Magic Mugs', 'Sets'],
      styles: ['Ceramic', 'Stainless Steel', 'Glass', 'Enamel'],
      featured: ['Custom Photo', 'Quotes', 'Personalized']
    },
    'Home Decor': {
      categories: ['Pillows', 'Wall Art', 'Blankets', 'Tapestries'],
      styles: ['Modern', 'Minimalist', 'Bohemian', 'Abstract'],
      featured: ['Seasonal', 'Designer Collection', 'Best Sellers']
    },
    'Accessories': {
      categories: ['Phone Cases', 'Tote Bags', 'Stickers', 'Posters'],
      styles: ['Minimalist', 'Colorful', 'Monochrome', 'Artistic'],
      featured: ['Trending', 'New Designs', 'Popular']
    }
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      {/* Top Bar - No Border */}
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

      {/* Main Navigation */}
      <div>
        <div className="bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  PrintHub
                </span>
              </div>

              {/* Menu Items */}
              <div className="flex items-center gap-8">
                {Object.keys(menuItems).map((item) => (
                  <div
                    key={item}
                    className="relative"
                    onMouseEnter={() => setActiveMenu(item)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <button className="flex items-center gap-1 py-2 hover:text-purple-400 transition-colors">
                      {item}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <a href="#" className="hover:text-purple-400 transition-colors">About</a>
                <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
              </div>

              {/* Right Side Icons */}
              <div className="flex items-center gap-6">
                <button className="hover:text-purple-400 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button className="hover:text-purple-400 transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <button className="hover:text-purple-400 transition-colors relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
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
                {/* Categories */}
                <div>
                  <h3 className="text-purple-400 mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {menuItems[activeMenu as keyof typeof menuItems].categories.map((cat) => (
                      <li key={cat}>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors block py-1">
                          {cat}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Styles */}
                <div>
                  <h3 className="text-pink-400 mb-4">Styles</h3>
                  <ul className="space-y-2">
                    {menuItems[activeMenu as keyof typeof menuItems].styles.map((style) => (
                      <li key={style}>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors block py-1">
                          {style}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Featured */}
                <div>
                  <h3 className="text-blue-400 mb-4">Featured</h3>
                  <ul className="space-y-2">
                    {menuItems[activeMenu as keyof typeof menuItems].featured.map((feat) => (
                      <li key={feat}>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors block py-1">
                          {feat}
                        </a>
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