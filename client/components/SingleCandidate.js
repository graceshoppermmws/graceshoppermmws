import React, {Component} from 'react'

class SingleCandidate extends Component {
  constructor(props) {
    super(props)
    // this.handleClick = this.handleClick.bind(this)
  }
  // handleClick(e) {
  //   e.preventDefault()
  // }
  render() {
    return (
      <div>
        <h2>{this.props.candidate.name}</h2>
        <br />
        <img src={this.props.candidate.imageUrl} width="300" />
        <br />
        <p>{this.props.candidate.bio}</p>
        <br />
        <p>{this.props.candidate.inventory}</p>
        <br />
        <p>{this.props.candidate.price}</p>
        <br />
        <button type="button" id={this.props.candidate.id}>
          {`Add ${this.props.candidate.name} to cart!`}
        </button>
      </div>
    )
  }
}

export default SingleCandidate
