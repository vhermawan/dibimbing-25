import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET /api/products/[id]
 * Get a single product by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return NextResponse.json({
        success: false,
        error: 'Not found',
        message: 'Product not found'
      }, { status: 404 });
    }

    // Check if product is soft-deleted
    if (product.deletedAt) {
      return NextResponse.json({
        success: false,
        error: 'Not found',
        message: 'Product has been deleted'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product fetched successfully'
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch product',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * PUT /api/products/[id]
 * Update a product by ID
 * Body: { name?: string, description?: string }
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description } = body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return NextResponse.json({
        success: false,
        error: 'Not found',
        message: 'Product not found'
      }, { status: 404 });
    }

    // Check if product is soft-deleted
    if (existingProduct.deletedAt) {
      return NextResponse.json({
        success: false,
        error: 'Bad request',
        message: 'Cannot update a deleted product'
      }, { status: 400 });
    }

    // Validation
    if (!name && !description) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        message: 'At least one field (name or description) is required'
      }, { status: 400 });
    }

    // Build update data
    const updateData: { name?: string; description?: string } = {};
    if (name) updateData.name = name.trim();
    if (description) updateData.description = description.trim();

    // Update product
    const product = await prisma.product.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update product',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * DELETE /api/products/[id]
 * Soft delete a product by ID
 * Query param: ?hard=true for permanent deletion
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const hardDelete = searchParams.get('hard') === 'true';

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return NextResponse.json({
        success: false,
        error: 'Not found',
        message: 'Product not found'
      }, { status: 404 });
    }

    let product;

    if (hardDelete) {
      // Permanent deletion
      product = await prisma.product.delete({
        where: { id }
      });

      return NextResponse.json({
        success: true,
        data: product,
        message: 'Product permanently deleted'
      }, { status: 200 });
    } else {
      // Soft delete
      if (existingProduct.deletedAt) {
        return NextResponse.json({
          success: false,
          error: 'Bad request',
          message: 'Product is already deleted'
        }, { status: 400 });
      }

      product = await prisma.product.update({
        where: { id },
        data: {
          deletedAt: new Date()
        }
      });

      return NextResponse.json({
        success: true,
        data: product,
        message: 'Product soft deleted successfully'
      }, { status: 200 });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete product',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * PATCH /api/products/[id]
 * Restore a soft-deleted product
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return NextResponse.json({
        success: false,
        error: 'Not found',
        message: 'Product not found'
      }, { status: 404 });
    }

    // Check if product is soft-deleted
    if (!existingProduct.deletedAt) {
      return NextResponse.json({
        success: false,
        error: 'Bad request',
        message: 'Product is not deleted'
      }, { status: 400 });
    }

    // Restore product
    const product = await prisma.product.update({
      where: { id },
      data: {
        deletedAt: null
      }
    });

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product restored successfully'
    }, { status: 200 });
  } catch (error) {
    console.error('Error restoring product:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to restore product',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
