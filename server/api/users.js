const router = require('express').Router()
const {User, Order, Product, OrderProduct} = require('../db/models')
module.exports = router

// get one user and eager load orders

router.get('/:userId', async (req, res, next) => {
  try {
    const particularUser = await User.findById(+req.params.userId, {
      include: [{model: Order}]
    })
    if (!particularUser) {
      res.sendStatus(404)
    }
    // find or create cart based on user id and cart
    const cart = await Order.findOrCreate({
      where: {userId: +req.params.userId, isCart: true},
      include: [{model: Product}]
    })
    res.status(200).json({particularUser, cart})
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  // const userId = req.user.id || null
  // if (userId === +req.params.userId) {
  try {
    const cart = await Order.findAll({
      where: {isCart: true, userId: +req.params.userId},
      include: [{model: Product}]
    })
    res.status(200).json(cart)
  } catch (err) {
    next(err)
  }
  // } else {
  //   res.sendStatus(403)
  // }
})

router.put('/:userId/cart', async (req, res, next) => {
  const userId = req.user.id || null
  const productId = +req.body.id || null
  if (userId === +req.params.userId) {
    try {
      let cart = await Order.findOne({
        where: {isCart: true, userId: +req.params.userId},
        include: [{model: Product}]
      })
      //cart.id
      // console.log(cart)
      //find one orderproducts
      //find one for req.body.product
      let product = await Product.findOne({
        where: {id: productId}
      })
      const updateCart = await cart.addProduct(product)
      const updateQuantity = await OrderProduct.findOne({
        where: {orderId: cart.id, productId: product.id}
      })
      const newCart = await updateQuantity.update({
        quantity: updateQuantity.quantity + 1
      })
      res.status(201).json(newCart)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(403)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
