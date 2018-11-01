import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postProduct} from '../store/products'

class AddProduct extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      bio: '',
      imageUrl: '',
      districtName: '',
      postition: '',
      inventory: 0,
      price: 0,
      govLevel: ''
    }
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
    const newProduct = await this.props.postProduct(this.state)
    console.log(newProduct)
  }

  render() {
    return (
      <form onSubmit={this.submitHandler} name={name}>
        <div>
          <label htmlFor="name">
            <small>Name</small>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.changeHandler}
            />
          </label>
          <label htmlFor="bio">
            <small>Bio</small>
            <input
              name="bio"
              type="text"
              value={this.state.bio}
              onChange={this.changeHandler}
            />
          </label>
          <label htmlFor="district">
            <small>District</small>
            <input
              name="district"
              type="text"
              value={this.state.district}
              onChange={this.changeHandler}
            />
          </label>
          <label htmlFor="inventory">
            <small>Inventory</small>
            <input
              name="inventory"
              type="text"
              value={this.state.inventory}
              onChange={this.changeHandler}
            />
          </label>
          <label htmlFor="govLevel">
            <small>Level</small>
            <select name="govLevel" onChange={this.changeHandler}>
              <option value="Municipal">Municipal</option>
              <option value="State">State</option>
              <option value="Federal">Federal</option>
            </select>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postProduct: newProduct => dispatch(postProduct(newProduct))
  }
}

export default connect(null, mapDispatchToProps)(AddProduct)
