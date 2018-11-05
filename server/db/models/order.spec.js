/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    //   describe('instanceName', () => {
    //     let variable
    //     beforeEach(async () => {
    //
    //       })//
    //     })
    //     it('what the instance does', () => {
    //       expect(variable.instanceName()).to.be.equal(/* correct output*/)
    //     })
    //   }) // end describe('totalPrice')
  }) // end describe('instanceMethods')
}) // end describe('Order model')
