import React, { Component } from 'react'
import Counter from './counter'
import { connect } from 'react-redux'

class IndexComponent extends Component {
    constructor() {
        super()
        this.state = {}
        this.iAmount = 0
    }
    decBtn() {
        this.iAmount--
        this.props.dispatch({ type: "dec", amount: this.iAmount })
    }
    incBtn() {
        this.iAmount++
        //1. 选购商品
        this.props.dispatch({ type: "inc", amount: this.iAmount })
    }
    render() {
        return (
            <div>
                <Counter></Counter>
                计数器：{this.props.state.amount}&nbsp;
                <button onClick={this.decBtn.bind(this)}>-</button>&nbsp;
                <button onClick={this.incBtn.bind(this)}>+</button>
            </div>
        )
    }
}
//将组件与redux连接
export default connect((state) => {
    return {
        state: state
    }
})(IndexComponent)