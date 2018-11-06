import React, {Component} from 'react'

class EditCheckout extends Component {
  render() {
    return (
      <form onSubmit={props.handleSubmit}>
        <label>Quantity:</label>
        <input
          type="text"
          name="quantity"
          value={props.quantity}
          onChange={props.handleChange}
        />
        <button type="submit">Update Quantity</button>
      </form>
    )
  }
}
