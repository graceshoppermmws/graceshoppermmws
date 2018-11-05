import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Elements} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'

import {
  getCart,
  putCheckout,
  postUnauthOrder,
  deleteProductFromCart
} from '../store'
import Order from './Order'

let defaultState = {
  cart: {
    products: [],
    isCart: true
  }
}

class Cart extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
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
    toastr.success('Item removed!')
    if (this.props.user.id) {
      this.props.deletedProductFromCart(userId, productId)
    } else {
      const products = this.state.cart.products
      // check if product is already in cart
      const newProducts = products.filter(item => item.id !== productId)
      this.setState({
        cart: {
          products: newProducts,
          isCart: true
        }
      })
      localStorage.setItem(
        'cart',
        JSON.stringify({products: newProducts, isCart: true})
      )
    }
  }

  handleCheckout() {
    if (this.props.user.id) {
      this.props.putCheckout(this.props.user.id)
    } else {
      let localStorageCart = JSON.parse(localStorage.getItem('cart'))
      this.props.postUnauthOrder(localStorageCart)
      localStorage.setItem('cart', JSON.stringify({isCart: true, products: []}))
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
                user={this.props.user}
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
        
          <Elements>
            <CheckoutForm handleCheckout={this.handleCheckout} />
          </Elements>
        
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
