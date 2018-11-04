import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
// import {getCart, putCheckout} from '../store'
import {injectStripe, Elements} from 'react-stripe-elements'
import CheckoutForm from '../components/'

class Cart extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <div>
        <Elements>
          <CheckoutForm />
        </Elements>
      </div>
    )
  }
}

export default injectStripe(Cart)
