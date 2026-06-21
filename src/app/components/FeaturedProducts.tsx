import React from 'react';
import { ProductCard } from './ProductCard';
import { motion } from 'motion/react';

export function FeaturedProducts() {
  const products = [
    {
      image: 'https://images.unsplash.com/photo-1657364890921-dbd85cf0398b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHQtc2hpcnQlMjBtb2NrdXB8ZW58MXx8fHwxNzY2MzQyMTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Premium Cotton T-Shirt',
      price: '$24.99',
      category: 'Bestseller',
      colors: ['#000000', '#FFFFFF', '#1E40AF']
    },
    {
      image: 'https://images.unsplash.com/photo-1593034528208-08d7a9eef742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtdWclMjB3aGl0ZXxlbnwxfHx8fDE3NjY0MDE5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Ceramic Coffee Mug',
      price: '$14.99',
      category: 'Popular',
      colors: ['#FFFFFF', '#000000', '#EF4444']
    },
    {
      image: 'https://images.unsplash.com/photo-1646679639653-3f26c67dfbae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwcGlsbG93fGVufDF8fHx8MTc2NjQzNDM1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Decorative Throw Pillow',
      price: '$29.99',
      category: 'New',
      colors: ['#8B5CF6', '#EC4899', '#3B82F6']
    },
    {
      image: 'https://images.unsplash.com/photo-1594433772491-a334862c7aa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNhc2UlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjY0MTAxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Custom Phone Case',
      price: '$19.99',
      category: 'Trending',
      colors: ['#000000', '#FFFFFF', '#F59E0B']
    },
    {
      image: 'https://images.unsplash.com/photo-1542957057-debadce4ce81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3RlJTIwYmFnJTIwY2FudmFzfGVufDF8fHx8MTc2NjQwMTkzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Canvas Tote Bag',
      price: '$16.99',
      category: 'Eco-Friendly',
      colors: ['#F5F5DC', '#000000', '#10B981']
    },
    {
      image: 'https://images.unsplash.com/photo-1589384267710-7a170981ca78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBzdGlja2Vyc3xlbnwxfHx8fDE3NjY0MzQzNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Vinyl Sticker Pack',
      price: '$8.99',
      category: 'Bundle',
      colors: ['#8B5CF6', '#EC4899', '#F59E0B']
    },
    {
      image: 'https://images.unsplash.com/photo-1761517099171-de5772a56956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBwcmludCUyMGRlc2lnbnxlbnwxfHx8fDE3NjY0MzQzNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Premium Art Print',
      price: '$34.99',
      category: 'Limited',
      colors: ['#000000', '#FFFFFF', '#6366F1']
    },
    {
      image: 'https://images.unsplash.com/photo-1628586431263-44040b966252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjYzOTEwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Designer Collection Set',
      price: '$49.99',
      category: 'Premium',
      colors: ['#8B5CF6', '#EC4899', '#3B82F6']
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl mb-4">
            Featured <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-xl text-gray-600">
            Discover our most popular custom printed items
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
