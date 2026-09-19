import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Headphones,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Target,
} from 'lucide-react';
import { brands, categories, categoryName, money, products } from '../data';
import { Breadcrumb, Eyebrow, ProductCard, useShop } from '../App';
import ProductArt from '../components/ProductArt';
import { ContactBanner } from './Home';
import { NotFound } from './Company';

export function Products() {
  const { category } = useParams();
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const selectedBrand = params.get('brand') || '';
  const query = params.get('q') || '';
  const sort = params.get('sort') || 'featured';
  const activeCategory = categories.find((c) => c.id === category);
  if (category && !activeCategory) return <NotFound />;
  const updateParam = (key, value) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      value ? next.set(key, value) : next.delete(key);
      return next;
    });
  };
  const categoryHref = (id = '') =>
    `/products${id ? `/${id}` : ''}${params.toString() ? `?${params.toString()}` : ''}`;
  const filtered = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!selectedBrand || p.brand === selectedBrand) &&
      `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <div className="catalogue-hero">
        <div className="page-shell">
          <Breadcrumb
            items={[
              { label: 'Products', to: category ? '/products' : undefined },
              ...(category ? [{ label: activeCategory.name }] : []),
            ]}
          />
          <div className="catalogue-heading">
            <div>
              <Eyebrow>BUILT FOR YOUR BIKE</Eyebrow>
              <h1>
                {activeCategory ? (
                  activeCategory.name
                ) : (
                  <>
                    Every part.
                    <br />
                    More possibilities.
                  </>
                )}
              </h1>
              <p>
                {activeCategory
                  ? activeCategory.description
                  : 'The little things that make every ride better. Find your next upgrade.'}
              </p>
            </div>
            {activeCategory ? (
              <ProductArt category={category} />
            ) : (
              <div className="catalogue-mark">
                R<span>↗</span>
                <small>IT’S TIME TO GLIDE.</small>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="page-shell catalogue-layout">
        <button
          className="mobile-filter-button"
          onClick={() => setFiltersOpen((v) => !v)}
          aria-expanded={filtersOpen}
        >
          <SlidersHorizontal size={17} />
          Categories & filters
          <ChevronDown size={16} />
        </button>
        <aside className={`filter-sidebar ${filtersOpen ? 'filters-open' : ''}`}>
          <div className="filter-title">
            <h2>Find your part</h2>
            <SlidersHorizontal size={17} />
          </div>
          <div className="filter-group">
            <h3>Categories</h3>
            <Link className={!category ? 'selected' : ''} to={categoryHref()}>
              All products <span>{products.length}</span>
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                className={category === c.id ? 'selected' : ''}
                to={categoryHref(c.id)}
              >
                {c.name}
                <ChevronRight size={14} />
              </Link>
            ))}
          </div>
          <div className="filter-group">
            <h3>Your bike brand</h3>
            {brands.map((b) => (
              <label className="brand-checkbox" key={b}>
                <input
                  type="checkbox"
                  checked={selectedBrand === b}
                  onChange={() => updateParam('brand', selectedBrand === b ? '' : b)}
                />
                <span className="check-box">{selectedBrand === b && <Check size={12} />}</span>
                {b}
              </label>
            ))}
          </div>
          <div className="sidebar-help">
            <Headphones size={27} />
            <h3>
              A little help
              <br />
              goes a long way.
            </h3>
            <p>Not sure which part fits? Talk to us.</p>
            <Link to="/contact">
              Let’s find your fit <ArrowUpRight size={16} />
            </Link>
          </div>
        </aside>
        <section className="catalogue-results" aria-label="Product results">
          <div className="results-toolbar">
            <p>
              <strong>{filtered.length}</strong> {filtered.length === 1 ? 'product' : 'products'}
              {selectedBrand && (
                <>
                  {' '}
                  for <strong>{selectedBrand}</strong>
                </>
              )}
            </p>
            <label>
              Sort by:{' '}
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(e) => updateParam('sort', e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </label>
          </div>
          <div className="catalogue-search">
            <Search size={18} />
            <input
              aria-label="Filter products by name"
              placeholder="Find a part or bike model…"
              value={query}
              onChange={(e) => updateParam('q', e.target.value)}
            />
            {query && (
              <button aria-label="Clear search" onClick={() => updateParam('q', '')}>
                Clear
              </button>
            )}
          </div>
          {selectedBrand && (
            <div className="active-filters">
              <button onClick={() => updateParam('brand', '')}>
                {selectedBrand}
                <span>×</span>
              </button>
              <button className="clear-filters" onClick={() => setParams({})}>
                Reset filters
              </button>
            </div>
          )}
          {filtered.length ? (
            <div className="product-grid catalogue-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state catalogue-empty">
              <Search size={40} />
              <h2>No parts found for this search.</h2>
              <p>Try another bike model or clear your filters to see more parts.</p>
              <button className="button" onClick={() => setParams({})}>
                Clear filters <RotateCcw size={16} />
              </button>
            </div>
          )}
          <p className="catalogue-footnote">
            A part for every journey. Need something you don’t see?{' '}
            <Link to="/contact">
              Ask our team <ArrowUpRight size={13} />
            </Link>
          </p>
        </section>
      </div>
      <ContactBanner />
    </>
  );
}

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  if (!product) return <NotFound />;
  return <DetailContent key={id} product={product} />;
}

function DetailContent({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('Description');
  const { addItem, setBagOpen } = useShop();
  const related = products
    .filter((p) => p.brand === product.brand && p.id !== product.id)
    .slice(0, 4);
  return (
    <>
      <div className="page-shell detail-page">
        <Breadcrumb
          items={[
            { label: 'Products', to: '/products' },
            { label: categoryName(product.category), to: `/products/${product.category}` },
            { label: product.name },
          ]}
        />
        <div className="detail-grid">
          <div className="detail-gallery">
            <span className="product-badge">MADE FOR YOUR {product.brand.toUpperCase()}</span>
            <ProductArt category={product.category} color={product.color} />
            <p>Product illustration · finish may vary</p>
            <span className="gallery-wordmark">ROADEEZ.</span>
          </div>
          <div className="detail-info">
            <Eyebrow>
              {product.brand} / {categoryName(product.category)}
            </Eyebrow>
            <h1>{product.name}</h1>
            <div className="availability">
              <span />
              Available for enquiry <span className="sku">SKU: {product.sku}</span>
            </div>
            <div className="detail-price">
              {money(product.price)}
              <del>{money(product.oldPrice)}</del>
              <span>Save {money(product.oldPrice - product.price)}</span>
            </div>
            <p className="tax-note">Inclusive of all taxes. Indicative catalogue pricing.</p>
            <p className="detail-description">{product.description}</p>
            <div className="fit-note">
              <BikeFit />
              <div>
                <strong>
                  Designed for {product.brand} {product.model}
                </strong>
                <span>Confirm your model year with us for the right fit.</span>
              </div>
              <Check size={18} />
            </div>
            <div className="purchase-actions">
              <div className="quantity-control">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((v) => Math.max(1, v - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span aria-live="polite">{quantity}</span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((v) => Math.min(99, v + 1))}
                  disabled={quantity >= 99}
                >
                  <Plus size={16} />
                </button>
              </div>
              <button className="button" onClick={() => addItem(product, quantity)}>
                Add to enquiry <ArrowUpRight size={19} />
              </button>
            </div>
            <button className="text-link view-enquiry" onClick={() => setBagOpen(true)}>
              View your enquiry list <ArrowRight size={15} />
            </button>
            <div className="detail-promises">
              <span>
                <ShieldCheck size={20} />
                Dependable quality
              </span>
              <span>
                <Target size={20} />
                Fit assistance
              </span>
              <span>
                <Headphones size={20} />
                Friendly support
              </span>
            </div>
          </div>
        </div>
        <div className="product-tabs">
          <div role="tablist" aria-label="Product information">
            {['Description', 'Specifications', 'Fit & care'].map((t) => (
              <button
                id={`tab-${t.replaceAll(' ', '-')}`}
                key={t}
                role="tab"
                aria-selected={tab === t}
                aria-controls="product-panel"
                onClick={() => setTab(t)}
                onKeyDown={(e) => {
                  const tabs = ['Description', 'Specifications', 'Fit & care'];
                  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const next = tabs[(tabs.indexOf(t) + (e.key === 'ArrowRight' ? 1 : 2)) % 3];
                    setTab(next);
                    document.getElementById(`tab-${next.replaceAll(' ', '-')}`)?.focus();
                  }
                }}
                tabIndex={tab === t ? 0 : -1}
              >
                {t}
              </button>
            ))}
          </div>
          <div
            id="product-panel"
            role="tabpanel"
            aria-labelledby={`tab-${tab.replaceAll(' ', '-')}`}
            tabIndex={0}
          >
            {tab === 'Description' && (
              <>
                <h2>A fresh start for your everyday ride.</h2>
                <p>
                  {product.description} Whether you’re refreshing a worn part or giving your bike a
                  little attention, our team can help you check the details before you decide.
                </p>
                <ul>
                  <li>
                    Designed around the {product.brand} {product.model}.
                  </li>
                  <li>Practical replacement for everyday use.</li>
                  <li>Fitment support available before you order.</li>
                </ul>
              </>
            )}
            {tab === 'Specifications' && (
              <dl className="specification-list">
                <div>
                  <dt>Product code</dt>
                  <dd>{product.sku}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{categoryName(product.category)}</dd>
                </div>
                <div>
                  <dt>Bike brand</dt>
                  <dd>{product.brand}</dd>
                </div>
                <div>
                  <dt>Bike model</dt>
                  <dd>{product.model}</dd>
                </div>
                <div>
                  <dt>Package contents</dt>
                  <dd>
                    {product.category === 'indicator'
                      ? 'One indicator pair'
                      : 'One ' +
                        categories.find((c) => c.id === product.category).singular.toLowerCase()}
                  </dd>
                </div>
                <div>
                  <dt>Finish</dt>
                  <dd>
                    {product.category === 'side-panel' ? 'Painted finish' : 'Standard finish'}
                  </dd>
                </div>
              </dl>
            )}
            {tab === 'Fit & care' && (
              <>
                <h2>A good fit starts with the details.</h2>
                <p>
                  Share your exact model, year and a photo of your current part with our team before
                  ordering. Product specifications and compatibility in this demonstration catalogue
                  are illustrative.
                </p>
                <ul>
                  <li>Have replacement parts fitted by a qualified mechanic.</li>
                  <li>Clean with a soft cloth and mild cleaning solution.</li>
                  <li>Confirm connectors and mounting points before fitting.</li>
                </ul>
                <Link
                  className="text-link"
                  to={`/contact?subject=Compatibility+check&product=${product.id}`}
                >
                  Ask about compatibility <ArrowUpRight size={16} />
                </Link>
              </>
            )}
          </div>
        </div>
        <section className="section related-section">
          <div className="section-heading">
            <div>
              <Eyebrow>KEEP THE GOOD RIDES COMING</Eyebrow>
              <h2>More for your {product.brand}.</h2>
            </div>
            <Link className="text-link" to={`/products?brand=${product.brand}`}>
              View all <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
      <ContactBanner />
    </>
  );
}
function BikeFit() {
  return <Target size={24} />;
}
