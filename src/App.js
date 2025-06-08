import { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import CartPanel from "./components/CartPanel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import products from "./data/products.json";

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
    if (!cart.find((item) => item.id === product.id && item.tipo === product.tipo)) {
      setCart([...cart, product]);
      toast.success(`Se ha añadido ${product.name}${product.tipo ? ` (${product.tipo})` : ""} a la cesta`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { background: "#b6f5c3", color: "#222", fontWeight: "bold", textAlign: "center", minWidth: "500px", maxWidth: "90vw" },
      });
    }
  };

  const removeFromCart = (producto) => {
    setCart(cart.filter(item => !(item.id === producto.id && item.tipo === producto.tipo)));
    toast.info(`Se ha eliminado ${producto.name}${producto.tipo ? ` (${producto.tipo})` : ""} de la cesta`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      style: { background: "#fa8072", color: "#fff", fontWeight: "bold", textAlign: "center", minWidth: "500px", maxWidth: "90vw" },
    });
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
    (selectedCategory === "todos" || (Array.isArray(product.category)
    ? product.category.includes(selectedCategory)
    : product.category === selectedCategory)) &&
    (
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      (search !== "" && !isNaN(search) && product.id.toString() === search)
    )
);

  return (
    <div>
      <ToastContainer icon={false} />
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