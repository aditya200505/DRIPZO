// Centralized product data for DRIPZO — White theme, INR pricing
const products = [
  // ═══════════════════════ SHIRTS ═══════════════════════
  {
    id: 1, name: 'Midnight Oxford Shirt', brand: 'DRIPZO SIGNATURE', price: 1999, category: 'Shirts', gender: 'Men', subcategory: 'Formal Shirts',
    description: 'A premium slim-fit oxford shirt with a modern spread collar.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    colors: ['#1a1a2e', '#e0e0e0', '#4a90d9'],
  },
  {
    id: 2, name: 'Neon Linen Shirt', brand: 'LINEN CO.', price: 1499, category: 'Shirts', gender: 'Men', subcategory: 'Summer Shirts',
    description: 'Lightweight linen shirt with a relaxed fit. Breathable and stylish.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    colors: ['#f5f5dc', '#87ceeb', '#2f4f4f'],
  },
  {
    id: 3, name: 'Cyber Denim Shirt', brand: 'DENIM X', price: 2299, category: 'Shirts', gender: 'Men', subcategory: 'Casual Shirts',
    description: 'Washed denim shirt with a futuristic cut. Snap buttons and raw hem.',
    image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=800&q=80',
    colors: ['#4169e1', '#708090'],
  },
  {
    id: 4, name: 'Silk Horizon Shirt', brand: 'SILK & CO.', price: 3499, category: 'Shirts', gender: 'Women', subcategory: 'Formal Shirts',
    description: 'Luxurious silk-blend shirt with an iridescent sheen.',
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80',
    colors: ['#c9b1ff', '#1a1a2e', '#f0e68c'],
  },
  {
    id: 5, name: 'Minimal Stripe Shirt', brand: 'BASIC ELITE', price: 1299, category: 'Shirts', gender: 'Men', subcategory: 'Striped Shirts',
    description: 'Clean lines, subtle stripes. Engineered for everyday elegance.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    colors: ['#ffffff', '#000000'],
  },
  {
    id: 6, name: 'Flannel Grid Shirt', brand: 'GRID WEAR', price: 1799, category: 'Shirts', gender: 'Men', subcategory: 'Check Shirts',
    description: 'Soft brushed flannel with a modern grid pattern. Warm and cozy.',
    image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=80',
    colors: ['#8b0000', '#2f4f4f', '#f5f5dc'],
  },
  {
    id: 7, name: 'Tech Mesh Shirt', price: 2199, category: 'Shirts', gender: 'Men', subcategory: 'Half Sleeve Shirts',
    description: 'Performance mesh panels meet streetwear design.',
    image: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80',
    colors: ['#000000', '#ff3f6c'],
  },

  // ═══════════════════════ PANTS ═══════════════════════
  {
    id: 8, name: 'Quantum Street Pants', brand: 'STREET CORE', price: 2499, category: 'Pants', gender: 'Men', subcategory: 'Joggers',
    description: 'Tapered jogger-style pants with hidden zip pockets.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    colors: ['#1a1a1a', '#4a4a4a', '#2f4f4f'],
  },
  {
    id: 9, name: 'Raw Selvedge Denim', brand: 'DENIM X', price: 3999, category: 'Pants', gender: 'Men', subcategory: 'Jeans',
    description: 'Japanese selvedge denim, raw and untreated.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
    colors: ['#191970', '#2f4f4f'],
  },
  {
    id: 10, name: 'Cargo Stealth Pants', brand: 'STEALTH PRO', price: 2899, category: 'Pants', gender: 'Men', subcategory: 'Cargo Pants',
    description: 'Multi-pocket cargo pants with a sleek silhouette.',
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80',
    colors: ['#556b2f', '#1a1a1a', '#8b7355'],
  },
  {
    id: 11, name: 'Pleated Wide-Leg Trousers', brand: 'MODA LUXE', price: 3299, category: 'Pants', gender: 'Women', subcategory: 'Formal Trousers',
    description: 'Elegant wide-leg trousers with a high waist and deep pleats.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    colors: ['#d2b48c', '#1a1a1a', '#808080'],
  },
  {
    id: 12, name: 'Tech Joggers Pro', brand: 'STREET CORE', price: 1999, category: 'Pants', gender: 'Men', subcategory: 'Joggers',
    description: 'Engineered joggers with 4-way stretch and reflective details.',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
    colors: ['#000000', '#333333', '#696969'],
  },
  {
    id: 13, name: 'Corduroy Drift Pants', brand: 'RETRO WEAR', price: 2199, category: 'Pants', gender: 'Men', subcategory: 'Casual Pants',
    description: 'Plush corduroy with a relaxed straight leg. Retro meets modern.',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
    colors: ['#8b4513', '#2f4f4f', '#d2691e'],
  },
  {
    id: 14, name: 'Slim Chino Elite', brand: 'ELITE BASICS', price: 1799, category: 'Pants', gender: 'Men', subcategory: 'Chinos',
    description: 'Perfectly tailored slim-fit chinos in a premium stretch cotton.',
    image: '/slim_chino_elite_1778656617767.png',
    colors: ['#f5f5dc', '#2f4f4f', '#000080'],
  },

  // ═══════════════════════ SHOES ═══════════════════════
  {
    id: 15, name: 'Neon Pulse Sneakers', brand: 'PULSE ATHLETICS', price: 4999, category: 'Shoes', gender: 'Men', subcategory: 'Sneakers',
    description: 'High-performance sneakers with neon accents and ultra-cushioned soles.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    colors: ['#ff4500', '#ffffff', '#000000'],
  },
  {
    id: 16, name: 'Synapse Runners', brand: 'PULSE ATHLETICS', price: 3999, category: 'Shoes', gender: 'Women', subcategory: 'Running Shoes',
    description: 'Lightweight running shoes with a reactive foam midsole.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    colors: ['#ff69b4', '#ffffff'],
  },
  {
    id: 17, name: 'Void Combat Boots', brand: 'VOID FOOTWEAR', price: 6499, category: 'Shoes', gender: 'Men', subcategory: 'Boots',
    description: 'Military-inspired combat boots with a chunky sole.',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80',
    colors: ['#000000', '#2f4f4f'],
  },
  {
    id: 18, name: 'Classic Leather Loafers', brand: 'MODA LUXE', price: 5499, category: 'Shoes', gender: 'Men', subcategory: 'Formal Shoes',
    description: 'Hand-stitched leather loafers with a modern slim profile.',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
    colors: ['#8b4513', '#1a1a1a'],
  },
  {
    id: 19, name: 'Air Max Retro', brand: 'PULSE ATHLETICS', price: 3799, category: 'Shoes', gender: 'Men', subcategory: 'Sneakers',
    description: 'Retro-inspired air-cushioned sneakers. Visible air unit.',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
    colors: ['#ffffff', '#808080', '#ff4500'],
  },
  {
    id: 20, name: 'Canvas High-Tops', brand: 'BASIC ELITE', price: 1999, category: 'Shoes', gender: 'Unisex', subcategory: 'Casual Shoes',
    description: 'Classic canvas high-tops with a rubber toe cap.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    colors: ['#ffffff', '#000000', '#ff0000'],
  },
  {
    id: 21, name: 'Suede Desert Boots', price: 4499, category: 'Shoes', gender: 'Men', subcategory: 'Boots',
    description: 'Premium suede desert boots with crepe rubber soles.',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80',
    colors: ['#d2b48c', '#8b4513'],
  },

  // ═══════════════════════ JACKETS ═══════════════════════
  {
    id: 22, name: 'Midnight Obsidian Jacket', price: 5999, category: 'Jackets', gender: 'Men', subcategory: 'Winter Jackets',
    description: 'Sleek matte-black jacket with quilted lining and stand collar.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    colors: ['#000000', '#1a1a2e'],
  },
  {
    id: 23, name: 'Matrix Long Coat', price: 7999, category: 'Jackets', gender: 'Men', subcategory: 'Overcoats',
    description: 'Floor-length overcoat with a dramatic silhouette.',
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80',
    colors: ['#1a1a1a', '#2f4f4f'],
  },
  {
    id: 24, name: 'Bomber Flux Jacket', price: 4499, category: 'Jackets', gender: 'Men', subcategory: 'Bomber Jackets',
    description: 'Nylon bomber jacket with ribbed cuffs and a reversible design.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    colors: ['#556b2f', '#000000', '#ff4500'],
  },
  {
    id: 25, name: 'Puffer Cloud Jacket', price: 5499, category: 'Jackets', gender: 'Women', subcategory: 'Puffer Jackets',
    description: 'Ultra-lightweight puffer with 800-fill down.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    colors: ['#4169e1', '#000000', '#ffffff'],
  },
  {
    id: 26, name: 'Denim Trucker Jacket', price: 3499, category: 'Jackets', gender: 'Men', subcategory: 'Denim Jackets',
    description: 'Classic trucker jacket in washed denim. Sherpa-lined.',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
    colors: ['#4682b4', '#f5f5dc'],
  },
  {
    id: 27, name: 'Windbreaker Pulse', price: 2999, category: 'Jackets', gender: 'Unisex', subcategory: 'Windbreakers',
    description: 'Lightweight windbreaker with color-blocked panels.',
    image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&q=80',
    colors: ['#00ced1', '#ff4500', '#ffffff'],
  },
  {
    id: 28, name: 'Leather Biker Jacket', price: 9999, category: 'Jackets', gender: 'Men', subcategory: 'Leather Jackets',
    description: 'Full-grain leather biker jacket with asymmetric zip.',
    image: '/leather_biker_jacket_1778656638643.png',
    colors: ['#000000', '#8b0000'],
  },

  // ═══════════════════════ FLIP FLOPS ═══════════════════════
  {
    id: 29, name: 'Beach Wave Slides', price: 999, category: 'Flip Flops', gender: 'Unisex', subcategory: 'Slides',
    description: 'Ergonomic slides with a contoured footbed.',
    image: '/beach_wave_slides.png',
    colors: ['#000000', '#ffffff', '#00ced1'],
  },
  {
    id: 30, name: 'Reef Comfort Flip Flops', price: 799, category: 'Flip Flops', gender: 'Men', subcategory: 'Classic Flip Flops',
    description: 'Soft rubber flip flops with arch support.',
    image: '/reef_comfort_flip_flops.png',
    colors: ['#8b4513', '#d2b48c'],
  },
  {
    id: 31, name: 'Sport Slide Pro', price: 1299, category: 'Flip Flops', gender: 'Men', subcategory: 'Sport Slides',
    description: 'Athletic-inspired slides with a massage footbed.',
    image: '/sport_slide_pro.png',
    colors: ['#000000', '#ff4500'],
  },
  {
    id: 32, name: 'Velvet Lounge Slides', price: 1499, category: 'Flip Flops', gender: 'Women', subcategory: 'Lounge Slides',
    description: 'Plush velvet slides with a memory foam insole.',
    image: '/velvet_lounge_slides.png',
    colors: ['#800020', '#000000', '#c9b1ff'],
  },
  {
    id: 33, name: 'Eco Cork Sandals', price: 1099, category: 'Flip Flops', gender: 'Women', subcategory: 'Sandals',
    description: 'Sustainable cork footbed sandals with recycled straps.',
    image: '/eco_cork_sandals.png',
    colors: ['#d2b48c', '#556b2f'],
  },
  {
    id: 34, name: 'Platform Cloud Slides', price: 1399, category: 'Flip Flops', gender: 'Women', subcategory: 'Platform Slides',
    description: 'Chunky platform slides with cloud-soft cushioning.',
    image: '/platform_cloud_slides.png',
    colors: ['#ffffff', '#ffc0cb', '#000000'],
  },

  // ═══════════════════════ T-SHIRTS ═══════════════════════
  {
    id: 35, name: 'Cyberpunk Graphic Tee', price: 1299, category: 'T-Shirts', gender: 'Men', subcategory: 'Graphic Tees',
    description: 'Heavyweight cotton tee with cyberpunk-inspired graphic print.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    colors: ['#000000', '#ff3f6c', '#8a2be2'],
  },
  {
    id: 36, name: 'Essential Crew Neck', price: 899, category: 'T-Shirts', gender: 'Unisex', subcategory: 'Basic Tees',
    description: 'The perfect everyday tee. Premium cotton, pre-shrunk.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    colors: ['#ffffff', '#000000', '#808080', '#ff4500'],
  },
  {
    id: 37, name: 'Vintage Wash Tee', price: 1199, category: 'T-Shirts', gender: 'Men', subcategory: 'Vintage Tees',
    description: 'Garment-dyed tee with a lived-in feel.',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    colors: ['#87ceeb', '#ffa07a', '#98fb98'],
  },
  {
    id: 38, name: 'Oversized Graphic Tee', price: 1599, category: 'T-Shirts', gender: 'Unisex', subcategory: 'Oversized Tees',
    description: 'Boxy oversized tee with bold back print.',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
    colors: ['#000000', '#ffffff'],
  },
  {
    id: 39, name: 'Henley Textured Tee', price: 1399, category: 'T-Shirts', gender: 'Men', subcategory: 'Henley Tees',
    description: 'Three-button henley in a textured waffle knit.',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
    colors: ['#2f4f4f', '#d2b48c', '#800020'],
  },
  {
    id: 40, name: 'Acid Wash Drop Tee', price: 1499, category: 'T-Shirts', gender: 'Men', subcategory: 'Streetwear Tees',
    description: 'Acid-washed tee with drop shoulders.',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
    colors: ['#696969', '#000000'],
  },
  {
    id: 41, name: 'Pocket Logo Tee', price: 999, category: 'T-Shirts', gender: 'Men', subcategory: 'Basic Tees',
    description: 'Clean pocket tee with an embroidered DRIPZO logo.',
    image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80',
    colors: ['#ffffff', '#000000', '#ff3f6c'],
  },
  {
    id: 42, name: 'Mesh Layer Tee', price: 1799, category: 'T-Shirts', gender: 'Men', subcategory: 'Streetwear Tees',
    description: 'Semi-transparent mesh overlay tee. Two-layer construction.',
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80',
    colors: ['#000000', '#ffffff'],
  },

  // ═══════════════════════ LUXURY ═══════════════════════
  {
    id: 43, name: 'Italian Cashmere Overcoat', price: 18999, category: 'Luxury', gender: 'Men', subcategory: 'Luxury Outerwear',
    description: 'Hand-tailored in Milan. 100% pure cashmere with silk lining.',
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80',
    colors: ['#2f2f2f', '#d2b48c'],
    isLuxury: true,
  },
  {
    id: 44, name: 'Swiss Chronograph Watch', price: 19999, category: 'Luxury', gender: 'Men', subcategory: 'Luxury Watches',
    description: 'Precision Swiss movement, sapphire crystal, titanium case.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
    colors: ['#c0c0c0', '#000000'],
    isLuxury: true,
  },
  {
    id: 45, name: 'Leather Weekender Bag', price: 12999, category: 'Luxury', gender: 'Unisex', subcategory: 'Luxury Bags',
    description: 'Full-grain vegetable-tanned leather. Handcrafted in Florence.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    colors: ['#8b4513', '#2f2f2f'],
    isLuxury: true,
  },
  {
    id: 46, name: 'Silk Pocket Square Set', price: 5999, category: 'Luxury', gender: 'Men', subcategory: 'Luxury Accessories',
    description: 'Set of 4 hand-rolled Italian silk pocket squares.',
    image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=800&q=80',
    colors: ['#800020', '#000080', '#006400'],
    isLuxury: true,
  },
  {
    id: 47, name: 'Designer Sunglasses', price: 9999, category: 'Luxury', gender: 'Unisex', subcategory: 'Luxury Eyewear',
    description: 'Polarized titanium frames with gradient UV lenses.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
    colors: ['#000000', '#c0c0c0'],
    isLuxury: true,
  },
  {
    id: 48, name: 'Premium Leather Belt', price: 6999, category: 'Luxury', gender: 'Men', subcategory: 'Luxury Accessories',
    description: 'Double-stitched full-grain leather with brushed gold buckle.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    colors: ['#000000', '#8b4513'],
    isLuxury: true,
  },

  // ═══════════════════════ COSMETICS ═══════════════════════
  {
    id: 49, name: 'Velvet Matte Lipstick', price: 1299, category: 'Cosmetics', gender: 'Women', subcategory: 'Lips',
    description: 'Long-lasting velvet matte finish. 12-hour wear.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80',
    colors: ['#8b0000', '#ff69b4', '#cc5533'],
    volume: '3.8g',
    requirement: 'For All Skin Types'
  },
  {
    id: 50, name: 'Luxury Foundation Kit', price: 2999, category: 'Cosmetics', gender: 'Women', subcategory: 'Face',
    description: 'Buildable coverage with skin-loving ingredients.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    colors: ['#f5e6d3', '#d2b48c', '#8b7355'],
    volume: '30ml',
    requirement: 'Dermatologist Tested'
  },
  {
    id: 51, name: 'Eye Shadow Palette', price: 2499, category: 'Cosmetics', gender: 'Women', subcategory: 'Eyes',
    description: '18 shades of shimmer and matte. Ultra-pigmented.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
    colors: ['#d4a574', '#8b6914', '#c9a0dc'],
    volume: '18 Shades',
    requirement: 'Paraben Free'
  },
  {
    id: 52, name: 'Hydrating Face Serum', price: 1799, category: 'Cosmetics', gender: 'Unisex', subcategory: 'Skincare',
    description: 'Hyaluronic acid + Vitamin C. Glowing skin in 7 days.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    colors: ['#ffd700', '#ffffff'],
    volume: '30ml',
    requirement: 'Suitable for All Skin'
  },
  {
    id: 53, name: 'Fragrance Collection', price: 4999, category: 'Cosmetics', gender: 'Unisex', subcategory: 'Fragrance',
    description: 'Three signature scents. Eau de parfum, 50ml each.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    colors: ['#c9b1ff', '#ffd700', '#ff69b4'],
    volume: '3 x 50ml',
    requirement: 'Long Lasting'
  },
  {
    id: 54, name: 'Nail Art Premium Set', price: 1499, category: 'Cosmetics', gender: 'Women', subcategory: 'Nails',
    description: '12 premium gel polishes with UV lamp. Salon quality.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
    colors: ['#ff3f6c', '#8a2be2', '#ffd700'],
    volume: '12 Colors',
    requirement: 'Chip Resistant'
  },

  // ═══════════════════════ MORE SHIRTS ═══════════════════════
  {
    id: 55, name: 'Hawaiian Print Shirt', price: 1599, category: 'Shirts', gender: 'Men', subcategory: 'Summer Shirts',
    description: 'Tropical print relaxed-fit shirt. Perfect for vacations.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    colors: ['#228b22', '#ffa500', '#ffffff'],
  },
  {
    id: 56, name: 'Chambray Button-Down', price: 1899, category: 'Shirts', gender: 'Women', subcategory: 'Casual Shirts',
    description: 'Soft chambray with a classic button-down collar.',
    image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80',
    colors: ['#6495ed', '#f5f5dc'],
  },
  {
    id: 57, name: 'Band Collar Linen Shirt', price: 1699, category: 'Shirts', gender: 'Men', subcategory: 'Summer Shirts',
    description: 'Mandarin collar linen shirt. Minimal and elegant.',
    image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=80',
    colors: ['#f5f5dc', '#000000', '#87ceeb'],
  },
  {
    id: 58, name: 'Checked Flannel Overshirt', price: 2299, category: 'Shirts', gender: 'Men', subcategory: 'Check Shirts',
    description: 'Heavy-weight flannel overshirt with chest pockets.',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80',
    colors: ['#8b0000', '#2f4f4f', '#000000'],
  },

  // ═══════════════════════ MORE PANTS ═══════════════════════
  {
    id: 59, name: 'Wide-Leg Linen Pants', price: 2199, category: 'Pants', gender: 'Women', subcategory: 'Casual Pants',
    description: 'Flowy wide-leg trousers in premium linen. Effortless style.',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
    colors: ['#f5f5dc', '#d2b48c', '#ffffff'],
  },
  {
    id: 60, name: 'Retro Track Pants', price: 1599, category: 'Pants', gender: 'Men', subcategory: 'Track Pants',
    description: 'Side-stripe track pants with elastic waist. Sporty meets street.',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
    colors: ['#000080', '#ffffff', '#ff4500'],
  },
  {
    id: 61, name: 'Smart Jogger Trousers', price: 2799, category: 'Pants', gender: 'Men', subcategory: 'Joggers',
    description: 'Tailored jogger-style trousers. Office to evening ready.',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
    colors: ['#2f4f4f', '#000000', '#808080'],
  },
  {
    id: 62, name: 'Distressed Boyfriend Jeans', price: 2499, category: 'Pants', gender: 'Women', subcategory: 'Jeans',
    description: 'Relaxed boyfriend-fit jeans with artful distressing.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
    colors: ['#4682b4', '#87ceeb'],
  },

  // ═══════════════════════ MORE SHOES ═══════════════════════
  {
    id: 63, name: 'Leather Espadrilles', price: 2999, category: 'Shoes', gender: 'Men', subcategory: 'Casual Shoes',
    description: 'Handwoven jute sole with premium leather upper.',
    image: 'https://images.unsplash.com/photo-1512374382149-433a72b9a5a5?w=800&q=80',
    colors: ['#d2b48c', '#ffffff'],
  },
  {
    id: 64, name: 'Chunky Platform Trainers', price: 4499, category: 'Shoes', gender: 'Women', subcategory: 'Sneakers',
    description: 'Oversized sole platform sneakers. Bold streetwear statement.',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
    colors: ['#ffffff', '#000000', '#ff69b4'],
  },
  {
    id: 65, name: 'Chelsea Leather Boots', price: 5999, category: 'Shoes', gender: 'Men', subcategory: 'Boots',
    description: 'Classic pull-on Chelsea boots in polished leather.',
    image: 'https://images.unsplash.com/photo-1605733513597-a8f8d410fe3c?w=800&q=80',
    colors: ['#000000', '#8b4513'],
  },

  // ═══════════════════════ MORE JACKETS ═══════════════════════
  {
    id: 66, name: 'Varsity Letterman Jacket', price: 3999, category: 'Jackets', gender: 'Men', subcategory: 'Varsity Jackets',
    description: 'Wool body, leather sleeves. Classic Americana style.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    colors: ['#000080', '#ffffff', '#8b0000'],
  },
  {
    id: 67, name: 'Safari Utility Jacket', price: 4299, category: 'Jackets', gender: 'Men', subcategory: 'Casual Jackets',
    description: 'Multi-pocket safari jacket in washed cotton canvas.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    colors: ['#8b7355', '#556b2f'],
  },
  {
    id: 68, name: 'Lightweight Rain Shell', price: 2499, category: 'Jackets', gender: 'Unisex', subcategory: 'Windbreakers',
    description: 'Waterproof breathable shell. Packs into its own pocket.',
    image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&q=80',
    colors: ['#4169e1', '#000000'],
  },

  // ═══════════════════════ MORE FLIP FLOPS ═══════════════════════
  {
    id: 69, name: 'Leather Pool Slides', price: 1699, category: 'Flip Flops', gender: 'Men', subcategory: 'Slides',
    description: 'Premium leather slides with cushioned footbed.',
    image: '/leather_pool_slides.png',
    colors: ['#000000', '#8b4513'],
  },
  {
    id: 70, name: 'Rope Thong Sandals', price: 899, category: 'Flip Flops', gender: 'Women', subcategory: 'Sandals',
    description: 'Woven rope sandals with natural jute detail.',
    image: '/rope_thong_sandals.png',
    colors: ['#d2b48c', '#f5f5dc'],
  },

  // ═══════════════════════ MORE T-SHIRTS ═══════════════════════
  {
    id: 71, name: 'Color Block Crew Tee', price: 1199, category: 'T-Shirts', gender: 'Men', subcategory: 'Basic Tees',
    description: 'Bold two-tone color block design. Relaxed fit.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    colors: ['#4169e1', '#ffffff', '#000000'],
  },
  {
    id: 72, name: 'Striped Ringer Tee', price: 999, category: 'T-Shirts', gender: 'Women', subcategory: 'Vintage Tees',
    description: 'Retro-inspired ringer tee with contrast collar and cuffs.',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
    colors: ['#ffffff', '#000080', '#8b0000'],
  },
  {
    id: 73, name: 'Embroidered Logo Tee', price: 1399, category: 'T-Shirts', gender: 'Men', subcategory: 'Basic Tees',
    description: 'Minimal chest embroidery on premium supima cotton.',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
    colors: ['#2f4f4f', '#ffffff', '#000000'],
  },
  {
    id: 74, name: 'Longline Drop Tee', price: 1099, category: 'T-Shirts', gender: 'Men', subcategory: 'Streetwear Tees',
    description: 'Extended length tee with curved hem. Street essential.',
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80',
    colors: ['#808080', '#000000', '#ffffff'],
  },

  // ═══════════════════════ MORE LUXURY ═══════════════════════
  {
    id: 75, name: 'Gold Plated Cufflinks', price: 7999, category: 'Luxury', gender: 'Men', subcategory: 'Luxury Accessories',
    description: '18K gold-plated cufflinks with mother-of-pearl inlay.',
    image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=800&q=80',
    colors: ['#ffd700', '#ffffff'],
    isLuxury: true,
  },
  {
    id: 76, name: 'Silk Evening Scarf', price: 8999, category: 'Luxury', gender: 'Women', subcategory: 'Luxury Accessories',
    description: 'Hand-printed Italian silk scarf. 90cm x 90cm.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    colors: ['#800020', '#ffd700', '#000080'],
    isLuxury: true,
  },

  // ═══════════════════════ MORE COSMETICS ═══════════════════════
  {
    id: 77, name: 'Setting Spray Mist', price: 999, category: 'Cosmetics', gender: 'Women', subcategory: 'Face',
    description: 'All-day makeup setting spray with dewy finish.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    colors: ['#87ceeb', '#ffffff'],
  },
  {
    id: 78, name: 'Blush Palette Trio', price: 1899, category: 'Cosmetics', gender: 'Women', subcategory: 'Face',
    description: 'Three buildable blush shades. Shimmer and matte.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
    colors: ['#ff69b4', '#ffc0cb', '#dc143c'],
  },
  {
    id: 79, name: 'Floral Comfort Flip Flops', price: 699, category: 'Flip Flops', gender: 'Women', subcategory: 'Flip Flops',
    description: 'Beautiful floral design flip flops for casual wear.',
    image: '/womens_floral_flip_flops.png',
    colors: ['#ffb6c1', '#ffffff'],
  },
  {
    id: 80, name: 'Kids Colorful Fun Slides', price: 599, category: 'Flip Flops', gender: 'Kids', subcategory: 'Slides',
    description: 'Bright and colorful slides perfect for kids.',
    image: '/kids_colorful_slides.png',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },
  {
    id: 81, name: 'Pro Running Sneakers', price: 2999, category: 'Shoes', gender: 'Women', subcategory: 'Sneakers',
    description: 'Stylish pink and white running sneakers for ultimate comfort.',
    image: '/womens_running_sneakers_1778657335616.png',
    colors: ['#ffc0cb', '#ffffff'],
  },
  {
    id: 82, name: 'Kids Light-up Sneakers', price: 1499, category: 'Shoes', gender: 'Kids', subcategory: 'Sneakers',
    description: 'Cool light-up sneakers with velcro straps for kids.',
    image: '/kids_light_up_sneakers_1778657352050.png',
    colors: ['#ffff00', '#000000'],
  },
  {
    id: 83, name: 'Premium Gold Chronograph', price: 14999, category: 'Luxury', gender: 'Men', subcategory: 'Watches',
    description: 'Exquisite gold luxury watch with chronographic precision.',
    image: '/luxury_gold_watch_1778658154366.png',
    colors: ['#ffd700', '#000000'],
  },
  {
    id: 84, name: 'Radiant Glow Skin Kit', price: 4599, category: 'Cosmetics', gender: 'Women', subcategory: 'Skincare',
    description: 'Complete glowing skin cosmetic kit for daily luxury care.',
    image: '/cosmetics_glow_kit_1778658185320.png',
    colors: ['#ffb6c1', '#ffffff'],
  },
  {
    id: 85, name: 'Silk Button-Down Shirt', price: 3499, category: 'Shirts', gender: 'Men', subcategory: 'Dress Shirts',
    description: 'Premium silk button-down shirt for formal occasions.',
    image: '/shirts_silk_buttondown_1778658200718.png',
    colors: ['#ffffff', '#000080'],
  },
  {
    id: 86, name: 'Khaki Cargo Pants', price: 2199, category: 'Pants', gender: 'Men', subcategory: 'Cargo',
    description: 'Durable khaki cargo pants with multiple utility pockets.',
    image: '/pants_cargo_khaki_1778658215355.png',
    colors: ['#f5f5dc', '#556b2f'],
  },
  {
    id: 87, name: 'Rugged Hiking Boots', price: 5499, category: 'Shoes', gender: 'Unisex', subcategory: 'Boots',
    description: 'Durable all-terrain hiking boots for outdoor adventures.',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80',
    colors: ['#8b4513', '#000000'],
  },
  {
    id: 88, name: 'Denim Sherpa Jacket', price: 4299, category: 'Jackets', gender: 'Men', subcategory: 'Denim',
    description: 'Classic denim jacket lined with warm sherpa fleece.',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80',
    colors: ['#4682b4', '#ffffff'],
  },
  {
    id: 89, name: 'Leather Strap Flip Flops', price: 1299, category: 'Flip Flops', gender: 'Women', subcategory: 'Sandals',
    description: 'Elegant leather strap flip flops for summer comfort.',
    image: '/leather_strap_flip_flops.png',
    colors: ['#8b4513', '#d2b48c'],
  },
  {
    id: 90, name: 'Vintage Band Tee', price: 1499, category: 'T-Shirts', gender: 'Unisex', subcategory: 'Graphic Tees',
    description: 'Authentic vintage wash graphic band t-shirt.',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
    colors: ['#000000', '#808080'],
  },
  // ═══════════════════════ NEW FASHION & BEAUTY RELEASES ═══════════════════════
  {
    id: 91, name: 'Fuji Blossom Print Shirt', brand: 'K-STYLE TOKYO', price: 1699, category: 'Shirts', gender: 'Men', subcategory: 'Korean fashion shirts',
    description: 'Relaxed fit printed shirt featuring hand-drawn cherry blossom motifs. Crafted from lightweight rayon.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    colors: ['#ffb6c1', '#ffffff', '#000000'],
  },
  {
    id: 92, name: 'Minimal Linen Overshirt', brand: 'LINEN CO.', price: 1899, category: 'Shirts', gender: 'Men', subcategory: 'Linen shirts',
    description: 'An understated minimal linen overshirt featuring a drop shoulder and large patch pockets. Highly breathable fabric.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    colors: ['#f5f5dc', '#ffffff', '#2f4f4f'],
  },
  {
    id: 93, name: 'Seoul Relaxed Chambray', brand: 'K-STYLE TOKYO', price: 1799, category: 'Shirts', gender: 'Men', subcategory: 'Korean fashion shirts',
    description: 'Soft-washed cotton chambray shirt with a boxy Korean silhouette and an elegant band collar.',
    image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80',
    colors: ['#6495ed', '#4682b4'],
  },
  {
    id: 94, name: 'Cyber Grunge Plaid Shirt', brand: 'STREET CORE', price: 2199, category: 'Shirts', gender: 'Unisex', subcategory: 'Y2K shirts',
    description: 'Heavyweight oversized plaid shirt with distress detailing and metal hardware accents. True Y2K grunge aesthetic.',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80',
    colors: ['#8b0000', '#000000', '#696969'],
  },
  {
    id: 95, name: 'Vintage Baggy Carpenter Denim', brand: 'DENIM X', price: 3499, category: 'Pants', gender: 'Men', subcategory: 'Baggy jeans',
    description: 'Ultra baggy 90s style carpenter pants in a heavily washed indigo denim. Features hammer loop and utility pockets.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
    colors: ['#4682b4', '#708090'],
  },
  {
    id: 96, name: 'Techwear Multi-Pocket Cargos', brand: 'STEALTH PRO', price: 2999, category: 'Pants', gender: 'Men', subcategory: 'Streetwear cargos',
    description: 'Water-resistant tactical cargos featuring adjustable strap buckles and hidden modular compartment pockets.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    colors: ['#000000', '#2f4f4f', '#556b2f'],
  },
  {
    id: 97, name: 'Draped Wide-Leg Pleated Trousers', brand: 'MODA LUXE', price: 2799, category: 'Pants', gender: 'Women', subcategory: 'Wide leg pants',
    description: 'Flowy, high-waisted pleated trousers in a lightweight drape fabric. Delivering a luxury magazine-front silhouette.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    colors: ['#ffffff', '#d2b48c', '#000000'],
  },
  {
    id: 98, name: 'Aero Drift Street Sneakers', brand: 'PULSE ATHLETICS', price: 4599, category: 'Shoes', gender: 'Unisex', subcategory: 'Streetwear shoes',
    description: 'Dynamic knit mesh running sneakers featuring shock-absorbing sole tech and high-contrast styling lines.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    colors: ['#ff4500', '#000000', '#ffffff'],
  },
  {
    id: 99, name: 'Monolith Chunky Trainers', brand: 'VOID FOOTWEAR', price: 5499, category: 'Shoes', gender: 'Unisex', subcategory: 'Chunky shoes',
    description: 'Extreme platform retro trainers in premium white leather with high-traction thick rubber outsoles.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    colors: ['#ffffff', '#c0c0c0'],
  },
  {
    id: 100, name: 'Heritage Leather High-Tops', brand: 'VOID FOOTWEAR', price: 6299, category: 'Shoes', gender: 'Men', subcategory: 'High-top shoes',
    description: 'Sleek premium leather high-top sneakers with retro panel stitch lines and padded ankle support collars.',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
    colors: ['#000000', '#ffffff', '#ff3f6c'],
  },
  {
    id: 101, name: 'Midnight Bomber Flux', brand: 'STEALTH PRO', price: 4799, category: 'Jackets', gender: 'Men', subcategory: 'Bomber jackets',
    description: 'Heavy flight nylon bomber featuring insulated quilted lining, tactical arm zip-pocket, and water-repellent shell.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    colors: ['#000000', '#556b2f'],
  },
  {
    id: 102, name: 'Vintage Denim Sherpa Trucker', brand: 'DENIM X', price: 3899, category: 'Jackets', gender: 'Men', subcategory: 'Denim jackets',
    description: 'Rigid raw denim trucker jacket fully lined with plush, high-insulation sherpa fleece for ultimate warmth and heritage style.',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
    colors: ['#4682b4', '#87ceeb'],
  },
  {
    id: 103, name: 'Hype Cushion Street Slides', brand: 'STREET CORE', price: 1599, category: 'Flip Flops', gender: 'Unisex', subcategory: 'Streetwear slides',
    description: 'Bold oversized foam slides with thick, supportive ergonomic platforms. Built for superior street fashion comfort.',
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80',
    colors: ['#000000', '#ffffff', '#ff3f6c'],
  },
  {
    id: 104, name: 'Osaka Minimal Sandal', brand: 'K-STYLE TOKYO', price: 1899, category: 'Flip Flops', gender: 'Unisex', subcategory: 'Luxury sandals',
    description: 'Artisanal double-strap leather sandals with contoured cork footbeds and premium gunmetal buckles.',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80',
    colors: ['#8b4513', '#000000', '#f5f5dc'],
  },
  {
    id: 105, name: 'Tokyo Neon Graphic Tee', brand: 'STREET CORE', price: 1499, category: 'T-Shirts', gender: 'Unisex', subcategory: 'Streetwear tshirts',
    description: 'Heavyweight organic cotton tee decorated with high-density glowing neon Tokyo cyber designs.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    colors: ['#000000', '#ffffff', '#8a2be2'],
  },
  {
    id: 106, name: 'Minimal Waffle Henley Tee', brand: 'BASIC ELITE', price: 1199, category: 'T-Shirts', gender: 'Men', subcategory: 'Minimal tees',
    description: 'Soft brushed waffle knit cotton tee with a clean three-button henley placket and tailored sleeve cuffs.',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
    colors: ['#2f4f4f', '#f5f5dc', '#808080'],
  },
  {
    id: 107, name: 'Sovereign Heavyweight Plain Tee', brand: 'DRIPZO SIGNATURE', price: 1699, category: 'T-Shirts', gender: 'Men', subcategory: 'Luxury plain tees',
    description: 'Luxuriously thick, pre-shrunk combed supima cotton tee. Boxy relaxed drape, perfect blank staple.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    colors: ['#ffffff', '#000000', '#ff3f6c'],
  },
  {
    id: 108, name: 'Glossy Glass Plumping Lip Oil', brand: 'AURA BEAUTY', price: 1299, category: 'Cosmetics', gender: 'Women', subcategory: 'Lip gloss',
    description: 'High-shine, non-sticky lip nourishing oil infused with active hyaluronic acid spheres and cherry fruit extracts.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80',
    colors: ['#ffc0cb', '#cc5533', '#ffffff'],
    volume: '5.5ml',
    requirement: 'Cruelty Free & Vegan'
  },
  {
    id: 109, name: 'Crushed Velvet Matte Lipstick', brand: 'AURA BEAUTY', price: 1099, category: 'Cosmetics', gender: 'Women', subcategory: 'Matte lipstick',
    description: 'Weightless matte lipstick featuring intense single-stroke pigments and dynamic hydrating avocado oil.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    colors: ['#8b0000', '#ff69b4', '#800020'],
    volume: '4.2g',
    requirement: '12-Hour Smudge Proof'
  },
  {
    id: 110, name: 'Pure Retinol Botanical Serum', brand: 'AURA BEAUTY', price: 2199, category: 'Cosmetics', gender: 'Unisex', subcategory: 'Face serum',
    description: 'Advanced anti-aging evening facial serum loaded with 1.5% micro-encapsulated pure retinol and organic aloe juice.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    colors: ['#ffd700', '#ffffff'],
    volume: '30ml',
    requirement: 'Dermatologist Tested'
  },
  {
    id: 111, name: 'Celestial Oud Perfume Intense', brand: 'AURA BEAUTY', price: 5999, category: 'Cosmetics', gender: 'Unisex', subcategory: 'Luxury perfume',
    description: 'Opulent and mysterious signature scent blending rich smoked agarwood, sweet Bulgarian rose, and spiced patchouli.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    colors: ['#ffd700', '#000000'],
    volume: '100ml',
    requirement: 'Long-Lasting Eau De Parfum'
  },
  {
    id: 112, name: 'Luminous Silk Air Foundation', brand: 'AURA BEAUTY', price: 3299, category: 'Cosmetics', gender: 'Women', subcategory: 'Foundation',
    description: 'Weightless air-whipped liquid foundation offering custom buildable coverage and a gorgeous dew-lit finish.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    colors: ['#f5e6d3', '#d2b48c', '#8b7355'],
    volume: '35ml',
    requirement: 'Hydrating All-Day Wear'
  },
  {
    id: 113, name: 'Satin Finish Compact Powder', brand: 'AURA BEAUTY', price: 1699, category: 'Cosmetics', gender: 'Women', subcategory: 'Compact powder',
    description: 'Ultra-fine milled translucent powder designed to instantly blur skin pores, control shine, and lock in makeup setting.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
    colors: ['#d2b48c', '#ffffff'],
    volume: '12g',
    requirement: 'Paraben & Talc Free'
  },
  {
    id: 114, name: 'Golden Hour Glow Skincare Kit', brand: 'AURA BEAUTY', price: 4299, category: 'Cosmetics', gender: 'Women', subcategory: 'Skincare kits',
    description: 'Complete 3-step organic skincare routine: Gentle Cleanser (150ml), Glow Toner (100ml), and Water Jelly Moisturizer (50ml).',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    colors: ['#ffb6c1', '#ffffff'],
    volume: '3-Piece Set',
    requirement: 'Organic & Organic Ingredients'
  },
  {
    id: 115, name: 'Red Carpet Professional Makeup Set', brand: 'AURA BEAUTY', price: 8999, category: 'Cosmetics', gender: 'Women', subcategory: 'Luxury makeup sets',
    description: 'Curated box of 8 premium vanity staples, including liquid highlighter, eye contour shadow palette, intense liner, and satin lip colors.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
    colors: ['#ffd700', '#ffc0cb', '#000000'],
    volume: '8-Piece Set',
    requirement: 'Luxury Professional Vanity Kit'
  },
];

