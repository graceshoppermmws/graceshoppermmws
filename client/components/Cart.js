import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCart} from '../store'

class Cart extends Component {
  // constructor() {
  //   super()
  // }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.geCart(userId)
  }

  render() {
    return <div />
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: userId => dispatch(getCart(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
