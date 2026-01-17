import { getProductById } from "@/app/_actions/products";
import { notFound } from "next/navigation";
import ProductForm from "../../_components/product-form";

export default async function EditProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Edit Product</h1>
      <ProductForm mode="edit" product={product} />
    </div>
  );
}
