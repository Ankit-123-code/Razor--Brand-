# ROADEEZ

A responsive React website for the ROADEEZ two-wheeler parts brief. Built with React 19, Vite, React Router, Tailwind CSS 4, and Lucide icons.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

```sh
npm run build     # Production output in dist/
npm run preview   # Preview the production build
```

## Pages and behavior

- **Home** (`/`): cinematic motorcycle hero, bike/part finder, brand links, category collection, featured products with quick enquiry buttons, brand story, and contact CTA.
- **Products** (`/products`, `/products/:category`): 25 illustrative products across Headlight, Indicator, Mud Guard, Side Panel, and Tail Guard. Brand and text filters and price/name sorting are reflected in the URL.
- **Product details** (`/product/:id`): product illustration, indicative prices, quantity controls, product information tabs, and related parts.
- **About** (`/about`): connected brand story and values.
- **Contact** (`/contact`): contact/location layout, required field validation, enquiry list attachment, and local confirmation.
- Unknown page, category, and product paths render a recovery page.
- Desktop category → brand menu follows the PDF reference. Mobile navigation, mobile filters, product search, keyboard focus states, modal focus trapping, reduced motion support, and skip navigation are included.
- Product enquiry lists persist in localStorage. Contact enquiries are saved locally and explicitly do **not** send a message. No payment, checkout, backend, or authentication is implemented.

## Assets and assumptions

- The provided PDF's ROADEEZ logo was extracted with its original transparency and is used in the header.
- Product names, prices, compatibility, company narrative, working hours, and location are sample content. `hello@roadeez.example` is a clearly illustrative address. Confirm all commercial information and replace demo contact details before production use.
- Product artwork is original SVG illustration, not product photography. The product detail page labels it accordingly.
- The motorcycle photograph is from Unsplash: https://images.unsplash.com/photo-1558981806-ec527fa84c39. It is stored locally in `public/images/hero-motorcycle.jpg`.
- Barlow Condensed and DM Sans are distributed under the SIL Open Font License and stored locally under `public/fonts/`. No remote asset request is needed at runtime. License files are included with the fonts.
- The static catalogue can be edited in `src/data.js`.
- The PDF's repository and deployment submission directions are reference material. No external repository was created and the site has not been published.

## Structure

```text
src/
  App.jsx                   Shared layout, menu, search, enquiry state
  data.js                   Catalogue, categories, brands
  components/ProductArt.jsx Original SVG product illustrations
  pages/Home.jsx            Homepage and shared brand/contact sections
  pages/Products.jsx        Listing and detail routes
  pages/Company.jsx         About, Contact, and 404
  styles.css                Tailwind theme, base styles, shared component utilities
```

## Deployment

Tailwind is integrated through the official Vite plugin. Page layouts use responsive utility classes; shared navigation, forms, and catalogue components use Tailwind's `@apply` directive. Theme colors, fonts, and shadows are defined in `src/styles.css`.

Build with `npm run build` and publish `dist/` to a static host. React Router uses browser history; the host must rewrite non-asset routes to `index.html`. Netlify (`public/_redirects`) and Vercel (`vercel.json`) configurations are included. Previewing a local build with `npm run preview` also supports direct page links.
