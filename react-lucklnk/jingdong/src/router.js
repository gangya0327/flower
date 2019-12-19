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
const GoodsClassify = asyncComponent(() => import("./pages/home/goods/classify"));
const GoodsSearch = asyncComponent(() => import("./pages/home/goods/search"));
const GoodsDetails = asyncComponent(() => import("./pages/home/goods/details"));
const LoginIndex = asyncComponent(() => import("./pages/home/login/index"));
const RegIndex = asyncComponent(() => import("./pages/home/reg/index"));
const BalanceIndex = asyncComponent(() => import("./pages/home/balance/index"));

export default class RouterComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Switch>
              <Route path={config.path + "home"} component={HomeComponent} />
              <Route path={config.path + "goods/classify"} component={GoodsClassify} />
              <Route path={config.path + "goods/search"} component={GoodsSearch} />
              <Route path={config.path + "goods/details"} component={GoodsDetails} />
              <Route path={config.path + "login/index"} component={LoginIndex} />
              <Route path={config.path + "reg/index"} component={RegIndex} />
              <Route path={config.path + "balance/index"} component={BalanceIndex} />
              <Redirect to={config.path + "home/index"}></Redirect>
            </Switch>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}
