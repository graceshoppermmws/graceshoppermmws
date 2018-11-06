import React, {Component} from 'react'
import {connect} from 'react-redux'
import {putQuantity} from '../store'

class EditLineItems extends Component {
  constructor() {
    super()
    this.state = {quantity: ''}
  }

  render() {
    return (
      <div>
        <form
          onSubmit={() => this.props.putQuantity({product, quantity}, userId)}
        >
          <label>Quantity:</label>
          <input
            type="text"
            name="quantity"
            value={quantity}
            onChange={this.handleChange}
          />
          <button type="submit">Update Quantity</button>
        </form>

        <button
          type="button"
          onClick={() => this.props.handleDeleteProduct(userId, product.id)}
        >
          Remove Item From Cart
        </button>
      </div>
    )
  }
}

export default EditLineItems
