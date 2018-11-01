const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order_product', {
  historicPrice: {
    type: Sequelize.DECIMAL,
    allowNull: true
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
