# DRIPZO ── Premium Multi-Vendor Luxury Fashion & Streetwear Hub

DRIPZO is a high-end, state-of-the-art multi-vendor e-commerce platform designed to bring a premium, curated shopping experience to modern streetwear and luxury fashion enthusiasts. The platform bridges the gap between discerning customers, luxury vendors (boutiques), and platform administrators with three distinct, beautifully designed interfaces and a robust backend.

---

## 💎 Project Concept & Core Pillars

### 1. The Design Aesthetic
*   **Premium Visuals**: Curated HSL color systems, elegant gradients, sleeks dark modes, and subtle glassmorphic sheets that scream high-end quality.
*   **Modern Typography**: Built using **Outfit** (for high-tech sans-serif UI components) combined with **Playfair Display**, **Italiana**, and **Bodoni Moda** for editorial fashion display headers.
*   **Dynamic Interactions**: Embedded micro-animations (e.g., custom slow shimmering skeleton loaders, floating orbs, hover-activated element shifts) designed to keep the user engaged.

### 2. Core Customer Experience (`client`)
*   **Dripzy Roast**: An AI-powered fashion assistant that reviews and constructively roasts/praises user fashion choices.
*   **AI Fashion Chatbot**: Instant, highly accurate fashion recommendations powered by **Groq Cloud LLM** integration.
*   **Curated Portals**: Dedicated collections across Shirts, Footwear, Accessories, Luxury, and Cosmetics with custom brand styling (e.g., gold highlights for luxury, soft pink gradients for cosmetics).
*   **Secure PIN Checkout**: A premium checkout flow with a mock-secure payment gateway that accepts Card, UPI, and COD, complete with numeric keypad authorization.

### 3. Vendor Autonomy (`vendor-panel`)
*   **Instantly Live Shops**: Allows shopkeepers to launch brand boutiques instantly upon signup.
*   **Fulfillment Terminal**: Vendors can track their specific boutique orders, accept pending transactions, dispatch them (Move to out-for-delivery), and mark items as delivered.
*   **Financial KPI Ledger**: Shows estimations of Cost of Goods Sold (COGS), platform commissions, gross sales, and net retained margins, along with high-fidelity printable P&L statements.

### 4. Command Central (`admin-panel`)
*   **Order Pipeline Control**: Supervisors can monitor order status transitions across the entire system.
*   **Vendor Integrity Controls**: Verify boutique applications, activate/suspend active shops, and suspend users who violate platform terms.
*   **System Configuration Switches**: Lock down checkout flows globally via **Maintenance Mode** switches or configure flat shipping fees and tax rates in real-time.

---

## 🏗️ Architecture & Tech Stack

DRIPZO is structured as a modular monorepo containing four main directories:

```
DRIPZO/
├── client/          # Customer-facing storefront application (React + Vite + Tailwind CSS v4)
├── admin-panel/     # Platforms management cockpit (React + Vite)
├── vendor-panel/    # Shopkeepers portal and analytics hub (React + Vite + Tailwind CSS v4)
└── server/          # Central REST API application (Node.js + Express + Sequelize ORM + MySQL)
```

### Stack Highlight
*   **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React (icons), Axios (API client).
*   **Backend**: Node.js, Express, Sequelize ORM (object-relational mapping), JWT (authentication).
*   **Database**: MySQL (relational database).
*   **AI Integrations**: Groq SDK (LLM integration).

---

## 🛠️ Cloning & Local Setup Guide

