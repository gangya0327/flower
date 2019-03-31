import React, { Component } from 'react'
import withHoc from './proxy'

// function NullStatus() {
//     return (
//         <div>我是无状态组件</div>
//     )
// }
// //高阶函数
// function a(a) {
//     console.log(a)
//     return function(b) {
//         console.log(b)
//     }
// }
// a(1)(2)
class HocProxy extends Component {
    goBack() {
        this.props.history.goBack()
    }
    render() {
        return (
            <div id='content'>
                <button onClick={this.goBack.bind(this)}>返回</button>
                属性代理高阶组件:{this.props.name}
                {/* <NullStatus></NullStatus> */}
            </div>
        )
    }
}

export default withHoc(HocProxy)