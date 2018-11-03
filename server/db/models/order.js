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
Order.prototype.checkout = function() {
  if (this.isCart) {
    this.isCart = false
    this.status = 'Processing'
    let updatedProducts = this.products.map(product => {
      return {
        ...product,
        order_product: {
          ...product.order_product,
          dataValues: {
            ...product.order_product.dataValues,
            historicPrice: product.price
          }
        }
      }
    })
    this.products = updatedProducts
  }
}
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
