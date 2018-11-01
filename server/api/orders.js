const router = require('express').Router()
const {Order} = require('../db/models')
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

//Post one order
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      isCart: true,
      status: 'Cart',
      historicPrice: null, // not set until status changed to 'Processing'
      quantity: req.body.quantity,
      userId: req.body.userId
    })
    // product relation is through a pivot table
    // TODO setProducts
    res.status(201).json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const oldOrder = await Order.findById(+req.params.orderId)
    if (!oldOrder) {
      res.sendStatus(404)
    } else {
      let {status, historicPrice, quantity} = req.body
      // the front end should automatically pass through a historicPrice
      // when status changes to Processing
      const updatedOrder = await oldOrder.update({
        status,
        historicPrice,
        quantity
      })
      res.status(201).json(updatedOrder)
    }
  } catch (err) {
    next(err)
  }
})
