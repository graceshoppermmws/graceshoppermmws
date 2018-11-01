const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router

//Get all orders
router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll()
    res.status(200).json(allOrders)
  } catch (err) {
    next(err)
  }
})

// boredOrder.addProduct(williams, {
//  through: {quantity: 400, historicPrice: williams.price}
// })

//Post one order
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
