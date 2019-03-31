import React, { Component } from 'react'
import withHoc from './extend'

class HocExtend extends Component {
    goBack() {
        this.props.history.goBack()
    }
    constructor(){
        super()
        this.state = {
            nickname: 'peter'
        }
    }
    render() {
        return (
            <div id='content'>
                <button onClick={this.goBack.bind(this)}>返回</button>
                反向继承高阶组件
            </div>
        )
    }
}

export default withHoc(HocExtend)