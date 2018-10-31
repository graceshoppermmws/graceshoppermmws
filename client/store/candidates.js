import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CANDIDATES = 'GET_CANDIDATES'

/**
 * INITIAL STATE
 */
const defaultCandidateState = []

/**
 * ACTION CREATORS
 */
export const gotCandidates = candidates => ({
  type: GET_CANDIDATES,
  candidates
})

/**
 * THUNK CREATORS
 */
export const getCandidates = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/candidates')
      const candidates = response.data
      const action = gotCandidates(candidates)
      dispatch(action)
    } catch (err) {
      // to add toastr
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCandidateState, action) {
  switch (action.type) {
    case GET_CANDIDATES: {
      return action.candidates
    }
    default:
      return state
  }
}
