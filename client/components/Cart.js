import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCart} from '../store'
import Order from './Order'

class Cart extends Component {
  // constructor() {
  //   super()
  // }

  componentDidMount() {
    console.log('MOUNTED')
    this.props.getCart()
  }

  render() {
    console.log('LLLLLL', this.props.cart[0])
    return (
      <div>{this.props.cart[0] && <Order order={this.props.cart[0]} />}</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.orders.cart,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCart: () => dispatch(getCart(ownProps.match.params.userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
