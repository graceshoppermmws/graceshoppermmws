import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCart, putCheckout, deleteProductFromCart} from '../store'
import Order from './Order'

class Cart extends Component {
  constructor() {
    super()
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
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
    this.props.putCheckout(this.props.user.id)
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
