import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store'
import Order from './Order'

const defaultState = {
  allOrders: [],
  filter: ''
}

class AllOrders extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleFilter = this.handleFilter.bind(this)
  }

  componentDidMount() {
    this.props.getOrders()
  }

  handleFilter(evt) {
    this.setState({
      filter: evt.target.value
    })
    console.log('filter view in handle filter', this.state.filter)
  }

  render() {
    console.log('render', this.props.allOrders)
    const filterView = this.state.filter
    return (
      <div>
        <h1>User Orders</h1>
        <h4>Filter By Status</h4>
        <select onChange={evt => this.handleFilter(evt)}>
          <option value="">View All</option>
          <option value="notshipped">Not Shipped</option>
        </select>

        {filterView === 'notshipped' ? (
          <div>
            <h1>Not Shipped</h1>
            {this.props.allOrders
              .filter(order => !order.isShipped)
              .map(order => <Order order={order} key={order.id} />)}
          </div>
        ) : (
          <div>
            <h1>All Orders</h1>{' '}
            {this.props.allOrders.map(order => (
              <Order order={order} key={order.id} />
            ))}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allOrders: state.orders.allOrders,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
