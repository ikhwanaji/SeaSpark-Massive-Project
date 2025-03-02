import React from 'react';
import Button from '../Components/Button'

const Layanan2 = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-[800px] mx-auto mb-12">
                
                <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-700">Penyakit Bakteri:</h4>
                    <ul className="list-disc list-inside text-gray-600">
                        <li>Vibriosis (disebabkan oleh bakteri <i>Vibrio spp.</i>)</li>
                        <li>Aeromonosis (disebabkan oleh bakteri <i>Aeromonas spp.</i>)</li>
                        <li>Streptococcosis (disebabkan oleh bakteri <i>Streptococcus spp.</i>)</li>
                        <li>Pseudomonas (disebabkan oleh bakteri <i>Pseudomonas spp.</i>)</li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-700">Penyakit Virus:</h4>
                    <ul className="list-disc list-inside text-gray-600">
                        <li>Sleepy Grouper Disease (SGD)</li>
                        <li>Viral Nervous Necrosis (VNN)</li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-700">Penyakit Parasit:</h4>
                    <ul className="list-disc list-inside text-gray-600">
                        <li>Trichodina</li>
                        <li>Costia</li>
                        <li>Chilodonella</li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-700">Penyakit Non-Infeksi:</h4>
                    <ul className="list-disc list-inside text-gray-600">
                        <li>Gas Bubble Disease</li>
                        <li>Keracunan makanan</li>
                        <li>Kekurangan nutrisi</li>
                    </ul>
                </div>

            </div>
            
            {/* Tombol Kembali */}
            <Button to='/'>
                Kembali Ke Beranda
            </Button>
        </div>
    );
};
export default Layanan2;