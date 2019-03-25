import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import GoodsDetail from './detail'
import GoodsComment from './comment'
import SubHeader from '../nav/subheader'

export default class GoodsIndex extends Component {
  // constructor(props) {
  //   super(props)
  // }
  pushPage2(path) {
    this.props.history.push(path)
  }
  goBack() {
    this.props.history.goBack()
  }
  replactPage(path) {
    this.props.history.replace(path)
  }
  render() {
    return (
      <div>
        <SubHeader></SubHeader>
        <button onClick={this.goBack.bind(this)}>返回</button>
        <h3>商品页面</h3>
        <button onClick={this.replactPage.bind(this, '/goods/detail')}>详情</button>
        &nbsp;
        <button onClick={this.replactPage.bind(this, '/goods/comment')}>评价</button>
        <div>
          <Switch>
            <Route path='/goods/detail' component={GoodsDetail} />
            <Route path='/goods/comment' component={GoodsComment} />
            <Redirect to='goods/detail'></Redirect>
          </Switch>
        </div>
      </div>
    )
  }
}