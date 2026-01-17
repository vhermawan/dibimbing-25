'use client';

import { createProduct, updateProduct } from "@/app/_actions/products";
import type { Product } from "@/app/types/product";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductFormProps {
  mode: 'create' | 'edit';
  product?: Product;
  onCancel?: () => void;
}

export default function ProductForm({ mode, product, onCancel }: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(e.currentTarget);
    try {
      const formData = new FormData(e.currentTarget);
      if (mode === 'create') {
        await createProduct(formData);
        alert('Product created successfully');
        router.refresh();
        onCancel?.();
      } else {
        if (!product?.id) {
          throw new Error('Product ID is required for update');
        }
        await updateProduct(product.id, formData);
        router.push('/products');
        router.refresh();
      }
    } catch (error) {
      console.error(`Failed to ${mode} product:`, error);
      alert(`Failed to ${mode} product`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={product?.name || ''}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            defaultValue={product?.description || ''}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter product description"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed shadow-sm"
          >
            {isLoading 
              ? mode === 'create' ? 'Creating...' : 'Updating...'
              : mode === 'create' ? 'Create Product' : 'Update Product'
            }
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
