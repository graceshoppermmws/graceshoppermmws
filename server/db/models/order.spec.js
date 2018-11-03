/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const User = db.model('user')
const Product = db.model('product')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('checkout', () => {
      let testOrder, testShopper, testProduct, associatedOrder, lazyProduct

      beforeEach(async () => {
        testShopper = await User.create({
          email: 'test@shopper.com',
          password: '123',
          isAdmin: false
        })
        testProduct = await Product.create({
          name: 'product1',
          inventory: 444,
          govLevel: 'State',
          price: 44
        })
        lazyProduct = await Product.create({
          name: 'lazyProduct',
          inventory: 555,
          govLevel: 'Federal',
          price: 5
        })
        testOrder = await Order.create({
          isCart: true,
          isShipped: false,
          status: 'Cart',
          userId: testShopper.id
        })
        await testOrder.addProduct(testProduct, {through: {quantity: 44}})
        await testOrder.addProduct(lazyProduct, {through: {quantity: 55}})
        associatedOrder = await Order.findById(testOrder.id, {
          include: {model: Product}
        })
      })

      it('sets status to Processing and isCart to false', () => {
        associatedOrder.checkout()
        expect(associatedOrder.isCart).to.be.equal(false)
        expect(associatedOrder.status).to.be.equal('Processing')
      })
      it('saves historic line item price for the order', () => {
        associatedOrder.checkout()
        expect(associatedOrder.products.length).to.be.equal(2)
        expect(
          associatedOrder.products[0].order_product.historicPrice
        ).to.be.equal(associatedOrder.products[0].price)
        expect(
          associatedOrder.products[1].order_product.historicPrice
        ).to.be.equal(associatedOrder.products[1].price)
      })
    }) // end describe('findCart')
  }) // end describe('classMethods')
}) // end describe('Order model')
