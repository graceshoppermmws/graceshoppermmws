import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      products: [
        {
          name: 'Alexandria Ocasio-Cortez',
          bio:
            'Alexandria Ocasio-Cortez is an American politician, educator, and political activist.',
          districtName: 'US House of Representatives District 14',
          position: 'Representative',
          govLevel: 'Federal',
          inventory: 1000,
          price: 100.0
        },
        {
          name: 'Joseph Crowley',
          bio: `Joseph Crowley is an outgoing Democratic representative from New York's 14th Congressional District in the U.S. House. Crowley lost the primary on June 26, 2018. Joseph Crowley is the Working Families Party representative from New York's 14th Congressional District in the U.S. House. Crowley is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.`,
          districtName: 'US House of Representatives District 14',
          position: 'Representative',
          govLevel: 'Federal',
          inventory: 400,
          price: 50.0
        }
      ]
    }
  }
  render() {
    let total = 0
    return (
      <div>
        <h1>Your Cart:</h1>
        {this.state.products.map(product => {
          total = total + product.price
          return (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <h4>{`Candidate: ${product.name}`}</h4>
              </Link>
              <p>{`Price: $${product.price} `}</p>
              <p>Quanity: $ ??? </p>
              <p>{`Only ${product.inventory} left in stock!`}</p>
              <form>
                <label>
                  Change Quantity:
                  <input type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
              </form>
              <button type="button"> Remove </button>
              <br />
              <br />
            </div>
          )
        })}
        <h5>{`Total: $${total}`}</h5>
      </div>
    )
  }
}

export default Cart
