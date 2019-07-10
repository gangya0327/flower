/**
 * HashRouter 有#号
 * BrowserRouter 没有#号
 * Switch 只要匹配到一个地址就不往下匹配，相当于for循环里的break
 * Link 跳转页面，相当于vue里的router-link
 * exact 完全匹配路由
 */

import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import asyncComponent from "./components/async/AsyncComponent";
// import IndexComponent from './pages/home/index'
const IndexComponent = asyncComponent(() => import("./pages/home/index"));
export default class RouterComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={IndexComponent} />
            </Switch>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}
