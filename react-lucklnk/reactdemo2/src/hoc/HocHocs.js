import React, { Component } from 'react'
import WithHoc from './hocs'

const Hoc1 = WithHoc((props) => {
    console.log(props)
    return (
        <div>第一个高阶组件{props.children}</div>
    )
})
const Hoc2 = WithHoc(({ children }) => {
    return (
        <div>第一个高阶组件{children}</div>
    )
})
const RegUser = WithHoc((props) => {
    return (
        <div>
            <input type="text" placeholder='输入用户名' {...props.username} /><br />
            <input type="password" placeholder='输入密码' {...props.pwd} /><br />
            <button {...props.submit}>注册</button>
        </div>
    )
},'注册成功')
const LogUser = WithHoc((props) => {
    return (
        <div>
            <input type="text" placeholder='输入用户名' {...props.username} /><br />
            <input type="password" placeholder='输入密码' {...props.pwd} /><br />
            <button {...props.submit}>登录</button>
        </div>
    )
},'登录成功')

export default class HocHocs extends Component {
    goBack() {
        this.props.history.goBack()
    }
    render() {
        return (
            <div>
                <button onClick={this.goBack.bind(this)}>返回</button>
                属性代理高阶组件
                <Hoc1>
                    <ul>
                        <li>第一个高阶组件的内容</li>
                    </ul>
                </Hoc1>
                <Hoc2>
                    <ul>
                        <li>第二个高阶组件的内容</li>
                    </ul>
                </Hoc2>
                <RegUser></RegUser>
                <LogUser></LogUser>
            </div>
        )
    }
}