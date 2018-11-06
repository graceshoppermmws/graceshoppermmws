import React, {Component} from 'react'
import {connect} from 'react-redux'
import {putQuantity} from '../store'
import EditLineItems from './EditLineItems'

class Order extends Component {
  constructor() {
    super()
  }

  // const Order = props => {
  render() {
    const {
      id,
      userId,
      isCart,
      isShipped,
      createdAt,
      products
    } = this.props.order
    const {isAdmin} = this.props.user || false
    let subtotal = 0

    products.forEach(product => {
      const price = product.order_product
        ? product.order_product.historicPrice
        : product.price
      const quantity = product.order_product
        ? product.order_product.quantity
        : product.quantity
      subtotal += price * quantity
    })

    return (
      <div>
        <h3>Order: {id}</h3>
        {isAdmin ? (
          <ul>
            <li>User: {userId}</li>
            <li>is Cart: {isCart ? 'true' : 'false'}</li>
            <li>is Shipped: {isShipped ? 'true' : 'false'}</li>
            <li>Created: {createdAt}</li>{' '}
          </ul>
        ) : (
          ' '
        )}

        <ul>
          <li>
            <ul>
              {products.map(product => {
                const price = product.order_product
                  ? product.order_product.historicPrice
                  : product.price
                const quantity = product.order_product
                  ? product.order_product.quantity
                  : product.quantity
                return (
                  <div key={product.id}>
                    {/* <li>Name: {product.name}</li>
                    <li>Purchase Price: {price}</li>
                    <li>Quantity: {quantity}</li> */}

                    {isAdmin ? (
                      ' '
                    ) : isCart ? (
                      <div>
                        {/* <form
                          onSubmit={() =>
                            this.props.putQuantity({product, quantity}, userId)
                          }
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
                          onClick={() =>
                            this.props.handleDeleteProduct(userId, product.id)
                          }
                        >
                          Remove Item From Cart
                        </button> */}
                        <EditLineItems
                          quantity={quantity}
                          product={product}
                          userId={userId}
                          handleDeleteProduct={this.props.handleDeleteProduct}
                          putQuantity={this.props.putQuantity}
                          handleQtyChange={this.props.handleQtyChange}
                        />
                      </div>
                    ) : (
                      <li>Quantity: {quantity}</li>
                    )}
                  </div>
                )
              })}
            </ul>
            Subtotal: ${subtotal}.00
          </li>
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    putQuantity: (product, quantity, userId) =>
      dispatch(putQuantity(product, quantity, userId))
  }
}

export default connect(null, mapDispatchToProps)(Order)
