const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
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

//Get cart
router.get('/cart/:userId', async (req, res, next) => {
  const userId = req.user.id || null
  if (userId === +req.params.userId) {
    try {
      const cart = await Order.findAll({
        where: {isCart: true, userId: +req.params.userId},
        include: [{model: Product}]
      })
      res.status(200).json(cart)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(403)
  }
})

//GET past order
router.get('/past/:userId', async (req, res, next) => {
  if (req.user.id === +req.params.userId) {
    try {
      const pastOrders = await Order.findAll({
        where: {userId: +req.params.userId, isCart: false},
        include: [{model: Product}]
      })
      res.status(200).json(pastOrders)
    } catch (error) {
      next(error)
    }
  } else {
    res.sendStatus(403)
  }
})

//Post one order

// pass in a quantity, a productId, and a userId
router.post('/', async (req, res, next) => {
  try {
    const {quantity, productId, userId} = req.body
    const productToBuy = await Product.findById(productId)
    const newOrder = await Order.create({
      isCart: true,
      status: 'Cart',
      userId
    })
    newOrder.addProduct(productToBuy, {through: {quantity}})
    res.status(201).json(newOrder)
  } catch (err) {
    next(err)
  }
})

// router.put('/:orderId', async (req, res, next) => {
//   try {
//     const {quantity, status, isCart, historicPrice} = req.body
//     // update historicPrice when status changes to Processing
//     const oldOrder = await Order.findById(+req.params.orderId, {
//       include: [{model: OrderProduct}]
//     })
//     if (!oldOrder) {
//       res.sendStatus(404)
//     } else {
//       const updatedOrder = await oldOrder.update({
//         isCart: isCart || oldOrder.isCart,
//         status: status || oldOrder.status,
//         quantity: quantity || oldOrder.quantity,
//         historicPrice: historicPrice || oldOrder.historicPrice
//       })
//       res.status(201).json(updatedOrder)
//     }
//   } catch (err) {
//     next(err)
//   }
// })
