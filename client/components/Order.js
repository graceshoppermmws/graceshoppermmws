import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const Order = props => {
  const {id, userId, status, createdAt, products} = props.order
  return (
    <div>
      <h3>Order: {id}</h3>
      <ul>
        <li>User: {userId}</li>
        <li>staus: {status}</li>
        <li>created: {createdAt}</li>
        <li>
          <ul>
            {products.map(product => (
              <div key={product.id}>
                <li>Name: {product.name}</li>
                <li>Purchase Price: {product.order_product.historicPrice}</li>
                <li>Quantity: {product.order_product.quantity}</li>
              </div>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default Order