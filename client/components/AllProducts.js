import React, {Component} from 'react'
import {connect} from 'react-redux'
import Product from './Product'
import {getProducts} from '../store/products'

// const allProducts = [
//   {
//     govLevel: 'Federal',
//     positionAvailable: 'Representative',
//     districtName: 'US House of Representatives District 14',
//     id: 1
//   },
//   {
//     govLevel: 'State',
//     positionAvailable: 'Senator',
//     districtName: 'State Senate District 17',
//     id: 2
//   }
// ]

const defaultState = {
  cart: []
}

class AllProducts extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  handleChange(item) {
    const newCart = [...this.state.cart, item]
    this.setState({
      cart: newCart
    })
  }

  render() {
    return (
      <div>
        <p>Candidates For Sale</p>
        <ul>
          {this.props.allProducts.map((product, i) => (
            <li key={i}>
              <Product product={product} />
              <button onClick={() => this.handleChange(product)}>Buy!</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.products.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)

// export default AllProducts
