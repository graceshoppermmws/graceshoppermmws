import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Product from './Product'
import AddProduct from './AddProduct'
import {getProducts} from '../store/products'
import EditProduct from './EditProduct'

const defaultState = {
  cart: [],
  filter: ''
}

class AllProducts extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
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

  handleFilter(evt) {
    this.setState({
      filter: evt.target.value
    })
  }
  render() {
    const filterView = this.state.filter
    const admin = this.props.user.isAdmin
    console.log('admin', admin)
    return (
      <div>
        <h2>Candidates For Sale</h2>
        {this.state.cart.length ? (
          <h5>
            Your Cart Contains:{this.state.cart.map((cart, i) => (
              <span key={i}>{cart.name}, </span>
            ))}
          </h5>
        ) : (
          <h5>Your Cart is Currently Empty</h5>
        )}
        <h4>Filter By District</h4>
        <select onChange={evt => this.handleFilter(evt)}>
          <option value="">View All</option>
          <option value="US House of Representatives District 14">
            US House of Representatives District 14
          </option>
          <option value="State Senate District 17">
            State Senate District 17
          </option>
        </select>
        <ul>
          {filterView
            ? this.props.allProducts
                .filter(product => filterView === product.districtName)
                .map((product, i) => (
                  <li key={i}>
                    <Product product={product} />
                    {!admin ? (
                      <button
                        type="button"
                        onClick={() => this.handleChange(product)}
                      >
                        Buy!
                      </button>
                    ) : (
                      <EditProduct id={product.id} />
                    )}
                  </li>
                ))
            : this.props.allProducts.map((product, i) => (
                <li key={i}>
                  <Product product={product} />
                  {!admin ? (
                    <button
                      type="button"
                      onClick={() => this.handleChange(product)}
                    >
                      Buy!
                    </button>
                  ) : (
                    <EditProduct id={product.id} />
                  )}
                  <Link to={`/products/${product.id}`}>Single View</Link>
                </li>
              ))}
        </ul>
        {admin ? <AddProduct /> : ' '}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.products.allProducts,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)

// export default AllProducts
