import React, {Component} from 'react'
import {connect} from 'react-redux'

class EditLineItems extends Component {
  constructor(props) {
    super(props)
    this.state = {quantity: props.quantity}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.putQuantity(
      this.props.product,
      this.state.quantity,
      this.props.userId
    )
  }

  render() {
    const {product, userId, handleDeleteProduct} = this.props
    return (
      <div>
        <li>Name: {product.name}</li>
        <li>Purchase Price: {product.price}</li>
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

        <button
          type="button"
          onClick={() => handleDeleteProduct(userId, product.id)}
        >
          Remove Item From Cart
        </button>
      </div>
    )
  }
}

export default EditLineItems
