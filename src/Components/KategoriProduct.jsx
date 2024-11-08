// KategoriProduct.js
import React from 'react';

const KategoriProduct = ({ categories }) => {
  return (
    <div className="max-w-xs mx-auto mt-10 p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Kategori Produk</h2>
      <hr className="mb-4" />
      <div className="space-y-2">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-gray-600" onChange={() => category.onSelect(category.name)} />
              <span className="ml-2 text-gray-700">{category.name}</span>
            </label>
            <span className="text-gray-500">[{category.count}]</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KategoriProduct;
