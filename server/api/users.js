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

// get current cart

router.get('/:userId/cart', async (req, res, next) => {
  const userId = req.user.id || null
  if (userId === +req.params.userId) {
    try {
      const cart = await Order.findOne({
        where: {isCart: true, userId: +req.params.userId},
        include: [{model: Product}]
      })
      console.log('api route', cart)
      res.status(200).json(cart)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(403)
  }
})

// get past orders

router.get('/:userId/past', async (req, res, next) => {
  const userId = req.user.id || null
  if (userId === +req.params.userId) {
    try {
      const cart = await Order.findAll({
        where: {isCart: false, userId: +req.params.userId},
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

// update cart

router.put('/:userId/cart', async (req, res, next) => {
  const userId = req.user.id || null
  const productId = +req.body.product.id || null
  if (userId === +req.params.userId) {
    try {
      let cart = await Order.findOne({
        where: {isCart: true, userId: +req.params.userId}
      })
      let product = await Product.findOne({
        where: {id: productId}
      })
      await cart.addProduct(product)
      const updateJoinTable = await OrderProduct.findOne({
        where: {orderId: cart.id, productId: product.id}
      })
      await updateJoinTable.update({
        quantity: updateJoinTable.quantity + +req.body.quantity,
        historicPrice: req.body.product.price
      })
      let returnCart = await Order.findOne({
        where: {isCart: true, userId: +req.params.userId},
        include: [{model: Product}]
      })
      res.status(201).json(returnCart)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(403)
  }
})

// delete item from cart

router.put('/:userId/removeitem', async (req, res, next) => {
  try {
    const userId = req.user.id || null
    if (userId === +req.params.userId) {
      let cart = await Order.findOne({
        where: {isCart: true, userId: +req.params.userId},
        include: [{model: Product}]
      })
      let product = await Product.findOne({
        where: {id: +req.body.productId}
      })
      await cart.removeProduct(product)
      let returnCart = await Order.findOne({
        where: {isCart: true, userId: +req.params.userId},
        include: [{model: Product}]
      })
      res.status(201).json(returnCart)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

// reset quantity in cart

router.put('/:userId/editquantity', async (req, res, next) => {
  const userId = req.user.id || null
  const productId = +req.body.product.id || null
  if (userId === +req.params.userId) {
    try {
      let cart = await Order.findOne({
        where: {isCart: true, userId: +req.params.userId}
      })
      let product = await Product.findOne({
        where: {id: productId}
      })
      await cart.addProduct(product)
      const updateJoinTable = await OrderProduct.findOne({
        where: {orderId: cart.id, productId: product.id}
      })
      await updateJoinTable.update({
        quantity: +req.body.quantity
        // historicPrice: req.body.product.price
      })
      let returnCart = await Order.findOne({
        where: {isCart: true, userId: +req.params.userId},
        include: [{model: Product}]
      })
      res.status(201).json(returnCart)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(403)
  }
})

// checkout

router.put('/:userId/checkout', async (req, res, next) => {
  const userId = req.user.id || null
  if (userId === +req.params.userId) {
    try {
      let cart = await Order.findOne({
        where: {isCart: true, userId: +req.params.userId},
        include: [{model: Product}]
      })
      const checkout = await cart.update({
        isCart: false,
        isShipped: false
      })
      await Order.findOrCreate({
        where: {userId: +req.params.userId, isCart: true},
        include: [{model: Product}]
      })

      res.status(201).json(checkout)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(403)
  }
})

// get all users

router.get('/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
      res.json(users)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})
