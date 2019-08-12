import React from 'react'
import { Route, Switch } from 'react-router-dom'
import asyncComponent from "../../../components/async/AsyncComponent"
import config from '../../../assets/js/conf/config'
import Css from '../../../assets/css/home/goods/classify.css'

const GoodsItems = asyncComponent(() => import("./items"));

export default class GoodsClassify extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentWillMount() {
    }
    componentWillReceiveProps(newProps) {
    }
    jumpPage(toUrl) {
        this.props.history.replace(config.path + toUrl);
    }
    goBack() {
        this.props.history.back();
    }
    render() {
        return (
            <div>
                <div className={Css['search-header']}>
                    <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                    <div className={Css['search']}>请输入宝贝名称</div>
                </div>
                <div className={Css['goods-main']}>
                    <div className={Css['classify-wrap']}>
                        <div className={Css['classify-item'] + " " + Css['active']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                        <div className={Css['classify-item']}>潮流女装</div>
                    </div>
                    <div className={Css['goods-content']}>
                        <Switch>
                            <Route path={config.path + "goods/classify/items"} component={GoodsItems}></Route>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}
