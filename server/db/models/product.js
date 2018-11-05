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
      'US House of Representatives District 14',
      'State Senate District 17'
    )
  },
  position: {
    // type: Sequelize.STRING
    type: Sequelize.ENUM('Representative', 'Senator', 'Mayor', 'President')
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
