import { useState } from "react";

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

  // Si el producto está en el carrito, muestra solo el botón de quitar (sin pildora)
  if (productoEnCarrito) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow hover:shadow-lg transition-all p-5 flex flex-col items-center gap-3">
        <div className="w-28 h-28 flex items-center justify-center bg-gray-50 rounded-xl mb-2 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="object-contain w-24 h-24"
          />
        </div>
        <h2 className="font-semibold text-center text-gray-800 text-base">{product.name}</h2>
        <p className="text-xs text-gray-400 mb-1 capitalize">{product.category}</p>
        <div className="mb-2 text-salmon font-semibold text-sm">
          Añadido: {productoEnCarrito.tipo} ({productoEnCarrito.precio}€)
        </div>
        <button
          onClick={() => removeFromCart(productoEnCarrito)}
          className="w-full py-2 rounded-xl font-semibold transition mt-auto border bg-salmon text-white border-salmon shadow hover:bg-salmon/90"
        >
          Quitar del carrito
        </button>
      </div>
    );
  }

  // Si no está en el carrito, muestra el botón de añadir o las opciones
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow hover:shadow-lg transition-all p-5 flex flex-col items-center gap-3">
      <div className="w-28 h-28 flex items-center justify-center bg-gray-50 rounded-xl mb-2 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="object-contain w-24 h-24"
        />
      </div>
      <h2 className="font-semibold text-center text-gray-800 text-base">{product.name}</h2>
      <p className="text-xs text-gray-400 mb-1 capitalize">{product.category}</p>
      {showOpciones ? (
        <div className="flex gap-2 w-full mb-2">
          {opciones.map((op) => (
            <button
              key={op.tipo}
              onClick={() => {
                addToCart({ ...product, tipo: op.tipo, precio: op.precio });
                setShowOpciones(false);
              }}
              className="flex-1 py-2 rounded-xl font-semibold border border-salmon text-salmon bg-white hover:bg-salmon/10 transition text-sm"
            >
              {op.tipo}
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={() => setShowOpciones(true)}
          className="w-full py-2 rounded-xl font-semibold transition mt-auto border bg-white border-salmon text-salmon hover:bg-salmon/10 hover:border-salmon"
        >
          Agregar a cesta
        </button>
      )}
    </div>
  );
}