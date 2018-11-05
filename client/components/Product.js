import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Product extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 100
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({
      quantity: evt.target.value
    })
  }

  render() {
    const {
      name,
      bio,
      districtName,
      govLevel,
      position,
      imageUrl,
      price,
      id
    } = this.props.product
    return (
      <div>
        <ul>
          <Link to={`/products/${id}`}>
            <img src={imageUrl} width="80px" />
            <br />
            <small>click for details</small>
          </Link>
          <li>Name: {name}</li>
          <li>Bio: {bio}</li>
          <li>District: {districtName}</li>
          <li>Level: {govLevel}</li>
          <li>Position: {position}</li>
          <li>Price: ${price}</li>
        </ul>
        <div>
          {!this.props.user.isAdmin && (
            <form
              onSubmit={event =>
                this.props.handleClick(
                  event,
                  this.props.product,
                  this.state.quantity
                )
              }
            >
              <label>Quantity:</label>
              <input
                type="text"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
              <button type="submit">Add to Cart</button>
            </form>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Product)
