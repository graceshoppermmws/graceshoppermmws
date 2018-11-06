import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {CardElement, injectStripe} from 'react-stripe-elements'

class CheckoutForm extends Component {
  constructor() {
    super()
    this.state = {complete: false}
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/api/stripe/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id,
      discount: this.props.discount
    })
    console.log(response)
    if (response.ok) {
      toastr.success('Thank you for your purchase!')
      this.setState({complete: true})
      this.props.handleCheckout()
    } else {
      toastr.warning('Payment failed')
    }
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Complete Purchase</button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
