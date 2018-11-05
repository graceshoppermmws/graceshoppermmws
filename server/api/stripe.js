const router = require('express')()
const stripe = require('stripe')(process.env.STRIPE_KEY)
module.exports = router

router.use(require('body-parser').text())

router.post('/charge', async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: req.body
    })

    res.json({status})
  } catch (err) {
    res.status(500).end()
  }
})
