import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const DripzyRoast = sequelize.define('DripzyRoast', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT('long'), // Support large Base64 strings
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  vibe: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roastText: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  personality: {
    type: DataTypes.STRING,
    allowNull: false
  },
  suggestions: {
    type: DataTypes.JSON, // Array of strings
    defaultValue: []
  },
  detectedCategory: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

export default DripzyRoast;
