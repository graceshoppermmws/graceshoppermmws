import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSelectedRace} from '../store/races'
// import SingleCandidate from './SingleCandidate'

class SingleRace extends Component {
  componentDidMount() {
    console.log('did mount')
    this.props.getSelectedRace()
  }

  render() {
    console.log(this.props.selectedRace)
    return (
      this.props.selectedRace.candidates && (
        <div>
          <p>HelloWorld</p>
          <ul>
            {this.props.selectedRace.candidates.map((candidate, i) => (
              <li key={i}>
                {/* <SingleCandidate candidate={candidate} /> */}
                {candidate.name}
              </li>
            ))}
          </ul>
        </div>
      )
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedRace: state.races.selectedRace
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSelectedRace: () =>
      dispatch(getSelectedRace(ownProps.match.params.raceId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleRace)
