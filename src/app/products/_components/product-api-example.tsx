'use client';

/**
 * Example component demonstrating how to use the Products API Client
 * This is a reference implementation showing all CRUD operations
 */

import { useState, useEffect } from 'react';
import { productsApi } from '@/lib/api-client';
import type { Product } from '@/app/types/product';

export default function ProductApiExample() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  /**
   * Fetch all products from the API
   */
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    
    const response = await productsApi.getAll();
    
    if (response.success && response.data) {
      setProducts(response.data);
    } else {
      setError(response.message);
    }
    
    setLoading(false);
  };

  /**
   * Create a new product
   */
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description) {
      alert('Please fill in all fields');
      return;
    }

    const response = await productsApi.create({ name, description });
    
    if (response.success) {
      alert('Product created successfully!');
      setName('');
      setDescription('');
      await loadProducts(); // Refresh the list
    } else {
      alert(`Error: ${response.message}`);
    }
  };

  /**
   * Update an existing product
   */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingId) return;
    
    if (!name && !description) {
      alert('Please fill in at least one field');
      return;
    }

    const updateData: { name?: string; description?: string } = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    const response = await productsApi.update(editingId, updateData);
    
    if (response.success) {
      alert('Product updated successfully!');
      setEditingId(null);
      setName('');
      setDescription('');
      await loadProducts(); // Refresh the list
    } else {
      alert(`Error: ${response.message}`);
    }
  };

  /**
   * Delete a product (soft delete)
   */
  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    const response = await productsApi.delete(id);
    
    if (response.success) {
      alert('Product deleted successfully!');
      await loadProducts(); // Refresh the list
    } else {
      alert(`Error: ${response.message}`);
    }
  };

  /**
   * Permanently delete a product
   */
  const handleHardDelete = async (id: string) => {
    const confirmed = confirm(
      'Are you sure you want to PERMANENTLY delete this product? This action cannot be undone!'
    );
    if (!confirmed) return;

    const response = await productsApi.hardDelete(id);
    
    if (response.success) {
      alert('Product permanently deleted!');
      await loadProducts(); // Refresh the list
    } else {
      alert(`Error: ${response.message}`);
    }
  };

  /**
   * Restore a soft-deleted product
   */
  const handleRestore = async (id: string) => {
    const response = await productsApi.restore(id);
    
    if (response.success) {
      alert('Product restored successfully!');
      await loadProducts(); // Refresh the list
    } else {
      alert(`Error: ${response.message}`);
    }
  };

  /**
   * Start editing a product
   */
  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setDescription(product.description);
  };

  /**
   * Cancel editing
   */
  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setDescription('');
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={loadProducts}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Products API Example</h1>

      {/* Create/Update Form */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Update Product' : 'Create New Product'}
        </h2>
        
        <form onSubmit={editingId ? handleUpdate : handleCreate}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingId ? 'Update' : 'Create'}
            </button>
            
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
            
            <button
              type="button"
              onClick={loadProducts}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Refresh List
            </button>
          </div>
        </form>
      </div>

      {/* Products List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Products List</h2>
        
        {products.length === 0 ? (
          <p className="text-gray-600">No products found. Create one above!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="mb-2">
                  {product.deletedAt && (
                    <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded mb-2">
                      Deleted
                    </span>
                  )}
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                
                <p className="text-xs text-gray-400 mb-3">
                  ID: {product.id}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {!product.deletedAt ? (
                    <>
                      <button
                        onClick={() => startEdit(product)}
                        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleHardDelete(product.id)}
                        className="px-3 py-1 text-sm bg-red-900 text-white rounded hover:bg-red-950"
                      >
                        Hard Delete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleRestore(product.id)}
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Restore
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
