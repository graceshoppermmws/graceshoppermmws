// const crypto = require('crypto')

const Sequelize = require('sequelize')
const db = require('../db')

const Race = db.define('race', {
  govLevel: {
    type: Sequelize.ENUM,
    values: ["Municipal", "State", "Federal"],
    allowNull: false,
  },
  positionAvailable: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: Sequelize.STRING,
  },
  latitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: -90, max: 90 }
  },
  longitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: -180, max: 180 }
  },
  isDecided: {
    type: Sequelize.BOOLEAN,
  },
  tags:{
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

export default Race;
