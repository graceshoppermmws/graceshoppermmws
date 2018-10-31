import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {postRace, putRace} from '../store'

/**
 * COMPONENT
 */
const RaceForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const {govLevel, positionAvailable, districtName} = props.race // assume passed through from singleRaceView?
  // need to collect govLevel, positionAvailable, districtName at a minimum

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="govLevel">
            <small>Government Level</small>
          </label>
          <select name="govLevel" value={govLevel}>
            <option value="Municipal">Municipal</option>
            <option value="State">State</option>
            <option value="Federal">Federal</option>
          </select>
        </div>
        <div>
          <label htmlFor="positionAvailable">
            <small>Office</small>
          </label>
          <input
            name="positionAvailable"
            type="text"
            value={positionAvailable}
          />
        </div>
        <div>
          <label htmlFor="districtName">
            <small>District</small>
          </label>
          <input name="districtName" type="text" value={districtName} />
        </div>
        <div>
          <button type="submit">
            {displayName}
            {/*Add or Edit Race*/}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapAddRace = state => {
  return {
    name: 'addRace',
    displayName: 'Add Race',
    error: 'some error' //state.user.error
  }
}

const mapEditRace = state => {
  return {
    name: 'editRace',
    displayName: 'Edit Race',
    error: 'some error' //state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const govLevel = evt.target.govLevel.value
      const positionAvailable = evt.target.positionAvailable.value
      const districtName = evt.target.districtName.value
      const myThunk = formName === 'editRace' ? putRace : postRace
      dispatch(
        myThunk({
          govLevel,
          positionAvailable,
          districtName
        })
      )
    }
  }
}

export const AddRaceForm = connect(mapAddRace, mapDispatch)(RaceForm)
export const EditRaceForm = connect(mapEditRace, mapDispatch)(RaceForm)

/**
 * PROP TYPES
 */
RaceForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
