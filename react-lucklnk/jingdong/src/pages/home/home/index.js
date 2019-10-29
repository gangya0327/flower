import React from 'react'
import { Route, Switch } from 'react-router-dom'
import asyncComponent from "../../../components/async/AsyncComponent";
import config from '../../../assets/js/conf/config'
import Css from '../../../assets/css/home/home/index.css'

const IndexComponent = asyncComponent(() => import("../index/index"));
const CartComponent = asyncComponent(() => import("../cart/index"));
const UserComponent = asyncComponent(() => import("../../user/index/index"));

export default class HomeComponent extends React.Component {
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
    componentDidMount(){
        this.handleNavStyle()
    }
    componentWillReceiveProps(newProps) {
        this.handleNavStyle(newProps.location.pathname)
    }
    jumpPage(toUrl) {
        this.props.history.replace(config.path + toUrl);
    }
    handleNavStyle(pathname) {
        switch (pathname) {
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
        this.setState=(state, callback)=>{
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
                        <Route path={config.path + "home/user"} component={UserComponent}></Route>
                    </Switch>
                </React.Fragment>
                <div class={Css['bottom-nav']}>
                    <ul onClick={this.jumpPage.bind(this, 'home/index')}>
                        <li class={this.state.bHomeStyle ? Css['home'] + ' ' + Css['active'] : Css['home']} />
                        <li class={this.state.bHomeStyle ? Css['text'] + ' ' + Css['active'] : Css['text']}>首页</li>
                    </ul>
                    <ul onClick={this.jumpPage.bind(this, 'home/cart')}>
                        <li class={this.state.bCartStyle ? Css['cart'] + ' ' + Css['active'] : Css['cart']} />
                        <li class={this.state.bCartStyle ? Css['text'] + ' ' + Css['active'] : Css['text']}>购物车</li>
                    </ul>
                    <ul onClick={this.jumpPage.bind(this, 'home/user')}>
                        <li class={this.state.bUserStyle ? Css['my'] + ' ' + Css['active'] : Css['my']} />
                        <li class={this.state.bUserStyle ? Css['text'] + ' ' + Css['active'] : Css['text']}>我的</li>
                    </ul>
                </div>
            </div>
        )
    }
}
