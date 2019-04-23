import React, {
    Component
} from 'react'
import CounterComponent from './counter'
export default class indexComponent extends Component {
    constructor() {
        super()
        this.state = {

        }
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
        this.props.dispatch({ type: 'inc', amount: this.amount })
    }
    render() {
        return (
            <div>
                <CounterComponent></CounterComponent>
                计数器: {this.amount} <br />
                <button onClick={this.desBtn.bind(this)}>-</button>
                <button onClick={this.incBtn.bind(this)}>+</button>
            </div>
        )
    }
}