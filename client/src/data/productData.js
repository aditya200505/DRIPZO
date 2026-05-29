// Centralized product data for DRIPZO — Brand New Premium Portfolio (INR Pricing)
const products = [
  {
    "id": 1,
    "name": "Seoul Oversized Linen Shirt",
    "brand": "K-STYLE TOKYO",
    "price": 1899,
    "category": "Shirts",
    "gender": "Men",
    "subcategory": "Oversized shirts",
    "description": "Ultra-lightweight premium linen overshirt with drop shoulders and a relaxed drape. Crafted for summer comfort.",
    "image": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    "colors": [
      "#faf0e6",
      "#87ceeb",
      "#2f4f4f"
    ]
  },
  {
    "id": 2,
    "name": "Minimal Mandarin Collar Linen",
    "brand": "LINEN CO.",
    "price": 1699,
    "category": "Shirts",
    "gender": "Men",
    "subcategory": "Linen shirts",
    "description": "Clean-cut linen shirt featuring an elegant band collar and tailored cuffs. Delivers a relaxed yet refined look.",
    "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    "colors": [
      "#ffffff",
      "#f5f5dc",
      "#708090"
    ]
  },
  {
    "id": 3,
    "name": "Y2K Cyberpunk Zip Shirt",
    "brand": "STREET CORE",
    "price": 2299,
    "category": "Shirts",
    "gender": "Unisex",
    "subcategory": "Y2K shirts",
    "description": "Avant-garde streetwear shirt with full-zip front closure, custom metal hardware, and dual asymmetric zip pockets.",
    "image": "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80",
    "colors": [
      "#000000",
      "#696969"
    ]
  },
  {
    "id": 4,
    "name": "Fuji Cherry Blossom Print",
    "brand": "K-STYLE TOKYO",
    "price": 1999,
    "category": "Shirts",
    "gender": "Men",
    "subcategory": "Printed shirts",
    "description": "Stunning premium printed shirt with watercolor sakura flower prints on luxury breathable rayon base fabric.",
    "image": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80",
    "colors": [
      "#ffc0cb",
      "#ffffff",
      "#0a0a0a"
    ]
  },
  {
    "id": 5,
    "name": "Milano Silk Dress Shirt",
    "brand": "MODA LUXE",
    "price": 3499,
    "category": "Shirts",
    "gender": "Men",
    "subcategory": "Formal luxury shirts",
    "description": "Exquisite silk-blend formal shirt featuring a subtle satin sheen, mother-of-pearl buttons, and structured spread collar.",
    "image": "/silk_dress_shirt.png",
    "colors": [
      "#1a1a2e",
      "#ffffff",
      "#800020"
    ]
  },
  {
    "id": 6,
    "name": "Stealth Tech utility Shirt",
    "brand": "STEALTH PRO",
    "price": 2499,
    "category": "Shirts",
    "gender": "Men",
    "subcategory": "Streetwear shirts",
    "description": "Water-resistant nylon-blend tactical shirt with hidden magnetic flap pockets and back ventilated mesh paneling.",
    "image": "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#2f4f4f"
    ]
  },
  {
    "id": 7,
    "name": "Kyoto Minimalist Drop Shirt",
    "brand": "K-STYLE TOKYO",
    "price": 1799,
    "category": "Shirts",
    "gender": "Women",
    "subcategory": "Minimal shirts",
    "description": "Clean-front boxy linen blouse with dolman sleeves and dynamic raw edge hems. Minimalist luxury fashion.",
    "image": "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80",
    "colors": [
      "#ffffff",
      "#d2b48c",
      "#808080"
    ]
  },
  {
    "id": 8,
    "name": "Asymmetric Drape Chambray",
    "brand": "K-STYLE TOKYO",
    "price": 1899,
    "category": "Shirts",
    "gender": "Unisex",
    "subcategory": "Korean fashion shirts",
    "description": "Japanese washed-cotton indigo chambray shirt featuring an off-center closure and fluid curved front panels.",
    "image": "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80",
    "colors": [
      "#6495ed",
      "#4682b4"
    ]
  },
  {
    "id": 9,
    "name": "Vintage Acid Plaid Overshirt",
    "brand": "STREET CORE",
    "price": 2199,
    "category": "Shirts",
    "gender": "Men",
    "subcategory": "Y2K shirts",
    "description": "Heavily acid-washed plaid overshirt featuring frayed cuffs and custom metal safety pin accents. Retro grunge staple.",
    "image": "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80",
    "colors": [
      "#8b0000",
      "#0a0a0a"
    ]
  },
  {
    "id": 10,
    "name": "Pacific Linen resort Shirt",
    "brand": "LINEN CO.",
    "price": 1599,
    "category": "Shirts",
    "gender": "Men",
    "subcategory": "Linen shirts",
    "description": "Classic open resort collar shirt in washed organic linen. Designed for warm coastal escapes.",
    "image": "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80",
    "colors": [
      "#faf0e6",
      "#afeeee",
      "#556b2f"
    ]
  },
  {
    "id": 11,
    "name": "Sovereign Silk Satin Shirt",
    "brand": "MODA LUXE",
    "price": 3299,
    "category": "Shirts",
    "gender": "Women",
    "subcategory": "Formal luxury shirts",
    "description": "Satin-finish pure silk dress shirt with a relaxed tailored silhouette and premium French cuffs.",
    "image": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    "colors": [
      "#c9b1ff",
      "#0a0a0a",
      "#ffffff"
    ]
  },
  {
    "id": 12,
    "name": "Cyberpunk Utility Harness Shirt",
    "brand": "STEALTH PRO",
    "price": 2599,
    "category": "Shirts",
    "gender": "Men",
    "subcategory": "Streetwear shirts",
    "description": "Technical techwear shirt featuring integrated criss-cross tactical straps and matte D-ring attachments.",
    "image": "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#4a4a4a"
    ]
  },
  {
    "id": 13,
    "name": "Osaka Boxy Band-Collar",
    "brand": "K-STYLE TOKYO",
    "price": 1799,
    "category": "Shirts",
    "gender": "Men",
    "subcategory": "Korean fashion shirts",
    "description": "Boxy-cut short sleeve band collar shirt in a rich textured cotton gauze. Refined minimalist luxury.",
    "image": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    "colors": [
      "#ffffff",
      "#f5f5dc",
      "#000080"
    ]
  },
  {
    "id": 14,
    "name": "Abstract Geometrix Printed",
    "brand": "MODA LUXE",
    "price": 1999,
    "category": "Shirts",
    "gender": "Men",
    "subcategory": "Printed shirts",
    "description": "Stunning geometric abstract printed shirt on clean premium viscose. Flows beautifully and keeps you cool.",
    "image": "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
    "colors": [
      "#282c3f",
      "#ff3f6c",
      "#ffffff"
    ]
  },
  {
    "id": 15,
    "name": "Zen Minimalist Linen Tunic",
    "brand": "LINEN CO.",
    "price": 1899,
    "category": "Shirts",
    "gender": "Women",
    "subcategory": "Minimal shirts",
    "description": "Elongated clean linen tunic with deep side slit details. Blends eastern minimal draping with Western style.",
    "image": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    "colors": [
      "#faf0e6",
      "#2f4f4f"
    ]
  },
  {
    "id": 16,
    "name": "Quantum Baggy Jeans",
    "brand": "DENIM X",
    "price": 2999,
    "category": "Pants",
    "gender": "Men",
    "subcategory": "Baggy jeans",
    "description": "Washed wide-leg baggy skater denim featuring artful pocket detailing and custom silver rivet buttons.",
    "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    "colors": [
      "#4682b4",
      "#191970",
      "#808080"
    ]
  },
  {
    "id": 17,
    "name": "Apex Stealth Cargo Pants",
    "brand": "STEALTH PRO",
    "price": 3299,
    "category": "Pants",
    "gender": "Men",
    "subcategory": "Cargo pants",
    "description": "Premium technical cargos built with 4-way stretch fabrics, dual side utility pockets, and adjustable cuff tabs.",
    "image": "/pants_cargo_khaki_1778658215355.png",
    "colors": [
      "#0a0a0a",
      "#556b2f",
      "#708090"
    ]
  },
  {
    "id": 18,
    "name": "Seoul Pleated Drape Trousers",
    "brand": "K-STYLE TOKYO",
    "price": 2799,
    "category": "Pants",
    "gender": "Men",
    "subcategory": "Korean trousers",
    "description": "High-waisted elegant pleated trousers with an effortless relaxed drape, perfect for modern smart-casual styling.",
    "image": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    "colors": [
      "#faf0e6",
      "#0a0a0a",
      "#808080"
    ]
  },
  {
    "id": 19,
    "name": "Infinite Wide-Leg Denim",
    "brand": "DENIM X",
    "price": 3499,
    "category": "Pants",
    "gender": "Women",
    "subcategory": "Denim collections",
    "description": "Extra-long wide-leg jeans in a rigid raw selvedge denim. Beautiful pinstitch folds.",
    "image": "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80",
    "colors": [
      "#191970",
      "#c0c0c0"
    ]
  },
  {
    "id": 20,
    "name": "Osaka Modular Streetwear Cargos",
    "brand": "STREET CORE",
    "price": 2999,
    "category": "Pants",
    "gender": "Unisex",
    "subcategory": "Streetwear cargos",
    "description": "Heavy cotton drop-crotch cargo pants with strap buckles and multi-tiered utility compartments.",
    "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#2f4f4f"
    ]
  },
  {
    "id": 21,
    "name": "Vanguard Slim Stretch Chino",
    "brand": "BASIC ELITE",
    "price": 1999,
    "category": "Pants",
    "gender": "Men",
    "subcategory": "Slim fit pants",
    "description": "Tailored slim chinos made from organic cotton with a hint of performance elastane for seamless mobility.",
    "image": "/slim_chino_elite_1778656617767.png",
    "colors": [
      "#d2b48c",
      "#000080",
      "#0a0a0a"
    ]
  },
  {
    "id": 22,
    "name": "Zen Knit Lounge Joggers",
    "brand": "BASIC ELITE",
    "price": 1799,
    "category": "Pants",
    "gender": "Men",
    "subcategory": "Joggers",
    "description": "Waffle-knit heavy cotton loungewear joggers featuring a supportive elastic drawcord waist and zip pockets.",
    "image": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    "colors": [
      "#696969",
      "#0a0a0a",
      "#f5f5f6"
    ]
  },
  {
    "id": 23,
    "name": "Vintage Carpenter Baggy Jeans",
    "brand": "DENIM X",
    "price": 3299,
    "category": "Pants",
    "gender": "Men",
    "subcategory": "Baggy jeans",
    "description": "Heavyweight stonewashed denim carpenter jeans with authentic utility side loops and triple-needle flatlock seams.",
    "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
    "colors": [
      "#4682b4",
      "#708090"
    ]
  },
  {
    "id": 24,
    "name": "Kyoto Pleated Wide-Leg",
    "brand": "K-STYLE TOKYO",
    "price": 2899,
    "category": "Pants",
    "gender": "Women",
    "subcategory": "Wide leg pants",
    "description": "Fluid, flowing wide-leg trousers featuring front structural pleats and hidden vertical side pockets.",
    "image": "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80",
    "colors": [
      "#ffffff",
      "#ffc0cb",
      "#0a0a0a"
    ]
  },
  {
    "id": 25,
    "name": "Cyberpunk Buckle Cargo Pants",
    "brand": "STEALTH PRO",
    "price": 3499,
    "category": "Pants",
    "gender": "Men",
    "subcategory": "Streetwear cargos",
    "description": "Techwear cargo trousers with heavy straps, adjustable ankle cuffs, and matte black steel release buckles.",
    "image": "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#ff3f6c"
    ]
  },
  {
    "id": 26,
    "name": "Minimalist Drape Trousers",
    "brand": "K-STYLE TOKYO",
    "price": 2699,
    "category": "Pants",
    "gender": "Women",
    "subcategory": "Korean trousers",
    "description": "Clean flat-front trousers with double back welt pockets and an ultra-modern straight leg silhouette.",
    "image": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
    "colors": [
      "#faf0e6",
      "#808080"
    ]
  },
  {
    "id": 27,
    "name": "Fleece Tech-Joggers Pro",
    "brand": "STEALTH PRO",
    "price": 2199,
    "category": "Pants",
    "gender": "Men",
    "subcategory": "Joggers",
    "description": "Polartec fleece joggers with reinforced ripstop nylon knee panels and taped waterproof zippers.",
    "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#2f4f4f"
    ]
  },
  {
    "id": 28,
    "name": "Sovereign Raw Selvedge Slim",
    "brand": "DENIM X",
    "price": 4299,
    "category": "Pants",
    "gender": "Men",
    "subcategory": "Slim fit pants",
    "description": "Japanese raw denim jeans in a tailored slim-fit cut. Delivers beautiful individual fading over time.",
    "image": "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80",
    "colors": [
      "#191970"
    ]
  },
  {
    "id": 29,
    "name": "Osaka Linen Wide Trousers",
    "brand": "K-STYLE TOKYO",
    "price": 2499,
    "category": "Pants",
    "gender": "Women",
    "subcategory": "Wide leg pants",
    "description": "High-waisted wide trousers in heavy washed organic linen. Blends minimal comfort with sharp structure.",
    "image": "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=800&q=80",
    "colors": [
      "#ffffff",
      "#d2b48c",
      "#556b2f"
    ]
  },
  {
    "id": 30,
    "name": "Stealth Tapered Tech Joggers",
    "brand": "STEALTH PRO",
    "price": 2499,
    "category": "Pants",
    "gender": "Men",
    "subcategory": "Joggers",
    "description": "Ultra-lightweight nylon shell utility pants with highly tapered ankle elastic. Designed for urban agility.",
    "image": "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#696969"
    ]
  },
  {
    "id": 31,
    "name": "Aero Drift running Sneakers",
    "brand": "PULSE ATHLETICS",
    "price": 4599,
    "category": "Shoes",
    "gender": "Unisex",
    "subcategory": "Running shoes",
    "description": "Dynamic knit mesh running sneakers featuring shock-absorbing sole tech and high-contrast color lines.",
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    "colors": [
      "#ff4500",
      "#0a0a0a",
      "#ffffff"
    ]
  },
  {
    "id": 32,
    "name": "Monolith Chunky Trainers",
    "brand": "VOID FOOTWEAR",
    "price": 5499,
    "category": "Shoes",
    "gender": "Unisex",
    "subcategory": "Chunky shoes",
    "description": "Extreme platform retro trainers in premium white leather with high-traction thick rubber outsoles.",
    "image": "/chunky_sneakers.png",
    "colors": [
      "#ffffff",
      "#ff3f6c",
      "#c0c0c0"
    ]
  },
  {
    "id": 33,
    "name": "Heritage Leather High-Tops",
    "brand": "VOID FOOTWEAR",
    "price": 6299,
    "category": "Shoes",
    "gender": "Men",
    "subcategory": "High-top shoes",
    "description": "Sleek premium leather high-top sneakers with retro panel stitching and padded ankle support collars.",
    "image": "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#ffffff",
      "#ff3f6c"
    ]
  },
  {
    "id": 34,
    "name": "Vanguard Tech Sneakers",
    "brand": "PULSE ATHLETICS",
    "price": 4999,
    "category": "Shoes",
    "gender": "Men",
    "subcategory": "Sneakers",
    "description": "Sleek slip-on mesh trainers with structured geometric support bands and high-rebound responsive foam midsoles.",
    "image": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#ffd700"
    ]
  },
  {
    "id": 35,
    "name": "Zen Minimalist Casual Shoes",
    "brand": "BASIC ELITE",
    "price": 2499,
    "category": "Shoes",
    "gender": "Men",
    "subcategory": "Casual shoes",
    "description": "Clean-front cupsole sneakers in soft matte microfiber. Deliver a timeless smart casual presence.",
    "image": "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80",
    "colors": [
      "#ffffff",
      "#0a0a0a"
    ]
  },
  {
    "id": 36,
    "name": "Tokyo Streetwear High-Tops",
    "brand": "VOID FOOTWEAR",
    "price": 5999,
    "category": "Shoes",
    "gender": "Unisex",
    "subcategory": "Streetwear shoes",
    "description": "Distressed canvas high-top shoes featuring steel zip accents, raw edge seams, and a vulcanized shell sole.",
    "image": "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
    "colors": [
      "#696969",
      "#0a0a0a"
    ]
  },
  {
    "id": 37,
    "name": "Sovereign Leather Sneakers",
    "brand": "MODA LUXE",
    "price": 6999,
    "category": "Shoes",
    "gender": "Men",
    "subcategory": "Luxury sneakers",
    "description": "Handcrafted premium leather sneakers sourced from Italian hides. Low-profile minimal luxury aesthetic.",
    "image": "https://images.unsplash.com/photo-1605733513597-a8f8d410fe3c?w=800&q=80",
    "colors": [
      "#ffffff",
      "#8b4513",
      "#0a0a0a"
    ]
  },
  {
    "id": 38,
    "name": "Kinetic Performance Runners",
    "brand": "PULSE ATHLETICS",
    "price": 3999,
    "category": "Shoes",
    "gender": "Women",
    "subcategory": "Running shoes",
    "description": "Ultra-lightweight mesh shoes with carbon-fiber speed plates and dynamic traction tread outsoles.",
    "image": "/womens_running_sneakers_1778657335616.png",
    "colors": [
      "#ff69b4",
      "#ffffff"
    ]
  },
  {
    "id": 39,
    "name": "Void Combat Chunky Boots",
    "brand": "VOID FOOTWEAR",
    "price": 7499,
    "category": "Shoes",
    "gender": "Men",
    "subcategory": "Chunky shoes",
    "description": "Military-grade combat boots loaded with oversized lugged rubber platforms and water-resistant leather.",
    "image": "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
    "colors": [
      "#0a0a0a"
    ]
  },
  {
    "id": 40,
    "name": "Hype Cushion Street Sneakers",
    "brand": "STREET CORE",
    "price": 4799,
    "category": "Shoes",
    "gender": "Unisex",
    "subcategory": "Streetwear shoes",
    "description": "Thick-sole futuristic shoes with neon strap locks and semi-translucent air chambers.",
    "image": "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
    "colors": [
      "#ff4500",
      "#00ff00",
      "#0a0a0a"
    ]
  },
  {
    "id": 41,
    "name": "Osaka Minimalist Loafers",
    "brand": "K-STYLE TOKYO",
    "price": 5299,
    "category": "Shoes",
    "gender": "Men",
    "subcategory": "Casual shoes",
    "description": "Fine split-suede step-down loafers with rubber insert soles. Beautifully simple, luxurious finish.",
    "image": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80",
    "colors": [
      "#d2b48c",
      "#8b4513"
    ]
  },
  {
    "id": 42,
    "name": "Satin Ribbon Platform Trainers",
    "brand": "VOID FOOTWEAR",
    "price": 5499,
    "category": "Shoes",
    "gender": "Women",
    "subcategory": "Chunky shoes",
    "description": "High-gloss white trainers featuring elegant oversized satin lace ties and soft orthopedic footbeds.",
    "image": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    "colors": [
      "#ffffff",
      "#ffc0cb"
    ]
  },
  {
    "id": 43,
    "name": "Cyberpunk Neoprene Runners",
    "brand": "PULSE ATHLETICS",
    "price": 5299,
    "category": "Shoes",
    "gender": "Men",
    "subcategory": "Sneakers",
    "description": "Sock-like neoprene running sneakers with integrated compression molds and structural strap frames.",
    "image": "/cyberpunk_sneakers_new.png",
    "colors": [
      "#0a0a0a",
      "#8a2be2"
    ]
  },
  {
    "id": 44,
    "name": "Retro High-Top Basketball",
    "brand": "VOID FOOTWEAR",
    "price": 6499,
    "category": "Shoes",
    "gender": "Men",
    "subcategory": "High-top shoes",
    "description": "Heritage premium basketball shoes in full-grain color block panels. Classic court presence.",
    "image": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80",
    "colors": [
      "#ffffff",
      "#000080",
      "#ff3f6c"
    ]
  },
  {
    "id": 45,
    "name": "Prestige Italian Derby Shoes",
    "brand": "MODA LUXE",
    "price": 8999,
    "category": "Shoes",
    "gender": "Men",
    "subcategory": "Luxury sneakers",
    "description": "Hand-burnished Italian calfskin leather Derby shoes with custom blake-stitched leather outsoles.",
    "image": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#8b4513"
    ]
  },
  {
    "id": 46,
    "name": "Varsity Wool Letterman Jacket",
    "brand": "STREET CORE",
    "price": 4599,
    "category": "Jackets",
    "gender": "Men",
    "subcategory": "Varsity jackets",
    "description": "Premium heavyweight wool body varsity jacket featuring custom vegan leather sleeves and Chenille embroidery.",
    "image": "/retro_varsity_jacket.png",
    "colors": [
      "#000080",
      "#ffffff",
      "#8b0000"
    ]
  },
  {
    "id": 47,
    "name": "Midnight Bomber Flux",
    "brand": "STEALTH PRO",
    "price": 4799,
    "category": "Jackets",
    "gender": "Men",
    "subcategory": "Bomber jackets",
    "description": "Heavy flight-nylon bomber jacket featuring quilted insulation, utility arm pocket, and custom storm flaps.",
    "image": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#556b2f"
    ]
  },
  {
    "id": 48,
    "name": "Zen Oversized Sherpa Coat",
    "brand": "K-STYLE TOKYO",
    "price": 5499,
    "category": "Jackets",
    "gender": "Women",
    "subcategory": "Oversized jackets",
    "description": "Double-breasted oversized coat in plush, dense textured sherpa. Combines soft luxury with cozy volume.",
    "image": "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
    "colors": [
      "#faf0e6",
      "#d2b48c"
    ]
  },
  {
    "id": 49,
    "name": "Quantum Stealth Windbreaker",
    "brand": "STEALTH PRO",
    "price": 3499,
    "category": "Jackets",
    "gender": "Men",
    "subcategory": "Streetwear jackets",
    "description": "Matte technical windbreaker with highly breathable side ventilation panels and internal harness carry systems.",
    "image": "/streetwear_hoodie.png",
    "colors": [
      "#0a0a0a",
      "#708090"
    ]
  },
  {
    "id": 50,
    "name": "Vintage Denim Sherpa Trucker",
    "brand": "DENIM X",
    "price": 3899,
    "category": "Jackets",
    "gender": "Men",
    "subcategory": "Denim jackets",
    "description": "Rigid washed-indigo denim trucker jacket lined with thick high-insulation sherpa lining. Clean vintage look.",
    "image": "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80",
    "colors": [
      "#4682b4",
      "#ffffff"
    ]
  },
  {
    "id": 51,
    "name": "Seoul Asymmetric Trench Coat",
    "brand": "K-STYLE TOKYO",
    "price": 6999,
    "category": "Jackets",
    "gender": "Unisex",
    "subcategory": "Korean fashion jackets",
    "description": "Elegant loose-drape Korean gabardine trench coat featuring off-center buttons and an adjustable waist belt.",
    "image": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80",
    "colors": [
      "#808080",
      "#0a0a0a",
      "#d2b48c"
    ]
  },
  {
    "id": 52,
    "name": "Alpine Quilted Puffer Jacket",
    "brand": "STEALTH PRO",
    "price": 5999,
    "category": "Jackets",
    "gender": "Men",
    "subcategory": "Winter jackets",
    "description": "Insulated puffer jacket packed with 800-fill organic down. Water-repellent matte nylon shell.",
    "image": "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#1e3f20",
      "#ffffff"
    ]
  },
  {
    "id": 53,
    "name": "Cyberpunk Neo-Biker Leather",
    "brand": "STREET CORE",
    "price": 9999,
    "category": "Jackets",
    "gender": "Men",
    "subcategory": "Streetwear jackets",
    "description": "Heavy full-grain cowhide leather jacket with dynamic structural paneling and premium asymmetric chrome zippers.",
    "image": "/leather_biker_jacket_1778656638643.png",
    "colors": [
      "#0a0a0a",
      "#8b0000"
    ]
  },
  {
    "id": 54,
    "name": "Retro Grid Fleece Pullover",
    "brand": "BASIC ELITE",
    "price": 2799,
    "category": "Jackets",
    "gender": "Men",
    "subcategory": "Winter jackets",
    "description": "Thick thermal grid-pattern fleece pullover with quick-snap buttons and retro color-blocked trim.",
    "image": "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=800&q=80",
    "colors": [
      "#000080",
      "#228b22",
      "#ffffff"
    ]
  },
  {
    "id": 55,
    "name": "Osaka Draped Kimono Cardigan",
    "brand": "K-STYLE TOKYO",
    "price": 3299,
    "category": "Jackets",
    "gender": "Unisex",
    "subcategory": "Korean fashion jackets",
    "description": "Heavyweight organic cotton drape knit kimono jacket with front open styling. Clean, comfortable elegance.",
    "image": "https://images.unsplash.com/photo-1604649155650-f80e94628f2e?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#faf0e6"
    ]
  },
  {
    "id": 56,
    "name": "Monolith Crop Denim Jacket",
    "brand": "DENIM X",
    "price": 3499,
    "category": "Jackets",
    "gender": "Women",
    "subcategory": "Denim jackets",
    "description": "Cropped rigid denim jacket with heavily distressed edges and premium oversized silver hardware buttons.",
    "image": "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80",
    "colors": [
      "#87ceeb",
      "#ffffff"
    ]
  },
  {
    "id": 57,
    "name": "Stealth Hooded Shell Jacket",
    "brand": "STEALTH PRO",
    "price": 4999,
    "category": "Jackets",
    "gender": "Men",
    "subcategory": "Streetwear jackets",
    "description": "Waterproof 3-layer laminated shell jacket with custom laser-cut ventilation holes and dry-zip pockets.",
    "image": "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#4b5320"
    ]
  },
  {
    "id": 58,
    "name": "Urban Flight Coach Jacket",
    "brand": "STREET CORE",
    "price": 2999,
    "category": "Jackets",
    "gender": "Men",
    "subcategory": "Varsity jackets",
    "description": "Lightweight nylon shell coach jacket with clean matte snap-front closure and DRIPZO athletic graphic prints.",
    "image": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#8b0000",
      "#ffffff"
    ]
  },
  {
    "id": 59,
    "name": "Tokyo Neon Bomber Flux",
    "brand": "STREET CORE",
    "price": 4999,
    "category": "Jackets",
    "gender": "Unisex",
    "subcategory": "Bomber jackets",
    "description": "Insulated satin-finish bomber featuring high-density glowing neon graphic print detailing across the back.",
    "image": "https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#8a2be2"
    ]
  },
  {
    "id": 60,
    "name": "Prestige Double Coat",
    "brand": "MODA LUXE",
    "price": 7999,
    "category": "Jackets",
    "gender": "Men",
    "subcategory": "Oversized jackets",
    "description": "Double-breasted overcoat tailored from premium heavyweight wool-blend fabrics. Unstructured shoulders.",
    "image": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
    "colors": [
      "#2f2f2f",
      "#d2b48c"
    ]
  },
  {
    "id": 61,
    "name": "Hype Cushion Street Slides",
    "brand": "STREET CORE",
    "price": 1599,
    "category": "Flip Flops",
    "gender": "Unisex",
    "subcategory": "Streetwear slides",
    "description": "Ergonomic EVA slides featuring a double-density platform and custom ribbed high-traction outsoles.",
    "image": "/beach_wave_slides.png",
    "colors": [
      "#0a0a0a",
      "#ffffff",
      "#ff3f6c"
    ]
  },
  {
    "id": 62,
    "name": "Osaka Cork Strap Sandals",
    "brand": "K-STYLE TOKYO",
    "price": 1899,
    "category": "Flip Flops",
    "gender": "Unisex",
    "subcategory": "Luxury sandals",
    "description": "Artisanal minimal sandals built with real contoured cork footbeds and premium washed suede buckles.",
    "image": "/eco_cork_sandals.png",
    "colors": [
      "#8b4513",
      "#faf0e6",
      "#d2b48c"
    ]
  },
  {
    "id": 63,
    "name": "Zen Wave Minimal Slides",
    "brand": "BASIC ELITE",
    "price": 1199,
    "category": "Flip Flops",
    "gender": "Unisex",
    "subcategory": "Minimal flipflops",
    "description": "Monolithic soft-foam flip flops with a clean minimalist wave pattern across the supportive footbed.",
    "image": "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
    "colors": [
      "#ffffff",
      "#0a0a0a",
      "#afeeee"
    ]
  },
  {
    "id": 64,
    "name": "Pacific Beach Flip Flops",
    "brand": "BASIC ELITE",
    "price": 899,
    "category": "Flip Flops",
    "gender": "Men",
    "subcategory": "Beach flipflops",
    "description": "Flexible natural rubber flip flops featuring water-channeling grooves and highly comfortable woven straps.",
    "image": "/reef_comfort_flip_flops.png",
    "colors": [
      "#2f4f4f",
      "#0a0a0a",
      "#ffd700"
    ]
  },
  {
    "id": 65,
    "name": "Velvet Lounge Memory Slides",
    "brand": "MODA LUXE",
    "price": 1499,
    "category": "Flip Flops",
    "gender": "Women",
    "subcategory": "Streetwear slides",
    "description": "Plush velvet slide sandals containing orthopedic memory-foam cushioning for absolute relaxation.",
    "image": "/velvet_lounge_slides.png",
    "colors": [
      "#800020",
      "#c9b1ff",
      "#0a0a0a"
    ]
  },
  {
    "id": 66,
    "name": "Kyoto Rope Thong Sandals",
    "brand": "K-STYLE TOKYO",
    "price": 1399,
    "category": "Flip Flops",
    "gender": "Women",
    "subcategory": "Luxury sandals",
    "description": "Intricately hand-woven rope sandals supported by a flexible jute-lined base. Modern vacation style.",
    "image": "/rope_thong_sandals.png",
    "colors": [
      "#d2b48c",
      "#faf0e6"
    ]
  },
  {
    "id": 67,
    "name": "Prestige Leather Pool Slides",
    "brand": "MODA LUXE",
    "price": 2499,
    "category": "Flip Flops",
    "gender": "Men",
    "subcategory": "Luxury sandals",
    "description": "Sleek slides handcrafted with full-grain Italian leather bands and highly supportive molded rubber bases.",
    "image": "/leather_pool_slides.png",
    "colors": [
      "#0a0a0a",
      "#8b4513"
    ]
  },
  {
    "id": 68,
    "name": "Kinetic Tech Strap Sandals",
    "brand": "PULSE ATHLETICS",
    "price": 1999,
    "category": "Flip Flops",
    "gender": "Unisex",
    "subcategory": "Luxury sandals",
    "description": "Athletic sandals with three adjustable web straps, cushioned neoprene linings, and high-impact heel bubbles.",
    "image": "https://images.unsplash.com/photo-1613531415865-8b3515b1e7b6?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#ff4500"
    ]
  },
  {
    "id": 69,
    "name": "Cloud Platform Slides",
    "brand": "VOID FOOTWEAR",
    "price": 1499,
    "category": "Flip Flops",
    "gender": "Women",
    "subcategory": "Streetwear slides",
    "description": "Chunky platform slides utilizing ultra-soft responsive cushioning. Delivers a walking-on-clouds step.",
    "image": "/platform_cloud_slides.png",
    "colors": [
      "#ffffff",
      "#ffc0cb",
      "#0a0a0a"
    ]
  },
  {
    "id": 70,
    "name": "Eco Cork Dual Strap",
    "brand": "LINEN CO.",
    "price": 1699,
    "category": "Flip Flops",
    "gender": "Women",
    "subcategory": "Luxury sandals",
    "description": "Eco-conscious dual strap sandals made with recycled micro-buckles and breathable natural cork.",
    "image": "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&q=80",
    "colors": [
      "#556b2f",
      "#faf0e6"
    ]
  },
  {
    "id": 71,
    "name": "Hype Wave Graphic Slides",
    "brand": "STREET CORE",
    "price": 1699,
    "category": "Flip Flops",
    "gender": "Men",
    "subcategory": "Streetwear slides",
    "description": "Limited edition streetwear slides printed with bold fluid wave designs across the top bridge straps.",
    "image": "https://images.unsplash.com/photo-1505232458627-5ec9c7db681a?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#ffffff"
    ]
  },
  {
    "id": 72,
    "name": "Osaka Minimal Thong sandal",
    "brand": "K-STYLE TOKYO",
    "price": 1599,
    "category": "Flip Flops",
    "gender": "Women",
    "subcategory": "Minimal flipflops",
    "description": "Clean minimalist slide thong sandals featuring slim micro-straps and structured square-toe footbeds.",
    "image": "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#ffffff"
    ]
  },
  {
    "id": 73,
    "name": "Floral Cushioned Slides",
    "brand": "BASIC ELITE",
    "price": 999,
    "category": "Flip Flops",
    "gender": "Women",
    "subcategory": "Beach flipflops",
    "description": "Feminine poolside slides decorated with molded pink floral arrangements. Highly resilient waterproof design.",
    "image": "/womens_floral_flip_flops.png",
    "colors": [
      "#ffb6c1",
      "#ffffff"
    ]
  },
  {
    "id": 74,
    "name": "Vanguard Sport Slide Pro",
    "brand": "PULSE ATHLETICS",
    "price": 1499,
    "category": "Flip Flops",
    "gender": "Men",
    "subcategory": "Streetwear slides",
    "description": "Performance-minded recovery slides with customized arch contours and muscle-massaging textured footbeds.",
    "image": "/sport_slide_pro.png",
    "colors": [
      "#0a0a0a",
      "#ff4500"
    ]
  },
  {
    "id": 75,
    "name": "Swiss Leather Lounge Slides",
    "brand": "MODA LUXE",
    "price": 2999,
    "category": "Flip Flops",
    "gender": "Men",
    "subcategory": "Luxury sandals",
    "description": "Ultra-premium cross-strap slides tailored in supple calfskin leather with dynamic stitch details.",
    "image": "/leather_strap_flip_flops.png",
    "colors": [
      "#0a0a0a",
      "#2f4f4f"
    ]
  },
  {
    "id": 76,
    "name": "Tokyo Neon Cyberpunk Tee",
    "brand": "STREET CORE",
    "price": 1499,
    "category": "T-Shirts",
    "gender": "Unisex",
    "subcategory": "Streetwear tshirts",
    "description": "Heavyweight organic cotton tee printed with dynamic, high-density glowing neon cyber Tokyo designs.",
    "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#ffffff",
      "#8a2be2"
    ]
  },
  {
    "id": 77,
    "name": "Sovereign Heavyweight Plain",
    "brand": "DRIPZO SIGNATURE",
    "price": 1699,
    "category": "T-Shirts",
    "gender": "Men",
    "subcategory": "Luxury plain tees",
    "description": "Luxuriously thick, pre-shrunk combed supima cotton tee. Boxy relaxed drape, perfect blank wardrobe staple.",
    "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    "colors": [
      "#ffffff",
      "#0a0a0a",
      "#ff3f6c"
    ]
  },
  {
    "id": 78,
    "name": "Minimal Waffle Henley Tee",
    "brand": "BASIC ELITE",
    "price": 1199,
    "category": "T-Shirts",
    "gender": "Men",
    "subcategory": "Minimal tees",
    "description": "Soft brushed cotton in an open waffle knit. Simple three-button placket neckline and ribbed sleeves.",
    "image": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    "colors": [
      "#2f4f4f",
      "#f5f5dc",
      "#808080"
    ]
  },
  {
    "id": 79,
    "name": "Zen Soft Crewneck Tee",
    "brand": "BASIC ELITE",
    "price": 899,
    "category": "T-Shirts",
    "gender": "Unisex",
    "subcategory": "Minimal tees",
    "description": "Supremely soft bamboo-blend crewneck tee. Highly breathable and anti-microbial nature.",
    "image": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80",
    "colors": [
      "#ffffff",
      "#0a0a0a",
      "#808080"
    ]
  },
  {
    "id": 80,
    "name": "Vintage Acid Wash Graphic",
    "brand": "STREET CORE",
    "price": 1599,
    "category": "T-Shirts",
    "gender": "Unisex",
    "subcategory": "Graphic printed tees",
    "description": "Oversized heavy drop-shoulder tee detailed with vintage acid washing and large abstract chest graphics.",
    "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
    "colors": [
      "#696969",
      "#8b0000"
    ]
  },
  {
    "id": 81,
    "name": "Anime Neo-Tokyo Print",
    "brand": "STREET CORE",
    "price": 1499,
    "category": "T-Shirts",
    "gender": "Unisex",
    "subcategory": "Anime tees",
    "description": "Original anime print oversized tee featuring detailed vaporwave manga-front artwork. Vibrant colors.",
    "image": "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#ffc0cb",
      "#ffffff"
    ]
  },
  {
    "id": 82,
    "name": "Osaka Pocket Logo Tee",
    "brand": "K-STYLE TOKYO",
    "price": 1299,
    "category": "T-Shirts",
    "gender": "Men",
    "subcategory": "Oversized tees",
    "description": "Boxy streetwear tee containing a deep drop chest pocket and clean embroidered DRIPZO monogram.",
    "image": "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80",
    "colors": [
      "#ffffff",
      "#0a0a0a",
      "#ff3f6c"
    ]
  },
  {
    "id": 83,
    "name": "Vintage Distressed Band Tee",
    "brand": "STREET CORE",
    "price": 1599,
    "category": "T-Shirts",
    "gender": "Unisex",
    "subcategory": "Graphic printed tees",
    "description": "Lived-in look vintage wash t-shirt featuring distressed necklines and washed retro concert prints.",
    "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#808080"
    ]
  },
  {
    "id": 84,
    "name": "Kyoto Mercerized Plain Tee",
    "brand": "K-STYLE TOKYO",
    "price": 1899,
    "category": "T-Shirts",
    "gender": "Men",
    "subcategory": "Luxury plain tees",
    "description": "Crafted from mercerized cotton for a luxurious silk-like drape and crisp clean collar structure.",
    "image": "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80",
    "colors": [
      "#ffffff",
      "#0a0a0a",
      "#000080"
    ]
  },
  {
    "id": 85,
    "name": "Vintage Wash Drop-shoulder",
    "brand": "BASIC ELITE",
    "price": 1299,
    "category": "T-Shirts",
    "gender": "Men",
    "subcategory": "Oversized tees",
    "description": "Garment-dyed vintage boxy tee with high-tension double-rib neck lines. Highly durable threadwork.",
    "image": "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
    "colors": [
      "#87ceeb",
      "#ffa07a",
      "#2f4f4f"
    ]
  },
  {
    "id": 86,
    "name": "Stealth Tech Mesh panel Tee",
    "brand": "STEALTH PRO",
    "price": 1999,
    "category": "T-Shirts",
    "gender": "Men",
    "subcategory": "Streetwear tshirts",
    "description": "Integrated techwear tee containing subtle side mesh breathing panels and custom flatlock seam structures.",
    "image": "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#4a4a4a"
    ]
  },
  {
    "id": 87,
    "name": "Akira Cyberpunk Graphic",
    "brand": "STREET CORE",
    "price": 1599,
    "category": "T-Shirts",
    "gender": "Unisex",
    "subcategory": "Graphic printed tees",
    "description": "Bold back-print graphic tee celebrating cybernetic retro design styles. Heavyweight 240GSM cotton.",
    "image": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#ffffff"
    ]
  },
  {
    "id": 88,
    "name": "Zen Slub Cotton pocket Tee",
    "brand": "BASIC ELITE",
    "price": 999,
    "category": "T-Shirts",
    "gender": "Men",
    "subcategory": "Minimal tees",
    "description": "Slub texture organic cotton pocket tee. Clean minimal luxury look for absolute daily comfort.",
    "image": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80",
    "colors": [
      "#2f4f4f",
      "#ffffff",
      "#ffd700"
    ]
  },
  {
    "id": 89,
    "name": "Prestige Heavy Cotton Blank",
    "brand": "MODA LUXE",
    "price": 1799,
    "category": "T-Shirts",
    "gender": "Men",
    "subcategory": "Luxury plain tees",
    "description": "Super-heavyweight combed cotton tee featuring a boxy Italian fit. Elegant minimalist look.",
    "image": "https://images.unsplash.com/photo-1503341455253-b264b28a014e?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#ffffff",
      "#d2b48c"
    ]
  },
  {
    "id": 90,
    "name": "Vanguard Striped Ringer Tee",
    "brand": "BASIC ELITE",
    "price": 1199,
    "category": "T-Shirts",
    "gender": "Women",
    "subcategory": "Minimal tees",
    "description": "Retro ringer tee with subtle horizontal stripes, ribbed sleeve hems, and premium stretch yarn.",
    "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80&stripe=true",
    "colors": [
      "#ffffff",
      "#000080",
      "#ff3f6c"
    ]
  },
  {
    "id": 91,
    "name": "Italian Cashmere Overcoat",
    "price": 18999,
    "category": "Luxury",
    "gender": "Men",
    "subcategory": "Luxury Outerwear",
    "description": "Hand-tailored in Milan from 100% pure cashmere fabric. Featuring complete premium silk inner lining.",
    "image": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&q=80",
    "colors": [
      "#2f2f2f",
      "#d2b48c"
    ],
    "isLuxury": true
  },
  {
    "id": 92,
    "name": "Swiss Chronograph Watch",
    "price": 19999,
    "category": "Luxury",
    "gender": "Men",
    "subcategory": "Luxury Watches",
    "description": "Precision Swiss mechanical movement watch with scratch-resistant sapphire crystal and titanium link strap.",
    "image": "/luxury_gold_watch_1778658154366.png",
    "colors": [
      "#c0c0c0",
      "#0a0a0a"
    ],
    "isLuxury": true
  },
  {
    "id": 93,
    "name": "Leather Florence Weekender",
    "brand": "MODA LUXE",
    "price": 12999,
    "category": "Luxury",
    "gender": "Unisex",
    "subcategory": "Luxury Bags",
    "description": "Handcrafted Florence travel duffle bag tailored from rich vegetable-tanned full-grain luxury leather.",
    "image": "/designer_weekender_bag.png",
    "colors": [
      "#8b4513",
      "#2f2f2f"
    ],
    "isLuxury": true
  },
  {
    "id": 94,
    "name": "Italian Silk Pocket Squares",
    "brand": "MODA LUXE",
    "price": 5999,
    "category": "Luxury",
    "gender": "Men",
    "subcategory": "Luxury Accessories",
    "description": "Elegant set of 4 hand-rolled pure silk pocket squares styled with complex traditional jacquard designs.",
    "image": "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=800&q=80",
    "colors": [
      "#800020",
      "#000080",
      "#006400"
    ],
    "isLuxury": true
  },
  {
    "id": 95,
    "name": "Polarized Titanium Eyewear",
    "brand": "MODA LUXE",
    "price": 9999,
    "category": "Luxury",
    "gender": "Unisex",
    "subcategory": "Luxury Eyewear",
    "description": "Featherweight Japanese titanium sunglasses featuring high-performance polarized gradient UV lenses.",
    "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#ffd700"
    ],
    "isLuxury": true
  },
  {
    "id": 96,
    "name": "Gold-Buckled Bridle Belt",
    "brand": "MODA LUXE",
    "price": 6999,
    "category": "Luxury",
    "gender": "Men",
    "subcategory": "Luxury Accessories",
    "description": "Traditional English bridle leather belt accented with an elegant hand-brushed solid brass gold buckle.",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#8b4513"
    ],
    "isLuxury": true
  },
  {
    "id": 97,
    "name": "18K Gold cufflinks",
    "brand": "MODA LUXE",
    "price": 7999,
    "category": "Luxury",
    "gender": "Men",
    "subcategory": "Luxury Accessories",
    "description": "Stunning luxury cufflinks plated in 18K gold and inset with iridescent natural mother-of-pearl shields.",
    "image": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    "colors": [
      "#ffd700",
      "#ffffff"
    ],
    "isLuxury": true
  },
  {
    "id": 98,
    "name": "Heritage Cashmere evening Scarf",
    "brand": "MODA LUXE",
    "price": 8999,
    "category": "Luxury",
    "gender": "Women",
    "subcategory": "Luxury Accessories",
    "description": "Whisper-weight Italian cashmere shawl printed in gorgeous classic plaid check styling.",
    "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    "colors": [
      "#800020",
      "#ffd700",
      "#000080"
    ],
    "isLuxury": true
  },
  {
    "id": 99,
    "name": "Prestige Leather Oxford Shoes",
    "brand": "MODA LUXE",
    "price": 14999,
    "category": "Luxury",
    "gender": "Men",
    "subcategory": "Luxury Outerwear",
    "description": "Flawlessly hand-blocked wholecut oxford shoes in thick French calf leather with beveled waist soles.",
    "image": "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80",
    "colors": [
      "#0a0a0a",
      "#8b4513"
    ],
    "isLuxury": true
  },
  {
    "id": 100,
    "name": " swiss Gold Dial Chronograph",
    "price": 24999,
    "category": "Luxury",
    "gender": "Men",
    "subcategory": "Luxury Watches",
    "description": "Precision mechanical self-winding gold watch featuring custom moonphase dials and authentic alligator strap.",
    "image": "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80",
    "colors": [
      "#ffd700",
      "#0a0a0a"
    ],
    "isLuxury": true
  },
  {
    "id": 101,
    "name": "Glossy Glass Plumping Lip Oil",
    "brand": "AURA BEAUTY",
    "price": 1299,
    "category": "Cosmetics",
    "gender": "Women",
    "subcategory": "Lip gloss",
    "description": "High-shine, non-sticky lip nourishing oil infused with active hyaluronic acid spheres and cherry fruit extracts.",
    "image": "/premium_lip_gloss.png",
    "colors": [
      "#ffc0cb",
      "#cc5533",
      "#ffffff"
    ],
    "volume": "5.5ml",
    "requirement": "Cruelty Free & Vegan"
  },
  {
    "id": 102,
    "name": "Crushed Velvet Matte Lipstick",
    "brand": "AURA BEAUTY",
    "price": 1099,
    "category": "Cosmetics",
    "gender": "Women",
    "subcategory": "Matte lipstick",
    "description": "Weightless matte lipstick featuring intense single-stroke pigments and dynamic hydrating avocado oil.",
    "image": "/matte_lipsticks.png",
    "colors": [
      "#8b0000",
      "#ff69b4",
      "#800020"
    ],
    "volume": "4.2g",
    "requirement": "12-Hour Smudge Proof"
  },
  {
    "id": 103,
    "name": "Pure Retinol Botanical Serum",
    "brand": "AURA BEAUTY",
    "price": 2199,
    "category": "Cosmetics",
    "gender": "Unisex",
    "subcategory": "Face serum",
    "description": "Advanced anti-aging evening facial serum loaded with 1.5% micro-encapsulated pure retinol and organic aloe juice.",
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    "colors": [
      "#ffd700",
      "#ffffff"
    ],
    "volume": "30ml",
    "requirement": "Dermatologist Tested"
  },
  {
    "id": 104,
    "name": "Celestial Oud Perfume Intense",
    "brand": "AURA BEAUTY",
    "price": 5999,
    "category": "Cosmetics",
    "gender": "Unisex",
    "subcategory": "Luxury perfume",
    "description": "Opulent and mysterious signature scent blending rich smoked agarwood, sweet Bulgarian rose, and spiced patchouli.",
    "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    "colors": [
      "#ffd700",
      "#0a0a0a"
    ],
    "volume": "100ml",
    "requirement": "Long-Lasting Eau De Parfum"
  },
  {
    "id": 105,
    "name": "Luminous Silk Air Foundation",
    "brand": "AURA BEAUTY",
    "price": 3299,
    "category": "Cosmetics",
    "gender": "Women",
    "subcategory": "Foundation",
    "description": "Weightless air-whipped liquid foundation offering custom buildable coverage and a gorgeous dew-lit finish.",
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    "colors": [
      "#f5e6d3",
      "#d2b48c",
      "#8b7355"
    ],
    "volume": "35ml",
    "requirement": "Hydrating All-Day Wear"
  },
  {
    "id": 106,
    "name": "Satin Finish Compact Powder",
    "brand": "AURA BEAUTY",
    "price": 1699,
    "category": "Cosmetics",
    "gender": "Women",
    "subcategory": "Compact powder",
    "description": "Ultra-fine milled translucent powder designed to instantly blur skin pores, control shine, and lock in makeup setting.",
    "image": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
    "colors": [
      "#d2b48c",
      "#ffffff"
    ],
    "volume": "12g",
    "requirement": "Paraben & Talc Free"
  },
  {
    "id": 107,
    "name": "Golden Hour Glow Skincare Kit",
    "brand": "AURA BEAUTY",
    "price": 4299,
    "category": "Cosmetics",
    "gender": "Women",
    "subcategory": "Skincare kits",
    "description": "Complete 3-step organic skincare routine: Gentle Cleanser (150ml), Glow Toner (100ml), and Water Jelly Moisturizer (50ml).",
    "image": "/cosmetics_glow_kit_1778658185320.png",
    "colors": [
      "#ffb6c1",
      "#ffffff"
    ],
    "volume": "3-Piece Set",
    "requirement": "Organic Ingredients"
  },
  {
    "id": 108,
    "name": "Red Carpet Professional Makeup Set",
    "brand": "AURA BEAUTY",
    "price": 8999,
    "category": "Cosmetics",
    "gender": "Women",
    "subcategory": "Luxury makeup sets",
    "description": "Curated box of 8 premium vanity staples, including liquid highlighter, eye contour shadow palette, intense liner, and satin lip colors.",
    "image": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80",
    "colors": [
      "#ffd700",
      "#ffc0cb",
      "#0a0a0a"
    ],
    "volume": "8-Piece Set",
    "requirement": "Luxury Professional Vanity Kit"
  },
  {
    "id": 109,
    "name": "Imperial Oud & Honey Mist",
    "brand": "AURA BEAUTY",
    "price": 4999,
    "category": "Cosmetics",
    "gender": "Unisex",
    "subcategory": "Luxury perfume",
    "description": "A lighter body perfume spray layering heavy white honey blossoms, deep oud timber extracts, and warm vanilla absolute.",
    "image": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
    "colors": [
      "#ffd700",
      "#faf0e6"
    ],
    "volume": "100ml",
    "requirement": "Moisturizing Perfume Mist"
  },
  {
    "id": 110,
    "name": "Bakuchiol Retinol-Alternative Serum",
    "brand": "AURA BEAUTY",
    "price": 2399,
    "category": "Cosmetics",
    "gender": "Unisex",
    "subcategory": "Face serum",
    "description": "Natural alternative evening serum packed with 2% pure Bakuchiol plant oils and hydrating micro-algae spheres.",
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&q=80",
    "colors": [
      "#c9b1ff",
      "#ffffff"
    ],
    "volume": "30ml",
    "requirement": "Safe For Sensitive Skin"
  },
  {
    "id": 111,
    "name": "Hyaluronic Water-Bomb Moisturizer",
    "brand": "AURA BEAUTY",
    "price": 1899,
    "category": "Cosmetics",
    "gender": "Unisex",
    "subcategory": "Skincare kits",
    "description": "Cooling blue gel moisturizer delivering deep hydration via five molecular weights of pure hyaluronic acid.",
    "image": "https://images.unsplash.com/photo-1608248597481-496100c8c836?w=800&q=80",
    "colors": [
      "#afeeee",
      "#ffffff"
    ],
    "volume": "50ml",
    "requirement": "72-Hour Continuous Lock"
  },
  {
    "id": 112,
    "name": "Pro eye Shadow Palette Trio",
    "brand": "AURA BEAUTY",
    "price": 2499,
    "category": "Cosmetics",
    "gender": "Women",
    "subcategory": "Luxury makeup sets",
    "description": "18 high-pigment professional shades encompassing shimmery bronzes, matte berries, and high-impact gold foils.",
    "image": "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=800&q=80",
    "colors": [
      "#ffd700",
      "#800020",
      "#8b4513"
    ],
    "volume": "18 Shades",
    "requirement": "Smudge-Free Crease Proof"
  },
  {
    "id": 113,
    "name": "Dynamic hydration Skin Combo",
    "brand": "AURA BEAUTY",
    "price": 3499,
    "category": "Cosmetics",
    "gender": "Unisex",
    "subcategory": "Beauty combo kits",
    "description": "Double-duty daily glow hydration combo comprising our signature Hyaluronic Water-Bomb and Retinol Botanical Serum.",
    "image": "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80",
    "colors": [
      "#ffd700",
      "#ffffff"
    ],
    "volume": "2-Piece Kit",
    "requirement": "Perfect Skincare Routine"
  },
  {
    "id": 114,
    "name": "Matte Liquid Lip Gloss Plumper",
    "brand": "AURA BEAUTY",
    "price": 1199,
    "category": "Cosmetics",
    "gender": "Women",
    "subcategory": "Lip gloss",
    "description": "Semi-matte plumping lip gloss featuring organic menthol derivatives for a fresh, high-volume outline.",
    "image": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80",
    "colors": [
      "#ffc0cb",
      "#cc5533"
    ],
    "volume": "6ml",
    "requirement": "Volumizing & Plumping"
  },
  {
    "id": 115,
    "name": "Satin Kiss Red Matte Lipstick",
    "brand": "AURA BEAUTY",
    "price": 1199,
    "category": "Cosmetics",
    "gender": "Women",
    "subcategory": "Matte lipstick",
    "description": "High-impact signature scarlet red matte lipstick enriched with satin micro-particles for a velvet finish.",
    "image": "https://images.unsplash.com/photo-1602910350005-ea5c90714ed1?w=800&q=80",
    "colors": [
      "#ff0000",
      "#8b0000"
    ],
    "volume": "4g",
    "requirement": "24-Hour Feather Proof"
  }
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
  return [products[0], products[17], products[31], products[46], products[61], products[76], products[91], products[101]];
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
  if (!Array.isArray(newProducts) || newProducts.length === 0) return;
  
  // Clear the existing static products safely
  products.splice(0, products.length);
  
  // Map and push the new backend products
  newProducts.forEach(p => {
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
