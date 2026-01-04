import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const UlasanCard = ({ title, content, date, rating = 5, avatar }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      whileHover={{
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div className="flex items-center mb-4">
        <img src={avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=0D8ABC&color=fff`} alt={title} className="w-12 h-12 rounded-full object-cover border-2 border-sky-500" />
        <div className="ml-4">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} text-lg`} />
        ))}
      </div>
      <div className="flex-grow relative">
        <FaQuoteLeft className="text-sky-100 text-4xl absolute top-0 left-0" />
        <p className="text-gray-600 relative z-10 pl-6 pt-2">{content}</p>
      </div>
    </motion.div>
  );
};

const UlasanGrid = ({ title, subtitle, cards }) => {
  const safeCards = cards.length ? cards : [{ title: 'No reviews yet', content: 'Be the first to review our services', date: 'Today' }];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4">
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      </motion.div>

      {/* --- PERUBAHAN RESPONSIF --- */}
      {/* Grid sekarang muncul di layar 'sm' (tablet) ke atas */}
      <motion.div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
        {safeCards.map((card, index) => (
          <motion.div key={index} variants={itemVariants}>
            <UlasanCard {...card} />
          </motion.div>
        ))}
      </motion.div>

      {/* --- PERUBAHAN RESPONSIF --- */}
      {/* Carousel ini sekarang hanya untuk layar 'sm' ke bawah */}
      <div className="sm:hidden">
        <div className="snap-x snap-mandatory flex overflow-x-auto pb-6 -mx-4 px-4 space-x-4 scrollbar-hide">
          {safeCards.map((card, index) => (
            // Lebar kartu disesuaikan agar tidak terlalu sempit
            <div key={index} className="snap-center shrink-0 w-[85%]">
              <UlasanCard {...card} />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-1">
          {safeCards.map((_, index) => (
            <span key={index} className="h-1.5 w-1.5 rounded-full bg-sky-300" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UlasanGrid;
