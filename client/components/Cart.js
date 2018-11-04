import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCart, putCheckout} from '../store'
import Order from './Order'

let defaultState = {
  cart: {
    products: []
  }
}

class Cart extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.getCart()
    } else {
      let localStorageCart = JSON.parse(localStorage.getItem('cart'))
      this.setState({
        cart: localStorageCart
      })
    }
  }

  handleCheckout() {
    if (this.props.user.id) {
      this.props.putCheckout(this.props.user.id)
    } else {
      localStorage.setItem('cart', JSON.stringify({products: []}))
      let emptyCart = JSON.parse(localStorage.getItem('cart'))
      this.setState({
        cart: emptyCart
      })
    }
  }

  render() {
    return (
      <div>
        {this.props.user.id
          ? this.props.cart[0] && <Order order={this.props.cart[0]} />
          : this.state.cart.products && <Order order={this.state.cart} />}
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
