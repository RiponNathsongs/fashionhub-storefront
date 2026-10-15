# FashionHub — Modern Fashion. Simple Shopping.

A responsive, static e-commerce storefront starter built with plain HTML, CSS, and JavaScript. No build command, framework, API key, or paid service is required to preview it.

## Included
- Responsive storefront homepage and category sections
- Product grid with category filters, search, and sorting
- Product detail modal with size and colour selection
- Working demo cart, quantities, remove item, and subtotal
- Wishlist toggle
- Light/dark theme toggle
- Demo account modal and newsletter form feedback
- Mobile navigation and accessible dialog labels
- Cloudflare Pages-compatible static files

## Run locally
Open `index.html` in a browser. Internet access is used for Google Fonts and remote Unsplash product images.

## Publish on GitHub + Cloudflare Pages
1. Upload `index.html`, `styles.css`, `app.js`, and `README.md` to the root of a GitHub repository.
2. In Cloudflare, open **Workers & Pages → Create application → Pages** (or **Continue to Pages / legacy Pages workflow** if shown).
3. Connect the GitHub repository.
4. Framework preset: **None** (or **Static HTML** if available).
5. Build command: leave blank.
6. Build output directory: `/` or `.` (choose the option Cloudflare accepts for the repository root).
7. Deploy.

This is a static frontend, so it does not need `npm install`, `npm run build`, or `npx wrangler deploy`.

## Before real customer use
This project is a front-end demo. Cart data is in memory and will reset on refresh. Login, order history, newsletter, inventory, shipping calculations, and payment are not connected to a server. Replace demo policy text, product imagery, prices, store contacts, and checkout feedback before selling or taking real orders. Never collect payment card details directly in this frontend; use a trusted payment provider and a secure backend.

## Customization
- Product catalogue and pricing: edit the `PRODUCTS` array in `app.js`.
- Branding and page sections: edit `index.html`.
- Colours, typography, spacing, responsive layouts: edit `styles.css`.
