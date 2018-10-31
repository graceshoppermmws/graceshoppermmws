const router = require('express').Router()
const {Candidate} = require('../db/models')
module.exports = router

// GET all races
router.get('/', async (req, res, next) => {
  try {
    const allCandidates = await Candidate.findAll()
    res.status(200).json(allCandidates)
  } catch (error) {
    next(error)
  }
})
