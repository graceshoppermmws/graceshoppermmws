const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order-product', {
  historicPrice: {
    type: Sequelize.DECIMAL,
    allowNull: true // captures the current price when status -> processing
  }
})

module.exports = OrderProduct

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
