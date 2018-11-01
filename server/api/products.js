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

// // POST a Product
// router.post('/', async (req, res, next) => {
//   try {
//     const newProduct = await Product.create({
//       govLevel: req.body.govLevel,
//       positionAvailable: req.body.positionAvailable,
//       address: req.body.address,
//       districtName: req.body.districtName
//     })
//     res.status(201).json(newProduct)
//   } catch (error) {
//     next(error)
//   }
// })

// // PUT by ProductId
// router.put('/:ProductId', async (req, res, next) => {
//   try {
//     const particularProduct = await Product.findById(+req.params.ProductId, {
//       include: [{model: Candidate}]
//     })
//     if (!particularProduct) {
//       res.sendStatus(404)
//     } else {
//       const updatedProduct = particularProduct.update(req.body)
//       res.status(201).json(updatedProduct)
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// // POST candidate by ProductId
// router.post('/:ProductId/candidates', async (req, res, next) => {
//   try {
//     const newCandidate = await Candidate.create({
//       name: req.body.name,
//       bio: req.body.bio,
//       inventory: req.body.inventory,
//       price: req.body.price,
//       ProductId: req.params.ProductId
//     })
//     res.status(201).json(newCandidate)
//   } catch (error) {
//     next(error)
//   }
// })

// // PUT a candidate of particular Product
// router.put('/:ProductId/candidates/:candidateId', async (req, res, next) => {
//   try {
//     const particularCandidate = await Candidate.findById(
//       +req.params.candidateId
//     )
//     if (!particularCandidate) {
//       res.sendStatus(404)
//     } else {
//       const updatedCandidate = particularCandidate.update(req.body)
//       res.status(201).json(updatedCandidate)
//     }
//   } catch (error) {
//     next(error)
//   }
// })
