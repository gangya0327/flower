import React from 'react'
import Css from '../../../assets/css/home/goods/details_item.css'
import '../../../assets/css/common/swiper.min.css'
import Swiper from '../../../assets/js/libs/swiper.min.js'
import { request } from '../../../assets/js/libs/request'
import { lazyImage, localParam } from '../../../assets/js/utils/utils'
import config from '../../../assets/js/conf/config'
import { Toast } from 'antd-mobile'

export default class DetailsItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bMask: false,
            sCartPanel: Css['down'],
            gid: this.props.history.location.search !== "" ? localParam(this.props.history.location.search).search.gid : "",
            aAttr: [{
                "attrid": "1006",
                "title": "颜色",
                "values": [{
                    "vid": "854",
                    "value": "红色",
                    checked: false
                }, {
                    "vid": "855",
                    "value": "白色",
                    checked: true
                }, {
                    "vid": "856",
                    "value": "紫色",
                    checked: false
                }]
            }, {
                "attrid": "1007",
                "title": "尺寸",
                "values": [{
                    "vid": "857",
                    "value": "36",
                    checked: false
                }, {
                    "vid": "858",
                    "value": "72",
                    checked: false
                }, {
                    "vid": "859",
                    "value": "73",
                    checked: false
                }]
            }]
        }
    }
    componentDidMount() {
        this.getSwiper()
    }
    getSwiper() {
        new Swiper(this.refs['swiper-wrap'], {
            autoplay: 3000,
            pagination: ".swiper-pagination",
            autoplayDisableOnInteraction: false
        })
    }
    //显示购物控制面板
    showCartPanel() {
        this.refs['mask'].addEventListener('touchmove', function (e) {
            e.preventDefault()
        }, false)
        this.setState({
            bMask: true,
            sCartPanel: Css['up']
        })
    }
    //隐藏购物控制面板
    hideCartPanel() {
        this.refs['mask'].addEventListener('touchmove', function (e) {
            e.preventDefault()
        }, false)
        this.setState({
            bMask: false,
            sCartPanel: Css['down']
        })
    }
    //加入收藏
    addFav() {
        Toast.info("收藏成功", 2)
    }
    goBack() {
        this.props.history.goBack()
    }
    replacePage(url) {
        this.props.history.replace(config.path + url)
    }
    //选择属性值
    checkAttrVal(){}
    render() {
        return (
            <div>
                <div className={Css['swiper-wrap']} ref="swiper-wrap">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <a href="//baidu.com" target="_blank" rel="noopener noreferrer">
                                <img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" />
                            </a>
                        </div>
                        <div className="swiper-slide">
                            <a href="//baidu.com" target="_blank" rel="noopener noreferrer">
                                <img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" />
                            </a>
                        </div>
                        <div className="swiper-slide">
                            <a href="//baidu.com" target="_blank" rel="noopener noreferrer">
                                <img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className={Css['goods-ele-main']}>
                    <div className={Css['goods-title']}>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                    <div className={Css['price']}>¥128</div>
                    <ul className={Css['sales-wrap']}>
                        <li>快递：20元</li>
                        <li>月销量10件</li>
                    </ul>
                </div>
                <div className={Css['reviews-main']}>
                    <div className={Css['reviews-title']}>商品评价（22）</div>
                    <div className={Css['reviews-wrap']}>
                        <div className={Css['reviews-list']}>
                            <div className={Css['uinfo']}>
                                <div className={Css['head']}>
                                    <img src="//vueshop.glbuys.com/userfiles/head/492811357.jpg" alt="" />
                                </div>
                                <div className={Css['nickname']}>流浪人</div>
                            </div>
                            <div className={Css['reviews-content']}>这些是评价内容吧啦吧啦吧啦</div>
                            <div className={Css['reviews-date']}>2019-10-04 15:03:34</div>
                        </div>
                        <div className={Css['reviews-list']}>
                            <div className={Css['uinfo']}>
                                <div className={Css['head']}>
                                    <img src="//vueshop.glbuys.com/userfiles/head/492811357.jpg" alt="" />
                                </div>
                                <div className={Css['nickname']}>流浪人</div>
                            </div>
                            <div className={Css['reviews-content']}>这些是评价内容吧啦吧啦吧啦</div>
                            <div className={Css['reviews-date']}>2019-10-04 15:03:34</div>
                        </div>
                        <div className={Css['reviews-list']}>
                            <div className={Css['uinfo']}>
                                <div className={Css['head']}>
                                    <img src="//vueshop.glbuys.com/userfiles/head/492811357.jpg" alt="" />
                                </div>
                                <div className={Css['nickname']}>流浪人</div>
                            </div>
                            <div className={Css['reviews-content']}>这些是评价内容吧啦吧啦吧啦</div>
                            <div className={Css['reviews-date']}>2019-10-04 15:03:34</div>
                        </div>
                        <div className={Css['reviews-list']}>
                            <div className={Css['uinfo']}>
                                <div className={Css['head']}>
                                    <img src="//vueshop.glbuys.com/userfiles/head/492811357.jpg" alt="" />
                                </div>
                                <div className={Css['nickname']}>流浪人</div>
                            </div>
                            <div className={Css['reviews-content']}>这些是评价内容吧啦吧啦吧啦</div>
                            <div className={Css['reviews-date']}>2019-10-04 15:03:34</div>
                        </div>
                    </div>
                    <div className={Css['reviews-more']} onClick={this.replacePage.bind(this, 'goods/details/reviews?gid=' + this.state.gid)}>查看更多评价</div>
                </div>
                <div className={Css['bottom-btn-wrap']}>
                    <div className={Css['btn'] + " " + Css['fav']} onClick={this.addFav.bind(this)}>收藏</div>
                    <div className={Css['btn'] + " " + Css['cart']} onClick={this.showCartPanel.bind(this)}>加入购物车</div>
                </div>
                <div ref="mask" className={this.state.bMask ? Css['mask'] : Css['mask'] + " hide"}></div>
                <div className={Css['cart-panel'] + " " + this.state.sCartPanel}>
                    <div className={Css['goods-info']}>
                        <div className={Css['close-panel-wrap']}>
                            <div className={Css['spot']}></div>
                            <div className={Css['line']}></div>
                            <div className={Css['close']} onClick={this.hideCartPanel.bind(this)}></div>
                        </div>
                        <div className={Css['goods-img']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" />
                        </div>
                        <div className={Css['goods-wrap']}>
                            <div className={Css['goods-title']}>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                            <div className={Css['price']}>￥128</div>
                            <div className={Css['goods-code']}>商品编码：143208071</div>
                        </div>
                    </div>
                    <div className={Css['attr-wrap']}>
                        {
                            this.state.aAttr.length > 0 ?
                                this.state.aAttr.map((item, index) => {
                                    return (
                                        <div className={Css['attr-list']} key={index}>
                                            <div className={Css['attr-name']}>{item.title}</div>
                                            <div className={Css['val-wrap']}>
                                                {
                                                    item.values.length > 0 ?
                                                        item.values.map((item2, index2) => {
                                                            return (
                                                                <span className={item2.checked ? Css['val'] + " " + Css['active'] : Css['val']} key={index2}
                                                                    onClick={this.checkAttrVal.bind(this, index, index2)}>{item2.value}</span>
                                                            )
                                                        }) : ""
                                                }
                                            </div>
                                        </div>
                                    )
                                }) : ""
                        }
                    </div>
                    <div className={Css['amount-wrap']}>
                        <div className={Css['amount-name']}>购买数量</div>
                        <div className={Css['amount-input-wrap']}>
                            <div className={Css['dec'] + " " + Css['btn'] + " " + Css['active']}>-</div>
                            <div className={Css['amount-input']}>
                                <input type="tel" defaultValue="1" />
                            </div>
                            <div className={Css['inc'] + " " + Css['btn']}>+</div>
                        </div>
                    </div>
                    <div className={Css['sure-btn']}>确定</div>
                </div>

                <div className={Css['']}></div>
            </div>
        )
    }
}
