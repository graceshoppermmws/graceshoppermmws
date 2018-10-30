const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
    allowNull: false,
    defaultValue: 'Created'
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
