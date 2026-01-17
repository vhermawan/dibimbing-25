/**
 * Products API Client
 * A TypeScript client for interacting with the Products API
 */

import type { Product } from '@/app/types/product';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message: string;
}

interface CreateProductDto {
  name: string;
  description: string;
}

interface UpdateProductDto {
  name?: string;
  description?: string;
}

class ProductsApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/products') {
    this.baseUrl = baseUrl;
  }

  /**
   * Get all active products
   */
  async getAll(): Promise<ApiResponse<Product[]>> {
    try {
      const response = await fetch(this.baseUrl);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch products',
        error: 'Network error'
      };
    }
  }

  /**
   * Get a single product by ID
   */
  async getById(id: string): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch product',
        error: 'Network error'
      };
    }
  }

  /**
   * Create a new product
   */
  async create(data: CreateProductDto): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create product',
        error: 'Network error'
      };
    }
  }

  /**
   * Update an existing product
   */
  async update(id: string, data: UpdateProductDto): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update product',
        error: 'Network error'
      };
    }
  }

  /**
   * Soft delete a product
   */
  async delete(id: string): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to delete product',
        error: 'Network error'
      };
    }
  }

  /**
   * Permanently delete a product
   */
  async hardDelete(id: string): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}?hard=true`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to delete product',
        error: 'Network error'
      };
    }
  }

  /**
   * Restore a soft-deleted product
   */
  async restore(id: string): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to restore product',
        error: 'Network error'
      };
    }
  }
}

// Export a singleton instance
export const productsApi = new ProductsApiClient();

// Export the class for custom instances
export default ProductsApiClient;

// Export types
export type { ApiResponse, CreateProductDto, UpdateProductDto };
