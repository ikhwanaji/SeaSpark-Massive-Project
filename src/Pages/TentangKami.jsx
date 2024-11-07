import React from 'react';
import Navbar from '../Components/Navbar';
import TentangKami from '../Components/TentangKami';
import Footer from '../Components/Footer';

// Define the navigation array if it’s not imported from another file
const navigation = [
  { name: 'Beranda', type: 'scroll' },
  { name: 'Layanan', type: 'scroll' },
  { name: 'Ulasan', type: 'scroll' },
  { name: 'Tentang Kami', type: 'scroll' },
];

function TentangKamiPage() {  
  const infoLinks = navigation
    .filter((nav) => nav.type === 'scroll')
    .map((nav) => ({
      href: `/#${nav.name.toLowerCase().replace(/\s+/g, '-')}`,
      text: nav.name,
    }));

  return (
    <>
      <Navbar 
        navigation={navigation} 
        buttonName="Masuk" 
        backgroundColor="bg-gray-100" 
        textColor="text-black-500" 
        hoverColor="hover:text-blue-500" 
        buttonColor="bg-blue-500" 
        buttonHoverColor="bg-blue-700" 
      />
      <main>
        <section>
          <TentangKami />
        </section>
      </main>
      <Footer infoLinks={infoLinks} />
    </>
  );
}

export default TentangKamiPage;
