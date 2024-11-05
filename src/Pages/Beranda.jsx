import React from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import LayananKami from '../Components/LayananKami';
import TimKami from '../Components/TimKami';
import Footer from '../Components/Footer';

function Beranda() {
  return (
    <>
      <Navbar ></Navbar>
      <div className="p-5"></div>
      <HeroSection></HeroSection>
      <LayananKami></LayananKami>
      <TimKami></TimKami>
      <Footer></Footer>
    </>
  );
}
export default Beranda;
