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
  bio: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'http://theotherway.org/wp-content/uploads/2014/08/Coming-soon.jpg'
  },
  hasWon: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  // categories like gun control, property prices, issues
  //we might need a validation to convert the string input into array
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL
  }
})

module.exports = Candidate
