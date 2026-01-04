import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Button from '../Components/Button';
import anisImg from '../Assets/img/anis.jpg';
import florrImg from '../Assets/img/florr.jpg';
import inexxImg from '../Assets/img/inexx.jpg';
import iwanImg from '../Assets/img/iwan.jpg';
import syaaImg from '../Assets/img/syaa.jpg';
import fadliImg from '../Assets/img/fadli.jpg';
import SeasparkImg from '../Assets/img/seaspark.jpg';

const TentangKami = () => {
  const teamMembers = [
    { name: 'Noudia Inex Pasiakan', img: inexxImg, role: 'Project Manajer' },
    { name: 'Ikhwan Aji Pratama', img: iwanImg, role: 'Scrum Master & FullStack Developer' },
    { name: 'Celestina Florecita Mariwy', img: florrImg, role: 'UI/UX Designer' },
    { name: 'Anis Putri Purwanti', img: anisImg, role: 'UI/UX Designer' },
    { name: 'Ahmad Fadli', img: fadliImg, role: 'Frontend Developer' },
    { name: 'Nur Syahidah', img: syaaImg, role: 'Frontend Developer' },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const headerAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Create animations that trigger when elements come into view
  const AnimatedSection = ({ children, className }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      threshold: 0.2,
      triggerOnce: true,
    });

    useEffect(() => {
      if (inView) {
        controls.start('visible');
      }
    }, [controls, inView]);

    return (
      <motion.div ref={ref} initial="hidden" animate={controls} variants={fadeIn} className={className}>
        {children}
      </motion.div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-16 px-4 md:px-8 lg:px-12 mt-14">
      {/* Hero Section with modern styling */}
      <AnimatedSection className="container mx-auto mb-20">
        <motion.div className="text-center mb-12" variants={headerAnimation}>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Tentang DoKer</h1>
          <motion.div className="h-1 w-24 bg-blue-500 mx-auto rounded-full" initial={{ width: 0 }} animate={{ width: 96 }} transition={{ duration: 0.8, delay: 0.2 }}></motion.div>
        </motion.div>

        {/* Company Info Section - Responsive layout */}
        <motion.div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 bg-white rounded-2xl shadow-xl overflow-hidden" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
          <motion.div className="w-full lg:w-1/2 h-64 md:h-96 lg:h-auto overflow-hidden" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }}>
            <motion.img src={SeasparkImg} alt="Underwater scene" className="w-full h-full object-cover" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2 }} />
          </motion.div>

          <motion.div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
            <h2 className="text-3xl font-bold text-blue-600 mb-6">DoKer</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Website DoKer adalah platform inovatif yang dirancang khusus untuk membantu para peternak ikan kerapu dalam menangani berbagai penyakit yang dapat mengancam kesehatan ikan mereka. Dengan menawarkan berbagai alat, bahan, dan
              panduan lengkap, DoKer memudahkan peternak untuk mengobati penyakit ikan kerapu secara efektif.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              Kami menyediakan informasi terkini terkait penyakit ikan kerapu, serta produk berkualitas yang dibutuhkan untuk menjaga keberlangsungan usaha peternakan ikan kerapu. Dengan DoKer, peternak dapat meningkatkan hasil panen dan
              memastikan kesejahteraan ikan secara optimal.
            </p>
          </motion.div>
        </motion.div>
      </AnimatedSection>

      {/* Vision & Mission Section */}
      <AnimatedSection className="container mx-auto mb-20">
        <motion.div className="text-center mb-12" variants={headerAnimation}>
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Visi & Misi</h2>
          <motion.div className="h-1 w-24 bg-blue-500 mx-auto rounded-full" initial={{ width: 0 }} animate={{ width: 96 }} transition={{ duration: 0.8, delay: 0.2 }}></motion.div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Vision Card */}
          <motion.div
            className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{
              y: -10,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div className="bg-blue-600 py-4">
              <h3 className="text-2xl font-bold text-white text-center">Visi</h3>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-gray-700 text-lg leading-relaxed">
                Menjadi platform terdepan dalam mendukung perkembangan industri budidaya ikan kerapu yang berkelanjutan di Indonesia, dengan menyediakan solusi komprehensif untuk pencegahan dan pengobatan penyakit ikan kerapu.
              </p>
              <motion.ul className="mt-6 space-y-3" variants={staggerContainer} initial="hidden" animate="visible">
                {['Menjadi pusat informasi terpercaya bagi peternak ikan kerapu', 'Mendorong praktik budidaya yang berkelanjutan dan ramah lingkungan', 'Meningkatkan kesejahteraan peternak melalui peningkatan produktivitas'].map(
                  (item, index) => (
                    <motion.li key={index} className="flex items-start" variants={cardAnimation}>
                      <motion.span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-1" whileHover={{ scale: 1.2, backgroundColor: '#3b82f6', color: 'white' }}>
                        <span className="text-blue-600 font-bold">✓</span>
                      </motion.span>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  )
                )}
              </motion.ul>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{
              y: -10,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div className="bg-blue-600 py-4">
              <h3 className="text-2xl font-bold text-white text-center">Misi</h3>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-gray-700 text-lg leading-relaxed">Menyediakan layanan dan produk berkualitas tinggi yang membantu peternak ikan kerapu dalam mencegah, dan mengobati penyakit secara efektif dan efisien.</p>
              <motion.ul className="mt-6 space-y-3" variants={staggerContainer} initial="hidden" animate="visible">
                {[
                  'Menyajikan ensiklopedia lengkap tentang penyakit ikan kerapu, dari gejala hingga penanganannya, yang mudah diakses',
                  'Menyediakan produk obat dan peralatan berkualitas untuk perawatan ikan kerapu',
                  'Menggabungkan pengetahuan (ensiklopedia) dan solusi (produk) dalam satu website untuk membantu pembudidaya mencegah kerugian dan memaksimalkan hasil panen.',
                ].map((item, index) => (
                  <motion.li key={index} className="flex items-start" variants={cardAnimation}>
                    <motion.span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-1" whileHover={{ scale: 1.2, backgroundColor: '#3b82f6', color: 'white' }}>
                      <span className="text-blue-600 font-bold">{index + 1}</span>
                    </motion.span>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Team Section with modern card design */}
      <AnimatedSection className="container mx-auto mb-16">
        <motion.div className="text-center mb-12" variants={headerAnimation}>
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Tim Kami</h2>
          <motion.div className="h-1 w-24 bg-blue-500 mx-auto rounded-full" initial={{ width: 0 }} animate={{ width: 96 }} transition={{ duration: 0.8, delay: 0.2 }}></motion.div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Perkenalkan tim berdedikasi di balik DoKer yang berkomitmen untuk mendukung kesuksesan peternak ikan kerapu.</p>
        </motion.div>

        {/* Responsive grid for team members */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer} initial="hidden" animate="visible">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:shadow-lg"
              variants={cardAnimation}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
            >
              <motion.div className="h-64 overflow-hidden" whileHover={{ scale: 1.05 }}>
                <motion.img src={member.img} alt={member.name} className="w-full h-full object-cover object-center" whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} />
              </motion.div>
              <motion.div className="p-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 * (index % 3) }}>
                <h3 className="font-bold text-xl text-blue-600">{member.name}</h3>
                <p className="text-blue-400 mt-1">{member.role}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>

      {/* Values Section */}
      <AnimatedSection className="container mx-auto mb-16">
        <motion.div
          className="bg-blue-600 text-white rounded-2xl shadow-xl p-8 md:p-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nilai-Nilai Kami</h2>
            <motion.div className="h-1 w-24 bg-white mx-auto rounded-full" initial={{ width: 0 }} animate={{ width: 96 }} transition={{ duration: 0.8, delay: 0.2 }}></motion.div>
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8" variants={staggerContainer} initial="hidden" animate="visible">
            {[
              {
                title: 'Inovasi',
                description: 'Kami terus berinovasi untuk memberikan solusi terbaik bagi permasalahan peternak ikan kerapu.',
              },
              {
                title: 'Keberlanjutan',
                description: 'Mendukung praktik budidaya yang berkelanjutan demi kesejahteraan lingkungan dan masyarakat.',
              },
              {
                title: 'Kepercayaan',
                description: 'Membangun hubungan yang didasari oleh kepercayaan dengan semua pemangku kepentingan.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
                variants={cardAnimation}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-white/90">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatedSection>

      {/* Back Button with enhanced styling */}
      <motion.div className="text-center mt-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button buttonText="Kembali ke Beranda" to="/" position="center" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TentangKami;
