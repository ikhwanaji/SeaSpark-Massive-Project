import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';
import { FaChevronLeft, FaChevronRight, FaInfoCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import artikelImg from '../Assets/img/artikelimg.png';
import artikelImg2 from '../Assets/img/artikelimg2.png';
import artikelImg3 from '../Assets/img/artikelimg3.png';
import artikelImg4 from '../Assets/img/artikelimg4.png';
import artikelImg5 from '../Assets/img/artikelimg5.png';

const LayananKami = ({ to }) => {
  const images = [artikelImg, artikelImg2, artikelImg3, artikelImg4, artikelImg5];
  const captions = ['Diagnosa dini untuk penyakit ikan kerapu', 'Solusi perawatan ikan kerapu yang terbaik', 'Panduan budidaya ikan kerapu berkualitas', 'Konsultasi dengan ahli perikanan', 'Produk perawatan premium untuk ikan kerapu'];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  // Auto-rotate images
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentImageIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" variants={textVariants} viewport={{ once: true }}>
          <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3" variants={textVariants}>
            Layanan Kami
          </motion.h2>
          <motion.p className="text-gray-600 max-w-2xl mx-auto" variants={textVariants} transition={{ delay: 0.2 }}>
            Solusi terbaik untuk kesehatan dan perawatan ikan kerapu Anda
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-xl overflow-hidden max-w-6xl mx-auto"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Section 1 */}
            <motion.div
              className="p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <motion.div
                  className="inline-flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm font-medium mb-4"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10, delay: 0.2 }}
                >
                  <FaInfoCircle className="mr-1" /> Ketahui Penyakit
                </motion.div>
                <motion.h2 className="text-sky-600 font-bold text-xl md:text-2xl mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                  Ketahui Penyakit Yang Menyerang Ikan Kerapu Anda!
                </motion.h2>
                <motion.p className="text-gray-600 leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
                  Tidak sadar dan tidak tahu penyakit yang menyerang ikan kerapu kesayangan Anda bisa membuat usaha budidaya Anda hancur. Yuk, kenali berbagai penyakit yang sering menyerang ikan kerapu.
                </motion.p>
              </div>
              <motion.div className="mt-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    to="/layanan2"
                    buttonText="Ketahui Sekarang"
                    fullWidth={true}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Section 2 (Image Carousel) */}
            <div className="relative overflow-hidden" onMouseEnter={pauseAutoPlay} onMouseLeave={resumeAutoPlay} onTouchStart={pauseAutoPlay} onTouchEnd={resumeAutoPlay}>
              <div className="relative h-64 md:h-full">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="absolute inset-0"
                  >
                    <img src={images[currentImageIndex]} alt={`Layanan Ikan Kerapu ${currentImageIndex + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                    <motion.div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                      <p className="font-medium">{captions[currentImageIndex]}</p>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation buttons */}
              <motion.button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20
                  bg-white/80 rounded-full p-2 hover:bg-white
                  transition-all duration-300 ease-in-out shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <FaChevronLeft className="text-sky-600 text-lg" />
              </motion.button>

              <motion.button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20
                  bg-white/80 rounded-full p-2 hover:bg-white
                  transition-all duration-300 ease-in-out shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <FaChevronRight className="text-sky-600 text-lg" />
              </motion.button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-sky-500 w-4 md:w-6' : 'bg-white/60'}`}
                    aria-label={`View image ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  />
                ))}
              </div>
            </div>

            {/* Section 3 */}
            <motion.div
              className="p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <motion.div
                  className="inline-flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm font-medium mb-4"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10, delay: 0.2 }}
                >
                  <FaInfoCircle className="mr-1" /> Kenali Gejala
                </motion.div>
                <motion.h2 className="text-sky-600 font-bold text-xl md:text-2xl mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                  Kenali Penyakit <br /> Ikan Kerapu Anda!
                </motion.h2>
                <motion.p className="text-gray-600 leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
                  Merasa bingung dengan gejala yang dialami ikan kerapu Anda? Yuk, temukan penyakit yang mungkin mengancam dengan layanan ini untuk mendapatkan informasi penting menjaga kesehatan ikan kerapu Anda.
                </motion.p>
              </div>
              <motion.div className="mt-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    to="/layanan"
                    buttonText="Kenali Sekarang"
                    fullWidth={true}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LayananKami;
