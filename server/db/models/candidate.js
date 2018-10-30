// const crypto = require('crypto')

const Sequelize = require('sequelize')
const db = require('../db')

const Candidate = db.define('candidate', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  positionSought: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  bio: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://theotherway.org/wp-content/uploads/2014/08/Coming-soon.jpg'
  },
  location: {
    type: Sequelize.STRING,
  },
  hasWon: {
    type: Sequelize.ENUM,
    values: [true, false, null]
  },
  tags:{
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

export default Candidate;
