import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('customer', 'shopkeeper', 'delivery', 'admin'),
    defaultValue: 'customer',
  },
  phone: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.TEXT,
  },
  provider: {
    type: DataTypes.ENUM('local', 'google', 'facebook'),
    defaultValue: 'local',
  },
  providerId: {
    type: DataTypes.STRING,
  },
  addresses: {
    type: DataTypes.JSON, // Stores array of address objects
    defaultValue: []
  },
  dripzyRoastEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  suspended: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  hooks: {
    beforeSave: async (user) => {
      if (user.password && user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Instance method to match password
User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default User;
