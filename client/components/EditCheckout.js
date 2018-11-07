import React, {Component} from 'react'
import {connect} from 'react-redux'
import {putQuantity, editQuantity, getTotal} from '../store'

class EditCheckout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: props.quantity,
      cart: {
        products: [],
        isCart: true
      },
      subtotal: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let localStorageCart = JSON.parse(localStorage.getItem('cart'))
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
      const products = cart.products
      const newProducts = products.map(item => {
        if (item.id !== this.props.product.id) {
          return item
        } else {
          item.quantity = this.state.quantity
          return item
        }
      })
      localStorage.setItem(
        'cart',
        JSON.stringify({products: newProducts, isCart: true})
      )
      let newCart = JSON.parse(localStorage.getItem('cart'))
      this.props.editQuantity(newCart)
      this.setState({
        cart: newCart
      })
      let subtotal = 0
      newCart.products.forEach(product => {
        const price = product.price
        const quantity = product.quantity
        subtotal += price * quantity
      })
      this.setState({
        subtotal: subtotal
      })
      this.props.getTotal(subtotal)
    }
  }

  render() {
    return (
      <div className="mb-3">
        <form onSubmit={this.handleSubmit}>
          <div>
            Quantity:
            <input
              type="text"
              name="quantity"
              className="form-control"
              required
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <button className="btn btn-primary btn-block" type="submit">
              Update Quantity
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    putQuantity: (product, quantity, userId) =>
      dispatch(putQuantity(product, quantity, userId)),
    editQuantity: cart => dispatch(editQuantity(cart)),
    getTotal: total => dispatch(getTotal(total))
  }
}

export default connect(null, mapDispatchToProps)(EditCheckout)
