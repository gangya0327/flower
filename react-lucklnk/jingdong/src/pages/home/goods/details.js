import React from 'react'
import Css from '../../../assets/css/home/goods/details.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import { localParam } from '../../../assets/js/utils/utils'
import asyncComponent from "../../../components/async/AsyncComponent"
import config from '../../../assets/js/conf/config'

const DetailsItem = asyncComponent(() => import("./details_item"));
const DetailsContent = asyncComponent(() => import("./details_content"));
const DetailsReview = asyncComponent(() => import("./details_review"));

export default class GoodsDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gid: this.props.history.location.search !== "" ? localParam(this.props.history.location.search).search.gid : "",
            tabStyle: {
                bItem: true,
                bContent: false,
                bReiviews: false
            }
        }
    }
    componentDidMount() {
        this.setStyle(this.props)
    }
    componentWillReceiveProps(newProps) {
        this.setStyle(newProps);
    }
    componentWillUnmount() {
        this.setState=(state, callback)=>{
            return
        }
    }
    //设置选项卡切换的样式
    setStyle(props) {
        switch (props.location.pathname) {
            case config.path + "goods/details/content":
                this.setState({
                    tabStyle: {
                        bItem: false,
                        bContent: true,
                        bReiviews: false
                    }
                })
                break;
            case config.path + "goods/details/reviews":
                this.setState({
                    tabStyle: {
                        bItem: false,
                        bContent: false,
                        bReiviews: true
                    }
                })
                break;
            default:
                this.setState({
                    tabStyle: {
                        bItem: true,
                        bContent: false,
                        bReiviews: false
                    }
                })
        }
    }
    goBack() {
        this.props.history.goBack()
    }
    replacePage(url) {
        this.props.history.replace(config.path + url)
    }
    render() {
        return (
            <div>
                <div className={Css['details-header']}>
                    <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                    <div className={Css['tab-wrap']}>
                        <div className={this.state.tabStyle.bItem ? Css['tab-name'] + " " + Css['active'] : Css['tab-name']} onClick={this.replacePage.bind(this, 'goods/details/item?gid=' + this.state.gid)}>商品</div>
                        <div className={this.state.tabStyle.bContent ? Css['tab-name'] + " " + Css['active'] : Css['tab-name']} onClick={this.replacePage.bind(this, 'goods/details/content?gid=' + this.state.gid)}>详情</div>
                        <div className={this.state.tabStyle.bReiviews ? Css['tab-name'] + " " + Css['active'] : Css['tab-name']} onClick={this.replacePage.bind(this, 'goods/details/reviews?gid=' + this.state.gid)}>评价</div>
                    </div>
                    <div id="cart-icon" className={Css['cart-icon']}>
                        <div className={Css['spot']}></div>
                    </div>
                </div>

                <div className={Css['sub-page']}>
                    <Switch>
                        <Route path={config.path + "goods/details/item"} component={DetailsItem}></Route>
                        <Route path={config.path + "goods/details/content"} component={DetailsContent}></Route>
                        <Route path={config.path + "goods/details/reviews"} component={DetailsReview}></Route>
                        <Redirect to={config.path + "goods/details/item"}></Redirect>
                    </Switch>
                </div>
            </div>
        )
    }
}
