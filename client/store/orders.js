import axios from 'axios'
import {Certificate} from 'crypto'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const CREATE_ORDER = 'CREATE_ORDER'
const GET_CART = 'GET_CART'
const GET_PAST_ORDERS = 'GET_PAST_ORDERS'
const EDIT_CART = 'EDIT_CART'
const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART'
const CHECKOUT = 'CHECKOUT'
const CREATE_UNAUTH_ORDER = 'CREATE_UNAUTH_ORDER'

/**
 * INITIAL STATE
 */

const defaultOrderState = {
  allOrders: [],
  cart: {},
  pastOrders: []
}

/**
 * ACTION CREATORS
 */
export const gotOrders = allOrders => ({
  type: GET_ORDERS,
  allOrders
})

export const createdOrder = order => ({
  type: CREATE_ORDER,
  order
})

export const gotCart = cart => ({
  type: GET_CART,
  cart
})

export const gotPastOrders = pastOrders => ({
  type: GET_PAST_ORDERS,
  pastOrders
})

export const editCart = cart => ({
  type: EDIT_CART,
  cart
})

export const removedProductFromCart = remainedProducts => ({
  //rename deleteProductFromCart
  type: DELETE_PRODUCT_FROM_CART,
  remainedProducts
})

export const checkedOut = cart => ({
  type: CHECKOUT,
  cart
})
export const createdUnauthOrder = cart => ({
  type: CREATE_UNAUTH_ORDER,
  cart
})

/**
 * THUNK CREATORS
 */

export const getOrders = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/orders')
      if (response) {
        const orders = response.data
        const action = gotOrders(orders)
        dispatch(action)
      }
    } catch (err) {
      // to add toastr
      console.error(err)
    }
  }
}

export const getCart = userId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/users/${userId}/cart`)
      if (response) {
        const cart = response.data
        const action = gotCart(cart)
        dispatch(action)
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export const putCart = ({product, quantity}, userId) => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/users/${userId}/cart`, {
        product,
        quantity
      })
      const cart = response.data
      const action = editCart(cart)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const putCheckout = (userId, discount) => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/users/${userId}/checkout`, {
        discount
      })
      const cart = response.data
      const action = checkedOut(cart)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const getPastOrders = userId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/users/${userId}/past`)
      if (response) {
        const orders = response.data
        const action = gotPastOrders(orders)
        dispatch(action)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const postUnauthOrder = (order, discount) => {
  return async dispatch => {
    try {
      order.discount = discount
      const response = await axios.post('/api/orders/checkout', order)
      const newOrder = response.data
      const action = createdOrder(newOrder)
      dispatch(action)
    } catch (err) {
      // to add toastr
      console.log(err)
    }
  }
}

export const deleteProductFromCart = (userId, productId) => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/users/${userId}/removeitem`, {
        productId
      })
      const remainedProducts = response.data
      const action = removedProductFromCart(remainedProducts)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrderState, action) {
  switch (action.type) {
    case GET_ORDERS: {
      return {...state, allOrders: action.allOrders}
    }
    case CREATE_ORDER: {
      return {...state, allOrders: [...state.allOrders, action.order]}
    }
    case GET_CART: {
      return {...state, cart: action.cart}
    }
    case GET_PAST_ORDERS: {
      return {...state, pastOrders: action.pastOrders}
    }
    case EDIT_CART: {
      return {...state, cart: action.cart}
    }
    case DELETE_PRODUCT_FROM_CART: {
      return {...state, cart: action.remainedProducts}
    }
    case CHECKOUT: {
      return {
        ...state,
        pastOrders: [...state.pastOrders, action.cart],
        cart: {}
      }
    }
    case CREATE_UNAUTH_ORDER: {
      return {
        ...state,
        allOrders: [...state.allOrders, action.cart]
      }
    }
    default:
      return state
  }
}
