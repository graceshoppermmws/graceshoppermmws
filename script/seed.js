'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')
const Sequelize = require('sequelize')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])

  const cortez = await Product.create({
    name: 'Alexandria Ocasio-Cortez',
    bio:
      'Alexandria Ocasio-Cortez is an American politician, educator, and political activist.',
    districtName: 'US House of Representatives District 14',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 100.0
  })

  const crowley = await Product.create({
    name: 'Joseph Crowley',
    bio: `Joseph Crowley is an outgoing Democratic representative from New York's 14th Congressional District in the U.S. House. Crowley lost the primary on June 26, 2018. Joseph Crowley is the Working Families Party representative from New York's 14th Congressional District in the U.S. House. Crowley is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.`,
    districtName: 'US House of Representatives District 14',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 50.0
  })

  const pappas = await Product.create({
    name: 'Anthony Pappas',
    bio: `Anthony Pappas is a Republican candidate for New York's 14th Congressional District in the U.S. House. Pappas is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.`,
    districtName: 'US House of Representatives District 14',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 10.0
  })

  const felder = await Product.create({
    name: 'Simcha Felder',
    bio: `Simcha Felder is a Democratic member of the New York State Senate, representing District 17. Felder is also running in the 2018 election as a Republican Party, Conservative Party, and Independence Party candidate.`,
    districtName: 'State Senate District 17',
    position: 'Senator',
    govLevel: 'State',
    inventory: 100,
    price: 100.0
  })

  const williams = await Product.create({
    name: 'Jumaane Williams',
    bio: `Jumaane Williams is a Working Families Party candidate seeking election to the New York State Senate to represent District 17. Williams is the Democratic and Working Families Party District 45 representative on the New York City Council in New York.`,
    districtName: 'State Senate District 17',
    position: 'Senator',
    govLevel: 'State',
    inventory: 100,
    price: 50.0
  })

  const testShopper = await User.create({
    email: 'test@user.com',
    isAdmin: true,
    password: '123'
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

  const boredShopper = await User.create({
    email: 'email@moremail.com',
    isAdmin: false,
    password: '123'
  })

  const graceAdmin1 = await User.create({
    email: 'email@someemail.com',
    isAdmin: true,
    password: '123'
  })

  const graceAdmin2 = await User.create({
    email: 'grace@someemail.com',
    isAdmin: true,
    password: 'grace'
  })

  const graceAdmin3 = await User.create({
    email: 'hopper@someemail.com',
    isAdmin: true,
    password: 'hopper'
  })

  const graceAdmin4 = await User.create({
    email: 'graccceee@someemail.com',
    isAdmin: true,
    password: 'graccceee'
  })

  const testOrder = await Order.create({
    isShipped: true,
    isCart: false,
    userId: testShopper.id
  })
  await testOrder.addProduct(cortez, {
    through: {quantity: 99, historicPrice: cortez.price}
  })
  await testOrder.addProduct(crowley, {
    through: {quantity: 99, historicPrice: crowley.price}
  })

  const littleOrder = await Order.create({
    isShipped: true,
    isCart: false,
    userId: littleShopper.id
  })
  await littleOrder.addProduct(cortez, {
    through: {quantity: 10, historicPrice: cortez.price}
  })
  await littleOrder.addProduct(crowley, {
    through: {quantity: 15, historicPrice: crowley.price}
  })

  const littleOrder2 = await Order.create({
    isShipped: false,
    isCart: false,
    userId: littleShopper.id
  })
  await littleOrder2.addProduct(cortez, {
    through: {quantity: 80, historicPrice: cortez.price}
  })
  await littleOrder2.addProduct(crowley, {
    through: {quantity: 90, historicPrice: crowley.price}
  })

  const littleOrder3 = await Order.create({
    isShipped: false,
    isCart: true,
    userId: littleShopper.id
  })
  await littleOrder3.addProduct(cortez, {
    through: {quantity: 500, historicPrice: cortez.price}
  })
  await littleOrder3.addProduct(crowley, {
    through: {quantity: 1500, historicPrice: crowley.price}
  })

  const lobbyistOrder = await Order.create({
    isShipped: false,
    isCart: true,
    userId: lobbyistShopper.id
  })
  await lobbyistOrder.addProduct(pappas, {
    through: {quantity: 17, historicPrice: pappas.price}
  })
  await lobbyistOrder.addProduct(felder, {
    through: {quantity: 12, historicPrice: felder.price}
  })

  const boredOrder = await Order.create({
    isCart: true,
    isShipped: false,
    userId: lobbyistShopper.id
  })
  await boredOrder.addProduct(williams, {
    through: {quantity: 400, historicPrice: williams.price}
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
