import React from 'react'
import Css from '../../../assets/css/home/goods/details.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from "../../../components/async/AsyncComponent"
import config from '../../../assets/js/conf/config'

const DetailsItem = asyncComponent(() => import("./details_item"));
const DetailsContent = asyncComponent(() => import("./details_content"));
const DetailsReview = asyncComponent(() => import("./details_review"));

export default class GoodsDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
    }
    componentWillReceiveProps(newProps) {
    }
    goBack() {
        this.props.history.goBack()
    }
    render() {
        return (
            <div>
                <div className={Css['details-header']}>
                    <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                    <div className={Css['tab-wrap']}>
                        <div className={Css['tab-name'] + " " + Css['active']}>商品</div>
                        <div className={Css['tab-name']}>详情</div>
                        <div className={Css['tab-name']}>评价</div>
                    </div>
                    <div className={Css['cart-icon']}>
                        <div className={Css['spot']}></div>
                    </div>

                    <div className={Css['']}></div>
                </div>

                <div className={Css['sub-page']}>
                    <Switch>
                        <Route path={config.path + "goods/details/item"} component={DetailsItem}></Route>
                        <Route path={config.path + "goods/details/content"} component={DetailsContent}></Route>
                        <Route path={config.path + "goods/details/review"} component={DetailsReview}></Route>
                        <Redirect to={config.path + "goods/details/item"}></Redirect>
                    </Switch>
                </div>
            </div>
        )
    }
}
