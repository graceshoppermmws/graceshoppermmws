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
  discount: 1,
  discountCode: '',
  cart: {
    products: [],
    isCart: true
  }
}

class Cart extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
    this.handleDiscount = this.handleDiscount.bind(this)
    this.handleDiscountChange = this.handleDiscountChange.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.userId) {
      this.props.getCart(this.props.match.params.userId)
    } else {
      let localStorageCart = JSON.parse(localStorage.getItem('cart'))
      this.setState({
        cart: localStorageCart
      })
    }
  }

  handleDiscountChange(evt) {
    const code = evt.target.value
    console.log('CODE', code)
    this.setState({discountCode: code})
  }

  handleDiscount(evt) {
    evt.preventDefault()
    if (this.state.discountCode === 'LUIGIWUZHERE') {
      this.setState({discount: 0.5})
      toastr.success('OUAHAHAHAHA')
    } else {
      toastr.warning('Your discount code is in another castle')
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
    const discount = this.state.discount
    // const cart = this.props.user.id
    //   ? this.props.cart[0] ? this.props.cart[0] : {isCart: true, products: []}
    //   : this.state.cart
    let cart = {}
    if (this.props.user.id) {
      if (this.props.cart.products) {
        cart = this.props.cart
      } else {
        cart = {isCart: true, products: []}
      }
    } else { 
      if (this.state.cart.products) {
        cart = this.state.cart
      } else {
        cart = {isCart: true, products: []}
      }
    }
    return (
      <div>
        <Order
          discount={discount}
          user={this.props.user}
          order={cart}
          handleDeleteProduct={this.handleDeleteProduct}
        />
        <form onSubmit={this.handleDiscount}>
          <label>Promo Code:</label>
          <input
            type="text"
            onChange={this.handleDiscountChange}
            value={this.state.discountCode}
          />
          <button type="submit">Enter</button>
        </form>
        {cart.products.length ? (
          <Elements>
            <CheckoutForm handleCheckout={this.handleCheckout} />
          </Elements>
        ) : (
          <h2>Your Cart is Currently Empty</h2>
        )}
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

const mapDispatchToProps = dispatch => {
  return {
    getCart: userId => dispatch(getCart(userId)),
    putCheckout: user => dispatch(putCheckout(user)),
    postUnauthOrder: cart => dispatch(postUnauthOrder(cart)),
    deletedProductFromCart: (userId, productId) =>
      dispatch(deleteProductFromCart(userId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
