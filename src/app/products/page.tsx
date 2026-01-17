import { getProducts } from "../_actions/products";
import AddProductForm from "./_components/add-product-form";
import ProductList from "./_components/product-list";

export default async function Products() {
  const products = await getProducts();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Products Management</h1>
      
      <AddProductForm />
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Product List ({products.length})
        </h2>
        <ProductList products={products} />
      </div>
    </div>
  );
}