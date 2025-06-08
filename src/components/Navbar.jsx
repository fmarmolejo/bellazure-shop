import { useRef, useEffect } from "react";

export default function Navbar({
  cartCount,
  onCartClick,
  search,
  setSearch,
  categories,
  selectedCategory,
  setSelectedCategory,
  catMenuOpen,
  setCatMenuOpen,
}) {
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setCatMenuOpen(false);
      }
    }
    if (catMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [catMenuOpen, setCatMenuOpen]);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-20">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-12 flex items-center px-5">
            <span
              className="font-bold text-xl text-salmon tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", lineHeight: "1" }}
            >
              Bellazure
            </span>
          </div>
        </div>

        {/* Buscador y categorías */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm px-2 py-1 max-w-md w-full relative">
            {/* Menú de categorías */}
            <div className="relative" ref={menuRef}>
              <button
                className="flex items-center px-3 py-1 rounded-full text-gray-700 font-medium hover:bg-gray-100 transition focus:outline-none"
                onClick={() => setCatMenuOpen((open) => !open)}
                type="button"
                tabIndex={0}
              >
                <span className="capitalize">{selectedCategory}</span>
                <svg className="ml-1 w-4 h-4 text-salmon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {catMenuOpen && (
                <div className="absolute left-0 top-full mt-3 w-52 bg-white border border-gray-100 rounded-xl shadow z-30 py-3 px-4 flex flex-col gap-2">
                  <div className="mb-2 px-1 text-xs font-normal text-gray-500 uppercase tracking-wide select-none">
                    Categorías:
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`w-full text-left px-4 py-2 rounded-lg capitalize font-medium text-sm transition
                        ${cat === selectedCategory
                          ? "bg-salmon text-white shadow"
                          : "hover:bg-salmon/10 text-salmon"}`}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setCatMenuOpen(false);
                      }}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="mx-2 text-gray-200 font-bold select-none">|</span>
            {/* Buscador */}
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full bg-transparent outline-none border-none px-2 py-1 text-gray-700 placeholder-gray-400 rounded-full"
                placeholder="Buscar..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-salmon">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Botón carrito */}
        <button
          className="relative ml-4 flex items-center justify-center w-11 h-11 bg-white border border-gray-200 rounded-full shadow-sm"
          onClick={onCartClick}
          aria-label="Ver cesta"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 text-salmon"
            stroke="currentColor"
            strokeWidth={2}
          >
            {/* Bolsa de compras estilo simple */}
            <path
              d="M7 7V6a5 5 0 0 1 10 0v1"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <rect
              x="3"
              y="7"
              width="18"
              height="13"
              rx="3"
              stroke="currentColor"
              strokeWidth={2}
              fill="none"
            />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-salmon text-xs font-bold rounded-full px-2 py-0.5 border border-salmon shadow">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}