import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import store, {getCart, putCheckout} from '../store'
import Order from './Order'

let defaultState = {
  orders: {
    cart: {
      products: []
    }
  }
}

/* move to navbar? creates locals torage cart for first time

let localCart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {products: []}

localStorage.setItem('cart', JSON.stringify(localCart)) */

const data = JSON.parse(localStorage.getItem('cart'))
console.log('strawberry cream pie cart.js data', data)

class Cart extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.getCart()
    } else {
      store.getState()
    }
    console.log('state', this.state)
  }

  handleCheckout() {
    if (this.props.user) {
      this.props.putCheckout(this.props.user.id)
    }
  }

  render() {
    console.log('render')
    return (
      <div>
        {this.props.user.id
          ? this.props.cart[0] && <Order order={this.props.cart[0]} />
          : ''}
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
