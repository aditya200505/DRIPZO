import { sequelize } from './config/db.js';
import User from './models/User.js';
import Shop from './models/Shop.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import productsSource from '../client/src/data/productData.js';

// Setup Sequelize Associations for seeding integrity
Shop.belongsTo(User, { as: 'owner', foreignKey: 'ownerId', onDelete: 'CASCADE' });
User.hasMany(Shop, { as: 'shops', foreignKey: 'ownerId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId', onDelete: 'SET NULL' });
User.hasMany(Order, { foreignKey: 'userId', onDelete: 'SET NULL' });
Order.belongsTo(Shop, { foreignKey: 'shopId', onDelete: 'SET NULL' });
Shop.hasMany(Order, { foreignKey: 'shopId', onDelete: 'SET NULL' });

const seedData = async () => {
  try {
    // 1. Sync and Clear Database
    await sequelize.sync({ force: true });
    console.log('Database cleared and synced.');

    // 2. Create Admin/Shopkeeper
    const admin = await User.create({
      id: uuidv4(),
      name: 'Aditya',
      email: 'aditya@dripzo.com',
      password: 'Aditya123',
      role: 'admin',
      phone: '9876543210'
    });
    console.log('Admin user created.');

    // 3. Create Shop
    const shop = await Shop.create({
      id: uuidv4(),
      name: 'DRIPZO Flagship Store',
      ownerId: admin.id,
      description: 'The official flagship store of DRIPZO. Premium fashion delivered fast.',
      location: { 
        type: 'Point', 
        coordinates: [77.5946, 12.9716], 
        address: 'MG Road, Bengaluru, Karnataka' 
      },
      status: 'active',
      isVerified: true
    });
    console.log('Flagship shop created.');

    // 5. Bulk Create Products
    // Fallback images for products that use local paths (only available in client/public)
    const categoryFallbacks = {
      'Shirts': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      'Pants': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
      'Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'Jackets': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
      'Flip Flops': 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80',
      'T-Shirts': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
      'Luxury': 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
      'Cosmetics': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    };

    const getProductImage = (p) => {
      const img = p.image;
      // If image is a full URL, or local relative path starting with /, use it directly
      if (img && (img.startsWith('http') || img.startsWith('/'))) return img;
      // If local path, use category fallback
      return categoryFallbacks[p.category] || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80';
    };

    const productsToCreate = productsSource.map(p => ({
      id: uuidv4(),
      title: p.name,
      description: p.description,
      images: [getProductImage(p)],
      price: p.price,
      category: p.category,
      gender: p.gender.toLowerCase(),
      stock: 100,
      shopId: shop.id,
      tags: [p.subcategory, p.brand, ...(p.colors || [])].filter(Boolean),
      sizes: ['S', 'M', 'L', 'XL']
    }));

    await Product.bulkCreate(productsToCreate);
    console.log(`${productsToCreate.length} products seeded successfully.`);

    // 6. Create Customer and Vendor Users
    const customers = [
      { name: 'Aditya Vajpayee', email: 'avajpayee2005@gmail.com' },
      { name: 'Priya Patel', email: 'priya@gmail.com' },
      { name: 'Aarav Sharma', email: 'aarav@gmail.com' },
      { name: 'Rohan Gupta', email: 'rohan@gmail.com' }
    ];

    for (const cust of customers) {
      await User.create({
        id: uuidv4(),
        name: cust.name,
        email: cust.email,
        password: 'Aditya123',
        role: 'customer',
        addresses: [{ street: '123 Fashion Street', city: 'Mumbai', state: 'Maharashtra', zip: '400001', isDefault: true }]
      });
    }
    console.log('Customer users seeded.');

    // 7. Create a Vendor/Shopkeeper User
    const vendor = await User.create({
      id: uuidv4(),
      name: 'Vendor Demo',
      email: 'vendor@dripzo.com',
      password: 'Aditya123',
      role: 'shopkeeper',
      phone: '9876543211'
    });
    const vendorShop = await Shop.create({
      id: uuidv4(),
      name: 'Vendor Hub Store',
      ownerId: vendor.id,
      description: 'A vendor-run fashion store on DRIPZO.',
      location: { type: 'Point', coordinates: [72.8777, 19.0760], address: 'Bandra, Mumbai' },
      status: 'active',
      isVerified: true
    });
    console.log('Vendor user and shop seeded.');

    // 7. Create Sample Orders
    const products = await Product.findAll();
    const customerUsers = await User.findAll({ where: { role: 'customer' } });

    for (let i = 0; i < customerUsers.length; i++) {
      const user = customerUsers[i];
      const p1 = products[i % products.length];
      const p2 = products[(i + 1) % products.length];

      await Order.create({
        id: uuidv4(),
        userId: user.id,
        shopId: shop.id,
        products: [
          { productId: p1.id, quantity: 1, size: 'M', price: p1.price },
          { productId: p2.id, quantity: 2, size: 'L', price: p2.price }
        ],
        totalAmount: Number(p1.price) + (Number(p2.price) * 2) + 50, // 50 for delivery
        deliveryFee: 50,
        status: i % 2 === 0 ? 'delivered' : 'pending',
        deliveryAddress: user.addresses[0],
        paymentStatus: i % 2 === 0 ? 'completed' : 'pending',
        paymentMethod: 'upi',
        eta: new Date(Date.now() + 86400000) // Tomorrow
      });
    }
    console.log('Sample orders seeded.');

    console.log('Seeding completed successfully! 🚀');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
