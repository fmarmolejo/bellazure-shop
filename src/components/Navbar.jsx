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
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm sticky top-0 z-20">
      {/* Logo/Título */}
      <div className="flex items-center gap-2">
        <span className="inline-block w-8 h-8 rounded-full bg-salmon flex items-center justify-center text-white font-bold text-lg">B</span>
        <span className="font-bold text-lg text-salmon tracking-tight">Bellazure</span>
      </div>

      {/* Búsqueda estilo Airbnb con menú integrado */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm px-2 py-1 max-w-md w-full relative">
          {/* Dropdown Categorías integrado */}
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
            {/* Menú flotante tipo popover, pero pegado al botón */}
            {catMenuOpen && (
            <div className="absolute left-0 top-full mt-1 w-32 bg-white border border-gray-100 rounded-lg shadow z-30 py-1">
                {categories.map((cat) => (
                <button
                    key={cat}
                    className={`block w-full text-left px-3 py-1.5 rounded-lg capitalize font-medium text-sm transition
                    ${cat === selectedCategory
                        ? "bg-salmon text-white"
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
          {/* Separador sutil */}
          <span className="mx-2 text-gray-200 font-bold select-none">|</span>
          {/* Input búsqueda */}
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full bg-transparent outline-none border-none px-2 py-1 text-gray-700 placeholder-gray-400 rounded-full"
              placeholder="Buscar un perfume..."
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
        className="relative ml-4 flex items-center justify-center w-11 h-11 rounded-full bg-salmon"
        onClick={onCartClick}
        aria-label="Ver carrito"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path d="M7 20a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-9.83-4.41A1 1 0 0 1 7 17h10a1 1 0 0 0 .96-.74l3-10A1 1 0 0 0 20 5H6.21l-.94-2.34A1 1 0 0 0 4.34 2H2a1 1 0 1 0 0 2h1.34l3.6 9.36-1.35 2.44A1 1 0 0 0 6 17h12a1 1 0 1 0 0-2H7.42l.93-1.68z"/>
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-salmon text-xs font-bold rounded-full px-2 py-0.5 border border-salmon shadow">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
}