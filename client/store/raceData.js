import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CANDIDATES = 'GET_CANDIDATES'
const ADD_CANDIDATE = 'ADD_CANDIDATE'
const EDIT_CANDIDATE = 'EDIT_CANDIDATE'

/**
 * INITIAL STATE
 */
const defaultRaceDataState = []

/**
 * ACTION CREATORS
 */
export const gotCandidates = candidates => ({
  type: GET_CANDIDATES,
  candidates
})

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
export const getCandidates = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/races')
      const candidates = response.data
      const action = gotCandidates(candidates)
      dispatch(action)
    } catch (err) {
      // to add toastr
      console.error(err)
    }
  }
}

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
export default function(state = defaultRaceDataState, action) {
  switch (action.type) {
    case GET_CANDIDATES: {
      return action.candidates
    }
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
      return [...editedCandidates]
    }
    default:
      return state
  }
}