// Category images
export const categoryImages = {
  'Shirts': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
  'Pants': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
  'Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  'Jackets': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
  'Flip Flops': '/leather_pool_slides.png',
  'T-Shirts': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
  'Luxury': 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
  'Cosmetics': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
};

// Model images for trending section (models wearing fashion items)
export const trendingModels = [
  {
    id: 't1',
    name: 'Oversized Graphic Tee',
    subtitle: 'Urban streetwear essential',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    tag: 'TRENDING',
    price: 999,
  },
  {
    id: 't2',
    name: 'Classic Striped Shirt',
    subtitle: 'Timeless vertical stripes',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    tag: 'HOT',
    price: 1499,
  },
  {
    id: 't3',
    name: 'Slim Fit Joggers',
    subtitle: 'Tapered cuff, ultra comfort',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
    tag: 'BESTSELLER',
    price: 1999,
  },
  {
    id: 't4',
    name: 'Baggy Fit Cargo Pants',
    subtitle: 'Relaxed wide-leg cargo',
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80',
    tag: 'NEW',
    price: 2499,
  },
  {
    id: 't5',
    name: 'Vintage Wash Tee',
    subtitle: 'Soft garment-dyed cotton',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    tag: 'TRENDING',
    price: 799,
  },
  {
    id: 't6',
    name: 'Pinstripe Oxford Shirt',
    subtitle: 'Premium cotton pinstripes',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    tag: 'PREMIUM',
    price: 1799,
  },
  {
    id: 't7',
    name: 'Relaxed Baggy Joggers',
    subtitle: 'Loose fit, drop crotch',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    tag: 'HOT',
    price: 1299,
  },
  {
    id: 't8',
    name: 'Acid Wash Drop Tee',
    subtitle: 'Bold washed streetwear',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
    tag: 'EXCLUSIVE',
    price: 1599,
  },
];

