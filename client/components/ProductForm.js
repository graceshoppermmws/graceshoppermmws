import React from 'react'

const ProductForm = props => {
  return (
    <form onSubmit={props.submitHandler} name={name}>
      <div>
        <label htmlFor="name">
          <small>Name</small>
          <input
            name="name"
            type="text"
            value={props.product.name}
            onChange={props.changeHandler}
          />
        </label>
        <label htmlFor="imageUrl">
          <small>Image</small>
          <input
            name="imageUrl"
            type="text"
            value={props.product.imageUrl}
            onChange={props.changeHandler}
          />
        </label>
        <label htmlFor="bio">
          <small>Bio</small>
          <input
            name="bio"
            type="text"
            value={props.product.bio}
            onChange={props.changeHandler}
          />
        </label>
        <label htmlFor="district">
          <small>District</small>
          <select name="districtName" onChange={props.changeHandler}>
            <option value=""> -- </option>
            <option value="US House of Representatives District 14">
              US House of Representatives District 14
            </option>
            <option value="State Senate District 17">
              State Senate District 17
            </option>
          </select>
        </label>
        <label htmlFor="position">
          <small>Position</small>
          <input
            name="position"
            type="text"
            value={props.product.position}
            onChange={props.changeHandler}
          />
        </label>
        <label htmlFor="inventory">
          <small>Inventory</small>
          <input
            name="inventory"
            type="text"
            value={props.product.inventory}
            onChange={props.changeHandler}
          />
        </label>
        <label htmlFor="price">
          <small>Price</small>
          <input
            name="price"
            type="text"
            value={props.product.price}
            onChange={props.changeHandler}
          />
        </label>
        <label htmlFor="govLevel">
          <small>Level</small>
          <select name="govLevel" onChange={props.changeHandler}>
            <option value=""> -- </option>
            <option value="Municipal">Municipal</option>
            <option value="State">State</option>
            <option value="Federal">Federal</option>
          </select>
        </label>
        <label htmlFor="tags">
          <small>Tags</small>
          <input
            name="tags"
            type="text"
            value={props.product.tags}
            onChange={props.changeHandler}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ProductForm
