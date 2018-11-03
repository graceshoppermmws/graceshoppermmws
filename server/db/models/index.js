const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const OrderProduct = require('./orderproduct')

//const Candidate = require('./candidate')
// const Race = require('./race')
// const Order = require('./order')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

//ASSOCIATIONS:

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product, {through: OrderProduct})
Product.belongsToMany(Order, {through: OrderProduct})

// Candidate.belongsTo(Race)
// Race.hasMany(Candidate)

// User.hasMany(Order)
// Order.belongsTo(User)

// Order.belongsTo(Candidate)
// Candidate.hasMany(Order)

// methods:
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
    // console.log(
    //   '****PEN****PINEAPPLE****APPLE****PEN****',
    //   product.order_product.dataValues,
    //   '****PEN****PINEAPPLE****APPLE****PEN****'
    // )
    // productToUpdate.update({inventory: newInventory})
    // let historicPrice = +product.price
    // let quantity = product.order_product.quantity
    // this.addProduct(product, {through: {quantity, historicPrice}})
    this.products = updatedProducts

    // [
    //   {
    //     name: 'apple',
    //     price: 99,
    //     order_product: {historicPrice: 30}
    //   },
    //   {name: 'banana', order_product: {historicPrice: 12}}
    // ]
  }
}

module.exports = {
  User,
  Order,
  Product,
  OrderProduct
  // Candidate
  // Race,
}
