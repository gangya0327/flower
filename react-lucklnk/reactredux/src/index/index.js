import React, { Component } from 'react'
import Counter from './counter'

export default class IndexComponent extends Component {
    constructor() {
        super()
        this.iAmount = 1
    }
    decBtn() {
        this.iAmount--
        console.log(this.iAmount)
    }
    incBtn() {
        this.iAmount++
        this.props.dispatch({ type: "inc", amount: this.iAmount })
    }
    render() {
        return (
            <div>
                <Counter></Counter>
                计数器：0&nbsp;
                <button onClick={this.decBtn.bind(this)}>-</button>&nbsp;
                <button onClick={this.incBtn.bind(this)}>+</button>
            </div>
        )
    }
}