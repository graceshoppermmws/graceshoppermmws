import React from 'react'
import EditCheckout from './EditCheckout'

const Order = props => {
  const {id, userId, isCart, isShipped, createdAt, products} = props.order
  const {isAdmin} = props.user || false
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
                  <li>Name: {product.name}</li>
                  <li>Purchase Price: {price}</li>

                  {isAdmin ? (
                    <li>Quantity: {quantity}</li>
                  ) : isCart ? (
                    <div>
                      <EditCheckout
                        quantity={quantity}
                        product={product}
                        userId={userId}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          props.handleDeleteProduct(userId, product.id)
                        }
                      >
                        Remove Item From Cart
                      </button>
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

export default Order
