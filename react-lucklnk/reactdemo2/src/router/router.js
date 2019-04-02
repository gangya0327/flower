import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import App from '../App';
import NewsIndex from '../news/index'
import NewsArtical from '../news/artical';
import GoodsIndex from '../goods/index';
import ProfileIndex from '../profile/index'
import LoginIndex from '../login/index'
import { PrivateRoute } from './private'
import HocComponent from '../hignOrderComponent'
import HocProxy from '../hoc/HocProxy'
import HocExtend from '../hoc/HocExtend'
import HocHocs from '../hoc/HocHocs'

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
                <Route exact path='/hoc' component={HocComponent} />
                <Route path='/hoc/proxy' component={HocProxy} />
                <Route path='/hoc/extend' component={HocExtend} />
                <Route path='/hoc/hocs' component={HocHocs} />
              </Switch>
            </Fragment>
          </Router>
        </Fragment>
      </div>
    )
  }
}