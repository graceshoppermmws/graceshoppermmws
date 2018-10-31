import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_CANDIDATE = 'ADD_CANDIDATE'
const EDIT_CANDIDATE = 'EDIT_CANDIDATE'

/**
 * INITIAL STATE
 */
const defaultCandidatesState = []

/**
 * ACTION CREATORS
 */
export const createdCandidate = candidate => ({
  type: ADD_CANDIDATE,
  candidate
})

export const editedCandidate = (candidateId, candidate) => ({
  type: EDIT_CANDIDATE,
  candidateId,
  candidate
})

/**
 * THUNK CREATORS
 */
export const postCandidate = (raceId, candidate) => {
  return async dispatch => {
    try {
      const response = await axios.post(
        `api/races/${raceId}/candidates`,
        candidate
      )
      const newCandidate = response.data
      const action = createdCandidate(newCandidate)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

export const putCandidate = (raceId, candidateId, candidate) => {
  return async dispatch => {
    try {
      const response = await axios.put(
        `api/races/${raceId}/candidates/${candidateId}`,
        candidate
      )
      const updatedCandidate = response.data
      const action = editedCandidate(candidateId, updatedCandidate)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCandidatesState, action) {
  switch (action.type) {
    case ADD_CANDIDATE: {
      return [...state, action.candidate]
    }
    case EDIT_CANDIDATE: {
      const editedCandidates = state.candidates.map(candidate => {
        if (candidate.id === action.candidateId) {
          return action.candidate
        }
        return candidate
      })
      return [...state, editedCandidates]
    }
    default:
      return state
  }
}
