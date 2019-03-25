import React, { Component } from 'react'
import SubHeader from '../nav/subheader'

export default class PrifileIndex extends Component {
  pushPage2(path) {
    this.props.history.push(path)
  }
  goBack() {
    this.props.history.goBack()
  }
  replactPage(path) {
    this.props.history.replace(path)
  }

  logout() {
    localStorage.removeItem('nickname')
    localStorage.removeItem('isLogin')
    this.replactPage('/')
  }
  render() {
    return (
      <div>
        <SubHeader></SubHeader>
        <button onClick={this.goBack.bind(this)}>返回</button>
        <h3>个人资料</h3>
        <p>
          用户名：{localStorage['nickname']} <br />
        </p>
        <button onClick={this.logout.bind(this)}>退出登录</button>
      </div>
    )
  }
}