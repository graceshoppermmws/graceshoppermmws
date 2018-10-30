const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM(['Created', 'Processing', 'Cancelled', 'Completed']),
    allowNull: false,
    defaultValue: 'Created'
  },
  historicPrice: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
})

module.exports = Order

/**
 * instanceMethods
 */
Order.prototype.totalPrice = function() {
  return Order.quantity * Order.historicPrice
}

/**
 * classMethods
 */

/**
 * hooks
 */
