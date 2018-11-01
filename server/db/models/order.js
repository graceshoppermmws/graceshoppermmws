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
  historicPrice: {
    type: Sequelize.DECIMAL,
    allowNull: true // captures the current price when status -> processing
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
