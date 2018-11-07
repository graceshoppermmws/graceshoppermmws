const router = require('express').Router()
const {User, Order, Product, OrderProduct} = require('../db/models')
module.exports = router

// get one user and eager load orders

router.get('/:userId', async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
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
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

// get current cart

router.get('/:userId/cart', async (req, res, next) => {
  const userId = req.user.id || null
  try {
    if (userId === +req.params.userId) {
      const cart = await Order.findOne({
        where: {isCart: true, userId: +req.params.userId},
        include: [{model: Product}]
      })
      res.status(200).json(cart)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

// get past orders

router.get('/:userId/past', async (req, res, next) => {
  try {
    const userId = req.user.id || null
    if (userId === +req.params.userId) {
      const cart = await Order.findAll({
        where: {isCart: false, userId},
        include: [{model: Product}]
      })
      res.status(200).json(cart)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

// update cart

router.put('/:userId/cart', async (req, res, next) => {
  try {
    const userId = req.user.id || null
    const productId = +req.body.product.id || null
    if (userId === +req.params.userId) {
      let cart = await Order.findOne({
        where: {isCart: true, userId}
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
        where: {isCart: true, userId},
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
  try {
    const userId = req.user.id || null
    const productId = +req.body.product.id || null
    if (userId === +req.params.userId) {
      let cart = await Order.findOne({
        where: {isCart: true, userId}
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
        where: {isCart: true, userId},
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

// checkout

router.put('/:userId/checkout', async (req, res, next) => {
  try {
    const userId = req.user.id || null
    if (userId === +req.params.userId) {
      const discount = req.body.discount || 1
      let cart = await Order.findOne({
        where: {isCart: true, userId: +req.params.userId},
        include: [{model: Product}]
      })
      // **** Update historic price on checkout ****
      const {products} = cart
      const productPromises = products.map(product =>
        Product.findOne({where: {id: product.id}})
      )
      const dbProductsArray = await Promise.all(productPromises)
      // turn fetched products into promises of added products
      const updateJoinTablePromises = dbProductsArray.map(product =>
        OrderProduct.findOne({
          where: {orderId: cart.id, productId: product.id}
        })
      )
      const joinTableArray = await Promise.all(updateJoinTablePromises)
      const updatedJoinsPromises = joinTableArray.map((lineItem, i) =>
        lineItem.update({
          historicPrice: +dbProductsArray[i].price * discount
        })
      )
      await Promise.all(updatedJoinsPromises)
      // ***** find updated order and set to past
      const checkout = await cart.update({
        isCart: false,
        isShipped: false
      })
      // ***** create new cart
      await Order.findOrCreate({
        where: {userId: +req.params.userId, isCart: true},
        include: [{model: Product}]
      })
      res.status(201).json(checkout)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
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
