import React from 'react';
import Button from '../Components/Button';

const CardDetail = () => {
    return (
        <div className="p-8 rounded-lg max-w-4xl mx-auto">
            <img
                src="https://storage.googleapis.com/a1aa/image/ClmrU3Q3SyLoNBwm8SB0yGBgy8AHbTJtJ3YRW5mcXkReAftTA.jpg"
                alt="Penyakit Ikan Kerapu"
                className="w-full h-96 object-cover rounded-lg mb-12"
            />
            <h2 className="text-center text-3xl font-bold mb-8">
                Penyakit umum menyerang ikan kerapu dalam budidaya
            </h2>
            <p className="text-center text-gray-700 mb-8">
                Ikan kerapu (Epinephelus spp.) adalah ikan laut yang banyak dibudidayakan karena nilai ekonominya yang tinggi,
                tetapi juga rentan terhadap berbagai penyakit. Berikut adalah beberapa penyakit umum yang menyerang ikan kerapu
                beserta langkah pencegahannya:
            </p>
            <ul className="text-gray-700 list-decimal list-inside mb-8 space-y-4">
                <li>
                    <strong>Penyakit Bakteri:</strong> Terjadi akibat infeksi bakteri, gejala termasuk pembengkakan dan kematian
                    mendadak. Pencegahan: kontrol kualitas air, berikan pakan berkualitas, dan gunakan antibakteri jika perlu.
                </li>
                <li>
                    <strong>Penyakit Jamur:</strong> Muncul setelah ikan mengalami stres, ditandai dengan lapisan putih.
                    Pencegahan: jaga kondisi lingkungan agar stabil, pisahkan ikan terinfeksi, dan gunakan obat antijamur.
                </li>
                <li>
                    <strong>Penyakit Parasit:</strong> Infeksi parasit seperti cacing dan protozoa dapat menurunkan berat badan
                    dan nafsu makan. Pencegahan: lakukan pemeriksaan rutin, kelola pakan dan sanitasi kolam, serta gunakan obat
                    antiparasit jika diperlukan.
                </li>
                <li>
                    <strong>Penyakit Virus:</strong> Meski jarang, dapat menyebabkan kerugian besar. Gejala termasuk pembengkakan
                    dan kematian mendadak. Pencegahan: hindari sumber air kotor, jaga kebersihan peralatan dan kolam, serta lakukan
                    vaksinasi jika tersedia.
                </li>
            </ul>
            <div className="text-center mt-20">
                <Button buttonText="Kembali ke Layanan" to="/layanan" />
            </div>
        </div>
    );
};

export default CardDetail;
