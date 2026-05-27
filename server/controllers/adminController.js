import User from '../models/User.js';
import Shop from '../models/Shop.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { sequelize } from '../config/db.js';

export const getDashboardStats = async (req, res) => {
  try {
    const { Op } = await import('sequelize');

    const totalUsers    = await User.count();
    const totalShops    = await Shop.count();
    const totalProducts = await Product.count();
    const totalOrders   = await Order.count();

    // Pending products awaiting admin approval
    const pendingProducts = await Product.count({ where: { status: 'pending' } });

    const totalRevenue = await Order.sum('totalAmount', {
      where: {
        [Op.or]: [
          { paymentStatus: 'completed' },
          { status: 'delivered' }
        ]
      }
    }) || 0;

    // Monthly revenue (last 6 months)
    const monthlyRevenue = await Order.findAll({
      attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m-01'), 'month'],
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'revenue']
      ],
      where: {
        [Op.or]: [
          { paymentStatus: 'completed' },
          { status: 'delivered' }
        ]
      },
      group: [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m-01')],
      order: [[sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m-01'), 'DESC']],
      limit: 6
    });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalShops,
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingProducts
      },
      monthlyRevenue
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.findAll({
      include: [{ model: User, as: 'owner', attributes: ['name', 'email'] }],
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, shops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ['name', 'email'] },
        { model: Shop, attributes: ['name'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      images, 
      image,
      price, 
      discountPrice, 
      sizes, 
      stock, 
      category, 
      gender, 
      subcategory, 
      brand, 
      colors,
      tags: bodyTags,
      status
    } = req.body;
    
    // Find default flagship shop
    const shop = await Shop.findOne();
    if (!shop) {
      return res.status(404).json({ success: false, message: 'No shop found to associate the product with' });
    }
    
    // Construct images array
    let productImages = [];
    if (images && Array.isArray(images) && images.length > 0) {
      productImages = images;
    } else if (image) {
      productImages = [image];
    } else {
      productImages = ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'];
    }

    // Construct tags array
    let finalTags = [];
    if (Array.isArray(bodyTags) && bodyTags.length > 0) {
      finalTags = bodyTags;
    } else if (typeof bodyTags === 'string') {
      finalTags = bodyTags.split(',').map(t => t.trim()).filter(Boolean);
    } else {
      finalTags = [subcategory, brand, ...(colors || [])].filter(Boolean);
    }
    
    const newProduct = await Product.create({
      title,
      description,
      images: productImages,
      price: price || 0,
      discountPrice: discountPrice || null,
      sizes: sizes || ['S', 'M', 'L', 'XL'],
      stock: stock || 100,
      shopId: shop.id,
      category: category || 'Shirts',
      gender: gender ? gender.toLowerCase() : 'unisex',
      tags: finalTags,
      status: status || 'approved'
    });
    
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status, paymentStatus } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    
    await order.save();
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createShop = async (req, res) => {
  try {
    const { name, ownerId, description, logo, banner, location, isVerified } = req.body;
    
    // Validate owner exists
    const owner = await User.findByPk(ownerId);
    if (!owner) {
      return res.status(404).json({ success: false, message: 'Owner user not found' });
    }

    const defaultLocation = location || { type: 'Point', coordinates: [72.8777, 19.076], address: 'Mumbai, Maharashtra' };

    const newShop = await Shop.create({
      name,
      ownerId,
      description: description || '',
      logo: logo || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80',
      banner: banner || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1000&q=80',
      location: defaultLocation,
      status: 'active',
      isVerified: isVerified || false
    });

    res.status(201).json({ success: true, shop: newShop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateShopStatus = async (req, res) => {
  const { id } = req.params;
  const { status, isVerified } = req.body;
  try {
    const shop = await Shop.findByPk(id);
    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }

    if (status) shop.status = status;
    if (typeof isVerified === 'boolean') shop.isVerified = isVerified;

    await shop.save();
    res.status(200).json({ success: true, shop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.destroy();
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, stock, category, gender, tags, image, images, status } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = Number(stock);
    if (category !== undefined) product.category = category;
    if (gender !== undefined) product.gender = gender.toLowerCase();
    if (status !== undefined) product.status = status;
    
    if (images && Array.isArray(images)) {
      product.images = images;
    } else if (image) {
      product.images = [image];
    }
    
    if (tags !== undefined) {
      if (Array.isArray(tags)) {
        product.tags = tags;
      } else if (typeof tags === 'string') {
        product.tags = tags.split(',').map(t => t.trim()).filter(Boolean);
      }
    }

    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getShopByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const shop = await Shop.findOne({ where: { ownerId } });
    if (!shop) {
      return res.status(404).json({ success: false, message: 'No shop found for this owner' });
    }
    res.status(200).json({ success: true, shop: { id: shop.id, name: shop.name } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (user.role === 'admin') {
      return res.status(403).json({ success: false, message: 'Cannot delete admin accounts' });
    }

    // Nullify orders referencing this user so FK constraints don't block deletion
    await Order.update({ userId: null }, { where: { userId: id } });

    // If user is a shopkeeper, delete their shops and products
    if (user.role === 'shopkeeper') {
      const shops = await Shop.findAll({ where: { ownerId: id } });
      for (const shop of shops) {
        await Product.destroy({ where: { shopId: shop.id } });
        await Order.update({ shopId: null }, { where: { shopId: shop.id } });
        await shop.destroy();
      }
    }

    await user.destroy();
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const suspendUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { suspended } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (user.role === 'admin') {
      return res.status(403).json({ success: false, message: 'Cannot suspend admin accounts' });
    }

    // Use update() to bypass the beforeSave password-hashing hook
    await User.update({ suspended: !!suspended }, { where: { id }, individualHooks: false });

    res.status(200).json({ success: true, user: { id: user.id, name: user.name, suspended: !!suspended } });
  } catch (error) {
    console.error('Suspend user error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
