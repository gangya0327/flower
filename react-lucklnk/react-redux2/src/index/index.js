import React, {
    Component
} from 'react'
import CounterComponent from './counter'
import { connect } from 'react-redux'
class indexComponent extends Component {
    constructor() {
        super()
        this.amount = 0
    }
    desBtn() {
        this.amount--
        console.log(this.amount)
        this.props.dispatch({ type: 'des', amount: this.amount })
    }
    incBtn() {
        this.amount++
        console.log(this.amount)
        //1 选购商品
        this.props.dispatch({ type: 'inc', amount: this.amount })
    }
    goBack() {
        this.props.history.push('/')
    }
    render() {
        return (
            <div style={{ "padding": "20px" }}>
                <button onClick={this.goBack.bind(this)}>返回</button>
                <CounterComponent></CounterComponent>
                计数器: {this.amount} <br />
                <button onClick={this.desBtn.bind(this)}>-</button>&nbsp;
                <button onClick={this.incBtn.bind(this)}>+</button>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        state: state
    }
})(indexComponent)