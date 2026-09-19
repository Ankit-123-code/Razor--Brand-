import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { brands, categories, money, products } from './data';
import ProductArt from './components/ProductArt';
import Home from './pages/Home';
import { ProductDetail, Products } from './pages/Products';
import { About, Contact, NotFound } from './pages/Company';

const ShopContext = createContext();
export const useShop = () => useContext(ShopContext);
const readList = () => {
  try {
    const value = JSON.parse(localStorage.getItem('roadeez-enquiry') || '[]');
    return Array.isArray(value)
      ? value
          .filter(
            (item) =>
              products.some((p) => p.id === item.id) &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0,
          )
          .map((item) => ({ id: item.id, quantity: Math.min(item.quantity, 99) }))
      : [];
  } catch {
    return [];
  }
};

export function ButtonLink({ to, children, secondary = false, className = '' }) {
  return (
    <Link to={to} className={`button ${secondary ? 'button-secondary' : ''} ${className}`}>
      {children}
      <ArrowUpRight size={19} />
    </Link>
  );
}
export function Eyebrow({ children, light = false }) {
  return (
    <div className={`eyebrow ${light ? 'light' : ''}`}>
      <span />
      {children}
    </div>
  );
}
export function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {items.map((item, i) => (
        <span key={i}>
          <ChevronRight size={12} />
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('headlight');
  const { setSearchOpen, setBagOpen, items } = useShop();
  const location = useLocation();
  const menuRef = useRef(null);
  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(false);
  }, [location]);
  useEffect(() => {
    function dismiss(e) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    }
    function clickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener('keydown', dismiss);
    document.addEventListener('pointerdown', clickOutside);
    return () => {
      document.removeEventListener('keydown', dismiss);
      document.removeEventListener('pointerdown', clickOutside);
    };
  }, []);
  return (
    <>
      <div className="announcement">
        <span>MADE FOR YOUR BIKE. BUILT FOR THE ROAD.</span>
        <Link to="/about">
          Get to know ROADEEZ <ArrowUpRight size={12} />
        </Link>
      </div>
      <header className="site-header">
        <div className="page-shell header-inner">
          <Link className="brand-logo" to="/" aria-label="ROADEEZ home">
            <img src="/images/roadeez-logo.png" alt="ROADEEZ — It's time to glide" />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <NavLink to="/" end>
              Home
            </NavLink>
            <div
              ref={menuRef}
              className="product-nav"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setMenuOpen(false);
              }}
            >
              <button
                className={`nav-link ${location.pathname.startsWith('/product') ? 'active' : ''}`}
                aria-expanded={menuOpen}
                aria-controls="products-menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                Products <ChevronDown size={14} />
              </button>
              {menuOpen && (
                <div className="mega-menu" id="products-menu">
                  <div className="menu-categories">
                    <span className="menu-label">SHOP BY CATEGORY</span>
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onMouseEnter={() => setActiveCategory(c.id)}
                        onFocus={() => setActiveCategory(c.id)}
                        onClick={() => setActiveCategory(c.id)}
                        className={activeCategory === c.id ? 'selected' : ''}
                      >
                        {c.name}
                        <ChevronRight size={15} />
                      </button>
                    ))}
                    <Link to="/products" className="menu-all">
                      Explore all products <ArrowUpRight size={15} />
                    </Link>
                  </div>
                  <div className="menu-brands">
                    <span className="menu-label">CHOOSE YOUR BRAND</span>
                    {brands.map((brand) => (
                      <Link key={brand} to={`/products/${activeCategory}?brand=${brand}`}>
                        {brand}
                        <ArrowUpRight size={14} />
                      </Link>
                    ))}
                    <Link className="menu-all" to={`/products/${activeCategory}`}>
                      All {categories.find((c) => c.id === activeCategory).name.toLowerCase()}{' '}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={21} />
            </button>
            <button
              className="icon-button bag-button"
              aria-label={`Open enquiry list, ${items.length} products`}
              onClick={() => setBagOpen(true)}
            >
              <ShoppingBag size={21} />
              {items.length > 0 && <span>{items.length}</span>}
            </button>
            <Link to="/products" className="header-shop">
              Find your parts <ArrowUpRight size={16} />
            </Link>
            <button
              className="icon-button mobile-toggle"
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">
              All products <ArrowUpRight size={17} />
            </NavLink>
            {categories.map((c) => (
              <Link className="mobile-category" key={c.id} to={`/products/${c.id}`}>
                {c.name}
                <ChevronRight size={15} />
              </Link>
            ))}
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </nav>
        )}
      </header>
    </>
  );
}

