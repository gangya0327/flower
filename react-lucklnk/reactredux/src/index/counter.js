import React, { Component } from 'react'
import { connect } from 'react-redux'

class Counter extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        return (
            <div>计数器：{this.props.state.counter}</div>
        )
    }
}

//将组件与redux连接
export default connect((state) => {
    return {
        state: state
    }
})(Counter)