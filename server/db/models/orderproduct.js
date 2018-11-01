const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order_product', {
  historicPrice: {
    type: Sequelize.DECIMAL,
    allowNull: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
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
