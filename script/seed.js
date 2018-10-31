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

  const newYorkStateSenateDistrict17 = await Race.create({
    govLevel: 'State',
    positionAvailable: 'Senator'
  })

  const cortez = await Candidate.create({
    name: 'Alexandria Ocasio-Cortez',
    bio:
      'Alexandria Ocasio-Cortez is an American politician, educator, and political activist.',
    inventory: '100',
    price: '100',
    raceId: fourteenDistrict.id
  })

  const crowley = await Candidate.create({
    name: 'Joseph Crowley',
    bio:
      "Joseph Crowley is an outgoing Democratic representative from New York's 14th Congressional District in the U.S. House. Crowley lost the primary on June 26, 2018. Joseph Crowley is the Working Families Party representative from New York's 14th Congressional District in the U.S. House. Crowley is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.",
    inventory: '100',
    price: '50',
    raceId: fourteenDistrict.id
  })

  const pappas = await Candidate.create({
    name: 'Anthony Pappas',
    bio:
      "Anthony Pappas is a Republican candidate for New York's 14th Congressional District in the U.S. House. Pappas is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.",
    inventory: '100',
    price: '10',
    raceId: fourteenDistrict.id
  })

  const littleShopper = await User.create({
    email: 'email@email.com',
    isAdmin: false,
    password: '123'
  })

  const lobbyistShopper = await User.create({
    email: 'email@anymail.com',
    isAdmin: false,
    password: '123'
  })

  const graceAdmin = await User.create({
    email: 'email@email.com',
    isAdmin: true,
    password: '123'
  })

  const order1 = await Order.create({
    status: 'Created',
    historicPrice: null,
    quantity: '5',
    userId: littleShopper.id,
    candidateId: cortez.id
  })

  const order2 = await Order.create({
    status: 'Created',
    historicPrice: null,
    quantity: '50',
    userId: lobbyistShopper.id,
    candidateId: crowley.id
  })

  const order3 = await Order.create({
    status: 'Created',
    historicPrice: null,
    quantity: '75',
    userId: lobbyistShopper.id,
    candidateId: pappas.id
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
