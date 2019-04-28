import React, {
    Component
} from 'react'
import { connect } from 'react-redux'
class counterComponent extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <div>子组件计数器：{this.props.state.amount}</div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(counterComponent)