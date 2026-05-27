import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Shop = sequelize.define('Shop', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  logo: {
    type: DataTypes.STRING,
  },
  banner: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.JSON, // { type: 'Point', coordinates: [lng, lat], address: '' }
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'banned'),
    defaultValue: 'active',
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: true
});

export default Shop;
