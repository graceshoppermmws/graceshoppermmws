const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// GET all Products
router.get('/', async (req, res, next) => {
  try {
    const allProductTags = await Product.allProductTags()
    console.log('hello', allProductTags)
    res.status(200).json(allProductTags)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const oneProduct = await Product.findById(+req.params.productId)
    const productTags = await oneProduct.productTags()
    res.status(200).json(productTags)
  } catch (error) {
    next(error)
  }
})
