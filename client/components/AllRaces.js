import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRaces} from '../store/races'
import Race from './Race'

// const allRaces = [
//   {
//     govLevel: 'Federal',
//     positionAvailable: 'Representative',
//     districtName: 'US House of Representatives District 14',
//     id: 1
//   },
//   {
//     govLevel: 'State',
//     positionAvailable: 'Senator',
//     districtName: 'State Senate District 17',
//     id: 2
//   }
// ]

class AllRaces extends Component {
  componentDidMount() {
    this.props.getRaces()
  }

  render() {
    return (
      <div>
        <p>HelloWorld</p>
        <ul>
          {this.props.allRaces.map((race, i) => (
            <li key={i}>
              <Race race={race} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allRaces: state.races.allRaces
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRaces: () => dispatch(getRaces())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllRaces)
