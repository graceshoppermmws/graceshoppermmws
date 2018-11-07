import React, {Component} from 'react'
import {connect} from 'react-redux'
import Product from './Product'
import EditProduct from './EditProduct'
import {getSelectedProduct, putCart} from '../store'

const defaultState = {
  cart: {
    products: [],
    isCart: true
  }
}

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    let localCart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : {products: [], isCart: true}

    localStorage.setItem('cart', JSON.stringify(localCart))
    let data = JSON.parse(localStorage.getItem('cart'))
    this.props.getSelectedProduct()
    if (!this.props.user.id) {
      this.setState({
        cart: data
      })
    }
  }

  handleClick(event, product, quantity) {
    event.preventDefault()
    toastr.success('Item added to cart!')
    if (!this.props.user.id) {
      const products = this.state.cart.products
      if (products.some(item => item.id === product.id)) {
        products.map(item => {
          if (item.id === product.id) {
            item.quantity = Number(item.quantity) + Number(quantity)
            return item
          } else {
            return item
          }
        })
      } else {
        products.push({
          id: product.id,
          name: product.name,
          bio: product.bio,
          districtName: product.districtName,
          price: product.price,
          quantity: quantity
        })
      }
      this.setState({
        cart: {
          products,
          isCart: true
        }
      })
      localStorage.setItem('cart', JSON.stringify(this.state.cart))
    } else {
      this.props.putCart({product, quantity}, this.props.user.id)
    }
  }

  render() {
    const admin = this.props.user.isAdmin
    return (
      this.props.selectedProduct && (
        <div>
          <Product
            product={this.props.selectedProduct}
            handleClick={this.handleClick}
            selectedProduct={this.props.selectedProduct}
          />
          {this.props.selectedProduct.id && admin ? (
            <EditProduct id={this.props.selectedProduct.id} />
          ) : (
            ' '
          )}
        </div>
      )
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.products.selectedProduct,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSelectedProduct: () =>
      dispatch(getSelectedProduct(ownProps.match.params.productId)),
    putCart: (product, user) => dispatch(putCart(product, user))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
