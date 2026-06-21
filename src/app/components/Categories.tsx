import React from 'react';
import { motion } from 'motion/react';
import { Shirt, Coffee, Home, Smartphone, ShoppingBag, Sticker } from 'lucide-react';

export function Categories() {
  const categories = [
    {
      name: 'T-Shirts',
      icon: Shirt,
      count: '500+',
      color: 'from-purple-500 to-purple-600',
      image: 'https://images.unsplash.com/photo-1657364890921-dbd85cf0398b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHQtc2hpcnQlMjBtb2NrdXB8ZW58MXx8fHwxNzY2MzQyMTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Mugs',
      icon: Coffee,
      count: '300+',
      color: 'from-pink-500 to-pink-600',
      image: 'https://images.unsplash.com/photo-1593034528208-08d7a9eef742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtdWclMjB3aGl0ZXxlbnwxfHx8fDE3NjY0MDE5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Pillows',
      icon: Home,
      count: '200+',
      color: 'from-blue-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1646679639653-3f26c67dfbae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwcGlsbG93fGVufDF8fHx8MTc2NjQzNDM1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Phone Cases',
      icon: Smartphone,
      count: '400+',
      color: 'from-yellow-500 to-orange-600',
      image: 'https://images.unsplash.com/photo-1594433772491-a334862c7aa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNhc2UlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjY0MTAxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Tote Bags',
      icon: ShoppingBag,
      count: '250+',
      color: 'from-green-500 to-emerald-600',
      image: 'https://images.unsplash.com/photo-1542957057-debadce4ce81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3RlJTIwYmFnJTIwY2FudmFzfGVufDF8fHx8MTc2NjQwMTkzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: 'Stickers',
      icon: Sticker,
      count: '600+',
      color: 'from-red-500 to-rose-600',
      image: 'https://images.unsplash.com/photo-1589384267710-7a170981ca78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBzdGlja2Vyc3xlbnwxfHx8fDE3NjY0MzQzNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">
            Shop by <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-xl text-gray-600">
            Explore our wide range of customizable products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <Icon className="w-12 h-12 mb-2" />
                    <h3 className="text-lg">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count} designs</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
