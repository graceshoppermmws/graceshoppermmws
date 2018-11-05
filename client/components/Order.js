import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const Order = props => {
  const {id, userId, isCart, status, createdAt, products} = props.order
  return (
    <div>
      <h3>Order: {id}</h3>
      <ul>
        <li>User: {userId}</li>
        <li>status: {status}</li>
        <li>created: {createdAt}</li>
        <li>
          <ul>
            {products.map(product => (
              <div key={product.id}>
                <li>Name: {product.name}</li>
                <li>
                  Purchase Price:{' '}
                  {product.order_product.historicPrice || product.price}
                </li>
                <li>Quantity: {product.order_product.quantity}</li>
                {isCart && (
                  <button
                    type="button"
                    onClick={() =>
                      props.handleDeleteProduct(userId, product.id)
                    }
                  >
                    Delete
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
