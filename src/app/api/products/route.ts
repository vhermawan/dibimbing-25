import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET /api/products
 * Get all products (excluding soft-deleted ones)
 */
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        deletedAt: null
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: products,
      message: 'Products fetched successfully'
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch products',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * POST /api/products
 * Create a new product
 * Body: { name: string, description: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    // Validation
    if (!name || !description) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Name and description are required'
      }, { status: 400 });
    }

    if (typeof name !== 'string' || typeof description !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'Name and description must be strings'
      }, { status: 400 });
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        description
      }
    });

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create product',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
