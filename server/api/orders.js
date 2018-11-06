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
    const discount = 1
    const products = req.body.products
    const newOrder = await Order.create({
      userId: 1,
      isCart: false,
      isShipped: false
    })
    const productPromises = products.map(product =>
      Product.findOne({where: {id: product.id}})
    )
    const dbProductsArray = await Promise.all(productPromises)
    // turn fetched products into promises of added products
    const addProductPromises = dbProductsArray.map(product =>
      newOrder.addProduct(product)
    )
    await Promise.all(addProductPromises)
    const updateJoinTablePromises = dbProductsArray.map(product =>
      OrderProduct.findOne({
        where: {orderId: newOrder.id, productId: product.id}
      })
    )
    const joinTableArray = await Promise.all(updateJoinTablePromises)
    const updatedJoinsPromises = joinTableArray.map((lineItem, i) =>
      lineItem.update({
        quantity: req.body.products[i].quantity,
        historicPrice: +dbProductsArray[i].price /* * discount */
      })
    )
    await Promise.all(updatedJoinsPromises)
    const completedOrder = await Order.findOne({
      where: {id: newOrder.id},
      include: [{model: Product}]
    })
    res.status(200).json(completedOrder)
  } catch (error) {
    next(error)
  }
})
