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
        <li>Name: {name}</li>
        <img src={imageUrl} width="80px" />
        <li>Bio: {bio}</li>
        <li>District: {districtName}</li>
        <li>Level: {govLevel}</li>
        <li>Position: {position}</li>
      </ul>
    </div>
  )
}

export default Product
