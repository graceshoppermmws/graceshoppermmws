import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store'
import Order from './Order'

const defaultState = {
  allOrders: [],
  filter: ''
}

class AllOrders extends Component {
  constructor() {
    super()
    this.state = defaultState
  }

  componentDidMount() {
    this.props.getOrders()
  }

  render() {
    return this.props.allOrders.map(order => (
      // <div key={order.id}>{order.id}</div>
      <Order key={order.id} order={order} />
    ))
  }
}

const mapStateToProps = state => {
  return {
    allOrders: state.orders.allOrders,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
