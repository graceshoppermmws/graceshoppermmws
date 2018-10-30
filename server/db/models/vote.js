// const crypto = require('crypto')

const Sequelize = require('sequelize')
const db = require('../db')

const Vote = db.define('vote', {
  isSold: {
    type: Sequelize.BOOLEAN,
  },
  voteFor: {
    type: Sequelize.STRING
  }
})

export default Race;
