const User = require('./user')
const Candidate = require('./candidate')
const Race = require('./race')
const Vote = require('./vote')
const Order = require('/order')
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
Vote.belongsTo(Candidate)
Candidate.hasMany(Vote)

Vote.belongsTo(Race)
Race.hasMany(Vote)

Candidate.belongsTo(Race)
Race.hasMany(Candidate)

User.hasMany(Order)
Order.belongsTo(User)

Vote.belongsTo(Order)
Order.hasMany(Vote)

// methods:

Order.totalQuantity = async function() {
  const ballotsBought = await Vote.findAll({
    where: {}
  })
}

module.exports = {
  User,
  Candidate,
  Race,
  Vote,
  Order
}
