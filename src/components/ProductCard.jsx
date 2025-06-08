import { useState } from "react";
import ProductImage from "./product/ProductImage";
import ProductName from "./product/ProductName";

const opciones = [
  { tipo: "Muestra", precio: 1 },
  { tipo: "50 ml", precio: 10 },
  { tipo: "100 ml", precio: 15 },
];

export default function ProductCard({ product, cart, addToCart, removeFromCart }) {
  const imageUrl = `/images/${product.id}.png`;
  const [showOpciones, setShowOpciones] = useState(false);

  // Busca si el producto está en el carrito y qué tipo tiene
  const productoEnCarrito = cart?.find(
    (item) => item.id === product.id
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow hover:shadow-lg transition-all p-5 flex flex-col items-center gap-3">
      <ProductImage src={imageUrl} alt={product.name} />
      <ProductName text={`Bellazure nº${product.id}`} className="font-normal"/>
      <ProductName text={product.name} className="font-light"/>
      {productoEnCarrito ? (
        <>
          <button
            onClick={() => removeFromCart(productoEnCarrito)}
            className="w-full py-2 rounded-xl font-normal transition mt-auto border bg-salmon text-white border-salmon shadow hover:bg-salmon/90"
          >
            Quitar del carrito
          </button>
        </>
      ) : (
        <>
          {showOpciones ? (
            <div className="flex gap-2 w-full mb-2">
              {opciones.map((op) => (
                <button
                  key={op.tipo}
                  onClick={() => {
                    addToCart({ ...product, tipo: op.tipo, precio: op.precio });
                    setShowOpciones(false);
                  }}
                  className="flex-1 py-2 rounded-xl font-normal border border-salmon text-salmon bg-white hover:bg-salmon/10 transition text-sm"
                >
                  {op.tipo}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => setShowOpciones(true)}
              className="w-full py-2 rounded-xl font-normal transition mt-auto border bg-white border-salmon text-salmon hover:bg-salmon/10 hover:border-salmon"
            >
              Agregar a cesta
            </button>
          )}
        </>
      )}
    </div>
  );
}