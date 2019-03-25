import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

class SubHeader extends Component {
  goBack() {
    // this.context.router.history.goBack()
    this.props.history.goBack()
  }
  render() {
    return (
      <div>
        <button onClick={this.goBack.bind(this)}>返回</button>
        &nbsp;
        子组件导航条
        <hr />
      </div>
    )
  }
}

// SubHeader.contextTypes = {
//   router: PropTypes.object.isRequired
// }
export default withRouter(SubHeader)