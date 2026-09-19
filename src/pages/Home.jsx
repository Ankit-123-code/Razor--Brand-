import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Bike, Check, ChevronDown,
  Headphones, MoveUpRight, PackageCheck, ShieldCheck, Target,
} from 'lucide-react';
import { brands, categories, featuredProducts, money } from '../data';
import { ButtonLink, Eyebrow, ProductCard } from '../App';
import ProductArt from '../components/ProductArt';

export function BrandStrip() {
  return (
    <section className="page-shell flex flex-col items-center gap-6 border-b border-line py-9 lg:flex-row lg:gap-12 lg:py-11" aria-label="Parts available for popular brands">
      <p className="shrink-0 text-center text-[10px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-muted lg:text-left">
        Your favourite brands.<br className="hidden lg:block" /> <span className="text-ink">One trusted destination.</span>
      </p>
      <div className="flex w-full flex-wrap items-center justify-center gap-x-7 gap-y-5 sm:justify-between sm:gap-5 lg:border-l lg:border-line lg:pl-12">
        {brands.map((brand) => (
          <Link key={brand} to={`/products?brand=${brand}`} className={`bike-brand brand-${brand.toLowerCase()} group`}>
            {brand === 'Hero' && <span className="font-sans text-brand">❯</span>}
            {brand === 'Honda' && <span className="-skew-x-12 text-[32px] leading-none">≋</span>}
            {brand === 'Yamaha' && <span className="text-2xl">✣</span>}
            {brand}
          </Link>
        ))}
      </div>
    </section>
  );
}

function BikeFinder() {
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  return (
    <form className="bike-finder relative z-10 grid gap-4 rounded-2xl border border-line/80 bg-white p-5 shadow-float sm:grid-cols-2 sm:p-7 xl:grid-cols-[1.2fr_1fr_1fr_auto] xl:items-center xl:gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        navigate(`/products${category ? `/${category}` : ''}${brand ? `?brand=${brand}` : ''}`);
      }}>
      <div className="flex items-center gap-4 sm:col-span-2 xl:col-span-1">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><Bike size={26} /></span>
        <div><h2 className="text-lg font-bold tracking-tight">Your bike. Your perfect fit.</h2><p className="mt-1 text-xs text-muted">A better ride starts with the right part.</p></div>
      </div>
      <label className="finder-select"><span>01 / CHOOSE YOUR BRAND</span><select value={brand} onChange={(event) => setBrand(event.target.value)} aria-label="Select your bike brand"><option value="">Select your brand</option>{brands.map((name) => <option key={name}>{name}</option>)}</select><ChevronDown size={16} /></label>
      <label className="finder-select"><span>02 / FIND YOUR PART</span><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Select a category"><option value="">Select a category</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><ChevronDown size={16} /></label>
      <button className="button sm:col-span-2 xl:col-span-1" type="submit">Find my parts <ArrowRight size={18} /></button>
    </form>
  );
}

export function ContactBanner() {
  return (
    <section className="page-shell py-12 sm:py-16">
      <div className="relative isolate flex flex-col items-start justify-between gap-7 overflow-hidden rounded-3xl bg-brand px-7 py-10 text-white sm:px-12 sm:py-12 lg:flex-row lg:items-center">
        <div className="pointer-events-none absolute -right-10 -top-16 -z-10 rotate-12 font-display text-[340px] leading-none text-white/10" aria-hidden="true">↗</div>
        <div><div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-100"><span className="size-1.5 rounded-full bg-white" />A little help. A better ride.</div><h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">The right part is just<br className="hidden sm:block" /> a conversation away.</h2><p className="mt-4 max-w-md text-sm leading-relaxed text-orange-100">Tell us what you ride. We’ll help you find what you need.</p></div>
        <Link to="/contact" className="group inline-flex min-h-14 shrink-0 items-center gap-9 rounded-lg bg-white px-6 text-sm font-bold text-ink shadow-lg shadow-black/5 transition hover:-translate-y-1 hover:bg-orange-50">Let’s talk parts <ArrowUpRight size={21} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
      </div>
    </section>
  );
}

