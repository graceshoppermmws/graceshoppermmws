const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const OrderProduct = require('./orderproduct')

// const Candidate = require('./candidate')
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

module.exports = {
  User,
  Order,
  Product
  // Candidate,
  // Race,
}
