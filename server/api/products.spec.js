/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')
const agent = request.agent(app)
const db = require('../db')
const Product = db.model('product')

describe('Product routes', () => {
  before(() => {
    return db.sync({force: true})
  })

  afterEach(() => {
    return Promise.all([Product.truncate({cascade: true})])
  })

  describe('/api/products/', () => {
    it('responds with an array via JSON', async () => {
      const res = await agent
        .get('/api/products')
        .expect('Content-Type', /json/)
        .expect(200)

      // res.body is the JSON return object
      expect(res.body).to.be.an.instanceOf(Array)
      expect(res.body).to.have.length(0)
    })

    it('returns a product if there is one in the DB', async () => {
      await Product.create({
        name: 'Alexandria Ocasio-Cortez',
        bio:
          'Alexandria Ocasio-Cortez is an American politician, educator, and political activist.',
        districtName: 'US House of Representatives District 14',
        position: 'Representative',
        govLevel: 'Federal',
        inventory: 100,
        price: 100.0
      })

      const res = await agent.get('/api/products').expect(200)

      expect(res.body).to.be.an.instanceOf(Array)
      expect(res.body[0].name).to.equal('Alexandria Ocasio-Cortez')
    })
  }) // end describe('/api/products')

  describe('GET /api/products/:id', () => {
    let coolProduct

    beforeEach(async () => {
      const creatingProducts = [
        {
          name: 'Alexandria Ocasio-Cortez',
          bio:
            'Alexandria Ocasio-Cortez is an American politician, educator, and political activist.',
          districtName: 'US House of Representatives District 14',
          position: 'Representative',
          govLevel: 'Federal',
          inventory: 100,
          price: 100.0
        },
        {
          name: 'Joseph Crowley',
          bio: `Joseph Crowley is an outgoing Democratic representative from New York's 14th Congressional District in the U.S. House. Crowley lost the primary on June 26, 2018. Joseph Crowley is the Working Families Party representative from New York's 14th Congressional District in the U.S. House. Crowley is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.`,
          districtName: 'US House of Representatives District 14',
          position: 'Representative',
          govLevel: 'Federal',
          inventory: 100,
          price: 50.0
        },
        {
          name: 'Anthony Pappas',
          bio: `Anthony Pappas is a Republican candidate for New York's 14th Congressional District in the U.S. House. Pappas is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.`,
          districtName: 'US House of Representatives District 14',
          position: 'Representative',
          govLevel: 'Federal',
          inventory: 100,
          price: 10.0
        }
      ].map(data => Product.create(data))

      const createdProducts = await Promise.all(creatingProducts)
      coolProduct = createdProducts[1]
    })

    it('returns the JSON of the product based on the id', async () => {
      const res = await agent.get('/api/products/' + coolProduct.id).expect(200)

      if (typeof res.body === 'string') {
        res.body = JSON.parse(res.body)
      }
      expect(res.body.name).to.equal('Joseph Crowley')
    })

    /**
     * Here we pass in a bad ID to the URL, we should get a 404 error
     */
    it('returns a 404 error if the ID is not correct', () => {
      return agent.get('/api/products/76142896').expect(404)
    })
  })
}) // end describe('Product routes')
