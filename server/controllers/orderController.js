import Order from '../models/Order.js';
import Shop from '../models/Shop.js';
import User from '../models/User.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount, deliveryFee, deliveryAddress, paymentMethod, shopId } = req.body;

    // Use the vendor's shopId if provided (to place orders on vendor products), otherwise fallback to the flagship shop
    let targetShopId = shopId;
    if (!targetShopId) {
      const shop = await Shop.findOne();
      if (!shop) {
        return res.status(404).json({ success: false, message: 'No active shop found to fulfill the order.' });
      }
      targetShopId = shop.id;
    }

    // UPI/Card payment is mock-completed instantly, COD is pending
    const paymentStatus = paymentMethod === 'cod' ? 'pending' : 'completed';

    const order = await Order.create({
      userId,
      shopId: targetShopId,
      products,
      totalAmount,
      deliveryFee: deliveryFee || 0,
      deliveryAddress,
      paymentMethod,
      paymentStatus,
      status: 'pending'
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrdersByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const orders = await Order.findAll({
      where: { shopId },
      include: [
        { model: User, attributes: ['name', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateVendorOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;
    
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