export function ProductCard({ product }) {
  const { addItem } = useShop();
  return (
    <article className="product-card group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-card">
      <Link
        to={`/product/${product.id}`}
        className="product-card-image relative isolate block aspect-[1.12] overflow-hidden bg-surface"
        aria-label={`View ${product.name}`}
      >
        {product.badge && (
          <span className={`product-badge ${product.badge === 'NEW ARRIVAL' ? 'new' : ''}`}>
            {product.badge}
          </span>
        )}
        <span className="pointer-events-none absolute inset-[16%] -z-10 rounded-full bg-white/60 transition duration-500 group-hover:scale-110" />
        <ProductArt category={product.category} color={product.color} className="size-full p-2 pt-7 transition duration-500 group-hover:-rotate-3 group-hover:scale-105 sm:p-3 sm:pt-8" />
        <span className="absolute right-3 bottom-3 grid size-8 place-items-center rounded-full bg-white text-ink shadow-sm transition group-hover:bg-ink group-hover:text-white">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <span className="text-[8px] font-semibold uppercase tracking-wider text-muted sm:text-[9px]">
          {product.brand} <span> / </span>{' '}
          {categories.find((c) => c.id === product.category).singular}
        </span>
        <Link to={`/product/${product.id}`} className="mt-2 block min-h-10 hover:text-brand sm:min-h-12">
          <h3 className="text-xs font-bold leading-relaxed tracking-tight sm:text-[15px]">{product.name}</h3>
        </Link>
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-3.5">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1"><span className="text-base font-bold tracking-tight sm:text-lg">{money(product.price)}</span><del className="text-[10px] text-stone-400 sm:text-xs">{money(product.oldPrice)}</del></div>
          <button className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand transition hover:bg-brand hover:text-white" aria-label={`Add ${product.name} to enquiry`} onClick={() => addItem(product)}><ShoppingBag size={17} /></button>
        </div>
      </div>
    </article>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="page-shell footer-main">
        <div className="footer-intro">
          <Link to="/" className="footer-wordmark">
            ROAD<span>EEZ</span>
            <i>®</i>
          </Link>
          <p>
            Small parts. Big journeys.
            <br />
            Your everyday ride, made better.
          </p>
          <span className="footer-tagline">IT’S TIME TO GLIDE.</span>
        </div>
        <div>
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Our products</Link>
          <Link to="/about">About ROADEEZ</Link>
          <Link to="/contact">Contact us</Link>
        </div>
        <div>
          <h3>Built for your ride</h3>
          {categories.map((c) => (
            <Link key={c.id} to={`/products/${c.id}`}>
              {c.name}
            </Link>
          ))}
        </div>
        <div className="footer-contact">
          <h3>Let’s keep you moving.</h3>
          <p>
            Need help finding the right fit?
            <br />
            We’re here for the journey.
          </p>
          <Link to="/contact" className="footer-cta">
            Get in touch <ArrowUpRight size={19} />
          </Link>
          <span className="made-for-india">
            DESIGNED FOR INDIAN ROADS <span>●</span>
          </span>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>© {new Date().getFullYear()} ROADEEZ. All rights reserved.</span>
        <span>Every part has a purpose. Yours is to ride.</span>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

function Modal({ title, children, onClose, drawer = false }) {
  const panelRef = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const initialControl =
      panelRef.current?.querySelector('input') || panelRef.current?.querySelector('button, a');
    initialControl?.focus();
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const nodes = [
          ...panelRef.current.querySelectorAll(
            'button, a, input, select, textarea, [tabindex="0"]',
          ),
        ].filter((n) => !n.disabled);
        const first = nodes[0],
          last = nodes.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener('keydown', handleKey);
      previous?.focus();
    };
  }, []);
  return (
    <div
      className={`modal-backdrop ${drawer ? 'drawer-backdrop' : ''}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        ref={panelRef}
        className={drawer ? 'drawer' : 'search-modal'}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="modal-heading">
          <h2>{title}</h2>
          <button className="icon-button" aria-label="Close dialog" onClick={onClose}>
            <X />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

function SearchModal() {
  const { setSearchOpen } = useShop();
  const [query, setQuery] = useState('');
  const results = products.filter((p) =>
    `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(query.toLowerCase().trim()),
  );
  return (
    <Modal title="Find your next upgrade." onClose={() => setSearchOpen(false)}>
      <div className="search-input">
        <Search size={20} />
        <input
          autoFocus
          aria-label="Search by part, bike or brand"
          placeholder="Search by part, bike or brand…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <p className="search-hint">
        {query ? `${results.length} matching products` : 'A few parts to get you started'}
      </p>
      <div className="search-results">
        {results.slice(0, 8).map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} onClick={() => setSearchOpen(false)}>
            <ProductArt category={p.category} color={p.color} />
            <span>
              <small>{p.brand}</small>
              <strong>{p.name}</strong>
              <span>{money(p.price)}</span>
            </span>
            <ArrowUpRight size={20} />
          </Link>
        ))}
        {!results.length && (
          <div className="empty-state">
            <Search size={34} />
            <h3>No parts found.</h3>
            <p>Try “headlight”, “Splendor” or a brand name.</p>
          </div>
        )}
      </div>
    </Modal>
  );
}

