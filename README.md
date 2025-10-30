# React E-Commerce App

A simple yet elegant e-commerce simulation app built with **React + Redux Toolkit + TailwindCSS**, showcasing product browsing, filtering, search, and cart functionality — powered by the **Fake Store API**.

---

## Features

### 1. Fetch & Display Products
- Products fetched dynamically from Fake Store API.
- Responsive product grid layout using TailwindCSS.
- Displays product image, title, category, and price.
- Smooth loading and error handling states.

### 2. Product Details View
- Click a product to open a modal view with:
  - Title, image, price, category, description, and rating.
- Enhanced UI with Framer Motion animations.

### 3. Filtering & Searching
- Filter products by category.
- Real-time search bar for filtering by name.
- Filters and search work together seamlessly.

### 4. Cart Simulation
- Add or remove items from a cart drawer.
- Displays item count and total price (**₦**).
- Cart persists in local storage across sessions.

### 5. 🛠 Tech Stack
- React 19 + TypeScript (optional)
- Redux Toolkit for state management
- Tailwind CSS for styling
- Framer Motion for animations
- Heroicons & React Icons for UI icons
- Sonner for toast notifications

---

##  Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Pedrosaint/Text-work.git
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

### 5. Preview the Production Build
```bash
npm run preview
```

---

##  Dependencies

```json
"dependencies": {
  "@heroicons/react": "^2.2.0",
  "@reduxjs/toolkit": "^2.9.2",
  "@tailwindcss/vite": "^4.1.16",
  "framer-motion": "^12.23.24",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-icon": "^1.0.0",
  "react-icons": "^5.5.0",
  "react-redux": "^9.2.0",
  "sonner": "^2.0.7"
}
```

---

## Utility Example

For currency formatting, prices are displayed in **Naira (₦)** using this helper:

```ts
export function formatNaira(amount: number | string): string {
  const value = Number(amount);
  if (isNaN(value)) return "₦0.00";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(value);
}
```

**Usage:**
```tsx
<span className="text-gray-400">/ {formatNaira(total)}</span>
```

---

## Responsiveness & UX
- Fully responsive for desktop, tablet, and mobile.
- Clean modern UI using Tailwind’s utility classes.
- Animated product interactions with Framer Motion.
- Toast notifications for cart actions.

---

##  Notes / Assumptions
- The app uses Fake Store API for demo data.
- No backend authentication or payments implemented — simulation only.
- Cart data is stored in local storage for persistence.

---

