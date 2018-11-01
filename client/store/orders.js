import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE
 */

const defaultOrderState = {
  allOrders: []
}

/**
 * ACTION CREATORS
 */
export const gotOrders = orders => ({
  type: GET_ORDERS,
  orders
})

/**
 * THUNK CREATORS
 */

export const getOrders = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/orders')
      const orders = response.data
      const action = gotOrders(orders)
      dispatch(action)
    } catch (err) {
      // to add toastr
      console.error(err)
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
    default:
      return state
  }
}
