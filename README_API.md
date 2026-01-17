# Products API - Complete Guide

A production-ready REST API for managing products with full CRUD operations, built with Next.js 14+, Prisma, and PostgreSQL.

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Documentation](#documentation)

## ✨ Features

- ✅ **Full CRUD Operations** - Create, Read, Update, Delete
- ✅ **Soft Delete** - Preserve data with deletedAt timestamp
- ✅ **Hard Delete** - Permanent deletion option
- ✅ **Restore Functionality** - Recover soft-deleted products
- ✅ **Type Safety** - Full TypeScript support
- ✅ **Input Validation** - Comprehensive validation on all endpoints
- ✅ **Error Handling** - Consistent error responses
- ✅ **Client Library** - Ready-to-use TypeScript client
- ✅ **Interactive Testing** - Web-based API tester
- ✅ **Postman Collection** - Import and test immediately

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API Style**: RESTful
- **Runtime**: Node.js

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- npm or yarn package manager

### Installation

1. **Install dependencies** (if not already done):
```bash
npm install
```

2. **Set up environment variables**:
Create a `.env` file with your database URL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

3. **Generate Prisma Client**:
```bash
npx prisma generate
```

4. **Push database schema**:
```bash
npx prisma db push
```

5. **Start development server**:
```bash
npm run dev
```

6. **Test the API**:
Open http://localhost:3000/api-test.html in your browser

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all active products |
| `GET` | `/api/products/:id` | Get single product by ID |
| `POST` | `/api/products` | Create new product |
| `PUT` | `/api/products/:id` | Update existing product |
| `DELETE` | `/api/products/:id` | Soft delete product |
| `DELETE` | `/api/products/:id?hard=true` | Hard delete product |
| `PATCH` | `/api/products/:id` | Restore soft-deleted product |

### Response Format

All endpoints return a consistent JSON response:

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

## 💡 Usage Examples

### 1. Using the TypeScript Client (Recommended)

```typescript
import { productsApi } from '@/lib/api-client';

// Get all products
const response = await productsApi.getAll();
if (response.success) {
  console.log(response.data); // Product[]
}

// Get single product
const product = await productsApi.getById('product-id');

// Create product
await productsApi.create({
  name: 'New Product',
  description: 'Product description'
});

// Update product
await productsApi.update('product-id', {
  name: 'Updated Name',
  description: 'Updated description'
});

// Delete product (soft)
await productsApi.delete('product-id');

// Delete product (hard)
await productsApi.hardDelete('product-id');

// Restore product
await productsApi.restore('product-id');
```

### 2. Using fetch API

```javascript
// Get all products
const response = await fetch('/api/products');
const data = await response.json();

// Create product
await fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Product',
    description: 'Product description'
  })
});

// Update product
await fetch('/api/products/product-id', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Updated Name'
  })
});

// Delete product
await fetch('/api/products/product-id', {
  method: 'DELETE'
});
```

### 3. Using cURL

```bash
# Get all products
curl http://localhost:3000/api/products

# Create product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"New Product","description":"Description"}'

# Update product
curl -X PUT http://localhost:3000/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'

# Delete product
curl -X DELETE http://localhost:3000/api/products/PRODUCT_ID
```

### 4. React Component Example

```typescript
'use client';

import { useState, useEffect } from 'react';
import { productsApi } from '@/lib/api-client';
import type { Product } from '@/app/types/product';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await productsApi.getAll();
    if (response.success && response.data) {
      setProducts(response.data);
    }
  };

  const handleCreate = async (name: string, description: string) => {
    const response = await productsApi.create({ name, description });
    if (response.success) {
      await loadProducts();
    }
  };

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🧪 Testing

### Option 1: Interactive Web Interface

1. Start your dev server: `npm run dev`
2. Open http://localhost:3000/api-test.html
3. Use the visual interface to test all endpoints

### Option 2: Postman

1. Import `postman_collection.json` into Postman
2. Update the `baseUrl` variable if needed
3. Run the requests

### Option 3: Command Line (cURL)

See the cURL examples in the [Usage Examples](#usage-examples) section above.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── products/
│   │       ├── route.ts              # GET all, POST
│   │       └── [id]/
│   │           └── route.ts          # GET one, PUT, DELETE, PATCH
│   ├── products/
│   │   └── _components/
│   │       └── product-api-example.tsx  # Example React component
│   └── types/
│       └── product.ts                # TypeScript types
├── lib/
│   ├── api-client.ts                 # TypeScript API client
│   └── prisma.ts                     # Prisma client instance
└── prisma/
    └── schema.prisma                 # Database schema

public/
└── api-test.html                     # Interactive API tester

Documentation/
├── API_DOCUMENTATION.md              # Complete API reference
├── QUICK_START_API.md               # Quick start guide
├── API_SUMMARY.md                   # Overview
├── README_API.md                    # This file
└── postman_collection.json          # Postman collection
```

## 📖 Documentation

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference with all endpoints, request/response examples
- **[QUICK_START_API.md](./QUICK_START_API.md)** - Step-by-step getting started guide
- **[API_SUMMARY.md](./API_SUMMARY.md)** - Quick overview of the implementation
- **[postman_collection.json](./postman_collection.json)** - Postman collection for testing

## 🔧 Configuration

### Database Schema

The Product model in `prisma/schema.prisma`:

```prisma
model Product {
  id          String    @id @default(uuid())
  name        String
  description String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  deletedAt   DateTime?
}
```

### Environment Variables

Required in `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
NODE_ENV="development"
```

## 🛡️ Error Handling

All endpoints include comprehensive error handling:

- **400 Bad Request** - Invalid input or validation errors
- **404 Not Found** - Resource doesn't exist
- **500 Internal Server Error** - Server-side errors

Example error response:
```json
{
  "success": false,
  "error": "Validation error",
  "message": "Name and description are required"
}
```

## 🎯 Best Practices Implemented

1. ✅ **RESTful Design** - Follows REST conventions
2. ✅ **Consistent Responses** - All endpoints return same structure
3. ✅ **Proper HTTP Methods** - GET, POST, PUT, DELETE, PATCH
4. ✅ **Status Codes** - Appropriate HTTP status codes
5. ✅ **Input Validation** - Validates all user input
6. ✅ **Error Messages** - Clear, actionable error messages
7. ✅ **Type Safety** - Full TypeScript support
8. ✅ **Soft Delete** - Preserves data by default
9. ✅ **Documentation** - Comprehensive docs and examples

## 🚀 Next Steps

After setting up the API, you can:

1. **Integrate with Frontend** - Use the TypeScript client in your React components
2. **Add Authentication** - Implement JWT or session-based auth
3. **Add Pagination** - Handle large datasets efficiently
4. **Add Filtering** - Implement search and filter capabilities
5. **Add Validation** - Use Zod or similar for schema validation
6. **Add Tests** - Write unit and integration tests
7. **Deploy** - Deploy to Vercel, AWS, or your preferred platform

## 📞 Support

For issues or questions:

1. Check the documentation files in the project
2. Review the example component: `src/app/products/_components/product-api-example.tsx`
3. Test the API using: http://localhost:3000/api-test.html
4. Import the Postman collection for API testing

## 📝 License

This API implementation is part of your project and follows your project's license.

---

**Happy coding! 🎉**
