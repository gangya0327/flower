import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SubHeader from '../nav/subheader'

export default class NewsIndex extends Component {
  pushPage(path, params, id) {
    this.props.history.push({
      pathname: path,
      search: params,
      query: {
        id: id
      }
    })
  }
  pushPage2(path) {
    this.props.history.push(path)
  }
  replactPage(path) {
    this.props.history.replace(path)
  }
  render() {
    return (
      <div>
        <SubHeader></SubHeader>
        <button onClick={this.props.history.goBack}>返回</button>
        <h3>新闻页面</h3>
        <ul>
          <li>
            <Link to='/news/artical/1'>新闻一</Link>
          </li>
          <li>
            <Link to='/news/artical/2'>新闻二</Link>
          </li>
          <li onClick={this.pushPage.bind(this, '/news/artical', '?id=3', 3)}>新闻三</li>
          <li onClick={this.pushPage2.bind(this, '/news/artical?id=4&title=新闻详情')}>新闻四</li>
          <li onClick={this.replactPage.bind(this, '/news/artical?id=5&title=新闻详情')}>新闻五</li>
        </ul>
      </div>
    )
  }
}