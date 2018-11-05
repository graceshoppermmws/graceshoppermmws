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
    let response = await fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })
    if (response.ok) this.setState({complete: true})
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
        <Link to="/paysuccess">
          <button>Checkout</button>
        </Link>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