export const categories = ['All', ...new Set(products.map(p => p.category))];

export const getProductsByCategory = (category) => {
  if (category === 'All') return products;
  return products.filter(p => p.category === category);
};

export const searchProducts = (query) => {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  
  const searchTerms = q.split(' ').map(term => term.replace(/s$/, ''));

  return products.filter(p => {
    const searchableText = `${p.name} ${p.category} ${p.subcategory} ${p.description} ${p.gender}`.toLowerCase();
    return searchTerms.every(term => searchableText.includes(term));
  });
};

export const getProductById = (id) => products.find(p => String(p.id) === String(id));

export const getFeaturedProducts = () => {
  const featured = [];
  const cats = [...new Set(products.map(p => p.category))];
  cats.forEach(cat => {
    const catProducts = products.filter(p => p.category === cat);
    featured.push(catProducts[0]);
  });
  return featured.slice(0, 8);
};

export const getLuxuryProducts = () => products.filter(p => p.category === 'Luxury');
export const getCosmeticsProducts = () => products.filter(p => p.category === 'Cosmetics');

export const getProductsByGender = (gender) => {
  return products.filter(p => p.gender === gender || p.gender === 'Unisex');
};

export const getSubcategoriesByCategory = (category) => {
  const cats = products.filter(p => p.category === category).map(p => p.subcategory).filter(Boolean);
  return [...new Set(cats)];
};

