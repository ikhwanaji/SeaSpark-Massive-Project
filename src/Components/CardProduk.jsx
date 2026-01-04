import React from 'react';
import { motion } from 'framer-motion';

const CardProduk = ({ image, title, price }) => {
  return (
    <motion.div
      className="bg-blue-50 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -8,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div className="relative overflow-hidden">
        <motion.img src={image} alt={title} className="w-full h-48 md:h-64 object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} />
        <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />
      </div>
      <motion.div className="p-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <motion.p className="text-sky-600 font-semibold" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}>
          {price}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default CardProduk;
