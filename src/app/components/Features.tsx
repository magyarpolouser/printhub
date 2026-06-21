import React from 'react';
import { motion } from 'motion/react';
import { Truck, Shield, Palette, Headphones } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $50',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: '100% satisfaction guaranteed',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Palette,
      title: 'Custom Designs',
      description: 'Unlimited design options',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Always here to help',
      color: 'from-yellow-500 to-orange-600'
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
