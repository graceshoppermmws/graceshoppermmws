import React, {Component} from 'react'
// import { connect } from 'react-redux';
import Race from './Race'

const allRaces = [
  {
    govLevel: 'Federal',
    positionAvailable: 'Representative',
    districtName: 'US House of Representatives District 14',
    id: 1
  },
  {
    govLevel: 'State',
    positionAvailable: 'Senator',
    districtName: 'State Senate District 17',
    id: 2
  }
]

const AllRaces = () => {
  return (
    <div>
      <p>HelloWorld</p>
      <ul>
        {allRaces.map((race, i) => (
          <li key={i}>
            <Race race={race} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllRaces
