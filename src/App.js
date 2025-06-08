import { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import CartPanel from "./components/CartPanel";

const products = [
  { id: 1, name: "Aire - Loewe", category: "mujer" },
  { id: 2, name: "CK one - Calvin Klein", category: "mujer" },
  { id: 3, name: "Carolina Herrera Clásica", category: "mujer" },
  { id: 4, name: "Chanel nº5", category: "mujer" },
  { id: 6, name: "Anais anais - Cacharel", category: "mujer" },
  { id: 8, name: "Trésor - Lancôme", category: "mujer" },
  { id: 11, name: "Coco Chanel", category: "mujer" },
  { id: 13, name: "Opium - Yves Saint Laurent", category: "mujer" },
  { id: 20, name: "Ejemplo Hombre", category: "hombre" },
  { id: 30, name: "Ejemplo Infantil", category: "infantil" },
];

const categories = ["todos", "mujer", "hombre", "infantil"];

function App() {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [search, setSearch] = useState("");
  const [catMenuOpen, setCatMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (!cart.find((item) => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (producto) => {
    setCart(cart.filter(item => !(item.id === producto.id && item.tipo === producto.tipo)));
  };

  const isInCart = (productId) => cart.some((item) => item.id === productId);

  const toggleCart = (product) => {
    if (isInCart(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  // Filtrar productos por categoría y búsqueda
  const filteredProducts = products.filter(
  (product) =>
    (selectedCategory === "todos" || product.category === selectedCategory) &&
    (
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      (search !== "" && !isNaN(search) && product.id.toString() === search)
    )
);

  return (
    <div>
      <Navbar
        cartCount={cart.length}
        onCartClick={() => setCartOpen(!cartOpen)}
        search={search}
        setSearch={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        catMenuOpen={catMenuOpen}
        setCatMenuOpen={setCatMenuOpen}
      />
      <main>
        <ProductGrid
          products={filteredProducts}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
        <CartPanel
          open={cartOpen}
          cart={cart}
          removeFromCart={removeFromCart}
          onClose={() => setCartOpen(false)}
        />
      </main>
    </div>
  );
}

export default App;