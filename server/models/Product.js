import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  discountPrice: {
    type: DataTypes.DECIMAL(10, 2),
  },
  sizes: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  shopId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  ratings: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  numReviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('men', 'women', 'unisex', 'kids'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'approved',
    allowNull: false,
  }
}, {
  timestamps: true
});

export default Product;
