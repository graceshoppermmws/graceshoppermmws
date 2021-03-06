import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPastOrders} from '../store'
import Order from './Order'

const defaultState = {
  pastOrders: [],
  filter: ''
}

class PastOrders extends Component {
  constructor() {
    super()
    this.state = defaultState
  }

  componentDidMount() {
    this.props.getPastOrders()
  }

  render() {
    return (
      <div className="cart">
        <h1>Your Past Orders</h1>
        {this.props.pastOrders.map((order, i) => (
          <div>
            <Order key={order.id} order={order} />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pastOrders: state.orders.pastOrders,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPastOrders: () => dispatch(getPastOrders(ownProps.match.params.userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PastOrders)
