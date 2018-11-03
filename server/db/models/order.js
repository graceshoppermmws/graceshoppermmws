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
  isShipped: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})

/**
 * instanceMethods
 */

/**
 * classMethods
 */

// Order.findPast = function(userId) {
//   return Order.findAll({where: {isCart: false, userId}})
// }

/**
 * hooks
 */

module.exports = Order
