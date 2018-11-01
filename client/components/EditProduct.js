import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProducts, putProduct, getSelectedProduct} from '../store/products'
import ProductForm from './ProductForm'

const defaultState = {
  name: '',
  bio: '',
  imageUrl: '',
  districtName: '',
  position: '',
  inventory: '',
  price: '',
  govLevel: ''
}

class EditProduct extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async submitHandler(event) {
    event.preventDefault()
    try {
      const updateProduct = await this.props.putProduct(this.props.id, {
        id: this.props.id,
        name: this.state.name,
        bio: this.state.bio,
        imageUrl: this.state.imageUrl,
        districtName: this.state.districtName,
        position: this.state.position,
        inventory: this.state.inventory,
        price: this.state.price,
        govLevel: this.state.govLevel
      })
      await this.props.getProducts()
      await this.props.getSelectedProduct(this.props.id)
    } catch (err) {
      console.error(err)
    }
    // const updateProduct = await this.props.putProduct(this.props.id, this.state)
    this.setState(defaultState)
    // console.log(updateProduct)
  }

  render() {
    return (
      <ProductForm
        product={this.state}
        changeHandler={this.changeHandler}
        submitHandler={this.submitHandler}
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    putProduct: (id, updateProduct) => dispatch(putProduct(id, updateProduct)),
    getProducts: () => dispatch(getProducts()),
    getSelectedProduct: id => dispatch(getSelectedProduct(id))
  }
}

export default connect(null, mapDispatchToProps)(EditProduct)