Follow these steps to run DRIPZO locally on your machine.

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18.x or higher recommended)
*   [MySQL Server](https://dev.mysql.com/downloads/installer/) (running on port 3306)

---

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd DRIPZO
```

---

### Step 2: Configure the Backend Database
1.  Log into your MySQL Command Line Client or preferred GUI (e.g., MySQL Workbench, TablePlus).
2.  Create the database:
    ```sql
    CREATE DATABASE dripzo_db;
    ```

---

### Step 3: Set Up Backend Environment (`server`)
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory and configure the environment variables:
```env
PORT=5000
NODE_ENV=development

# MySQL DB configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=YOUR_MYSQL_PASSWORD_HERE
DB_NAME=dripzo_db

# Security
JWT_SECRET=your_super_secret_jwt_key_here

# AI Integrations (Groq Cloud API Key)
GROQ_API_KEY=YOUR_GROQ_API_KEY_HERE

# OAuth (Optional mock values allowed)
GOOGLE_CLIENT_ID=your_google_oauth_client_id
FACEBOOK_APP_ID=your_facebook_app_id
```

Run database seeds to initialize default admins, vendors, and products:
```bash
npm run seed     # (If a seed script is configured, otherwise npm run dev will auto-create on initial boot)
```

Start the backend:
```bash
npm run dev
```
The server will start running on `http://localhost:5000`.

---

### Step 4: Set Up Storefront Client (`client`)
Open a new terminal session, navigate to the `client` directory, and install dependencies:
```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the developer server:
```bash
npm run dev
```
The storefront will run on `http://localhost:5173`.

---

### Step 5: Set Up Admin Panel (`admin-panel`)
Open a new terminal session, navigate to the `admin-panel` directory, and install dependencies:
```bash
cd admin-panel
npm install
```

Start the admin client:
```bash
npm run dev
```
The admin center will run on `http://localhost:5174` (or next available port).

---

### Step 6: Set Up Vendor Hub (`vendor-panel`)
Open a new terminal session, navigate to the `vendor-panel` directory, and install dependencies:
```bash
cd vendor-panel
npm install
```

Start the vendor client:
```bash
npm run dev
```
The vendor center will run on `http://localhost:5175` (or next available port).

---

## 🚀 Production Deployment Guide

Deploying a multi-module monorepo requires deploying individual microservices separately. Follow these steps:

### 1. Database Deployment (MySQL)
To keep DRIPZO live 24/7, migrate your MySQL instance to a cloud-managed database:
*   **Recommended Host**: Aiven, DigitalOcean Managed Databases, AWS RDS, or PlanetScale.
*   Configure the database connection string and ensure public/allowed-ip network access is granted to your backend server.

### 2. Backend Server Deployment (`server`)
Deploy the Node.js/Express app to hosting platforms that support background runtimes:
*   **Recommended Host**: Render, Railway, fly.io, or Heroku.
*   **Configuration**:
    1.  Link your Git repository.
    2.  Set the Root Directory to `server`.
    3.  Set the Build Command to `npm install`.
    4.  Set the Start Command to `node index.js`.
    5.  Add all environment variables from your local `.env` file into the host console's **Environment Settings** (especially `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `JWT_SECRET`, and `GROQ_API_KEY`).

### 3. Frontend Storefronts & Panels Deployment (`client`, `admin-panel`, `vendor-panel`)
All three frontend modules are static SPA clients built using Vite. They can be deployed to high-performance content delivery networks (CDNs) for free:
*   **Recommended Host**: Vercel, Netlify, or GitHub Pages.
*   **Configuration (e.g. on Vercel/Netlify)**:
    1.  Create three separate projects pointing to the same Git repository.
    2.  Set the **Root Directory** configurations as follows:
        *   Project 1 (Storefront): `client`
        *   Project 2 (Admin Center): `admin-panel`
        *   Project 3 (Vendor Hub): `vendor-panel`
    3.  Set the **Build Command** to: `npm run build`
    4.  Set the **Output Directory** to: `dist`
    5.  Add the **Environment Variable** `VITE_API_URL` pointing to your deployed backend domain (e.g., `https://api.dripzo.com/api`).

---

## 🔮 Future Expansion Opportunities

*   **Integrated Delivery Escrows**: Connect with services like **Shiprocket** or **Delhivery** APIs for real-time tracking, barcode updates, and smart logistics updates.
*   **Stripe / Razorpay Payments**: Swap mock checkouts out for production payment gateways with automatic payment routing between vendors and platform commission accounts.
*   **Interactive 3D Virtual Try-On**: Allow customers to upload selfies or build customized 3D models using web AR to try on premium jackets and sneakers before buying.
*   **Geospatial Vendor Discovery**: Integrate Mapbox to show users the closest local boutique where they can perform instant self-pickup of their orders.
