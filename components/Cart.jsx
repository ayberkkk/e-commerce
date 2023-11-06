import ProductList from "@/pages/api/products";

export default function Cart() {
  return (
    <div className="container mx-auto grid lg:grid-cols-4 grid-cols-2">
      <ProductList />
    </div>
  );
}
