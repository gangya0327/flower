/**
 * HashRouter 有#号
 * BrowserRouter 没有#号
 * Switch 只要匹配到一个地址就不往下匹配，相当于for循环里的break
 * Link 跳转页面，相当于vue里的router-link
 * exact 完全匹配路由
 */

import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import asyncComponent from "./components/async/AsyncComponent";
import config from './assets/js/conf/config'
// import IndexComponent from './pages/home/index'

const HomeComponent = asyncComponent(() => import("./pages/home/home/index"));

export default class RouterComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Switch>
              <Route path={config.path + "home"} component={HomeComponent} />
              <Redirect to={config.path + "home/index"}></Redirect>
            </Switch>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}
