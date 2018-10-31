// import React from 'react'
// import {connect} from 'react-redux'
// // import PropTypes from 'prop-types'

// /**
//  * COMPONENT
//  */
// const CandidateForm = props => {
//   //   const {name, displayName, handleSubmit, error} = props

//   return (
//     <form onSubmit={handleSubmit} name={name}>
//       <div>
//         <label htmlFor="name">
//           <small>Name</small>
//         </label>
//         <input name="name" type="text" />
//       </div>
//       <div>
//         <label htmlFor="bio">
//           <small>Bio</small>
//         </label>
//         <input name="bio" type="text" />
//       </div>
//       <div>
//         <label htmlFor="imageUrl">
//           <small>Image URL</small>
//         </label>
//         <input name="imageUrl" type="text" />
//       </div>
//       <label htmlFor="Status">
//         <select>
//           <option value="hasWon">Has Won</option>
//           <option selected value="hasNotWon">
//             Has Not Won
//           </option>
//         </select>
//       </label>
//       <div>
//         <label htmlFor="iventory">
//           <small>Inventory</small>
//         </label>
//         <input name="inventory" type="number" />
//       </div>
//       <div>
//         <label htmlFor="price">
//           <small>Price</small>
//         </label>
//         <input name="price" type="number" />
//       </div>
//       <div>
//         <label htmlFor="tags">
//           <small>Tags</small>
//         </label>
//         <input name="tags" type="text" />
//       </div>
//       <div>
//         <button type="submit">{displayName}</button>
//       </div>
//       {/* {error && error.response && <div> {error.response.data} </div>} */}
//     </form>
//   )
// }

// /**
//  * CONTAINER
//  *   Note that we have two different sets of 'mapStateToProps' functions -
//  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
//  *   function, and share the same Component. This is a good example of how we
//  *   can stay DRY with interfaces that are very similar to each other!
//  */
// const mapAddCandidate = state => {
//   return {
//     name: 'addCandidate',
//     displayName: 'Add Candidate'
//   }
// }

// const mapSignup = state => {
//   return {
//     name: 'editCandidate',
//     displayName: 'Edit Candidate'
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const email = evt.target.email.value
//       const password = evt.target.password.value
//       dispatch(auth(email, password, formName))
//     }
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

// /**
//  * PROP TYPES
//  */
// // AuthForm.propTypes = {
// //   name: PropTypes.string.isRequired,
// //   displayName: PropTypes.string.isRequired,
// //   handleSubmit: PropTypes.func.isRequired,
// //   error: PropTypes.object
// // }
