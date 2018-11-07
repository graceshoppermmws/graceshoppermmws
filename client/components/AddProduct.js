import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postProduct} from '../store'
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

class AddProduct extends Component {
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
    toastr.success('New product added!')
    event.preventDefault()
    const newProduct = await this.props.postProduct(this.state)
    this.setState(defaultState)
  }

  render() {
    return (
      <div>
        <h2>Add Candidate</h2>
        <ProductForm
          product={this.state}
          changeHandler={this.changeHandler}
          submitHandler={this.submitHandler}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postProduct: newProduct => dispatch(postProduct(newProduct))
  }
}

export default connect(null, mapDispatchToProps)(AddProduct)