export const getProductsByCategoryAndSubcategory = (category, subcategory) => {
  if (!subcategory || subcategory === 'All') return getProductsByCategory(category);
  return products.filter(p => p.category === category && p.subcategory === subcategory);
};

export const getTrendingProducts = () => {
  return [products[0], products[8], products[14], products[21], products[28], products[34], products[22], products[15]];
};

// ═══════════════════════ REVIEWS SYSTEM ═══════════════════════
const reviewerNames = [
  'Aarav Sharma', 'Priya Patel', 'Rohan Gupta', 'Ananya Singh', 'Vikram Reddy',
  'Sneha Iyer', 'Arjun Nair', 'Kavya Menon', 'Rahul Verma', 'Meera Joshi',
  'Aditya Kumar', 'Pooja Deshmukh', 'Siddharth Rao', 'Divya Krishnan', 'Karthik Sundaram',
  'Riya Chopra', 'Nikhil Banerjee', 'Ishita Agarwal', 'Manish Tiwari', 'Deepika Saxena',
  'Varun Malhotra', 'Neha Bhatia', 'Amit Pandey', 'Swati Kulkarni', 'Rajesh Pillai',
  'Tanvi Dutta', 'Harsh Mehta', 'Shruti Kapoor', 'Gaurav Sinha', 'Anjali Mishra',
];

