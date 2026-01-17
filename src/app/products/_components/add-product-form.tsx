'use client';

import { useState } from "react";
import ProductForm from "./product-form";

export default function AddProductForm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors font-semibold shadow-sm"
        >
          + Add New Product
        </button>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Add New Product</h2>
          <ProductForm 
            mode="create" 
            onCancel={() => setIsOpen(false)} 
          />
        </div>
      )}
    </div>
  );
}
