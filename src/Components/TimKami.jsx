import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../Components/Button';
import anisImg from '../Assets/img/anis.jpg';
import florrImg from '../Assets/img/florr.jpg';
import inexxImg from '../Assets/img/inexx.jpg';
import iwanImg from '../Assets/img/iwan.jpg';
import syaaImg from '../Assets/img/syaa.jpg';
import fadliImg from '../Assets/img/fadli.jpg';

const TimKami = () => {
  const teamMembers = [
    { image: anisImg, name: 'Anis Putri Purwanti', role: 'UI/UX Designer' },
    { image: florrImg, name: 'Calestine Florecita Mariwy', role: 'UI/UX Designer' },
    { image: inexxImg, name: 'Noudia Inex Pasiakan', role: 'Project Manager' },
    { image: iwanImg, name: 'Ikhwan Aji Pratama', role: 'Scrum Master & Backend Dev' },
    { image: syaaImg, name: 'Nur Syahidah', role: 'Frontend Developer' },
    { image: fadliImg, name: 'Ahmad Fadli', role: 'Frontend Developer' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [teamMembers.length]);

  const goToMember = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const currentMember = teamMembers[currentIndex];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 12 } },
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.8 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    exit: (direction) => ({ x: direction > 0 ? -300 : 300, opacity: 0, scale: 0.8, transition: { type: 'spring', stiffness: 300, damping: 20 } }),
  };

  return (
    // --- PERUBAHAN RESPONSIF ---
    // Padding vertikal disesuaikan
    <motion.div className="bg-gradient-to-b from-blue-100 to-white py-16 sm:py-20 md:py-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <motion.div className="container mx-auto px-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12" variants={itemVariants}>
          Tim{' '}
          <motion.span className="text-sky-500" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 5 }}>
            Kami
          </motion.span>
        </motion.h2>

        {/* --- PERUBAHAN RESPONSIF --- */}
        {/* Mengubah breakpoint dari md ke lg untuk tata letak berdampingan */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 md:gap-12 max-w-6xl mx-auto">
          <motion.div className="relative flex-shrink-0 mx-auto group" variants={itemVariants}>
            {/* Ukuran gambar disesuaikan untuk setiap breakpoint */}
            <motion.div
              className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-sky-500 shadow-xl"
              whileHover={{ boxShadow: '0 0 30px rgba(14, 165, 233, 0.6)', borderColor: '#0284c7', transition: { duration: 0.3 } }}
            >
              <AnimatePresence custom={direction} mode="wait">
                <motion.img key={currentIndex} src={currentMember.image} alt={currentMember.name} className="w-full h-full object-cover" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" />
              </AnimatePresence>
              <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />
            </motion.div>
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <motion.button
                onClick={goToPrev}
                className="bg-white/80 w-8 h-8 rounded-full flex items-center justify-center text-sky-600 shadow-md"
                whileHover={{ scale: 1.1, backgroundColor: '#ffffff' }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous team member"
              >
                ←
              </motion.button>
              <motion.button
                onClick={goToNext}
                className="bg-white/80 w-8 h-8 rounded-full flex items-center justify-center text-sky-600 shadow-md"
                whileHover={{ scale: 1.1, backgroundColor: '#ffffff' }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next team member"
              >
                →
              </motion.button>
            </div>
            <motion.div
              className="absolute bottom-4 left-0 right-0 bg-white/90 backdrop-blur-sm py-3 text-center rounded-lg shadow-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.div key={currentIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <h3 className="font-bold text-lg text-sky-700">{currentMember.name}</h3>
                  <p className="text-gray-600 text-sm">{currentMember.role}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <div className="flex justify-center mt-6 space-x-2">
              {teamMembers.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToMember(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-sky-500 w-6' : 'bg-gray-300 w-3'}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`View team member ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* --- PERUBAHAN RESPONSIF --- */}
          {/* Alignment teks diubah agar selalu di tengah sampai breakpoint lg */}
          <motion.div className="lg:max-w-xl text-center lg:text-left mt-8 lg:mt-0" variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Ahli dalam Bidangnya</h3>
            <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
              Kami adalah tim pengembang yang berkomitmen untuk menciptakan pengalaman terbaik bagi pengguna DoKer. Dengan keahlian di berbagai bidang, kami berupaya keras menghadirkan platform yang mudah diakses dan memberikan manfaat
              maksimal untuk membantu Anda mengatasi berbagai masalah penyakit yang sering dialami ikan kerapu.
            </p>
            {/* --- PERUBAHAN RESPONSIF --- */}
            {/* Alignment tombol disesuaikan */}
            <div className="flex justify-center lg:justify-start">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button buttonText="Kenali Tim Kami" to="/tentang-kami" position="left" className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TimKami;
