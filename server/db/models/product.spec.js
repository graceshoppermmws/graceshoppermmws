/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('productTags', () => {
      let gillibrand
      beforeEach(async () => {
        gillibrand = await Product.create({
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
      }) //
      it('returns tags of user', () => {
        expect(gillibrand.productTags().length).to.be.equal(3)
        expect(gillibrand.productTags().includes('Senator')).to.be.equal(true)
      })
    })
  })
  // end describe('instanceMethods')
}) // end describe('Order model')
