# Quick Start Guide - Products API

This guide will help you quickly get started with the Products API.

## 📋 Prerequisites

1. Make sure your Next.js development server is running:
```bash
npm run dev
```

2. Ensure your database is set up and Prisma is configured correctly:
```bash
npx prisma generate
npx prisma db push
```

## 🚀 Testing the API

### Option 1: Using the Built-in Test Page

1. Open your browser and navigate to:
```
http://localhost:3000/api-test.html
```

2. This interactive page allows you to:
   - View all products
   - Create new products
   - Update existing products
   - Delete products (soft and hard delete)
   - Restore deleted products

### Option 2: Using cURL (Command Line)

**Get all products:**
```bash
curl http://localhost:3000/api/products
```

**Create a product:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Product",
    "description": "This is a sample product"
  }'
```

**Update a product:**
```bash
curl -X PUT http://localhost:3000/api/products/YOUR_PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product",
    "description": "Updated description"
  }'
```

**Delete a product:**
```bash
curl -X DELETE http://localhost:3000/api/products/YOUR_PRODUCT_ID
```

### Option 3: Using the TypeScript Client Library

In your React components or pages:

```typescript
import { productsApi } from '@/lib/api-client';

// Get all products
const response = await productsApi.getAll();
if (response.success) {
  console.log(response.data); // Array of products
}

// Create a product
const createResponse = await productsApi.create({
  name: 'New Product',
  description: 'Product description'
});

// Update a product
const updateResponse = await productsApi.update('product-id', {
  name: 'Updated Name'
});

// Delete a product
const deleteResponse = await productsApi.delete('product-id');

// Restore a product
const restoreResponse = await productsApi.restore('product-id');
```

## 📚 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all active products |
| GET | `/api/products/:id` | Get single product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update existing product |
| DELETE | `/api/products/:id` | Soft delete product |
| DELETE | `/api/products/:id?hard=true` | Hard delete product |
| PATCH | `/api/products/:id` | Restore soft-deleted product |

## 💡 Example Usage in React Component

```typescript
'use client';

import { useState, useEffect } from 'react';
import { productsApi } from '@/lib/api-client';
import type { Product } from '@/app/types/product';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const response = await productsApi.getAll();
    if (response.success && response.data) {
      setProducts(response.data);
    }
    setLoading(false);
  };

  const handleCreate = async (name: string, description: string) => {
    const response = await productsApi.create({ name, description });
    if (response.success) {
      await loadProducts(); // Refresh list
      alert('Product created successfully!');
    } else {
      alert(`Error: ${response.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure?');
    if (!confirmed) return;

    const response = await productsApi.delete(id);
    if (response.success) {
      await loadProducts(); // Refresh list
      alert('Product deleted successfully!');
    } else {
      alert(`Error: ${response.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 🔍 Response Format

All API endpoints return a consistent response format:

**Success Response:**
```json
{
  "success": true,
  "data": { /* product data */ },
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

## 🛠️ Troubleshooting

### Database Connection Issues
If you get database errors:
```bash
# Check your .env file has DATABASE_URL
# Then regenerate Prisma client
npx prisma generate
npx prisma db push
```

### Port Already in Use
If port 3000 is already in use:
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or run on a different port
PORT=3001 npm run dev
```

### API Returns 404
Make sure:
- Your Next.js dev server is running
- You're using the correct URL (http://localhost:3000/api/products)
- The API route files are in the correct directory structure

## 📖 Additional Resources

- Full API Documentation: `API_DOCUMENTATION.md`
- Interactive API Tester: `http://localhost:3000/api-test.html`
- TypeScript Client: `src/lib/api-client.ts`

## 🎯 Next Steps

1. ✅ Test the API using the interactive test page
2. ✅ Try creating, updating, and deleting products
3. ✅ Integrate the API client into your React components
4. ✅ Build your frontend UI using the API

Happy coding! 🚀
