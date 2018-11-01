const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  status: {
    type: Sequelize.ENUM('Cart', 'Cancelled', 'Completed'),
    allowNull: false,
    defaultValue: 'Cart'
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
