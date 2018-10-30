const router = require('express').Router()
const {User, Order} = require('../db/models')
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

//Post a order
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      status: 'Created',
      historicPrice: null, // not set until status changed to 'Processing'
      quantity: req.body.quantity,
      candidateId: req.body.candidateId,
      userId: req.body.userId
    })
    res.status(201).json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  // the req.body should pass through all the fields that will change
  // the front end should automatically pass through a historicPrice
  // when status changes from Created to Processing
  try {
    const oldOrder = await Order.findById(+req.params.orderId)
    if (!oldOrder) {
      res.sendStatus(404)
    } else {
      const updatedOrder = await oldOrder.update(req.body)
      res.status(201).json(updatedOrder)
    }
  } catch (err) {
    next(err)
  }
})
