import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const CREATE_ORDER = 'CREATE_ORDER'
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */

const defaultOrderState = {
  allOrders: [],
  cart: {}
}

/**
 * ACTION CREATORS
 */
export const gotOrders = orders => ({
  type: GET_ORDERS,
  orders
})

export const createdOrder = order => ({
  type: CREATE_ORDER,
  order
})

export const gotCart = cart => ({
  type: GET_CART,
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
      const response = await axios.get(`/api/orders/cart/${userId}`)
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

/**
 * REDUCER
 */
export default function(state = defaultOrderState, action) {
  switch (action.type) {
    case GET_ORDERS: {
      return {...state, allOrders: action.orders}
    }
    case CREATE_ORDER: {
      return {...state, allOrders: [...state.allOrders, action.order]}
    }
    case GET_CART: {
      return {...state, cart: action.cart}
    }
    default:
      return state
  }
}
