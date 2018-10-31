// import axios from 'axios'

// /**
//  * ACTION TYPES
//  */
// const GET_RACES = 'GET_RACES'
// const SELECT_RACE = 'SELECT_RACE'
// const ADD_RACE = 'ADD_RACE'
// const EDIT_RACE = 'EDIT_RACE'

// /**
//  * INITIAL STATE
//  */
// const defaultRaceState = {
//   allRaces: [],
//   selectedRace: {}
// }

// /**
//  * ACTION CREATORS
//  */
// export const gotRaces = races => ({
//   type: GET_RACES,
//   races
// })

// export const gotSelectedRace = race => ({
//   type: SELECT_RACE,
//   race
// })

// export const createdRace = race => ({
//   type: ADD_RACE,
//   race
// })

// export const editedRace = (raceId, race) => ({
//   type: EDIT_RACE,
//   raceId,
//   race
// })

// /**
//  * THUNK CREATORS
//  */

// export const getRaces = () => {
//   return async dispatch => {
//     try {
//       const response = await axios.get('/api/races')
//       const races = response.data
//       const action = gotRaces(races)
//       dispatch(action)
//     } catch (err) {
//       // to add toastr
//       console.error(err)
//     }
//   }
// }

// export const getSelectedRace = raceId => {
//   return async dispatch => {
//     try {
//       const response = await axios.get(`/api/races/${raceId}`)
//       const race = response.data
//       const action = gotSelectedRace(race)
//       dispatch(action)
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

// export const postRace = race => {
//   return async dispatch => {
//     try {
//       const response = await axios.post('api/races', race)
//       const newRace = response.data
//       const action = createdRace(newRace)
//       dispatch(action)
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

// export const putRace = (raceId, race) => {
//   return async dispatch => {
//     try {
//       const response = await axios.put(`api/races/${raceId}`, race)
//       const updatedRace = response.data
//       const action = editedRace(updatedRace)
//       dispatch(action)
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

// /**
//  * REDUCER
//  */
// export default function(state = defaultRaceState, action) {
//   switch (action.type) {
//     case GET_RACES: {
//       return {...state, allRaces: action.races}
//     }
//     case SELECT_RACE: {
//       return {...state, selectedRace: action.race}
//     }
//     case ADD_RACE: {
//       return {...state, allRaces: [...state.allRaces, action.race]}
//     }
//     case EDIT_RACE: {
//       const editedRaces = state.allRaces.map(race => {
//         if (race.id === action.raceId) {
//           return action.race
//         }
//         return race
//       })
//       return {...state, allRaces: editedRaces}
//     }
//     default:
//       return state
//   }
// }
