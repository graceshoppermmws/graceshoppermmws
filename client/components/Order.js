import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const Order = props => {
  const {id, userId, isCart, isShipped, createdAt, products} = props.order
  console.log('mapped order passed down props', props)
  return (
    <div>
      <h3>Order: {id}</h3>
      <ul>
        <li>User: {userId}</li>
        <li>is Cart: {isCart ? 'true' : 'false'}</li>
        <li>is Shipped: {isShipped ? 'true' : 'false'}</li>
        <li>Created: {createdAt}</li>
      </ul>
      <ul>
        <li>
          <ul>
            {products.map(product => (
              <div key={product.id}>
                <li>Name: {product.name}</li>
                <li>
                  Purchase Price:{' '}
                  {product.order_product
                    ? product.order_product.historicPrice
                    : product.price}
                </li>
                <li>
                  Quantity:{' '}
                  {product.order_product
                    ? product.order_product.quantity
                    : product.quantity}
                </li>
                {isCart && (
                  <button
                    type="button"
                    onClick={() =>
                      props.handleDeleteProduct(userId, product.id)
                    }
                  >
                    Remove Item From Cart
                  </button>
                )}
              </div>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default Order
