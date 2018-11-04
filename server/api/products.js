const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// api/products

// GET all Products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.status(200).json(allProducts)
  } catch (error) {
    next(error)
  }
})

// GET by ProductId
router.get('/:productId', async (req, res, next) => {
  try {
    const oneProduct = await Product.findById(+req.params.productId)
    if (!oneProduct) {
      res.sendStatus(404)
    } else {
      res.status(200).json(oneProduct)
    }
  } catch (error) {
    next(error)
  }
})

// POST a Product
router.post('/', async (req, res, next) => {
  try {
    // check isAdmin
    const {
      name,
      bio,
      imageUrl,
      districtName,
      position,
      inventory,
      price,
      govLevel
    } = req.body
    const newProduct = await Product.create({
      name,
      bio,
      imageUrl,
      districtName,
      position,
      inventory,
      price,
      govLevel
    })
    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
})

// PUT by productId
router.put('/:productId', async (req, res, next) => {
  try {
    const oldProduct = await Product.findById(+req.params.ProductId)
    if (!oldProduct) {
      res.sendStatus(404)
    } else {
      const {
        name,
        bio,
        imageUrl,
        districtName,
        position,
        inventory,
        price,
        govLevel
      } = req.body
      const updatedProduct = oldProduct.update({
        name,
        bio,
        imageUrl,
        districtName,
        position,
        inventory,
        price,
        govLevel
      })
      res.status(201).json(updatedProduct)
    }
  } catch (error) {
    next(error)
  }
})
