// Centralized product data for DRIPZO — Brand New Premium Portfolio (INR Pricing)
const products = [];



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
    if (catProducts[0]) featured.push(catProducts[0]);
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
  return [products[0], products[17], products[31], products[46], products[61], products[76], products[91], products[101]].filter(Boolean);
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
