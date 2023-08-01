const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Transfer = db.define('transfers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sender_user_id',
  },
  receiverUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'receiver_user_id',
  },
});

module.exports = Transfer;
