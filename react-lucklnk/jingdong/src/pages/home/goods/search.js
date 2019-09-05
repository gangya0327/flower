import React from 'react'
import Css from '../../../assets/css/home/goods/search.css'
import { lazyImage, localParam } from '../../../assets/js/utils/utils'
import { request } from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'

export default class GoodsSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: []
        }
        this.myScroll = null
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className={Css['page']}>
                <div className={Css['search-top']}>
                    <div className={Css['search-header']}>
                        <div className={Css['back']}></div>
                        <div className={Css['search-wrap']}>
                            <div className={Css['search-icon']}></div>
                            <div className={Css['search']}>请输入您的宝贝</div>
                        </div>
                        <div className={Css['search-btn']}>筛选</div>
                    </div>
                    <div className={Css['order-main']}>
                        <div className={Css['order-item']}>
                            <div className={Css['order-text']}>综合</div>
                            <div className={Css['order-icon']}></div>
                            <ul className={Css['order-menu'] + " hide"}>
                                <li className={Css['active']}>综合</li>
                                <li>价格从低到高</li>
                                <li>价格从高到低</li>
                            </ul>
                        </div>
                        <div className={Css['order-item']}>
                            <div className={Css['order-text']}>销量</div>
                        </div>
                    </div>
                </div>
                <div className={Css['goods-main']}>
                    <div className={Css['goods-list']}>
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524554409.jpg" alt="" />
                        </div>
                        <div className={Css['goods-content']}>
                            <div className={Css['goods-title']}>蕾丝半身裙女2018春夏新款韩版修身包臀a字纯色不规则裙 CMB1004</div>
                            <div className={Css['goods-price']}>￥118</div>
                            <div className={Css['goods-sales']}>销量<span>100</span>件</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
