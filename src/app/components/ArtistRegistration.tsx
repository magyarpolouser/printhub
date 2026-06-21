import React from 'react';
import { motion } from 'motion/react';
import { Palette, TrendingUp, DollarSign, Users } from 'lucide-react';

export function ArtistRegistration() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-white"
          style={{
            boxShadow: `
              0 2px 4px rgba(0, 0, 0, 0.02),
              0 4px 8px rgba(0, 0, 0, 0.03),
              0 8px 16px rgba(0, 0, 0, 0.04),
              0 16px 32px rgba(0, 0, 0, 0.05),
              0 32px 64px rgba(0, 0, 0, 0.06),
              0 0 0 1px rgba(0, 0, 0, 0.03)
            `,
          }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Artist Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative h-[400px] overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 p-4"
            >
              {/* Image 1 - Top Left */}
              <motion.div
                className="absolute top-4 left-4 w-[45%] h-[42%] rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1751003801857-30d275cc8243?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBhcnRpc3QlMjBwYWludGluZyUyMHN0dWRpb3xlbnwxfHx8fDE3Njg4NTIzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Female artist painting"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Image 2 - Top Right (slightly lower) */}
              <motion.div
                className="absolute top-12 right-4 w-[42%] h-[38%] rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1726842172813-55c6e284f8b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZGVzaWduZXIlMjB3b3JraW5nJTIwbGFwdG9wfGVufDF8fHx8MTc2ODg1MjMyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Male designer working"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Image 3 - Bottom Left */}
              <motion.div
                className="absolute bottom-4 left-8 w-[38%] h-[40%] rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1752649936344-07bb02d049c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFydGlzdCUyMGNyZWF0aXZlJTIwcGVyc29ufGVufDF8fHx8MTc2ODg1MjMyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Young artist"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Image 4 - Bottom Right */}
              <motion.div
                className="absolute bottom-8 right-6 w-[35%] h-[35%] rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1693571109313-701c1929290f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBkcmF3aW5nJTIwdGFibGV0fGVufDF8fHx8MTc2ODg1MjMyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Artist drawing on tablet"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 pointer-events-none" />
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="p-6 lg:p-8 flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full w-fit mb-6">
                <Palette className="w-4 h-4" />
                <span className="text-sm">Join Our Artist Community</span>
              </div>

              <h2 className="text-4xl lg:text-5xl mb-6">
                Wanna Be an Artist and <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Earn Commission?</span>
              </h2>

              <p className="text-xl text-gray-600 mb-8">
                Turn your creativity into income. Upload your designs, reach millions of customers, and earn every time someone buys your artwork.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-start gap-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="text-sm">Earn Up to 20%</h4>
                  <p className="text-xs text-gray-500">Commission on every sale</p>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-pink-600" />
                  </div>
                  <h4 className="text-sm">Global Reach</h4>
                  <p className="text-xs text-gray-500">Millions of customers</p>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="text-sm">Easy Setup</h4>
                  <p className="text-xs text-gray-500">Start selling in minutes</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register as Artist
                </motion.button>
                <motion.button
                  className="bg-white text-purple-600 px-8 py-4 rounded-full border-2 border-purple-600 hover:bg-purple-50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                    10K+
                  </div>
                  <div className="text-sm text-gray-500">Active Artists</div>
                </div>
                <div>
                  <div className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                    $2M+
                  </div>
                  <div className="text-sm text-gray-500">Paid to Artists</div>
                </div>
                <div>
                  <div className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                    50K+
                  </div>
                  <div className="text-sm text-gray-500">Designs Sold</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}