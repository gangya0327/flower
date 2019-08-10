import React from 'react'
import Swiper from '../../../assets/js/libs/swiper.min.js'
import { lazyImage } from '../../../assets/js/utils/utils'
import { request } from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'
import '../../../assets/css/common/swiper.min.css'
import Css from '../../../assets/css/home/index/index.css'

export default class IndexComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            aSwiper: [],
            aNav: [],
            aGoods: [],
            aRecoGoods: [],
            bScroll: false
        }
        this.bScroll = true
    }
    componentDidMount() {
        this.getSwiper();
        this.getNav();
        this.getGoodsLevel();
        this.getReco();
        window.addEventListener("scroll", this.eventScroll.bind(this))
    }
    eventScroll() {
        if (this.bScroll) {
            let iScrollTop = document.documentElement.scrollTop || document.body.scrollTop
            console.log(iScrollTop)
            if (iScrollTop >= 80) {
                this.setState({ bScroll: true })
            } else {
                this.setState({ bScroll: false })
            }
        }
    }
    componentWillUnmount() {
        this.bScroll = false
        window.removeEventListener("scroll", this.eventScroll.bind(this))
    }
    getSwiper() {
        console.log(config)
        request(config.baseUrl + "/api/home/index/slide?token=" + config.token).then((res) => {
            if (res.code === 200) {
                this.setState({ aSwiper: res.data }, () => {
                    new Swiper("." + Css['swiper-wrap'], {
                        autoplay: 3000,
                        pagination: ".swiper-pagination",
                        autoplayDisableOnInteraction: false
                    })
                })
            }
        })
    }
    getNav() {
        request(config.baseUrl + "/api/home/index/nav?token=" + config.token).then((res) => {
            if (res.code === 200) {
                console.log("aNav", res.data);
                this.setState({ aNav: res.data })
            }
        })
    }
    getGoodsLevel() {
        request(config.baseUrl + "/api/home/index/goodslevel?token=" + config.token).then((res) => {
            if (res.code === 200) {
                console.log("aGoods", res.data);
                this.setState({ aGoods: res.data }, () => {
                    lazyImage()
                })
            }
        })
    }
    getReco() {
        request(config.baseUrl + "/api/home/index/recom?token=" + config.token).then((res) => {
            if (res.code === 200) {
                console.log("aRecoGoods", res.data);
                this.setState({ aRecoGoods: res.data }, () => {
                    lazyImage()
                })
            }
        })
    }
    render() {
        return (
            <div class={Css['page']}>
                <div class={this.state.bScroll ? Css['search-header'] + " " + Css['red-bg'] : Css['search-header']}>
                    <div class={Css['classify-icon']}></div>
                    <div class={Css['search-wrap']}>
                        <div class={Css['search-icon']}></div>
                        <div class={Css['search-text']}>请输入宝贝名称</div>
                    </div>
                    <div class={Css['login-wrap']}>
                        <div class={Css['login-text']}>登录</div>
                    </div>
                </div>
                <div class={Css['swiper-wrap']}>
                    <div className="swiper-wrapper">
                        {
                            this.state.aSwiper !== null ?
                                this.state.aSwiper.map((item, index) => {
                                    return (
                                        <div key={index} className="swiper-slide">
                                            <a href={item.webs} target="_blank" rel="noopener noreferrer">
                                                <img src={item.image} alt={item.title} />
                                            </a>
                                        </div>
                                    )
                                }) : ""
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div class={Css['quick-nav']}>
                    {
                        this.state.aNav !== null ?
                            this.state.aNav.map((item, index) => {
                                return (
                                    <ul class={Css['item']} key={index}>
                                        <li className={Css['item-img']}>
                                            <img src={item.image} alt={item.title} />
                                        </li>
                                        <li className={Css['item-text']}>{item.title}</li>
                                    </ul>
                                )
                            }) : ""
                    }
                </div>
                {
                    this.state.aGoods !== null ?
                        this.state.aGoods.map((item, index) => {
                            return (
                                <div className={Css['goods-level-wrap']} key={index}>
                                    <div className={Css['classify-title'] + " " + Css['color' + (index + 1)]}>—— {item.title} ——</div>
                                    {
                                        index % 2 === 1 ?
                                            <div className={Css['goods-level1-wrap']}>
                                                {
                                                    item.items !== null ?
                                                        item.items.slice(0, 2).map((item2, index2) => {
                                                            return (
                                                                <div className={Css['goods-level1-item0']} key={index2}>
                                                                    <div className={Css['goods-title2']}>{item2.title}</div>
                                                                    <div className={Css['goods-text2']}>火爆开售</div>
                                                                    <div className={Css['goods-img2']}>
                                                                        <img src={require("../../../assets/images/common/lazyImg.jpg")} alt={item2.title} data-echo={item2.image} />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        : ""
                                                }
                                            </div>
                                            :
                                            <div className={Css['goods-level1-wrap']}>
                                                <div className={Css['goods-level1-item0']}>
                                                    <div className={Css['goods-title']}>{item.items !== null ? item.items[0].title : ""}</div>
                                                    <div className={Css['goods-text']}>精品打折</div>
                                                    <div className={Css['goods-price' + (index + 1)]}>{item.items !== null ? item.items[0].price : ""}元</div>
                                                    <div className={Css['goods-img']}>
                                                        <img src={require("../../../assets/images/common/lazyImg.jpg")} alt={item.items !== null ? item.items[0].title : ""} data-echo={item.items !== null ? item.items[0].image : ""} />
                                                    </div>
                                                </div>
                                                <div className={Css['goods-level1-item1']}>
                                                    {
                                                        item.items !== null ?
                                                            item.items.slice(1, 3).map((item2, index2) => {
                                                                return (
                                                                    <div className={Css['goods-row']} key={index2}>
                                                                        <div className={Css['goods-row-title']}>{item2.title}</div>
                                                                        <div className={Css['goods-row-text']}>品质精挑</div>
                                                                        <div className={Css['goods-row-img']}>
                                                                            <img src={require("../../../assets/images/common/lazyImg.jpg")} alt={item2.title} data-echo={item2.image} />
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                            : ""
                                                    }
                                                </div>
                                            </div>
                                    }
                                    <div className={Css['goods-list-wrap']}>
                                        {
                                            item.items !== null ?
                                                item.items.slice(index % 2 === 1 ? 2 : 3).map((item2, index2) => {
                                                    return (
                                                        <div className={Css['goods-list']} key={index2}>
                                                            <div className={Css['title']}>{item2.title}</div>
                                                            <div className={Css['image']}>
                                                                <img src={require("../../../assets/images/common/lazyImg.jpg")} alt={item2.title} data-echo={item2.image} />
                                                            </div>
                                                            <div className={Css['price']}>￥{item2.price}</div>
                                                            <div className={Css['unprice']}>￥{item2.price + Math.floor(Math.random() * 10 + 10)}</div>
                                                        </div>
                                                    )
                                                })
                                                : ""
                                        }
                                    </div>
                                </div>
                            )
                        }) : ""
                }
                <div class={Css['reco-title-wrap']}>
                    <div class={Css['line']}></div>
                    <div class={Css['reco-text-wrap']}>
                        <div class={Css['reco-icon']}></div>
                        <div class={Css['reco-text']}>为您推荐</div>
                    </div>
                    <div class={Css['line']}></div>
                </div>
                <div class={Css['reco-item-wrap']}>
                    {
                        this.state.aRecoGoods !== null ?
                            this.state.aRecoGoods.map((item, index) => {
                                return (
                                    <div class={Css['reco-item']} key={index}>
                                        <div class={Css['image']}>
                                            <img src={require("../../../assets/images/common/lazyImg.jpg")} alt={item.title} data-echo={item.image} />
                                        </div>
                                        <div class={Css['title']}>{item.title}</div>
                                        <div class={Css['price']}>￥{item.price}</div>
                                    </div>
                                )
                            })
                            : ""
                    }
                </div>
            </div>
        )
    }
}
