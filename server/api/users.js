const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

// get one user and eager load orders

router.get('/:userId', async (req, res, next) => {
  try {
    const particularUser = await User.findById(+req.params.userId, {
      include: [{model: Order}]
    })
    if (!particularUser) {
      res.sendStatus(404)
    } else {
      res.status(200).json(particularUser)
    }
  } catch (err) {
    next(err)
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
