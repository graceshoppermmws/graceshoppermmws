/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // describe('instanceMethods', () => {
  //   describe('totalPrice', () => {
  //     let ballotsBought

  //     beforeEach(async () => {
  //       ballotsBought = await Order.create({
  //         quantity: 10000,
  //         status: 'Created',
  //         historicPrice: 10.0
  //       })
  //     })

  //     it('returns the correct total price', () => {
  //       expect(ballotsBought.totalPrice()).to.be.equal(100000)
  //     })
  //   }) // end describe('totalPrice')
  // }) // end describe('instanceMethods')
}) // end describe('Order model')
