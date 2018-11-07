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
    // type: Sequelize.ARRAY(Sequelize.STRING)
    type: Sequelize.ENUM(
      'State Senate District 17',
      'US House of Representatives District 1',
      'US House of Representatives District 2',
      'US House of Representatives District 3',
      'US House of Representatives District 6',
      'US House of Representatives District 14',
      'US House of Representatives District 15',
      'US House of Representatives District 19'
    )
  },
  position: {
    // type: Sequelize.STRING
    type: Sequelize.ENUM('Representative', 'Senator')
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL
  },
  govLevel: {
    type: Sequelize.ENUM('Federal'),
    allowNull: false
  }
})

Product.prototype.productTags = function() {
  const tags = [this.districtName, this.position, this.govLevel]
  return tags
}

Product.allProductTags = function() {
  const allTags = [
    ...Product.rawAttributes.position.values,
    ...Product.rawAttributes.govLevel.values,
    ...Product.rawAttributes.districtName.values
  ]
  return allTags
}

module.exports = Product
