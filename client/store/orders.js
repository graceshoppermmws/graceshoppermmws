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
const CHECKOUT = 'CHECKOUT'
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

export const checkedOut = cart => ({
  type: CHECKOUT,
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

export const putCart = (product, userId) => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/users/${userId}/cart`, product)
      const cart = response.data
      const action = editCart(cart)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const putCheckout = userId => {
  return async dispatch => {
    try {
      console.log('user', userId)
      const response = await axios.put(`/api/users/${userId}/checkout`)
      const cart = response.data
      const action = checkedOut(cart)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const postOrder = order => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/orders', order)
      const newOrder = response.data
      const action = createdOrder(newOrder)
      dispatch(action)
    } catch (err) {
      // to add toastr
      console.log(err)
    }
  }
}

export const getPastOrders = userId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/orders/past/${userId}`)
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
    case CHECKOUT: {
      return {
        ...state,
        pastOrders: [...state.pastOrders, action.cart],
        cart: {}
      }
    }
    default:
      return state
  }
}
