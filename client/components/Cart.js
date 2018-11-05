import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {
  getCart,
  putCheckout,
  postUnauthOrder,
  deleteProductFromCart
} from '../store'
import Order from './Order'

let defaultState = {
  cart: {
    products: []
  }
}

class Cart extends Component {
  constructor() {
    super()
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
    this.state = defaultState
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
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

  handleDeleteProduct(userId, productId) {
    this.props.deletedProductFromCart(userId, productId)
    this.props.history.push(`orders/cart/${userId}`)
  }

  handleCheckout() {
    if (this.props.user.id) {
      this.props.putCheckout(this.props.user.id)
    } else {
      let localStorageCart = JSON.parse(localStorage.getItem('cart'))
      this.props.postUnauthOrder(localStorageCart)
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
          ? this.props.cart[0] && (
              <Order
                order={this.props.cart[0]}
                handleDeleteProduct={this.handleDeleteProduct}
              />
            )
          : this.state.cart.products && (
              <Order
                order={this.state.cart}
                handleDeleteProduct={this.handleDeleteProduct}
              />
            )}
        <Link to="/thankyou">
          <button onClick={() => this.handleCheckout()}>Checkout</button>
        </Link>
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
    putCheckout: user => dispatch(putCheckout(user)),
    postUnauthOrder: cart => dispatch(postUnauthOrder(cart)),
    deletedProductFromCart: (userId, productId) =>
      dispatch(deleteProductFromCart(userId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
