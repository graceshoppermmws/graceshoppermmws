// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {postCandidate} from '../store/raceCandidates'

// const mapDispatch = dispatch => {
//   return {
//     postCandidate: (raceId, newCandidate) =>
//       dispatch(postCandidate(newCandidate))
//   }
// }

// class AddCandidateForm extends Component {
//   constructor() {
//     super()
//     this.state = {}
//   }

//   render() {
//     return (
//       <form onSubmit={handleSubmit} name={name}>
//         <div>
//           <label htmlFor="name">
//             <small>Name</small>
//           </label>
//           <input name="name" type="text" />
//         </div>
//         <div>
//           <label htmlFor="bio">
//             <small>Bio</small>
//           </label>
//           <input name="bio" type="text" />
//         </div>
//         <div>
//           <label htmlFor="imageUrl">
//             <small>Image URL</small>
//           </label>
//           <input name="imageUrl" type="text" />
//         </div>
//         <label htmlFor="Status">
//           <select>
//             <option value="hasWon">Has Won</option>
//             <option selected value="hasNotWon">
//               Has Not Won
//             </option>
//           </select>
//         </label>
//         <div>
//           <label htmlFor="iventory">
//             <small>Inventory</small>
//           </label>
//           <input name="inventory" type="number" />
//         </div>
//         <div>
//           <label htmlFor="price">
//             <small>Price</small>
//           </label>
//           <input name="price" type="number" />
//         </div>
//         <div>
//           <label htmlFor="tags">
//             <small>Tags</small>
//           </label>
//           <input name="tags" type="text" />
//         </div>
//         <div>
//           <button type="submit">{displayName}</button>
//         </div>
//         {/* {error && error.response && <div> {error.response.data} </div>} */}
//       </form>
//     )
//   }
// }
