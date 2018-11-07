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
        <div className="card mb-4 shadow-sm">
          <div className="text-center">
            <Link to={`/products/${id}`}>
              <img
                className="card-image-top"
                src={imageUrl}
                alt="card image cap"
                position="center"
                width="200px"
              />
            </Link>
          </div>
          <div className="card-body">
            <p>Name: {name}</p>
            {this.props.selectedProduct ? <p>Bio: {bio}</p> : ' '}
            <p>District: {districtName}</p>
            <p>Level: {govLevel}</p>
            <p>Position: {position}</p>
            <p>Price: ${price}</p>
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
                    className="form-control"
                    required
                    value={this.state.quantity}
                    onChange={this.handleChange}
                  />
                  <button className="btn btn-primary" type="submit">
                    Add to Cart
                  </button>
                </form>
              )}
            </div>
          </div>
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
