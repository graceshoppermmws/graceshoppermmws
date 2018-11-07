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
    imageUrl:
      'https://sharing.kgun9.com/sharescnn/photo/2018/06/26/S095630501_1530068734806_90885441_ver1.0_900_675.JPG',
    districtName: 'US House of Representatives District 14',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 100.0
  })

  const crowley = await Product.create({
    name: 'Joseph Crowley',
    bio: `Joseph Crowley is an outgoing Democratic representative from New York's 14th Congressional District in the U.S. House. Crowley lost the primary on June 26, 2018. Joseph Crowley is the Working Families Party representative from New York's 14th Congressional District in the U.S. House. Crowley is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.`,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Crowley114.jpg/220px-Crowley114.jpg',
    districtName: 'US House of Representatives District 14',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 50.0
  })

  const pappas = await Product.create({
    name: 'Anthony Pappas',
    bio: `Anthony Pappas is a Republican candidate for New York's 14th Congressional District in the U.S. House. Pappas is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.`,
    imageUrl: 'https://s.hdnux.com/photos/74/45/46/15882669/3/920x920.jpg',
    districtName: 'US House of Representatives District 14',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 10.0
  })

  const felder = await Product.create({
    name: 'Simcha Felder',
    bio: `Simcha Felder is a Democratic member of the New York State Senate, representing District 17. Felder is also running in the 2018 election as a Republican Party, Conservative Party, and Independence Party candidate.`,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Simcha_Felder.jpg/1024px-Simcha_Felder.jpg',
    districtName: 'State Senate District 17',
    position: 'Senator',
    govLevel: 'State',
    inventory: 100,
    price: 100.0
  })

  const williams = await Product.create({
    name: 'Jumaane Williams',
    bio: `Jumaane Williams is a Working Families Party candidate seeking election to the New York State Senate to represent District 17. Williams is the Democratic and Working Families Party District 45 representative on the New York City Council in New York.`,
    imageUrl:
      'https://pbs.twimg.com/profile_images/1031297616917798913/FF5kN_43_400x400.jpg',
    districtName: 'State Senate District 17',
    position: 'Senator',
    govLevel: 'State',
    inventory: 100,
    price: 50.0
  })

  const Gershon = await Product.create({
    name: 'Perry Gershon',
    bio: `Gershon worked as a lender for commercial real estate investments. He received his bachelor's degree from Yale University and his M.B.A. from the University of California, Berkeley.`,
    imageUrl:
      'https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/200/300/crop/best/Lee_Zeldin_new_official_portrait.jpg',
    districtName: 'US House of Representatives District 14',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 50.0
  })

  //2
  const Zeldin = await Product.create({
    name: 'Lee Zeldin',
    bio: `In addition to running as a Republican candidate, he is running in the 2018 election as a Conservative Party, Independence Party, and Reform Party candidate through fusion voting. He was re-elected in 2016. He faced Democrat Anna Throne-Holst and Working Families candidate Kenneth Schaeffer in the general election. New York's 1st Congressional District race was rated as a race to watch in 2016. Zeldin was previously a Republican member of the New York State Senate, representing District 3 from 2010 to January 1, 2015.`,
    imageUrl:
      'https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/200/300/crop/best/Perry_Gershon.jpg',
    districtName: 'US House of Representatives District 14',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 50.0
  })

  //3
  const GrechenShirley = await Product.create({
    name: 'Liuba Grechen Shirley',
    bio: `Liuba Grechen Shirley is a Democratic candidate for New York's 2nd Congressional District in the U.S. House. Shirley is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.`,
    imageUrl:
      'https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/200/300/crop/best/Liuba_Grechen_Shirley.jpeg',
    districtName: 'US House of Representatives District 14',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 50.0
  })

  //4
  const King = await Product.create({
    name: 'Peter King',
    bio: `Peter King is the Republican representative from New York's 2nd Congressional District in the U.S. House. King is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018. In addition to running as a Republican candidate, King is running in the 2018 election as a Conservative Party, Independence Party, Reform Party, and Tax Revolt Party candidate through fusion voting. Prior offices held by King have been Nassau County Comptroller and a member of the Hempstead Town Council. Based on analysis of multiple outside rankings, King is a more moderate right of center Republican Party vote. As a result, he may break with the Republican Party line more than his fellow members.`,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Peter_T._King%2C_official_portrait%2C_112th_Congress.jpg/800px-Peter_T._King%2C_official_portrait%2C_112th_Congress.jpg',
    districtName: 'US House of Representatives District 14',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 50.0
  })

  //5
  const Suozzi = await Product.create({
    name: 'Tom Suozzi',
    bio: `om Suozzi is the Democratic representative from New York's 3rd Congressional District in the U.S. House. Suozzi is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.`,
    imageUrl:
      'https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/200/300/crop/best/Tom_Suozzi.jpg',
    districtName: 'State Senate District 17',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 50.0
  })

  //6
  const DeBono = await Product.create({
    name: 'Dan DeBono',
    bio: `Dan DeBono is a Republican candidate for New York's 3rd Congressional District in the U.S. House. DeBono is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.`,
    imageUrl:
      'https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/200/300/crop/best/image1-2.jpeg',
    districtName: 'State Senate District 17',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 50.0
  })

  //7
  const Delgado = await Product.create({
    name: 'Antonio Delgado',
    bio: `Antonio Delgado is a Democratic candidate for New York's 19th Congressional District in the U.S. House. Delgado is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.`,
    imageUrl:
      'https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/200/300/crop/best/Web-Pic.jpg',
    districtName: 'State Senate District 17',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 50.0
  })

  //8
  const Faso = await Product.create({
    name: 'John Faso',
    bio: `John Faso is the Republican representative from New York's 19th Congressional District in the U.S. House. Faso is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.`,
    imageUrl:
      'https://s3.amazonaws.com/ballotpedia-api/storage/uploads/thumbs/200/300/crop/best/John_Faso_official_congressional_photo.jpg',
    districtName: 'State Senate District 17',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 50.0
  })

  //9
  const Gillibrand = await Product.create({
    name: 'Kirsten Gillibrand',
    bio: `Kirsten Gillibrand is an American attorney and politician serving as the junior United States Senator from New York since January 2009. She previously held the position of U.S. Representative for New York's 20th congressional district from 2007 until her Senate appointment. Gillibrand is a member of the Democratic Party.`,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/d/df/Kirsten_Gillibrand%2C_official_portrait%2C_112th_Congress.jpg',
    districtName: 'State Senate District 17',
    position: 'Senator',
    govLevel: 'Federal',
    inventory: 100,
    price: 50.0
  })

  //10
  const Farley = await Product.create({
    name: 'Chele Farley',
    bio: `Chele Farley is running for the United States Senate to provide every New York family with the opportunity to succeed. Specifically, Chele is focused on recapturing the $48 billion dollars more that New Yorkers pay in federal taxes each year than the state receives. By addressing the unfair treatment of New York taxpayers, Chele intends to invest in the state’s crumbling roads and bridges and to fix the nation’s largest mass transportation system. Chele recognizes that these infrastructure improvements will create jobs, promote the state’s long-term economic health and ease the crushing burden placed on property taxpayers. Chele Chiavacci Farley was inspired by her parents to work hard, succeed and help others. Chele’s father was a scientist who encouraged her to study math, science and engineering. Her interest in these fields led her to major in Industrial Engineering at Stanford University and influenced her commitment to expand educational opportunities in these challenging subjects for all children.`,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Headshot.CCF.v3_%28cropped%29.jpg/800px-Headshot.CCF.v3_%28cropped%29.jpg',
    districtName: 'State Senate District 17',
    position: 'Senator',
    govLevel: 'Federal',
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

  //1
  const DavidKoch = await User.create({
    email: 'dkoch@gmail.com',
    isAdmin: false,
    password: 'moneyTrump$vote$'
  })

  //2
  const CharlesKoch = await User.create({
    email: 'chuckyk@gmail.com',
    isAdmin: false,
    password: 'obamaWho?'
  })

  //3
  const SheldonAdelson = await User.create({
    email: 'SheldonAdelson@someemail.com',
    isAdmin: false,
    password: 'myBoyRubio'
  })

  //4
  const PaulSinger = await User.create({
    email: 'PaulSinger@yahoo.com',
    isAdmin: false,
    password: 'Romney2Giuliani'
  })

  //5
  const RobertMercer = await User.create({
    email: 'NoMercyMercer@hotmail.com',
    isAdmin: false,
    password: 'WeBe(ted)Cruzin'
  })

  //6
  const WarrenStephens = await User.create({
    email: 'wStephens@someemail.com',
    isAdmin: false,
    password: 'MoMoneyMoVotes'
  })

  // 7
  const GreogeSoros = await User.create({
    email: 'gsoros@gmail.com',
    isAdmin: false,
    password: 'SorosSorrow'
  })

  //8
  const CharlesSchwab = await User.create({
    email: 'CharlesSchwab@gmail.com',
    isAdmin: false,
    password: '$chwab'
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
