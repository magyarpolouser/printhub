import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full mb-6 border border-purple-500/30">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">New Collection Available</span>
            </div>
            
            <h1 className="text-6xl mb-6">
              Design Your
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Perfect Print
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Transform your ideas into stunning custom products. From t-shirts to mugs, 
              phone cases to pillows - we bring your creativity to life with premium quality printing.
            </p>

            <div className="flex gap-4">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full flex items-center gap-2 transition-all transform hover:scale-105">
                Start Designing
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-white/30 hover:bg-white/10 px-8 py-4 rounded-full transition-all">
                Browse Products
              </button>
            </div>

            <div className="flex gap-12 mt-12">
              <div>
                <div className="text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                  50K+
                </div>
                <div className="text-gray-400">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-1">
                  100K+
                </div>
                <div className="text-gray-400">Products Sold</div>
              </div>
              <div>
                <div className="text-3xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  4.9★
                </div>
                <div className="text-gray-400">Average Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <img
                  src="https://images.unsplash.com/photo-1657364890921-dbd85cf0398b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHQtc2hpcnQlMjBtb2NrdXB8ZW58MXx8fHwxNzY2MzQyMTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="T-Shirt"
                  className="w-full h-48 object-cover rounded-xl mb-3"
                />
                <h3>Custom T-Shirts</h3>
                <p className="text-sm text-gray-400">From $19.99</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-8"
              >
                <img
                  src="https://images.unsplash.com/photo-1593034528208-08d7a9eef742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtdWclMjB3aGl0ZXxlbnwxfHx8fDE3NjY0MDE5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Mug"
                  className="w-full h-48 object-cover rounded-xl mb-3"
                />
                <h3>Premium Mugs</h3>
                <p className="text-sm text-gray-400">From $12.99</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
