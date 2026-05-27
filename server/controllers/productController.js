import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    // If all=true is passed, return everything (useful for admin/vendor reviews). Otherwise, only show approved products to consumers.
    const whereClause = req.query.all === 'true' ? {} : { status: 'approved' };
    const products = await Product.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductsByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const products = await Product.findAll({
      where: { shopId },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createVendorProduct = async (req, res) => {
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
      shopId,
      tags: bodyTags
    } = req.body;
    
    if (!shopId) {
      return res.status(400).json({ success: false, message: 'shopId is required' });
    }

    let productImages = [];
    if (images && Array.isArray(images) && images.length > 0) {
      productImages = images;
    } else if (image) {
      productImages = [image];
    } else {
      productImages = ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'];
    }

    let finalTags = [];
    if (Array.isArray(bodyTags)) {
      finalTags = bodyTags;
    } else if (typeof bodyTags === 'string') {
      finalTags = bodyTags.split(',').map(t => t.trim()).filter(Boolean);
    }

    const newProduct = await Product.create({
      title,
      description,
      images: productImages,
      price: price || 0,
      discountPrice: discountPrice || null,
      sizes: sizes || ['S', 'M', 'L', 'XL'],
      stock: stock || 0,
      shopId,
      category: category || 'Shirts',
      gender: gender ? gender.toLowerCase() : 'unisex',
      tags: finalTags,
      status: 'pending' // New products requested by vendor are pending approval
    });

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateVendorProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, stock, category, gender, tags, image, images } = req.body;
    
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

    // Changing product details moves it back to pending status for admin re-evaluation
    product.status = 'pending';

    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteVendorProduct = async (req, res) => {
  try {
    const { id } = req.params;
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
