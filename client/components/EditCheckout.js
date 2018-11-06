import React, {Component} from 'react'
import {connect} from 'react-redux'
import {putQuantity, editQuantity} from '../store'

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
    let localStorageCart = JSON.parse(localStorage.getItem('cart'))
    console.log('did mount', localStorageCart)
    this.setState({
      cart: localStorageCart,
      quantity: this.state.quantity
    })
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  handleSubmit(event) {
    toastr.success('Quantity updated!')
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
      this.props.editQuantity(newCart)
      this.setState(
        {
          cart: newCart
        },
        () => console.log('new state', this.state)
      )
      // console.log('product', newCart.products[0].quantity)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <li>
          Quantity:
          <input
            type="text"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <button type="submit">Update Quantity</button>
        </li>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    putQuantity: (product, quantity, userId) =>
      dispatch(putQuantity(product, quantity, userId)),
    editQuantity: cart => dispatch(editQuantity(cart))
  }
}

export default connect(null, mapDispatchToProps)(EditCheckout)
