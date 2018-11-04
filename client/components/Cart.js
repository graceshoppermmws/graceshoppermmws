import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import store, {getCart, putCheckout} from '../store'
import Order from './Order'

let defaultState = {
  cart: {
    products: []
  }
}

/* move to navbar? creates locals torage cart for first time */

/*let localCart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {isCart: true, products: []}

localStorage.setItem('cart', JSON.stringify(localCart))*/

let data = JSON.parse(localStorage.getItem('cart'))
console.log('strawberry cream pie cart.js data', data)

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
    console.log('state', this.state)
  }

  handleCheckout() {
    if (this.props.user.id) {
      this.props.putCheckout(this.props.user.id)
    } else {
      console.log('handle checkout local storage cart', data)
    }
  }

  render() {
    console.log('render', this.state)
    return (
      <div>
        {this.props.user.id
          ? this.props.cart[0] && <Order order={this.props.cart[0]} />
          : data.products && <Order order={this.state.cart} />}
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
