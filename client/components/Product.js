import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const Product = props => {
  const {
    name,
    bio,
    districtName,
    govLevel,
    position,
    imageUrl,
    id
  } = props.product
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
      </ul>
      <div>
        <button type="button" onClick={() => props.handleClick(props.product)}>
          Buy!
        </button>
      </div>
    </div>
  )
}

export default Product
