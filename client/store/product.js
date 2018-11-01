import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
// const SELECT_PRODUCT = 'SELECT_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProductState = {
  allProducts: []
  // selectedProduct: {}
}

/**
 * ACTION CREATORS
 */
export const gotProducts = products => ({
  type: GET_PRODUCTS,
  products
})

// export const gotSelectedProduct = product => ({
//   type: SELECT_PRODUCT,
//   product
// })

export const createdProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const editedProduct = (productId, product) => ({
  type: EDIT_PRODUCT,
  productId,
  product
})

/**
 * THUNK CREATORS
 */

export const getProducts = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/products')
      const products = response.data
      const action = gotProducts(products)
      dispatch(action)
    } catch (err) {
      // to add toastr
      console.error(err)
    }
  }
}

// export const getSelectedProduct = productId => {
//   return async dispatch => {
//     try {
//       const response = await axios.get(`/api/products/${productId}`)
//       const product = response.data
//       const action = gotSelectedProduct(product)
//       dispatch(action)
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

export const postProduct = product => {
  return async dispatch => {
    try {
      const response = await axios.post('api/products', product)
      const newProduct = response.data
      const action = createdProduct(newProduct)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

export const putProduct = (productId, product) => {
  return async dispatch => {
    try {
      const response = await axios.put(`api/products/${productId}`, product)
      const updatedProduct = response.data
      const action = editedProduct(productId, updatedProduct)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProductState, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {...state, allProducts: action.products}
    }
    // case SELECT_PRODUCT: {
    //   return {...state, selectedProduct: action.Product}
    // }
    case ADD_PRODUCT: {
      return {...state, allProducts: [...state.allProducts, action.product]}
    }
    case EDIT_PRODUCT: {
      const editedProducts = state.allProducts.map(product => {
        if (product.id === action.productId) {
          return action.product
        }
        return product
      })
      return {...state, allProducts: editedProducts}
    }
    default:
      return state
  }
}
