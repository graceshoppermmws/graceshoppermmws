const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
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
  districtName: {
    type: Sequelize.STRING
  },
  position: {
    type: Sequelize.STRING
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL
  },
  govLevel: {
    type: Sequelize.ENUM('Municipal', 'State', 'Federal'),
    allowNull: false
  }
})

module.exports = Product
