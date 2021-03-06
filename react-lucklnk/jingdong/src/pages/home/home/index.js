import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import asyncComponent from "../../../components/async/AsyncComponent";
import config from '../../../assets/js/conf/config'
import Css from '../../../assets/css/home/home/index.css'
import { AuthRoute } from '../../../routes/private'

const IndexComponent = asyncComponent(() => import("../index/index"));
const CartComponent = asyncComponent(() => import("../cart/index"));
const UserComponent = asyncComponent(() => import("../../user/index/index"));

class HomeComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bHomeStyle: true,
            bCartStyle: false,
            bUserStyle: false
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.handleNavStyle(this.props)
    }
    componentWillReceiveProps(newProps) {
        this.handleNavStyle(newProps)
    }
    jumpPage(toUrl) {
        this.props.history.push(config.path + toUrl);
    }
    handleNavStyle(props) {
        switch (props.location.pathname) {
            case config.path + "home/index":
                this.setState({
                    bHomeStyle: true,
                    bCartStyle: false,
                    bUserStyle: false
                });
                break;
            case config.path + "home/cart":
                this.setState({
                    bHomeStyle: false,
                    bCartStyle: true,
                    bUserStyle: false
                });
                break;
            case config.path + "home/user":
                this.setState({
                    bHomeStyle: false,
                    bCartStyle: false,
                    bUserStyle: true
                });
                break;
            default:
                break;
        }
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        return (
            <div>
                <React.Fragment>
                    <Switch>
                        <Route path={config.path + "home/index"} component={IndexComponent}></Route>
                        <Route path={config.path + "home/cart"} component={CartComponent}></Route>
                        <AuthRoute path={config.path + "home/user"} component={UserComponent}></AuthRoute>
                    </Switch>
                </React.Fragment>
                <div className={Css['bottom-nav']}>
                    <ul onClick={this.jumpPage.bind(this, 'home/index')}>
                        <li className={this.state.bHomeStyle ? Css['home'] + ' ' + Css['active'] : Css['home']} />
                        <li className={this.state.bHomeStyle ? Css['text'] + ' ' + Css['active'] : Css['text']}>首页</li>
                    </ul>
                    <ul onClick={this.jumpPage.bind(this, 'home/cart')}>
                        <li className={this.state.bCartStyle ? Css['cart'] + ' ' + Css['active'] : Css['cart']} />
                        <li className={this.state.bCartStyle ? Css['text'] + ' ' + Css['active'] : Css['text']}>购物车</li>
                        <li className={this.props.state.cart.aCartData.length === 0 ? Css['spot'] + " hide" : Css['spot']}></li>
                    </ul>
                    <ul onClick={this.jumpPage.bind(this, 'home/user')}>
                        <li className={this.state.bUserStyle ? Css['my'] + ' ' + Css['active'] : Css['my']} />
                        <li className={this.state.bUserStyle ? Css['text'] + ' ' + Css['active'] : Css['text']}>我的</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        state: state
    }
})(HomeComponent)