const router = require('express').Router()
const {Race, Candidate} = require('../db/models')
module.exports = router

// GET all races
router.get('/', async (req, res, next) => {
  try {
    const allRaces = await Race.findAll()
    res.status(200).json(allRaces)
  } catch (error) {
    next(error)
  }
})

// GET by raceId
router.get('/:raceId', async (req, res, next) => {
  try {
    const particularRace = await Race.findById(+req.params.raceId, {
      include: [{model: Candidate}]
    })
    if (!particularRace) {
      res.sendStatus(404)
    } else {
      res.status(200).json(particularRace)
    }
  } catch (error) {
    next(error)
  }
})

// POST a race
router.post('/', async (req, res, next) => {
  try {
    const newRace = await Race.create({
      govLevel: req.body.govLevel,
      positionAvailable: req.body.positionAvailable,
      address: req.body.address,
      districtName: req.body.districtName
    })
    res.status(201).json(newRace)
  } catch (error) {
    next(error)
  }
})

// PUT by raceId
router.put('/:raceId', async (req, res, next) => {
  try {
    const particularRace = await Race.findById(+req.params.raceId, {
      include: [{model: Candidate}]
    })
    if (!particularRace) {
      res.sendStatus(404)
    } else {
      const updatedRace = particularRace.update(req.body)
      res.status(201).json(updatedRace)
    }
  } catch (error) {
    next(error)
  }
})

// POST candidate by raceId
router.post('/:raceId/candidates', async (req, res, next) => {
  try {
    const newCandidate = await Candidate.create({
      name: req.body.name,
      bio: req.body.bio,
      inventory: req.body.inventory,
      price: req.body.price,
      raceId: req.params.raceId
    })
    res.status(201).json(newCandidate)
  } catch (error) {
    next(error)
  }
})

// PUT a candidate of particular race
router.put('/:raceId/candidates/:candidateId', async (req, res, next) => {
  try {
    const particularCandidate = await Candidate.findById(
      +req.params.candidateId
    )
    if (!particularCandidate) {
      res.sendStatus(404)
    } else {
      const updatedCandidate = particularCandidate.update(req.body)
      res.status(201).json(updatedCandidate)
    }
  } catch (error) {
    next(error)
  }
})
