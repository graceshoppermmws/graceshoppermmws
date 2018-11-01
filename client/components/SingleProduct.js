import React, {Component} from 'react'
import {connect} from 'react-redux'
import Product from './Product'
import EditProduct from './EditProduct'
import {getSelectedProduct} from '../store/products'

class SingleProduct extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getSelectedProduct()
    console.log(this.props.selectedProduct)
  }

  render() {
    console.log(this.props)
    return (
      this.props.selectedProduct && (
        <div>
          <Product product={this.props.selectedProduct} />
          {this.props.selectedProduct.id ? (
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
    selectedProduct: state.products.selectedProduct
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSelectedProduct: () =>
      dispatch(getSelectedProduct(ownProps.match.params.productId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

// export default AllProducts
