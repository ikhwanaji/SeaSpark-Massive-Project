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
      <motion.div className="flex items-center mb-4" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <motion.div className="mr-4" whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
          <img src={avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=0D8ABC&color=fff`} alt={title} className="w-12 h-12 rounded-full object-cover border-2 border-sky-500" />
        </motion.div>
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>
      </motion.div>

      <motion.div className="flex mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        {[...Array(5)].map((_, i) => (
          <motion.div key={i} initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }}>
            <FaStar className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} text-lg`} />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex-grow relative">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 0.5, scale: 1 }} transition={{ delay: 0.4 }}>
          <FaQuoteLeft className="text-sky-100 text-4xl absolute top-0 left-0" />
        </motion.div>
        <motion.p className="text-gray-600 relative z-10 pl-6 pt-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          {content}
        </motion.p>
      </div>
    </motion.div>
  );
};

const UlasanGrid = ({ title, subtitle, cards }) => {
  // Ensure we have at least one card for mobile slider
  const safeCards = cards.length ? cards : [{ title: 'No reviews yet', content: 'Be the first to review our services', date: 'Today' }];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4">
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          {title}
        </motion.h2>
        <motion.p className="text-gray-600 max-w-2xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          {subtitle}
        </motion.p>
      </motion.div>

      {/* Desktop grid view */}
      <motion.div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
        {safeCards.map((card, index) => (
          <motion.div key={index} variants={itemVariants}>
            <UlasanCard {...card} />
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile carousel */}
      <div className="md:hidden">
        <motion.div className="snap-x snap-mandatory flex overflow-x-auto pb-6 -mx-4 px-4 space-x-4 scrollbar-hide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {safeCards.map((card, index) => (
            <motion.div key={index} className="snap-center shrink-0 w-full max-w-xs" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.4, delay: index * 0.1 }}>
              <UlasanCard {...card} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="flex justify-center mt-4 space-x-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          {safeCards.map((_, index) => (
            <motion.span key={index} className="h-1.5 w-1.5 rounded-full bg-sky-300" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + index * 0.1 }} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default UlasanGrid;
