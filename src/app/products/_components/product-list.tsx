'use client';

import { deleteProduct } from "@/app/_actions/products";
import type { Product } from "@/app/types/product";
import Link from "next/link";

export default function ProductList({ products: initialProducts }: { products: Product[] }) {
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to delete product');
      }
    }
  };

  return (
    <div className="space-y-4">
      {initialProducts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No products found. Add your first product!</p>
      ) : (
        initialProducts.map((product) => (
          <div key={product.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{product.description}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Created: {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Link
                  href={`/products/edit/${product.id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors inline-block shadow-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
