import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function CartPanel({ open, cart, removeFromCart, onClose }) {
  const [quantities, setQuantities] = useState(() =>
    Object.fromEntries(cart.map(item => [item.id, 1]))
  );

  useEffect(() => {
    setQuantities(qs => {
      const newQs = { ...qs };
      cart.forEach(item => {
        if (!newQs[item.id]) newQs[item.id] = 1;
      });
      Object.keys(newQs).forEach(id => {
        if (!cart.find(item => item.id === Number(id))) delete newQs[id];
      });
      return newQs;
    });
  }, [cart]);

  const handleChange = (id, value) => {
    setQuantities(qs => ({
      ...qs,
      [id]: Math.max(1, value)
    }));
  };

  const total = cart.reduce(
    (sum, item) => sum + (quantities[item.id] || 1) * (item.precio || 0),
    0
  );

  // Generar resumen para WhatsApp
  const getWhatsappText = () => {
    if (cart.length === 0) return "";
    let text = "¡Hola! Quiero realizar el siguiente pedido:%0A%0A";
    cart.forEach(item => {
      text += `ID: ${item.id} | ${item.name} | ${item.tipo || ""} | Cantidad: ${quantities[item.id] || 1} | Subtotal: ${(quantities[item.id] || 1) * (item.precio || 0)}€%0A`;
    });
    text += `%0ATotal: ${total}€`;
    return text;
  };

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=34634416952&text=${getWhatsappText()}`;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl z-40 transition-transform duration-300 border-l border-gray-100
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="font-bold text-xl text-salmon tracking-tight">Tu cesta</h2>
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-salmon text-2xl font-bold"
          aria-label="Cerrar"
        >
          &times;
        </button>
      </div>
      <div className="p-6 flex flex-col gap-4 h-[calc(100%-72px)] overflow-y-auto">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg className="w-12 h-12 mb-2 text-gray-200" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" />
              <path d="M8 12h8M12 8v8" stroke="currentColor" strokeLinecap="round" />
            </svg>
            <p className="text-center">Tu cesta está vacía.</p>
          </div>
        ) : (
          <>
            <ul className="flex flex-col gap-3">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <div className="flex flex-col flex-1">
                    <span className="font-medium text-gray-700">{item.name}</span>
                    {item.tipo && (
                      <span className="text-xs text-gray-500 mt-0.5">
                        {item.tipo} {item.precio ? ` — ${item.precio}€` : ""}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleChange(item.id, (quantities[item.id] || 1) - 1)}
                      className="w-7 h-7 rounded-full bg-gray-200 text-salmon font-bold flex items-center justify-center hover:bg-gray-300"
                      disabled={quantities[item.id] <= 1}
                      aria-label="Disminuir cantidad"
                    >-</button>
                    <input
                      type="number"
                      min={1}
                      value={quantities[item.id] || 1}
                      onChange={e => handleChange(item.id, Number(e.target.value))}
                      className="w-10 text-center border border-gray-200 rounded font-normal"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      style={{ MozAppearance: "textfield" }}
                      onWheel={e => e.target.blur()}
                    />
                    <button
                      onClick={() => handleChange(item.id, (quantities[item.id] || 1) + 1)}
                      className="w-7 h-7 rounded-full bg-gray-200 text-salmon font-bold flex items-center justify-center hover:bg-gray-300"
                      aria-label="Aumentar cantidad"
                    >+</button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="ml-2 text-xs text-red-500 hover:underline font-normal"
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3 border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="font-normal text-gray-700">Total</span>
                <span className="font-bold text-salmon text-lg">
                  {total}€
                </span>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 transition text-base mt-2"
                style={{ textDecoration: "none" }}
              >
                <FaWhatsapp className="text-2xl" />
                Realizar pedido
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}