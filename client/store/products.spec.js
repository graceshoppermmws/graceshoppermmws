import {expect} from 'chai'
// import { createStore } from 'redux';

// You will write these functions
import {
  gotProducts,
  gotSelectedProduct,
  createdProduct,
  editedProduct
} from './products'

const products = [
  {
    id: 1,
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
    id: 2,
    name: 'Joseph Crowley',
    bio: `Joseph Crowley is an outgoing Democratic representative from New York's 14th Congressional District in the U.S. House. Crowley lost the primary on June 26, 2018. Joseph Crowley is the Working Families Party representative from New York's 14th Congressional District in the U.S. House. Crowley is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.`,
    districtName: 'US House of Representatives District 14',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 50.0
  },
  {
    id: 3,
    name: 'Anthony Pappas',
    bio: `Anthony Pappas is a Republican candidate for New York's 14th Congressional District in the U.S. House. Pappas is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.`,
    districtName: 'US House of Representatives District 14',
    position: 'Representative',
    govLevel: 'Federal',
    inventory: 100,
    price: 10.0
  }
]

function getRandomProduct(arrayOfProducts) {
  return arrayOfProducts[Math.floor(Math.random() * arrayOfProducts.length)]
}

describe('Action creators', () => {
  describe('gotProducts', () => {
    it('returns properly formatted action', () => {
      expect(gotProducts(products)).to.be.deep.equal({
        type: 'GET_PRODUCTS',
        products
      })
    })
  })

  describe('gotSelectedProduct', () => {
    it('returns properly formatted action', () => {
      const product = getRandomProduct(products)
      expect(gotSelectedProduct(product)).to.be.deep.equal({
        type: 'SELECT_PRODUCT',
        product
      })
    })
  })

  describe('createdProduct', () => {
    it('returns properly formatted action', () => {
      const product = getRandomProduct(products)

      expect(createdProduct(product)).to.be.deep.equal({
        type: 'ADD_PRODUCT',
        product
      })
    })
  })

  describe('editedProduct', () => {
    it('returns properly formatted action', () => {
      const product = getRandomProduct(products)

      expect(editedProduct(product.id, product)).to.be.deep.equal({
        type: 'EDIT_PRODUCT',
        productId: product.id,
        product
      })
    })
  })
}) // end Action creators
