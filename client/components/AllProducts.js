import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Product from './Product'
import AddProduct from './AddProduct'
import {getProducts, putCart, putCheckout, editCart, getTags} from '../store'
import EditProduct from './EditProduct'

const defaultState = {
  cart: {
    products: [],
    isCart: true
  },
  filter: ''
}

class AllProducts extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleClick = this.handleClick.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }

  componentDidMount() {
    let localCart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : {products: [], isCart: true}

    localStorage.setItem('cart', JSON.stringify(localCart))
    let data = JSON.parse(localStorage.getItem('cart'))
    this.props.getProducts()
    this.props.getTags()
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
      // check if product is already in cart
      if (products.some(item => item.id === product.id)) {
        // if so update product quantity by 1
        products.map(item => {
          if (item.id === product.id) {
            item.quantity = Number(item.quantity) + Number(quantity)
            return item
          } else {
            return item
          }
        })
        // if product does not exist in cart, push to cart
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

  handleFilter(evt) {
    this.setState({
      filter: evt.target.value
    })
  }

  render() {
    const filterView = this.state.filter
    const admin = this.props.user.isAdmin
    return (
      <div>
        <h2>Candidates For Sale</h2>
        <h4>Filter By Category</h4>
        <select onChange={evt => this.handleFilter(evt)}>
          <option value="">View All</option>
          {this.props.tags.map((tag, i) => (
            <option value={tag} key={i}>
              {tag}
            </option>
          ))}
        </select>
        <ul>
          {filterView
            ? this.props.allProducts
                .filter(
                  product =>
                    filterView === product.districtName ||
                    filterView === product.govLevel ||
                    filterView === product.position
                )
                .map((product, i) => (
                  <li key={i}>
                    <Product product={product} />
                    {!admin ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => this.handleClick(product)}
                        >
                          Buy!
                        </button>
                      </div>
                    ) : (
                      ' '
                    )}
                  </li>
                ))
            : this.props.allProducts.map((product, i) => (
                <li key={i}>
                  <Product product={product} handleClick={this.handleClick} />
                  {/* {!admin ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => this.handleClick(product)}
                      >
                        Buy!
                      </button>
                    </div>
                  ) : (
                    ' '
                  )} */}
                </li>
              ))}
        </ul>
        {admin ? (
          <div>
            <a>Add Candidate</a>
            <AddProduct />{' '}
          </div>
        ) : (
          ' '
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.products.allProducts,
    user: state.user,
    cart: state.orders.cart,
    tags: state.products.allTags
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts()),
    putCart: (product, user) => dispatch(putCart(product, user)),
    putCheckout: (product, user) => dispatch(putCheckout(product, user)),
    editCart: cart => dispatch(editCart(cart)),
    getTags: () => dispatch(getTags())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)

// export default AllProducts
