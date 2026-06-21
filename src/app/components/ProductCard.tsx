import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  category: string;
  colors?: string[];
}

export function ProductCard({ image, title, price, category, colors = ['#000', '#fff', '#e74c3c'] }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
        >
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
            <Eye className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-gray-800 mb-2">{title}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {price}
          </span>
          <div className="flex gap-1">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all">
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
