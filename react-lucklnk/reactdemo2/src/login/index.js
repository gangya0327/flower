import React, { Component } from 'react'
import SubHeader from '../nav/subheader'

export default class LoginIndex extends Component {
  constructor() {
    super()
    this.state = {
      nickName: ''
    }
  }
  goBack() {
    this.props.history.goBack()
  }
  replactPage(path) {
    this.props.history.replace(path)
  }
  login() {
    localStorage['isLogin'] = true
    localStorage['nickname'] = this.state.nickName
    this.replactPage('/')
  }
  render() {
    return (
      <div>
        <SubHeader></SubHeader>
        <button onClick={this.goBack.bind(this)}>返回</button>
        <h3>会员登录</h3>
        <p>
          用户名<input type="text" onChange={(e) => { this.setState({ nickName: e.target.value }) }} /> <br />
          输入的内容{this.state.nickName}
        </p>
        <button onClick={this.login.bind(this)}>登录</button>
      </div>
    )
  }
}