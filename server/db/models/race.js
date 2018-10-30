// const crypto = require('crypto')

const Sequelize = require('sequelize')
const db = require('../db')

const Race = db.define('race', {
  govLevel: {
    type: Sequelize.ENUM,
    values: ['Municipal', "State", "Federal"],
    allowNull: false,
  },
  positionAvailable: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  location: {
    type: Sequelize.STRING,
  },
  isDecided: {
    type: Sequelize.BOOLEAN,
  },
  tags:{
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

export default Race;
