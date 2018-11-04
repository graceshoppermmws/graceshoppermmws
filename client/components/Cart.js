import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCart, putCheckout} from '../store'
import Order from './Order'

class Cart extends Component {
  // constructor() {
  //   super()
  // }

  componentDidMount() {
    this.props.getCart()
  }

  handleCheckout() {
    this.props.putCheckout(this.props.user.id)
  }

  render() {
    return (
      <div>
        {this.props.cart[0] && <Order order={this.props.cart[0]} />}
        <button onClick={() => this.handleCheckout()}>Checkout</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.orders.cart,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCart: () => dispatch(getCart(ownProps.match.params.userId)),
    putCheckout: user => dispatch(putCheckout(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
