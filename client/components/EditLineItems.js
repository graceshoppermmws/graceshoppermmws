import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store'

class EditLineItems extends Component {
  constructor(props) {
    super(props)
    this.state = {quantity: props.quantity}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // componentDidMount() {
  //   this.props.getCart(this.props.userId)
  // }

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
    this.props.handleQtyChange()
    this.forceUpdate()
    // this.props.history.push(`/cart/${this.props.userId}`)
  }

  render() {
    const {product, userId, handleDeleteProduct} = this.props
    return (
      <div>
        <li>Name: {product.name}</li>
        <li>Purchase Price: {product.price}</li>
        <li>Quantity: {this.props.quantity}</li>
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

// const mapDispatchToProps = dispatch => {
//   return {
//     getCart: id => dispatch(getCart(id))
//   }
// }

// export default connect(null, mapDispatchToProps)(EditLineItems)
export default EditLineItems
