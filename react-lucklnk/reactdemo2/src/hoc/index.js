import React, { Component } from 'react'

export default class HocComponent extends Component {
    goBack() {
        this.props.history.goBack()
    }
    goPage(url) {
        this.props.history.push(url)
    }
    render() {
        return (
            <div>
                <h3>高阶组件</h3>
                <button onClick={this.goBack.bind(this)}>返回</button>
                <ul>
                    <li onClick={this.goPage.bind(this, '/hoc/proxy')}>属性代理高阶组件</li>
                    <li onClick={this.goPage.bind(this, '/hoc/extend')}>反向继承高阶组件</li>
                    <li onClick={this.goPage.bind(this, '/hoc/hocs')}>重复使用高阶组件</li>
                </ul>
            </div>
        )
    }
}