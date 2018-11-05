const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

//Get all orders
router.get('/', async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const allOrders = await Order.findAll({
        include: [{model: Product}]
      })
      res.status(200).json(allOrders)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(403)
  }
})

// Create an order for an unauthenticated user after payment

router.post('/checkout', async (req, res, next) => {
  try {
    // check if payment processed ? req.payment === true? who knows.
    const [testUser] = User.findAll({where: {email: 'test@user.com'}})
    const products = req.body.products
    const newOrder = await Order.create({
      where: {userId: testUser.id, isCart: false, isShipped: false}
    })
    products.forEach(product => {
      newOrder.addProduct(product, {
        through: {quantity: product.quantity, historicPrice: product.price}
      })
    })
    const completedOrder = await Order.find({
      where: {id: newOrder.id},
      include: [{model: Product}]
    })
    res.status(200).json(completedOrder)
  } catch (error) {
    next(error)
  }
})
