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
    type: Sequelize.ENUM,
    values: [true, false, null]
  },
  //categories like gun control, property prices, issues
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
