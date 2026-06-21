import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { motion, AnimatePresence } from 'motion/react';

type Thematic = 'Christmas' | 'Halloween' | 'Birthday' | 'Summer' | 'Anime' | 'Animals' | 'Sports';

export function ThematicProducts() {
  const [activeThematic, setActiveThematic] = useState<Thematic>('Christmas');

  const thematics: Thematic[] = ['Christmas', 'Halloween', 'Birthday', 'Summer', 'Anime', 'Animals', 'Sports'];

  const products: Record<Thematic, Array<{
    image: string;
    title: string;
    price: string;
    category: string;
    colors: string[];
  }>> = {
    Christmas: [
      { image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=500', title: 'Christmas Sweater Mug', price: '$16.99', category: 'Mug', colors: ['#DC2626', '#16A34A', '#FFFFFF'] },
      { image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500', title: 'Santa Claus T-Shirt', price: '$24.99', category: 'T-Shirt', colors: ['#DC2626', '#FFFFFF', '#000000'] },
      { image: 'https://images.unsplash.com/photo-1544957992-20514f595d6f?w=500', title: 'Snowflake Pillow', price: '$29.99', category: 'Pillow', colors: ['#FFFFFF', '#3B82F6', '#DC2626'] },
      { image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500', title: 'Reindeer Phone Case', price: '$19.99', category: 'Phone Case', colors: ['#92400E', '#DC2626', '#16A34A'] },
      { image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=500', title: 'Holiday Tote Bag', price: '$18.99', category: 'Tote Bag', colors: ['#DC2626', '#16A34A', '#F5F5DC'] },
      { image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=500', title: 'Christmas Tree Stickers', price: '$9.99', category: 'Stickers', colors: ['#16A34A', '#DC2626', '#F59E0B'] },
      { image: 'https://images.unsplash.com/photo-1514064019862-23e2a332a6a6?w=500', title: 'Winter Wonderland Mug', price: '$15.99', category: 'Mug', colors: ['#FFFFFF', '#3B82F6', '#000000'] },
      { image: 'https://images.unsplash.com/photo-1545046465-a8d6c17c0e6f?w=500', title: 'Festive Lights T-Shirt', price: '$26.99', category: 'T-Shirt', colors: ['#000000', '#F59E0B', '#DC2626'] },
    ],
    Halloween: [
      { image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=500', title: 'Spooky Pumpkin Mug', price: '$15.99', category: 'Mug', colors: ['#F97316', '#000000', '#8B5CF6'] },
      { image: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=500', title: 'Ghost T-Shirt', price: '$23.99', category: 'T-Shirt', colors: ['#000000', '#FFFFFF', '#F97316'] },
      { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', title: 'Witch Hat Pillow', price: '$28.99', category: 'Pillow', colors: ['#000000', '#8B5CF6', '#F97316'] },
      { image: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=500', title: 'Skull Phone Case', price: '$19.99', category: 'Phone Case', colors: ['#000000', '#FFFFFF', '#DC2626'] },
      { image: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=500', title: 'Trick or Treat Tote', price: '$17.99', category: 'Tote Bag', colors: ['#F97316', '#000000', '#8B5CF6'] },
      { image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=500', title: 'Bat Sticker Set', price: '$8.99', category: 'Stickers', colors: ['#000000', '#F97316', '#8B5CF6'] },
      { image: 'https://images.unsplash.com/photo-1484399172022-72a90b12e3c1?w=500', title: 'Haunted House Mug', price: '$16.99', category: 'Mug', colors: ['#000000', '#8B5CF6', '#F97316'] },
      { image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500', title: 'Vampire T-Shirt', price: '$25.99', category: 'T-Shirt', colors: ['#DC2626', '#000000', '#FFFFFF'] },
    ],
    Birthday: [
      { image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500', title: 'Birthday Cake Mug', price: '$14.99', category: 'Mug', colors: ['#EC4899', '#F59E0B', '#8B5CF6'] },
      { image: 'https://images.unsplash.com/photo-1542574271-7f3b92e6c821?w=500', title: 'Party Hat T-Shirt', price: '$22.99', category: 'T-Shirt', colors: ['#EC4899', '#3B82F6', '#F59E0B'] },
      { image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500', title: 'Balloon Pillow', price: '$27.99', category: 'Pillow', colors: ['#EC4899', '#8B5CF6', '#3B82F6'] },
      { image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500', title: 'Confetti Phone Case', price: '$18.99', category: 'Phone Case', colors: ['#EC4899', '#F59E0B', '#8B5CF6'] },
      { image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500', title: 'Celebration Tote Bag', price: '$16.99', category: 'Tote Bag', colors: ['#EC4899', '#F59E0B', '#3B82F6'] },
      { image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500', title: 'Birthday Stickers', price: '$7.99', category: 'Stickers', colors: ['#EC4899', '#F59E0B', '#8B5CF6'] },
      { image: 'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=500', title: 'Candle Mug', price: '$15.99', category: 'Mug', colors: ['#EC4899', '#F59E0B', '#FFFFFF'] },
      { image: 'https://images.unsplash.com/photo-1533899114961-3aa0579cd5b8?w=500', title: 'Happy Birthday T-Shirt', price: '$24.99', category: 'T-Shirt', colors: ['#EC4899', '#8B5CF6', '#F59E0B'] },
    ],
    Summer: [
      { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', title: 'Beach Waves Mug', price: '$14.99', category: 'Mug', colors: ['#3B82F6', '#14B8A6', '#F59E0B'] },
      { image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', title: 'Sunshine T-Shirt', price: '$21.99', category: 'T-Shirt', colors: ['#F59E0B', '#FBBF24', '#FFFFFF'] },
      { image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500', title: 'Palm Tree Pillow', price: '$26.99', category: 'Pillow', colors: ['#16A34A', '#14B8A6', '#F59E0B'] },
      { image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500', title: 'Surfboard Phone Case', price: '$19.99', category: 'Phone Case', colors: ['#3B82F6', '#14B8A6', '#F59E0B'] },
      { image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500', title: 'Beach Tote Bag', price: '$18.99', category: 'Tote Bag', colors: ['#3B82F6', '#F59E0B', '#F5F5DC'] },
      { image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=500', title: 'Tropical Stickers', price: '$8.99', category: 'Stickers', colors: ['#16A34A', '#EC4899', '#F59E0B'] },
      { image: 'https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?w=500', title: 'Ocean Breeze Mug', price: '$15.99', category: 'Mug', colors: ['#3B82F6', '#14B8A6', '#FFFFFF'] },
      { image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', title: 'Sunset T-Shirt', price: '$23.99', category: 'T-Shirt', colors: ['#F59E0B', '#DC2626', '#8B5CF6'] },
    ],
    Anime: [
      { image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500', title: 'Kawaii Character Mug', price: '$16.99', category: 'Mug', colors: ['#EC4899', '#8B5CF6', '#3B82F6'] },
      { image: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500', title: 'Manga Hero T-Shirt', price: '$25.99', category: 'T-Shirt', colors: ['#000000', '#FFFFFF', '#DC2626'] },
      { image: 'https://images.unsplash.com/photo-1618004652321-13a63e576b80?w=500', title: 'Chibi Pillow', price: '$29.99', category: 'Pillow', colors: ['#EC4899', '#8B5CF6', '#FBBF24'] },
      { image: 'https://images.unsplash.com/photo-1611117775350-ac3950990985?w=500', title: 'Anime Eyes Phone Case', price: '$19.99', category: 'Phone Case', colors: ['#8B5CF6', '#EC4899', '#3B82F6'] },
      { image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', title: 'Otaku Tote Bag', price: '$17.99', category: 'Tote Bag', colors: ['#000000', '#EC4899', '#8B5CF6'] },
      { image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500', title: 'Anime Sticker Pack', price: '$9.99', category: 'Stickers', colors: ['#EC4899', '#8B5CF6', '#3B82F6'] },
      { image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500', title: 'Sakura Blossom Mug', price: '$16.99', category: 'Mug', colors: ['#EC4899', '#FFFFFF', '#16A34A'] },
      { image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500', title: 'Dragon Ball T-Shirt', price: '$26.99', category: 'T-Shirt', colors: ['#F59E0B', '#DC2626', '#000000'] },
    ],
    Animals: [
      { image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=500', title: 'Cute Cat Mug', price: '$14.99', category: 'Mug', colors: ['#F59E0B', '#000000', '#FFFFFF'] },
      { image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500', title: 'Wild Wolf T-Shirt', price: '$24.99', category: 'T-Shirt', colors: ['#6B7280', '#000000', '#FFFFFF'] },
      { image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=500', title: 'Bird Paradise Pillow', price: '$28.99', category: 'Pillow', colors: ['#3B82F6', '#16A34A', '#F59E0B'] },
      { image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=500', title: 'Panda Phone Case', price: '$18.99', category: 'Phone Case', colors: ['#000000', '#FFFFFF', '#16A34A'] },
      { image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=500', title: 'Safari Tote Bag', price: '$17.99', category: 'Tote Bag', colors: ['#92400E', '#F59E0B', '#16A34A'] },
      { image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500', title: 'Animal Stickers', price: '$8.99', category: 'Stickers', colors: ['#F59E0B', '#16A34A', '#3B82F6'] },
      { image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500', title: 'Ocean Life Mug', price: '$15.99', category: 'Mug', colors: ['#3B82F6', '#14B8A6', '#FFFFFF'] },
      { image: 'https://images.unsplash.com/photo-1573865526739-10c1d3a1f0cc?w=500', title: 'Jungle T-Shirt', price: '$23.99', category: 'T-Shirt', colors: ['#16A34A', '#F59E0B', '#000000'] },
    ],
    Sports: [
      { image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500', title: 'Soccer Star Mug', price: '$15.99', category: 'Mug', colors: ['#000000', '#FFFFFF', '#16A34A'] },
      { image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500', title: 'Basketball Legend T-Shirt', price: '$25.99', category: 'T-Shirt', colors: ['#F97316', '#000000', '#FFFFFF'] },
      { image: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=500', title: 'Tennis Ace Pillow', price: '$27.99', category: 'Pillow', colors: ['#FBBF24', '#16A34A', '#FFFFFF'] },
      { image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500', title: 'Football Phone Case', price: '$19.99', category: 'Phone Case', colors: ['#92400E', '#FFFFFF', '#000000'] },
      { image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500', title: 'Gym Tote Bag', price: '$18.99', category: 'Tote Bag', colors: ['#000000', '#DC2626', '#FFFFFF'] },
      { image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=500', title: 'Sports Stickers', price: '$9.99', category: 'Stickers', colors: ['#DC2626', '#3B82F6', '#16A34A'] },
      { image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500', title: 'Running Mug', price: '$14.99', category: 'Mug', colors: ['#3B82F6', '#000000', '#FFFFFF'] },
      { image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500', title: 'Champion T-Shirt', price: '$26.99', category: 'T-Shirt', colors: ['#DC2626', '#FBBF24', '#000000'] },
    ],
  };

  const floatingElements: Record<Thematic, JSX.Element[]> = {
    Christmas: [
      <motion.div key="snowflake1" className="absolute text-6xl" style={{ left: '10%', top: '20%' }} animate={{ y: [0, 20, 0], rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity }}>❄️</motion.div>,
      <motion.div key="tree" className="absolute text-5xl" style={{ right: '15%', top: '10%' }} animate={{ scale: [1, 1.1, 1], rotate: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity }}>🎄</motion.div>,
      <motion.div key="santa" className="absolute text-4xl" style={{ left: '20%', bottom: '15%' }} animate={{ x: [0, 15, 0], y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity }}>🎅</motion.div>,
      <motion.div key="gift" className="absolute text-5xl" style={{ right: '20%', bottom: '20%' }} animate={{ rotate: [-10, 10, -10], scale: [1, 1.05, 1] }} transition={{ duration: 5, repeat: Infinity }}>🎁</motion.div>,
      <motion.div key="snowflake2" className="absolute text-4xl" style={{ left: '60%', top: '30%' }} animate={{ y: [0, -15, 0], rotate: [-360, 0] }} transition={{ duration: 9, repeat: Infinity }}>❄️</motion.div>,
      <motion.div key="bell" className="absolute text-4xl" style={{ right: '40%', top: '50%' }} animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 3, repeat: Infinity }}>🔔</motion.div>,
      <motion.div key="candy-cane" className="absolute text-5xl" style={{ left: '5%', top: '60%' }} animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }}>🍭</motion.div>,
      <motion.div key="snowman" className="absolute text-4xl" style={{ right: '8%', bottom: '40%' }} animate={{ x: [0, 10, 0], y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity }}>⛄</motion.div>,
      <motion.div key="star-xmas" className="absolute text-5xl" style={{ left: '45%', top: '8%' }} animate={{ rotate: [0, 360], opacity: [1, 0.6, 1] }} transition={{ duration: 7, repeat: Infinity }}>⭐</motion.div>,
      <motion.div key="snowflake3" className="absolute text-3xl" style={{ left: '35%', bottom: '35%' }} animate={{ y: [0, 25, 0], rotate: [0, 180, 360] }} transition={{ duration: 11, repeat: Infinity }}>❄️</motion.div>,
      <motion.div key="gingerbread" className="absolute text-4xl" style={{ right: '45%', bottom: '10%' }} animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }}>🍪</motion.div>,
      <motion.div key="wreath" className="absolute text-5xl" style={{ left: '75%', top: '45%' }} animate={{ scale: [1, 1.15, 1], rotate: [-5, 5, -5] }} transition={{ duration: 8, repeat: Infinity }}>🎀</motion.div>,
    ],
    Halloween: [
      <motion.div key="pumpkin1" className="absolute text-6xl" style={{ left: '8%', top: '15%' }} animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity }}>🎃</motion.div>,
      <motion.div key="ghost" className="absolute text-5xl" style={{ right: '12%', top: '20%' }} animate={{ x: [0, 20, 0], opacity: [1, 0.7, 1] }} transition={{ duration: 5, repeat: Infinity }}>👻</motion.div>,
      <motion.div key="bat" className="absolute text-4xl" style={{ left: '25%', bottom: '18%' }} animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }}>🦇</motion.div>,
      <motion.div key="skull" className="absolute text-5xl" style={{ right: '18%', bottom: '25%' }} animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }}>💀</motion.div>,
      <motion.div key="spider" className="absolute text-4xl" style={{ left: '55%', top: '35%' }} animate={{ y: [0, 30, 0] }} transition={{ duration: 5, repeat: Infinity }}>🕷️</motion.div>,
      <motion.div key="candy" className="absolute text-4xl" style={{ right: '45%', top: '45%' }} animate={{ rotate: [-20, 20, -20] }} transition={{ duration: 4, repeat: Infinity }}>🍬</motion.div>,
      <motion.div key="witch" className="absolute text-5xl" style={{ left: '6%', bottom: '45%' }} animate={{ x: [0, 15, 0], rotate: [-8, 8, -8] }} transition={{ duration: 7, repeat: Infinity }}>🧙</motion.div>,
      <motion.div key="pumpkin2" className="absolute text-4xl" style={{ right: '8%', top: '55%' }} animate={{ scale: [1, 1.2, 1], rotate: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity }}>🎃</motion.div>,
      <motion.div key="moon" className="absolute text-6xl" style={{ left: '42%', top: '5%' }} animate={{ opacity: [1, 0.8, 1], scale: [1, 1.05, 1] }} transition={{ duration: 6, repeat: Infinity }}>🌙</motion.div>,
      <motion.div key="bat2" className="absolute text-3xl" style={{ left: '70%', bottom: '30%' }} animate={{ x: [-15, 15, -15], y: [-8, 8, -8] }} transition={{ duration: 3, repeat: Infinity }}>🦇</motion.div>,
      <motion.div key="cauldron" className="absolute text-4xl" style={{ right: '50%', bottom: '8%' }} animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>🧪</motion.div>,
      <motion.div key="zombie" className="absolute text-5xl" style={{ left: '78%', top: '25%' }} animate={{ x: [0, -12, 0], rotate: [-5, 5, -5] }} transition={{ duration: 8, repeat: Infinity }}>🧟</motion.div>,
    ],
    Birthday: [
      <motion.div key="balloon1" className="absolute text-6xl" style={{ left: '10%', top: '10%' }} animate={{ y: [0, -30, 0] }} transition={{ duration: 6, repeat: Infinity }}>🎈</motion.div>,
      <motion.div key="cake" className="absolute text-5xl" style={{ right: '15%', top: '15%' }} animate={{ scale: [1, 1.15, 1], rotate: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity }}>🎂</motion.div>,
      <motion.div key="confetti1" className="absolute text-4xl" style={{ left: '22%', bottom: '20%' }} animate={{ rotate: [0, 360], y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity }}>🎊</motion.div>,
      <motion.div key="party" className="absolute text-5xl" style={{ right: '22%', bottom: '15%' }} animate={{ rotate: [-15, 15, -15], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}>🎉</motion.div>,
      <motion.div key="balloon2" className="absolute text-4xl" style={{ left: '58%', top: '40%' }} animate={{ y: [0, -25, 0], x: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity }}>🎈</motion.div>,
      <motion.div key="gift2" className="absolute text-4xl" style={{ right: '38%', top: '55%' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>🎁</motion.div>,
      <motion.div key="party-hat" className="absolute text-5xl" style={{ left: '5%', bottom: '42%' }} animate={{ rotate: [-12, 12, -12], y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}>🎩</motion.div>,
      <motion.div key="balloon3" className="absolute text-4xl" style={{ right: '10%', top: '48%' }} animate={{ y: [0, -28, 0], x: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity }}>🎈</motion.div>,
      <motion.div key="cupcake" className="absolute text-5xl" style={{ left: '48%', top: '8%' }} animate={{ scale: [1, 1.12, 1], rotate: [-8, 8, -8] }} transition={{ duration: 6, repeat: Infinity }}>🧁</motion.div>,
      <motion.div key="confetti2" className="absolute text-3xl" style={{ left: '72%', bottom: '28%' }} animate={{ rotate: [0, -360], y: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity }}>🎊</motion.div>,
      <motion.div key="sparkler" className="absolute text-4xl" style={{ right: '52%', bottom: '5%' }} animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>✨</motion.div>,
      <motion.div key="balloon4" className="absolute text-5xl" style={{ left: '82%', top: '18%' }} animate={{ y: [0, -32, 0] }} transition={{ duration: 9, repeat: Infinity }}>🎈</motion.div>,
    ],
    Summer: [
      <motion.div key="sun" className="absolute text-6xl" style={{ right: '10%', top: '10%' }} animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity }}>☀️</motion.div>,
      <motion.div key="beach" className="absolute text-5xl" style={{ left: '12%', top: '18%' }} animate={{ x: [0, 15, 0], rotate: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity }}>🏖️</motion.div>,
      <motion.div key="watermelon" className="absolute text-4xl" style={{ left: '20%', bottom: '22%' }} animate={{ rotate: [-10, 10, -10], y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}>🍉</motion.div>,
      <motion.div key="surf" className="absolute text-5xl" style={{ right: '20%', bottom: '18%' }} animate={{ x: [-15, 15, -15], rotate: [-5, 5, -5] }} transition={{ duration: 7, repeat: Infinity }}>🏄</motion.div>,
      <motion.div key="palm" className="absolute text-4xl" style={{ left: '62%', top: '32%' }} animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }}>🌴</motion.div>,
      <motion.div key="ice" className="absolute text-4xl" style={{ right: '42%', top: '48%' }} animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}>🍦</motion.div>,
      <motion.div key="sunglasses" className="absolute text-5xl" style={{ left: '8%', bottom: '50%' }} animate={{ rotate: [-8, 8, -8], scale: [1, 1.08, 1] }} transition={{ duration: 6, repeat: Infinity }}>🕶️</motion.div>,
      <motion.div key="cocktail" className="absolute text-4xl" style={{ right: '8%', top: '58%' }} animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 4, repeat: Infinity }}>🍹</motion.div>,
      <motion.div key="wave" className="absolute text-6xl" style={{ left: '45%', top: '6%' }} animate={{ x: [0, 20, 0], scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity }}>🌊</motion.div>,
      <motion.div key="flip-flop" className="absolute text-3xl" style={{ left: '75%', bottom: '35%' }} animate={{ rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity }}>🩴</motion.div>,
      <motion.div key="shell" className="absolute text-4xl" style={{ right: '55%', bottom: '12%' }} animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity }}>🐚</motion.div>,
      <motion.div key="pineapple" className="absolute text-5xl" style={{ left: '80%', top: '42%' }} animate={{ scale: [1, 1.1, 1], rotate: [-10, 10, -10] }} transition={{ duration: 7, repeat: Infinity }}>🍍</motion.div>,
    ],
    Anime: [
      <motion.div key="star1" className="absolute text-6xl" style={{ left: '8%', top: '12%' }} animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }}>⭐</motion.div>,
      <motion.div key="sakura" className="absolute text-5xl" style={{ right: '14%', top: '16%' }} animate={{ y: [0, 20, 40, 60], x: [0, -10, -20, -30], opacity: [1, 0.8, 0.5, 0] }} transition={{ duration: 6, repeat: Infinity }}>🌸</motion.div>,
      <motion.div key="heart" className="absolute text-4xl" style={{ left: '24%', bottom: '16%' }} animate={{ scale: [1, 1.3, 1], rotate: [-10, 10, -10] }} transition={{ duration: 2, repeat: Infinity }}>💖</motion.div>,
      <motion.div key="lightning" className="absolute text-5xl" style={{ right: '16%', bottom: '24%' }} animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>⚡</motion.div>,
      <motion.div key="star2" className="absolute text-4xl" style={{ left: '56%', top: '38%' }} animate={{ rotate: [-360, 0], y: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity }}>✨</motion.div>,
      <motion.div key="manga" className="absolute text-4xl" style={{ right: '44%', top: '52%' }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity }}>📚</motion.div>,
      <motion.div key="sakura2" className="absolute text-4xl" style={{ left: '6%', bottom: '48%' }} animate={{ y: [0, 25, 50, 75], x: [0, 8, 16, 24], opacity: [1, 0.7, 0.4, 0] }} transition={{ duration: 7, repeat: Infinity }}>🌸</motion.div>,
      <motion.div key="star3" className="absolute text-5xl" style={{ right: '10%', top: '55%' }} animate={{ rotate: [0, 360], opacity: [1, 0.6, 1] }} transition={{ duration: 6, repeat: Infinity }}>⭐</motion.div>,
      <motion.div key="sword" className="absolute text-6xl" style={{ left: '48%', top: '5%' }} animate={{ rotate: [-15, 15, -15], scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity }}>⚔️</motion.div>,
      <motion.div key="moon-anime" className="absolute text-3xl" style={{ left: '70%', bottom: '25%' }} animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 4, repeat: Infinity }}>🌙</motion.div>,
      <motion.div key="ramen" className="absolute text-4xl" style={{ right: '48%', bottom: '8%' }} animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity }}>🍜</motion.div>,
      <motion.div key="sparkle" className="absolute text-5xl" style={{ left: '78%', top: '28%' }} animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }} transition={{ duration: 3, repeat: Infinity }}>💫</motion.div>,
    ],
    Animals: [
      <motion.div key="dog" className="absolute text-6xl" style={{ left: '12%', top: '14%' }} animate={{ rotate: [-10, 10, -10], y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}>🐕</motion.div>,
      <motion.div key="cat" className="absolute text-5xl" style={{ right: '16%', top: '18%' }} animate={{ x: [0, 15, 0], rotate: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity }}>🐈</motion.div>,
      <motion.div key="paw1" className="absolute text-4xl" style={{ left: '18%', bottom: '20%' }} animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }}>🐾</motion.div>,
      <motion.div key="bird2" className="absolute text-5xl" style={{ right: '24%', bottom: '16%' }} animate={{ y: [0, -25, 0], x: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }}>🐦</motion.div>,
      <motion.div key="rabbit" className="absolute text-4xl" style={{ left: '60%', top: '34%' }} animate={{ y: [0, -20, 0] }} transition={{ duration: 2, repeat: Infinity }}>🐰</motion.div>,
      <motion.div key="paw2" className="absolute text-4xl" style={{ right: '40%', top: '50%' }} animate={{ rotate: [-360, 0], opacity: [1, 0.6, 1] }} transition={{ duration: 6, repeat: Infinity }}>🐾</motion.div>,
      <motion.div key="koala" className="absolute text-5xl" style={{ left: '7%', bottom: '45%' }} animate={{ scale: [1, 1.1, 1], rotate: [-8, 8, -8] }} transition={{ duration: 7, repeat: Infinity }}>🐨</motion.div>,
      <motion.div key="butterfly" className="absolute text-4xl" style={{ right: '8%', top: '52%' }} animate={{ x: [-15, 15, -15], y: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity }}>🦋</motion.div>,
      <motion.div key="bear" className="absolute text-6xl" style={{ left: '46%', top: '8%' }} animate={{ rotate: [-5, 5, -5], scale: [1, 1.08, 1] }} transition={{ duration: 6, repeat: Infinity }}>🐻</motion.div>,
      <motion.div key="paw3" className="absolute text-3xl" style={{ left: '73%', bottom: '32%' }} animate={{ rotate: [0, 360], scale: [1, 1.15, 1] }} transition={{ duration: 9, repeat: Infinity }}>🐾</motion.div>,
      <motion.div key="fox" className="absolute text-4xl" style={{ right: '52%', bottom: '10%' }} animate={{ x: [0, 12, 0], y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }}>🦊</motion.div>,
      <motion.div key="owl" className="absolute text-5xl" style={{ left: '82%', top: '38%' }} animate={{ rotate: [-10, 10, -10], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}>🦉</motion.div>,
    ],
    Sports: [
      <motion.div key="soccer" className="absolute text-6xl" style={{ left: '10%', top: '16%' }} animate={{ rotate: [0, 360], x: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity }}>⚽</motion.div>,
      <motion.div key="basketball" className="absolute text-5xl" style={{ right: '12%', top: '12%' }} animate={{ y: [0, -30, 0] }} transition={{ duration: 3, repeat: Infinity }}>🏀</motion.div>,
      <motion.div key="trophy" className="absolute text-4xl" style={{ left: '26%', bottom: '18%' }} animate={{ scale: [1, 1.2, 1], rotate: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }}>🏆</motion.div>,
      <motion.div key="medal" className="absolute text-5xl" style={{ right: '20%', bottom: '22%' }} animate={{ rotate: [-20, 20, -20], y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}>🥇</motion.div>,
      <motion.div key="tennis" className="absolute text-4xl" style={{ left: '58%', top: '36%' }} animate={{ rotate: [0, 180, 360], x: [-15, 15, -15] }} transition={{ duration: 6, repeat: Infinity }}>🎾</motion.div>,
      <motion.div key="fire" className="absolute text-4xl" style={{ right: '46%', top: '46%' }} animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }}>🔥</motion.div>,
      <motion.div key="football" className="absolute text-5xl" style={{ left: '8%', bottom: '50%' }} animate={{ rotate: [0, 360], x: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity }}>🏈</motion.div>,
      <motion.div key="baseball" className="absolute text-4xl" style={{ right: '10%', top: '58%' }} animate={{ y: [0, -25, 0], rotate: [0, 180, 360] }} transition={{ duration: 4, repeat: Infinity }}>⚾</motion.div>,
      <motion.div key="target" className="absolute text-6xl" style={{ left: '44%', top: '6%' }} animate={{ scale: [1, 1.15, 1], rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity }}>🎯</motion.div>,
      <motion.div key="volleyball" className="absolute text-3xl" style={{ left: '72%', bottom: '28%' }} animate={{ y: [0, -20, 0], x: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }}>🏐</motion.div>,
      <motion.div key="whistle" className="absolute text-4xl" style={{ right: '50%', bottom: '6%' }} animate={{ rotate: [-15, 15, -15], scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>📣</motion.div>,
      <motion.div key="medal2" className="absolute text-5xl" style={{ left: '80%', top: '32%' }} animate={{ rotate: [-25, 25, -25], y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity }}>🥈</motion.div>,
    ],
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Floating Elements Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeThematic}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none"
        >
          {floatingElements[activeThematic]}
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl mb-4">
            Themed <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Collections</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore our curated designs for every occasion
          </p>

          {/* Thematic Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {thematics.map((thematic) => (
              <motion.button
                key={thematic}
                onClick={() => setActiveThematic(thematic)}
                className={`px-6 py-3 rounded-full transition-all ${
                  activeThematic === thematic
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {thematic}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeThematic}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {products[activeThematic].map((product, index) => (
              <motion.div
                key={`${activeThematic}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105">
            View All {activeThematic} Products
          </button>
        </div>
      </div>
    </section>
  );
}