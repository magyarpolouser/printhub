import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Check } from 'lucide-react';

type ProductType = 'T-Shirt' | 'Mug' | 'Tote Bag' | 'Pillow' | 'Hoodie' | 'Phone Case';

export function CustomDesign() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('T-Shirt');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const products: Array<{
    name: ProductType;
    icon: string;
    mockupBg: string;
  }> = [
    { name: 'T-Shirt', icon: '👕', mockupBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'Mug', icon: '☕', mockupBg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { name: 'Tote Bag', icon: '👜', mockupBg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { name: 'Pillow', icon: '🛋️', mockupBg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { name: 'Hoodie', icon: '🧥', mockupBg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { name: 'Phone Case', icon: '📱', mockupBg: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <motion.div
          className="absolute text-8xl"
          style={{ left: '5%', top: '10%' }}
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          🎨
        </motion.div>
        <motion.div
          className="absolute text-7xl"
          style={{ right: '8%', top: '15%' }}
          animate={{ y: [0, -20, 0], rotate: [-10, 10, -10] }}
          transition={{ duration: 15, repeat: Infinity }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute text-6xl"
          style={{ left: '10%', bottom: '20%' }}
          animate={{ x: [0, 20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 18, repeat: Infinity }}
        >
          🖌️
        </motion.div>
        <motion.div
          className="absolute text-7xl"
          style={{ right: '12%', bottom: '15%' }}
          animate={{ scale: [1, 1.2, 1], rotate: [-15, 15, -15] }}
          transition={{ duration: 12, repeat: Infinity }}
        >
          💡
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl mb-4">
            Create Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Own Design</span>
          </h2>
          <p className="text-xl text-gray-600">
            Upload your photo or artwork and see it come to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Product Selection and Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Product Type Selection */}
            <div>
              <h3 className="text-2xl mb-4">Choose Your Product</h3>
              <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                  <motion.button
                    key={product.name}
                    onClick={() => setSelectedProduct(product.name)}
                    className={`relative p-6 rounded-2xl border-2 transition-all ${
                      selectedProduct === product.name
                        ? 'border-purple-600 bg-purple-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {selectedProduct === product.name && (
                      <div className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full p-1">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                    <div className="text-4xl mb-2">{product.icon}</div>
                    <div className="text-sm">{product.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Upload Area */}
            <div>
              <h3 className="text-2xl mb-4">Upload Your Design</h3>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-12 transition-all ${
                  isDragging
                    ? 'border-purple-600 bg-purple-50'
                    : uploadedImage
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 bg-gray-50 hover:border-purple-400'
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center cursor-pointer"
                >
                  {uploadedImage ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-green-600 mb-2">Design Uploaded!</p>
                      <p className="text-sm text-gray-500">Click to change</p>
                    </motion.div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-purple-600 mb-4" />
                      <p className="text-gray-700 mb-2">
                        Drop your image here or <span className="text-purple-600">browse</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports: JPG, PNG, SVG (Max 10MB)
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Additional Options */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
              <h4 className="mb-3">What you get:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>High-quality printing on premium materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Fast production and shipping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>100% satisfaction guarantee</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Free design preview before ordering</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Side - Product Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Product Mockup Container */}
              <motion.div
                key={selectedProduct}
                initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  background: products.find((p) => p.name === selectedProduct)?.mockupBg,
                  aspectRatio: selectedProduct === 'Phone Case' ? '9/16' : '1/1',
                }}
              >
                {/* Product Visualization */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  {selectedProduct === 'T-Shirt' && (
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-white/90 rounded-3xl shadow-inner" />
                      {uploadedImage && (
                        <div className="absolute inset-[20%] flex items-center justify-center">
                          <img
                            src={uploadedImage}
                            alt="Your design"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                      {!uploadedImage && (
                        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                          👕
                        </div>
                      )}
                    </div>
                  )}

                  {selectedProduct === 'Mug' && (
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-white/90 rounded-2xl shadow-inner" />
                      {uploadedImage && (
                        <div className="absolute inset-[25%] flex items-center justify-center">
                          <img
                            src={uploadedImage}
                            alt="Your design"
                            className="max-w-full max-h-full object-contain rounded-lg"
                          />
                        </div>
                      )}
                      {!uploadedImage && (
                        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                          ☕
                        </div>
                      )}
                    </div>
                  )}

                  {selectedProduct === 'Tote Bag' && (
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-white/90 rounded-3xl shadow-inner" />
                      {uploadedImage && (
                        <div className="absolute inset-[20%] flex items-center justify-center">
                          <img
                            src={uploadedImage}
                            alt="Your design"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                      {!uploadedImage && (
                        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                          👜
                        </div>
                      )}
                    </div>
                  )}

                  {selectedProduct === 'Pillow' && (
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-white/90 rounded-3xl shadow-inner" />
                      {uploadedImage && (
                        <div className="absolute inset-[15%] flex items-center justify-center">
                          <img
                            src={uploadedImage}
                            alt="Your design"
                            className="max-w-full max-h-full object-contain rounded-xl"
                          />
                        </div>
                      )}
                      {!uploadedImage && (
                        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                          🛋️
                        </div>
                      )}
                    </div>
                  )}

                  {selectedProduct === 'Hoodie' && (
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-white/90 rounded-3xl shadow-inner" />
                      {uploadedImage && (
                        <div className="absolute inset-[20%] flex items-center justify-center">
                          <img
                            src={uploadedImage}
                            alt="Your design"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                      {!uploadedImage && (
                        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                          🧥
                        </div>
                      )}
                    </div>
                  )}

                  {selectedProduct === 'Phone Case' && (
                    <div className="relative w-full h-full max-w-[300px] mx-auto">
                      <div className="absolute inset-0 bg-white/90 rounded-[3rem] shadow-inner" />
                      {uploadedImage && (
                        <div className="absolute inset-[10%] flex items-center justify-center">
                          <img
                            src={uploadedImage}
                            alt="Your design"
                            className="max-w-full max-h-full object-cover rounded-[2rem]"
                          />
                        </div>
                      )}
                      {!uploadedImage && (
                        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                          📱
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Floating Badge */}
                <motion.div
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="text-sm">
                    <span className="font-semibold">{selectedProduct}</span>
                  </p>
                </motion.div>
              </motion.div>

              {/* Action Button */}
              <motion.button
                className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: uploadedImage ? 1.05 : 1 }}
                whileTap={{ scale: uploadedImage ? 0.95 : 1 }}
                disabled={!uploadedImage}
              >
                {uploadedImage ? (
                  <>Continue to Checkout →</>
                ) : (
                  <>Upload a design to continue</>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
