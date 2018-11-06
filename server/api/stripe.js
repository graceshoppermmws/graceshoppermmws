const router = require('express')()
const stripe = require('stripe')(process.env.STRIPE_KEY)
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router

router.use(require('body-parser').text())

router.post('/charge', async (req, res) => {
  try {
    let calculateTotal = 2000
    const userId = req.user ? req.user.id : null
    if (userId) {
      const cart = await Order.findOne({
        where: {isCart: true, userId},
        include: [{model: Product}]
      })
      // *** iterate through order products to find total
      const {products} = cart
      const productPromises = products.map(product =>
        Product.findOne({where: {id: product.id}})
      )
      const dbProductsArray = await Promise.all(productPromises)
      const updateJoinTablePromises = dbProductsArray.map(product =>
        OrderProduct.findOne({
          where: {orderId: cart.id, productId: product.id}
        })
      )
      const joinTableArray = await Promise.all(updateJoinTablePromises)
      calculateTotal = joinTableArray.reduce(
        (subtotal, lineItem) =>
          lineItem.historicPrice * lineItem.quantity * 100 + subtotal,
        0
      )
    }
    console.log(`$${calculateTotal / 100}.00`)
    //*****
    let {status} = await stripe.charges.create({
      amount: calculateTotal,
      currency: 'usd',
      description: 'candidates',
      source: req.body
    })
    res.json({status})
  } catch (err) {
    res.status(500).end()
  }
})
