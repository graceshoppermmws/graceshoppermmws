import React from 'react'
import EditCheckout from './EditCheckout'

const Order = props => {
  const {id, userId, isCart, isShipped, createdAt, products} = props.order
  const {isAdmin} = props.user || false
  const discount = props.discount || 1
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

  subtotal *= discount

  return (
    <div className="container">
      <h3 className="py-5 text-center">Order:</h3>
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

      <div className="row">
        <div className="album py-5">
          <div className="card">
            {products.map(product => {
              const price = product.order_product
                ? product.order_product.historicPrice
                : product.price
              const quantity = product.order_product
                ? product.order_product.quantity
                : product.quantity
              return (
                <div key={product.id}>
                  <div className="mb-3">Name: {product.name}</div>
                  <div className="mb-3">Purchase Price: {price}</div>

                  {isAdmin ? (
                    <div className="mb-3">Quantity: {quantity}</div>
                  ) : isCart ? (
                    <div>
                      <EditCheckout
                        quantity={quantity}
                        product={product}
                        userId={userId}
                      />
                      <button
                        className="btn btn-primary btn-block"
                        type="button"
                        onClick={() =>
                          props.handleDeleteProduct(userId, product.id)
                        }
                      >
                        Remove Item From Cart
                      </button>
                    </div>
                  ) : (
                    <div className="mb-3">Quantity: {quantity}</div>
                  )}
                </div>
              )
            })}
          </div>
          Subtotal: ${subtotal}.00
        </div>
      </div>
    </div>
  )
}

export default Order
