import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import App from '../App';
import NewsIndex from '../news/index'
import NewsArtical from '../news/artical';
import GoodsIndex from '../goods/index';
import ProfileIndex from '../profile/index'
import LoginIndex from '../login/index'
import { PrivateRoute } from './private'

export default class RouterComponent extends Component {
  render() {
    return (
      <div>
        <Fragment>
          <Router>
            <Fragment>
              <Switch>
                <Route exact path='/' component={App} />
                <Route path='/news/index' component={NewsIndex} />
                {/* <Route path='/news/artical/:id' component={NewsArtical} /> */}
                <Route path='/news/artical' component={NewsArtical} />
                <Route path='/goods' component={GoodsIndex} />
                <PrivateRoute path='/profile' component={ProfileIndex} />
                <Route path='/login' component={LoginIndex} />
              </Switch>
            </Fragment>
          </Router>
        </Fragment>
      </div>
    )
  }
}