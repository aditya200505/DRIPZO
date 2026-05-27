import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  shopId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  deliveryPartnerId: {
    type: DataTypes.UUID,
  },
  products: {
    type: DataTypes.JSON, // Array of { productId, quantity, size, price }
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  deliveryFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'picking', 'out_for_delivery', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
  deliveryAddress: {
    type: DataTypes.JSON, // { street, city, state, zip }
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
    defaultValue: 'pending',
  },
  paymentMethod: {
    type: DataTypes.ENUM('cod', 'card', 'upi'),
    allowNull: false,
  },
  eta: {
    type: DataTypes.DATE,
  }
}, {
  timestamps: true
});

export default Order;