function BagDrawer() {
  const { items, setItems, setBagOpen } = useShop();
  const total = items.reduce(
    (sum, item) => sum + products.find((p) => p.id === item.id).price * item.quantity,
    0,
  );
  const changeQuantity = (id, delta) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(99, Math.max(1, item.quantity + delta)) }
          : item,
      ),
    );
  return (
    <Modal title="Your enquiry list" onClose={() => setBagOpen(false)} drawer>
      {items.length ? (
        <>
          <p className="drawer-description">
            The right parts, all in one place. Share your list with us to confirm fit and
            availability.
          </p>
          <div className="bag-items">
            {items.map((item) => {
              const p = products.find((p) => p.id === item.id);
              return (
                <div className="bag-item" key={p.id}>
                  <ProductArt category={p.category} color={p.color} />
                  <div>
                    <span className="product-brand">{p.brand}</span>
                    <Link to={`/product/${p.id}`} onClick={() => setBagOpen(false)}>
                      {p.name}
                    </Link>
                    <strong>{money(p.price)}</strong>
                    <div className="bag-quantity">
                      <button
                        aria-label={`Decrease ${p.name} quantity`}
                        onClick={() => changeQuantity(p.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={12} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        aria-label={`Increase ${p.name} quantity`}
                        onClick={() => changeQuantity(p.id, 1)}
                        disabled={item.quantity >= 99}
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        className="remove-item"
                        aria-label={`Remove ${p.name}`}
                        onClick={() => setItems((prev) => prev.filter((i) => i.id !== p.id))}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bag-summary">
            <div>
              <span>Estimated total</span>
              <strong>{money(total)}</strong>
            </div>
            <p>Final pricing and compatibility confirmed on enquiry.</p>
            <Link
              className="button"
              to="/contact?subject=Product+enquiry"
              onClick={() => setBagOpen(false)}
            >
              Enquire about these parts <ArrowUpRight size={19} />
            </Link>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <ShoppingBag size={40} />
          <h3>Your next upgrade starts here.</h3>
          <p>Add parts to your list and send us an enquiry.</p>
          <Link to="/products" className="button" onClick={() => setBagOpen(false)}>
            Explore products <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </Modal>
  );
}

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const label =
      pathname === '/'
        ? 'Built for your ride'
        : pathname.startsWith('/product/')
          ? 'Product details'
          : pathname.startsWith('/products')
            ? 'Explore our products'
            : pathname === '/about'
              ? 'Our story'
              : pathname === '/contact'
                ? 'Get in touch'
                : 'Page not found';
    document.title = `${label} | ROADEEZ`;
  }, [pathname]);
  return null;
}

export default function App() {
  const [items, setItems] = useState(readList);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [toast, setToast] = useState('');
  useEffect(() => {
    try {
      localStorage.setItem('roadeez-enquiry', JSON.stringify(items));
    } catch {
      /* The list still works when storage is unavailable. */
    }
  }, [items]);
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 3200);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  const addItem = (product, quantity = 1) => {
    setItems((prev) =>
      prev.some((i) => i.id === product.id)
        ? prev.map((i) =>
            i.id === product.id ? { ...i, quantity: Math.min(99, i.quantity + quantity) } : i,
          )
        : [...prev, { id: product.id, quantity }],
    );
    setToast(`${product.name} added to your enquiry list.`);
  };
  return (
    <ShopContext.Provider
      value={{ items, setItems, searchOpen, setSearchOpen, bagOpen, setBagOpen, addItem }}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <RouteEffects />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {searchOpen && <SearchModal />}
      {bagOpen && <BagDrawer />}
      {toast && (
        <div className="toast" role="status">
          <Check size={18} />
          {toast}
          <button aria-label="Dismiss notification" onClick={() => setToast('')}>
            <X size={15} />
          </button>
        </div>
      )}
    </ShopContext.Provider>
  );
}
