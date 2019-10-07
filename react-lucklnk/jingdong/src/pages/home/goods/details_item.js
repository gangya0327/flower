import React from 'react'
import Css from '../../../assets/css/home/goods/details_item.css'
import '../../../assets/css/common/swiper.min.css'
import Swiper from '../../../assets/js/libs/swiper.min.js'
import { lazyImage, localParam } from '../../../assets/js/utils/utils'
import { request } from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'

export default class DetailsItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
    componentWillReceiveProps(newProps) {
    }
    render() {
        return (
            <div>
                <div className={Css['swiper-wrap']} ref="swiper-wrap">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <a href="" target="_blank" rel="noopener noreferrer">
                                <img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" />
                            </a>
                        </div>
                        <div className="swiper-slide">
                            <a href="" target="_blank" rel="noopener noreferrer">
                                <img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" />
                            </a>
                        </div>
                        <div className="swiper-slide">
                            <a href="" target="_blank" rel="noopener noreferrer">
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
                                    <img src="//vueshop.glbuys.com/userfiles/head/492811357.jpg" alt=""/>
                                </div>
                                <div className={Css['nickname']}>流浪人</div>
                            </div>
                            <div className={Css['reviews-content']}>这些是评价内容吧啦吧啦吧啦</div>
                            <div className={Css['reviews-date']}>2019-10-04 15:03:34</div>
                        </div>
                        <div className={Css['reviews-list']}>
                            <div className={Css['uinfo']}>
                                <div className={Css['head']}>
                                    <img src="//vueshop.glbuys.com/userfiles/head/492811357.jpg" alt=""/>
                                </div>
                                <div className={Css['nickname']}>流浪人</div>
                            </div>
                            <div className={Css['reviews-content']}>这些是评价内容吧啦吧啦吧啦</div>
                            <div className={Css['reviews-date']}>2019-10-04 15:03:34</div>
                        </div>
                        <div className={Css['reviews-list']}>
                            <div className={Css['uinfo']}>
                                <div className={Css['head']}>
                                    <img src="//vueshop.glbuys.com/userfiles/head/492811357.jpg" alt=""/>
                                </div>
                                <div className={Css['nickname']}>流浪人</div>
                            </div>
                            <div className={Css['reviews-content']}>这些是评价内容吧啦吧啦吧啦</div>
                            <div className={Css['reviews-date']}>2019-10-04 15:03:34</div>
                        </div>
                        <div className={Css['reviews-list']}>
                            <div className={Css['uinfo']}>
                                <div className={Css['head']}>
                                    <img src="//vueshop.glbuys.com/userfiles/head/492811357.jpg" alt=""/>
                                </div>
                                <div className={Css['nickname']}>流浪人</div>
                            </div>
                            <div className={Css['reviews-content']}>这些是评价内容吧啦吧啦吧啦</div>
                            <div className={Css['reviews-date']}>2019-10-04 15:03:34</div>
                        </div>
                    </div>
                    <div className={Css['reviews-more']}>查看更多评价</div>
                </div>
            </div>
        )
    }
}
