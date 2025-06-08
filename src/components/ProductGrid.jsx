import ProductCard from "./ProductCard";

export default function ProductGrid({ products, cart, addToCart, removeFromCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2 py-4">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      {products.length === 0 && (
        <div className="col-span-full text-center text-gray-400 py-10">
          No hay productos para mostrar.
        </div>
      )}
    </div>
  );
}