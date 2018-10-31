import React, {Component} from 'react'
// import { connect } from 'react-redux';

const allCandidatesPerRace = [
  {
    id: 1,
    name: 'Alexandria Ocasio-Cortez',
    bio:
      'Alexandria Ocasio-Cortez is an American politician, educator, and political activist.',
    imageUrl:
      'http://theotherway.org/wp-content/uploads/2014/08/Coming-soon.jpg',
    hasWon: false,
    tags: null,
    inventory: 100,
    price: '100',
    createdAt: '2018-10-31T15:33:52.301Z',
    updatedAt: '2018-10-31T15:33:52.301Z',
    raceId: 1
  },
  {
    id: 2,
    name: 'Joseph Crowley',
    bio:
      "Joseph Crowley is an outgoing Democratic representative from New York's 14th Congressional District in the U.S. House. Crowley lost the primary on June 26, 2018. Joseph Crowley is the Working Families Party representative from New York's 14th Congressional District in the U.S. House. Crowley is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.",
    imageUrl:
      'http://theotherway.org/wp-content/uploads/2014/08/Coming-soon.jpg',
    hasWon: false,
    tags: null,
    inventory: 100,
    price: '50',
    createdAt: '2018-10-31T15:33:52.306Z',
    updatedAt: '2018-10-31T15:33:52.306Z',
    raceId: 1
  },
  {
    id: 3,
    name: 'Anthony Pappas',
    bio:
      "Anthony Pappas is a Republican candidate for New York's 14th Congressional District in the U.S. House. Pappas is running in the general election on November 6, 2018, after advancing from the primary on June 26, 2018.",
    imageUrl:
      'http://theotherway.org/wp-content/uploads/2014/08/Coming-soon.jpg',
    hasWon: false,
    tags: null,
    inventory: 100,
    price: '10',
    createdAt: '2018-10-31T15:33:52.311Z',
    updatedAt: '2018-10-31T15:33:52.311Z',
    raceId: 1
  }
]

const Race = props => {
  const {districtName, govLevel, positionAvailable} = props.race
  return (
    <div>
      <ul>
        <li>{districtName}</li>
        <li>{govLevel}</li>
        <li>{positionAvailable}</li>
      </ul>
    </div>
  )
}

export default Race