function CategoryCollection() {
  return (
    <section className="page-shell scroll-mt-28 py-14 sm:py-20" id="categories">
      <div className="section-heading"><div><Eyebrow>UPGRADE YOUR EVERYDAY</Eyebrow><h2>Small details.<br className="sm:hidden" /> Big difference.</h2></div><Link className="text-link" to="/products">Explore all parts <ArrowUpRight size={18} /></Link></div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Link key={category.id} to={`/products/${category.id}`} className={`category-card group relative isolate overflow-hidden rounded-2xl p-5 transition duration-300 hover:-translate-y-1 sm:p-6 ${index === 0 ? 'col-span-2 bg-ink text-white lg:row-span-2' : index === 4 ? 'bg-[#eae6da]' : 'border border-line bg-surface'}`}>
            <div className="flex items-center justify-between"><span className={`text-[10px] font-semibold tracking-[0.18em] ${index === 0 ? 'text-white/50' : 'text-muted'}`}>{category.count} / THE ESSENTIALS</span><span className={`grid size-8 place-items-center rounded-full transition duration-300 group-hover:rotate-45 ${index === 0 ? 'bg-white/10' : 'bg-white'}`}><ArrowUpRight size={17} /></span></div>
            {index === 0 && <><div className="absolute -left-14 top-14 -z-10 size-80 rounded-full border border-white/10 sm:size-[440px]" /><div className="absolute -left-4 top-24 -z-10 size-60 rounded-full bg-white/[0.035] sm:size-[340px]" /><span className="absolute right-6 top-24 hidden font-display text-[100px] font-bold italic text-white/[0.04] lg:block">ROADEEZ</span></>}
            <ProductArt category={category.id} color={category.id === 'side-panel' ? '#be302c' : undefined} className={`relative w-full transition duration-500 group-hover:-rotate-3 group-hover:scale-105 ${index === 0 ? 'my-2 h-52 drop-shadow-2xl sm:h-64 lg:my-7 lg:h-72' : '-mx-2 h-32 w-[calc(100%+16px)] sm:h-36'}`} />
            <div className={`flex items-end justify-between gap-3 ${index === 0 ? 'mt-auto' : ''}`}><div><h3 className={`font-bold tracking-tight ${index === 0 ? 'text-3xl sm:text-4xl' : 'text-base sm:text-xl'}`}>{category.name}</h3><p className={`mt-2 text-[11px] leading-relaxed sm:text-xs ${index === 0 ? 'text-white/60' : 'text-muted'}`}>{category.tagline}</p></div>{index === 0 && <span className="mb-1 grid size-12 shrink-0 place-items-center rounded-full bg-brand text-white"><ArrowUpRight size={23} /></span>}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero relative isolate mx-3 mt-3 overflow-hidden rounded-3xl bg-ink text-white sm:mx-5 lg:mx-6">
        <img className="absolute inset-0 -z-20 size-full object-cover object-[60%_50%] lg:object-[center_58%]" src="/images/hero-motorcycle.jpg" alt="A rider taking the open road at sunset" fetchPriority="high" />
        <div className="hero-shade absolute inset-0 -z-10" />
        <div className="page-shell relative pb-28 pt-11 sm:pt-16 lg:pb-32 lg:pt-20">
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-2 text-[9px] font-medium uppercase tracking-[0.18em] backdrop-blur-sm sm:text-[10px]"><span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-orange-400 opacity-50 motion-reduce:animate-none" /><span className="relative size-1.5 rounded-full bg-orange-400" /></span>FOR THE LOVE OF THE RIDE</div>
          <h1 className="max-w-2xl font-display text-[65px] font-bold uppercase leading-[0.93] tracking-tight min-[390px]:text-[79px] sm:text-[104px] lg:text-[120px]">GOOD PARTS.<br /><span className="italic text-[#ff754b]">GREAT RIDES.</span></h1>
          <p className="mt-7 max-w-sm text-sm leading-relaxed text-stone-200 sm:text-base">The commute. The detour. The open road.<br />Whatever your ride, we’ve got your parts.</p>
          <div className="mt-8 flex flex-wrap items-center gap-6"><ButtonLink to="/products">Find your next upgrade</ButtonLink><Link to="/about" className="group flex items-center gap-2 text-xs font-semibold text-white/90 sm:text-sm">Meet ROADEEZ <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link></div>
          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-[10px] text-stone-300 sm:text-xs"><span className="flex items-center gap-2"><ShieldCheck size={16} className="text-orange-300" />Dependable quality</span><span className="size-1 rounded-full bg-white/30" /><span className="flex items-center gap-2"><Target size={16} className="text-orange-300" />Made to fit your ride</span></div>
          <Link to={`/product/${featuredProducts[0].id}`} className="absolute bottom-24 right-0 hidden w-64 items-center gap-2 rounded-2xl border border-white/20 bg-white/10 p-3 text-white shadow-2xl backdrop-blur-xl transition hover:bg-white/20 lg:flex"><ProductArt category="headlight" className="h-24 w-24 shrink-0" /><div><span className="text-[8px] font-semibold tracking-[0.16em] text-orange-200">LIGHT UP THE WAY</span><p className="mt-1 text-sm font-semibold">A clearer road ahead.</p><span className="mt-2 flex items-center gap-5 text-xs text-white/70">From {money(featuredProducts[0].price)} <ArrowUpRight size={17} /></span></div></Link>
          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between border-t border-white/15 pt-5 text-[9px] uppercase tracking-[0.2em] text-white/50"><span>ROADEEZ / IT’S TIME TO GLIDE</span><a href="#categories" className="flex items-center gap-3 text-white/80">Explore the collection <ArrowDownRight size={17} /></a></div>
        </div>
      </section>
      <div className="page-shell relative mt-6 lg:-mt-8"><BikeFinder /></div>
      <BrandStrip />
      <CategoryCollection />
      <section className="border-y border-line bg-surface/70"><div className="page-shell grid grid-cols-2 gap-x-5 gap-y-7 py-8 lg:grid-cols-4 lg:gap-8 lg:py-9">{[
        { icon: ShieldCheck, title: 'Built to go the distance', text: 'Quality for the everyday miles.' },
        { icon: Target, title: 'The right fit, every time', text: 'Parts made around your bike.' },
        { icon: PackageCheck, title: 'More value. More miles.', text: 'Good parts. Sensible prices.' },
        { icon: Headphones, title: 'Real people. Real help.', text: 'A hand when you need it.' },
      ].map(({ icon: Icon, title, text }) => <div key={title} className="flex flex-col gap-3 sm:flex-row sm:items-center"><span className="grid size-10 shrink-0 place-items-center rounded-xl border border-orange-200/60 bg-orange-50 text-brand"><Icon size={22} strokeWidth={1.6} /></span><div><h3 className="text-xs font-bold sm:text-[13px]">{title}</h3><p className="mt-1.5 text-[10px] text-muted sm:text-[11px]">{text}</p></div></div>)}</div></section>
      <section className="page-shell py-14 sm:py-20"><div className="section-heading"><div><Eyebrow>YOUR NEXT UPGRADE</Eyebrow><h2>Ready for the road.</h2><p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">Everyday essentials. Extraordinary attention to detail.</p></div><Link className="text-link" to="/products">Shop the collection <ArrowUpRight size={18} /></Link></div><div className="product-grid">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
      <section className="page-shell pb-4 sm:pb-8"><div className="grid overflow-hidden rounded-3xl bg-surface lg:grid-cols-2"><div className="relative isolate min-h-80 overflow-hidden sm:min-h-[430px]"><img className="absolute inset-0 -z-20 size-full object-cover object-[56%_60%]" src="/images/hero-motorcycle.jpg" alt="A rider enjoying the journey as the sun goes down" loading="lazy" /><div className="absolute inset-0 -z-10 bg-linear-to-t from-ink/90 via-ink/10 to-transparent" /><span className="absolute left-7 top-7 rounded-full border border-white/40 bg-black/10 px-3 py-2 text-[9px] tracking-[0.16em] text-white backdrop-blur-sm">BECAUSE EVERY MILE MATTERS</span><div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-4 text-white"><div><p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/65">IT’S NOT JUST A BIKE.</p><h2 className="font-display text-5xl font-semibold uppercase sm:text-6xl">It’s your everyday.</h2></div><MoveUpRight size={36} strokeWidth={1.2} /></div></div><div className="p-7 sm:p-10 lg:p-12 xl:p-14"><Eyebrow>MORE THAN SPARE PARTS</Eyebrow><h2 className="text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl">For the roads you take.<br /><span className="text-muted">And the life you ride.</span></h2><p className="mt-6 text-sm leading-7 text-muted">The morning commute. The late-night chai run. The long way home. Your bike is part of your story — and every part matters.</p><p className="mt-4 text-sm leading-7 text-muted">We’re here to keep that story moving. Dependable parts, a precise fit, and quality that feels right.</p><div className="my-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium">{['Made for everyday riding','Built around your bike'].map(text => <span key={text} className="flex items-center gap-2"><Check className="rounded-full bg-orange-100 p-0.5 text-brand" size={19} />{text}</span>)}</div><ButtonLink to="/about" secondary>Our story. Your journey.</ButtonLink></div></div></section>
      <ContactBanner />
    </>
  );
}
