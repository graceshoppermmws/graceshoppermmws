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

//Get order By userid
router.get('/:userId', async (req, res, next) => {
  try {
    const singleOrder = await Order.findAll({
      where: {
        userId: +req.params.userId
      }
    })
    res.status(200).json(singleOrder)
  } catch (err) {
    next(err)
  }
})

//Post a order
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      status: req.body.status,
      historicPrice: req.body.historicPrice,
      quantity: req.body.quantity,
      candidateId: req.body.candidateId,
      userId: req.body.userId
    })
    res.status(201).json(newOrder)
  } catch (err) {
    next(err)
  }
})
