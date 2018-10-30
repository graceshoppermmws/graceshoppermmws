'use strict'

const db = require('../server/db')
const {User, Candidate, Race, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])

  const fourteenDistrict = await Race.create({
    govLevel: 'Federal',
    positionAvailable: 'Representative'
  })

  const cortez = await Candidate.create({
    name: 'Alexandria Ocasio-Cortez',
    bio:
      'Alexandria Ocasio-Cortez is an American politician, educator, and political activist.',
    inventory: '100',
    price: '100',
    raceId: fourteenDistrict.id
  })

  const user1 = await User.create({
    email: 'email@email.com',
    idAdmin: false
  })

  const order1 = await Order.create({
    staus: 'Processing',
    historicPrice: '100',
    quantity: '5',
    userId: user1.id,
    candidateId: cortez.id
  })

  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
