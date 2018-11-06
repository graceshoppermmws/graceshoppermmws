import React, {Component} from 'react'
import {connect} from 'react-redux'
import {putQuantity} from '../store'

class EditCheckout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: props.quantity,
      cart: {
        products: [],
        isCart: true
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (!this.props.userId) {
      let localStorageCart = JSON.parse(localStorage.getItem('cart'))
      console.log('did mount', localStorageCart)
      this.setState({
        cart: localStorageCart
      })
    }
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.props.userId) {
      const productReturn = this.props.product
      const quantityReturn = this.state.quantity
      this.props.putQuantity(productReturn, quantityReturn, this.props.userId)
    } else {
      let cart = JSON.parse(localStorage.getItem('cart'))
      console.log('cart', cart)
      const products = cart.products
      // check if product is already in cart
      const newProducts = products.map(item => {
        if (item.id !== this.props.product.id) {
          return item
        } else {
          item.quantity = this.state.quantity
          return item
        }
      })
      console.log('new products', newProducts)
      localStorage.setItem(
        'cart',
        JSON.stringify({products: newProducts, isCart: true})
      )
      let newCart = JSON.parse(localStorage.getItem('cart'))
      console.log('newCart', newCart)
      this.setState({
        cart: {
          products: newProducts,
          isCart: true
        }
      })
      console.log('new state', this.state)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Quantity:</label>
        <input
          type="text"
          name="quantity"
          value={this.state.quantity}
          onChange={this.handleChange}
        />
        <button type="submit">Update Quantity</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    putQuantity: (product, quantity, userId) =>
      dispatch(putQuantity(product, quantity, userId))
  }
}

export default connect(null, mapDispatchToProps)(EditCheckout)
