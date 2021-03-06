import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => {
  const pastOrdersLink = `/pastorders/${user.id}`
  const cartLink = `/cart/${user.id}`
  return (
    <div>
      <nav>
        <h3>Candidates For Sale!</h3>
        {isLoggedIn ? (
          user.isAdmin ? (
            <div>
              {/* The navbar will show these links if you are an admin */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              <Link to="/products">All Candidates</Link>
              <Link to="/orders">All Orders</Link>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              <Link to="/products">All Candidates</Link>
              <Link to={cartLink}>Your Cart</Link>
              <Link to={pastOrdersLink}>Your Past Orders</Link>
            </div>
          )
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/products">All Candidates</Link>
            <Link to="/cart">Your Cart</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
