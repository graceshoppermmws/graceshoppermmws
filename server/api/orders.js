const router = require('express').Router()
const {User, Order, Product, OrderProduct} = require('../db/models')
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
    const products = req.body.products
    console.log('BANANA SERVER PRODUCTS', products)
    const newOrder = await Order.create({
      userId: 1,
      isCart: false,
      isShipped: false
    })
    products.forEach(async product => {
      const tempProduct = await Product.findOne({where: {id: product.id}})
      await newOrder.addProduct(tempProduct)
      const updateJoinTable = await OrderProduct.findOne({
        where: {orderId: newOrder.id, productId: tempProduct.id}
      })
      await updateJoinTable.update({
        quantity: product.quantity,
        historicPrice: product.price
      })
    })
    const completedOrder = await Order.findOne({
      where: {id: newOrder.id},
      include: [{model: Product}]
    })
    res.status(200).json(completedOrder)
  } catch (error) {
    next(error)
  }
})
