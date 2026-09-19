export const brands = ['Hero', 'Honda', 'TVS', 'Bajaj', 'Yamaha'];
export const categories = [
  {
    id: 'headlight',
    name: 'Headlights',
    singular: 'Headlight',
    tagline: 'Own the road ahead.',
    description:
      'A clearer view for every journey. Explore headlight assemblies made to fit your ride.',
    count: '01',
  },
  {
    id: 'indicator',
    name: 'Indicators',
    singular: 'Indicator',
    tagline: 'Make your next move clear.',
    description: 'Sharp looks. Clear signals. Find the right indicator pair for your two-wheeler.',
    count: '02',
  },
  {
    id: 'mud-guard',
    name: 'Mud Guards',
    singular: 'Mud Guard',
    tagline: 'Take the road as it comes.',
    description: 'Keep the road where it belongs with durable, well-fitted front mud guards.',
    count: '03',
  },
  {
    id: 'side-panel',
    name: 'Side Panels',
    singular: 'Side Panel',
    tagline: 'Give your ride a fresh side.',
    description: 'Restore your bike’s character with a clean finish and a confident fit.',
    count: '04',
  },
  {
    id: 'tail-guard',
    name: 'Tail Guards',
    singular: 'Tail Guard',
    tagline: 'A strong finish to every ride.',
    description: 'Thoughtful rear protection with a finish that completes your bike.',
    count: '05',
  },
];
export const models = {
  Hero: ['Splendor Plus', 'HF Deluxe'],
  Honda: ['Shine', 'Unicorn'],
  TVS: ['Apache RTR 160', 'Sport'],
  Bajaj: ['Pulsar 150', 'Platina'],
  Yamaha: ['FZ-S', 'Fazer'],
};
const prices = [1299, 349, 649, 799, 549];
export const products = categories.flatMap((category, ci) =>
  brands.map((brand, bi) => ({
    id: `${category.id}-${brand.toLowerCase()}`,
    name: `${models[brand][0]} ${category.singular}${ci === 1 ? ' Set' : ci === 0 ? ' Assembly' : ''}`,
    category: category.id,
    brand,
    model: models[brand][0],
    price: prices[ci] + bi * 100,
    oldPrice: prices[ci] + bi * 100 + 250,
    color: ci === 3 ? ['#be302c', '#253950', '#f0f0ec', '#23272c', '#2057a2'][bi] : '#282c31',
    badge:
      ci === 0 && bi === 0
        ? 'BESTSELLER'
        : ci === 1 && bi === 2
          ? 'RIDER FAVOURITE'
          : ci === 3 && bi === 3
            ? 'NEW ARRIVAL'
            : null,
    sku: `RDZ-${category.id.slice(0, 2).toUpperCase()}-${100 + bi}`,
    description: `${category.tagline} This ${category.singular.toLowerCase()} is designed for the ${brand} ${models[brand][0]}, with a clean finish and everyday practicality. Refresh your ride with a replacement that looks right at home.`,
  })),
);
export const featuredProducts = [products[0], products[7], products[10], products[18]];
export const money = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
export const categoryName = (id) => categories.find((c) => c.id === id)?.name || 'All products';