const reviewComments = [
  'Amazing quality! Fits perfectly and the material feels premium. Totally worth the price.',
  'Delivered in under 45 minutes, I was shocked! Great packaging too.',
  'Color is exactly as shown. My friends keep asking where I bought it.',
  'Very comfortable and stylish. Wore it to a wedding and got so many compliments!',
  'Good product but sizing runs a bit large. Order one size down.',
  'Exceeded my expectations. The stitching is flawless and fabric is super soft.',
  'Bought this as a gift for my brother. He absolutely loved it!',
  'Best purchase I\'ve made in months. The quality is unmatched at this price.',
  'Decent product. Delivery was fast. Would buy again.',
  'Love the design! It\'s trendy yet classy. Perfect for daily wear.',
  'Material is breathable and perfect for Indian summers. Highly recommend.',
  'Ordered two colors, both are stunning. DRIPZO never disappoints!',
  'Value for money. Comparable to brands charging 3x more.',
  'The packaging was beautiful — felt like unboxing a luxury item.',
  'Slightly different from the image but still looks great. Happy with purchase.',
  'Washed it multiple times, no color fading at all. Great quality!',
  'Perfect fit and premium finish. Will definitely order more from DRIPZO.',
  'Customer service was helpful when I had a sizing question. Smooth experience.',
  'This has become my go-to outfit. Super versatile and comfortable.',
  'Absolutely stunning! Got compliments the first time I wore it. ⭐⭐⭐⭐⭐',
];

