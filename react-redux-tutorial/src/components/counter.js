import React from 'react';
import { connect } from 'react-redux'
import { increment, decrement, reset } from './action'

function mapStateToProps(state) {
    return {
        count: state.count
    }
}

const mapDispatchToProps = {
    increment, decrement, reset
}

class Counter extends React.Component {
    //   state = { count: 0 }

    increment = () => {
        // this.setState({
        //   count: this.state.count + 1
        // });
        this.props.increment()
    }

    decrement = () => {
        // this.setState({
        //   count: this.state.count - 1
        // });
        this.props.decrement()
    }

    reset = () => {
        this.props.reset()
    }

    render() {
        return (
            <div>
                <h2>Counter</h2>
                <div>
                    <button onClick={this.decrement}>-</button>
                    <span>{this.props.count}</span>
                    <button onClick={this.increment}>+</button>
                    <button onClick={this.reset}>reset</button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
