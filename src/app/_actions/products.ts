'use server';

import prisma from "@/lib/prisma";
import type { Product } from "../types/product";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  const products: Product[] = await prisma.product.findMany({
    where: {
      deletedAt: null
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return products;
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id }
  });
  return product;
}

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  if (!name || !description) {
    throw new Error('Name and description are required');
  }

  const product = await prisma.product.create({
    data: {
      name,
      description
    }
  });

  revalidatePath('/products');
  return product;
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  if (!name || !description) {
    throw new Error('Name and description are required');
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      description
    }
  });

  revalidatePath('/products');
  return product;
}

export async function deleteProduct(id: string) {
  // Soft delete
  const product = await prisma.product.update({
    where: { id },
    data: {
      deletedAt: new Date()
    }
  });

  revalidatePath('/products');
  return product;
}

export async function hardDeleteProduct(id: string) {
  // Hard delete (permanent)
  const product = await prisma.product.delete({
    where: { id }
  });

  revalidatePath('/products');
  return product;
}