// Helper to get a stable numeric value from any product ID (supporting number or string/UUID)
const getNumericId = (id) => {
  if (typeof id === 'number') return id;
  if (!id) return 0;
  const str = String(id);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Generate seeded reviews for each product
const generateProductReviews = (productId) => {
  const seed = getNumericId(productId) * 7;
  const numReviews = 3 + (seed % 4); // 3-6 reviews per product
  const reviews = [];
  for (let i = 0; i < numReviews; i++) {
    const nameIdx = (seed + i * 13) % reviewerNames.length;
    const commentIdx = (seed + i * 11) % reviewComments.length;
    const rating = 3 + ((seed + i * 5) % 3); // 3-5 stars
    const daysAgo = 1 + ((seed + i * 3) % 60);
    reviews.push({
      id: `r-${productId}-${i}`,
      name: reviewerNames[nameIdx],
      rating,
      comment: reviewComments[commentIdx],
      date: new Date(Date.now() - daysAgo * 86400000).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
      verified: (seed + i) % 3 !== 0,
    });
  }
  return reviews;
};

// In-memory review store
const reviewStore = {};

export const getProductReviews = (productId) => {
  const id = String(productId);
  if (!reviewStore[id]) {
    reviewStore[id] = generateProductReviews(productId);
  }
  return reviewStore[id];
};

export const addProductReview = (productId, review) => {
  const id = String(productId);
  if (!reviewStore[id]) {
    reviewStore[id] = generateProductReviews(productId);
  }
  reviewStore[id].unshift({
    id: `r-${id}-${Date.now()}`,
    ...review,
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
    verified: false,
  });
  return reviewStore[id];
};

export const getAverageRating = (productId) => {
  const reviews = getProductReviews(productId);
  if (reviews.length === 0) return 0;
  return (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
};

// ═══════════════════════ HOMEPAGE TESTIMONIALS ═══════════════════════
export const customerTestimonials = [
  {
    id: 1, name: 'Aarav Sharma', location: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', rating: 5,
    comment: 'DRIPZO has completely changed how I shop for fashion. The fast delivery is amazing — I ordered a shirt for a last-minute party and it arrived super quick!',
  },
  {
    id: 2, name: 'Priya Patel', location: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', rating: 5,
    comment: 'The quality of clothes is exceptional. I\'ve ordered multiple times and every piece looks exactly like the photos. The luxury collection is absolutely worth it.',
  },
  {
    id: 3, name: 'Rohan Gupta', location: 'Delhi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', rating: 4,
    comment: 'Great variety of styles and the prices are really competitive. Love the beauty section too — my wife is now a regular DRIPZO customer!',
  },
  {
    id: 4, name: 'Ananya Singh', location: 'Pune',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', rating: 5,
    comment: 'The joggers and t-shirts are super comfortable. I basically live in DRIPZO clothes now. Their return policy is also very smooth and hassle-free.',
  },
  {
    id: 5, name: 'Vikram Reddy', location: 'Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop', rating: 5,
    comment: 'I ordered a luxury leather jacket and was blown away by the packaging and quality. Feels like a ₹15,000 product but I paid much less. Highly recommend!',
  },
  {
    id: 6, name: 'Sneha Iyer', location: 'Chennai',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop', rating: 4,
    comment: 'The cosmetics collection is surprisingly good! The lipstick and face serum are now my daily essentials. Fast delivery to Chennai too.',
  },
];

// ═══════════════════════ FAQ DATA ═══════════════════════
export const faqData = [
  {
    question: 'How does fast delivery work?',
    answer: 'We partner with local boutiques and warehouses near you. Once you place an order, the nearest store picks, packs, and dispatches your items via our express delivery network. Currently available in major metros.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer hassle-free 30-day returns and exchanges on all products. Items must be unused with original tags. Luxury items have a 15-day return window. Refunds are processed within 5-7 business days.',
  },
  {
    question: 'Are all products authentic?',
    answer: 'Yes, 100%. Every product on DRIPZO is sourced directly from brands and authorized retailers. We guarantee authenticity with every purchase.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is dispatched, you\'ll receive a tracking link via SMS and email. You can also track your order in real-time from your DRIPZO dashboard under "My Orders".',
  },
  {
    question: 'Do you offer Cash on Delivery?',
    answer: 'Yes! We accept COD on orders up to ₹10,000. We also support UPI, credit/debit cards, net banking, and popular wallets like Paytm and PhonePe.',
  },
  {
    question: 'Can I cancel my order?',
    answer: 'Orders can be cancelled before dispatch. For express delivery orders, cancellation must be done within 5 minutes of placing the order. Go to Dashboard → My Orders → Cancel.',
  },
];

export const setDynamicProducts = (newProducts) => {
  if (!Array.isArray(newProducts)) return;
  
  // Clear the existing static products safely
  products.splice(0, products.length);
  
  // Map and push the new backend products
  newProducts.forEach(p => {
    // Determine the colors and brand from tags
    const subcategory = p.tags?.[0] || p.category || 'Casual';
    const brand = p.tags?.[1] || 'DRIPZO SIGNATURE';
    const colors = p.tags?.slice(2) || ['#ffffff'];

    products.push({
      id: p.id,
      name: p.title,
      brand: brand,
      price: Number(p.price),
      category: p.category,
      gender: p.gender === 'men' ? 'Men' : p.gender === 'women' ? 'Women' : p.gender === 'unisex' ? 'Unisex' : 'Kids',
      subcategory: subcategory,
      description: p.description,
      image: p.images?.[0] || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      colors: colors,
      isLuxury: p.category === 'Luxury',
      stock: p.stock !== undefined ? Number(p.stock) : 10,
    });
  });
};

export default products;
