import React from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import Footer from '../Components/Footer';

function Beranda() {
  return (
    <>
      <Navbar ></Navbar>
      <div className="p-5"></div>
      <HeroSection></HeroSection>
      <Footer></Footer>
    </>
  );
}
export default Beranda;
