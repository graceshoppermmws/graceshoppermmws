import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCart, putCheckout, deleteProductFromCart} from '../store'
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

  async handleDeleteProduct(userId, productId) {
    try {
      await this.props.deletedProductFromCart(userId, productId)
    } catch (err) {
      console.log(err)
    }
    this.props.history.push(`orders/cart/${userId}`)
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
        {this.props.cart[0] && (
          <Order
            order={this.props.cart[0]}
            handleDeleteProduct={this.handleDeleteProduct}
          />
        )}
        <button onClick={() => this.handleCheckout()}>Checkout</button>
        {this.props.user.id
          ? this.props.cart[0] && <Order order={this.props.cart[0]} />
          : this.state.cart.products && <Order order={this.state.cart} />}
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
    deletedProductFromCart: (userId, productId) =>
      dispatch(deleteProductFromCart(userId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
