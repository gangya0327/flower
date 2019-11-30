import React from 'react'
import ReactDOM from 'react-dom'
import Css from '../../../assets/css/home/goods/details_item.css'
import '../../../assets/css/common/swiper.min.css'
import Swiper from '../../../assets/js/libs/swiper.min.js'
import { request } from '../../../assets/js/libs/request'
import { lazyImage, localParam, setScrollTop } from '../../../assets/js/utils/utils'
import config from '../../../assets/js/conf/config'
import { Toast } from 'antd-mobile'
import TweenMax from '../../../assets/js/libs/TweenMax'
import { connect } from 'react-redux'
import action from '../../../actions'

class DetailsItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bMask: false,
            sCartPanel: Css['down'],
            gid: this.props.history.location.search !== "" ? localParam(this.props.history.location.search).search.gid : "",
            aAttr: [],
            iAmount: 1,
            aSlide: [],
            sGoodsTitle: "",
            fPrice: 0,
            fFreight: 0,
            iSales: 0,
            aReviews: [],
            iReviewTotal: 0
        }
        this.bMove = false
    }
    componentDidMount() {
        setScrollTop(global.scrollTop.index)
        this.getGoodsInfo()
        this.getAttr()
        this.getReviews()
    }
    //获取商品轮播图和商品信息
    getGoodsInfo() {
        let sUrl = config.baseUrl + "/api/home/goods/info?gid=" + this.state.gid + "&type=details&token=" + config.token
        request(sUrl).then((res) => {
            if (res.code === 200) {
                this.setState({
                    aSlide: res.data.images,
                    sGoodsTitle: res.data.title,
                    fPrice: res.data.price,
                    fFreight: res.data.freight,
                    iSales: res.data.sales
                }, () => {
                    new Swiper(this.refs['swiper-wrap'], {
                        autoplay: 3000,
                        pagination: ".swiper-pagination",
                        autoplayDisableOnInteraction: false
                    })
                })
            }
        })
    }
    //获取商品规格属性
    getAttr() {
        let sUrl = config.baseUrl + "/api/home/goods/info?gid=" + this.state.gid + "&type=spec&token=" + config.token
        request(sUrl).then((res) => {
            if (res.code === 200) {
                this.setState({ aAttr: res.data })
            }
        })
    }
    //获取商品评价
    getReviews() {
        let sUrl = config.baseUrl + "/api/home/reviews/index?gid=" + this.state.gid + "&page=1&token=" + config.token
        request(sUrl).then((res) => {
            if (res.code === 200) {
                this.setState({ aReviews: res.data, iReviewTotal: res.pageinfo.total }, () => {
                    lazyImage()
                })
            } else {
                this.setState({ aReviews: [] })
            }
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
    selectAttrVal(attrIndex, valIndex) {
        let aAttr = this.state.aAttr
        if (aAttr.length > 0) {
            for (let key in aAttr[attrIndex].values) {
                aAttr[attrIndex].values[key].checked = false
            }
        }
        aAttr[attrIndex].values[valIndex].checked = true
        this.setState({ aAttr: aAttr })
    }
    //增加数量
    incAmount() {
        let iAmount = this.state.iAmount
        this.setState({
            iAmount: ++iAmount
        })
    }
    //减少数量
    decAmount() {
        let iAmount = this.state.iAmount
        if (iAmount > 1) {
            this.setState({
                iAmount: --iAmount
            })
        }
    }
    //改变数量
    changeAmount(e) {
        let iAmount = 1
        if (e.target.value !== "") {
            iAmount = e.target.value.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[#|*|,|+|;|.]/g, '')
            if (iAmount === "") {
                iAmount = 1
            }
        }
        this.setState({ iAmount })
    }
    //加入购物车
    addCart() {
        this.checkAttrVal(() => {
            if (!this.bMove) {
                this.bMove = true
                let oGoodsImg = this.refs['goods-img'], oGoodsInfo = this.refs['goods-info'], oCartPanel = this.refs['cart-panel']
                let oCloneImg = oGoodsImg.cloneNode(true)
                oGoodsInfo.appendChild(oCloneImg);
                let oCartIcon = ReactDOM.findDOMNode(document.getElementById('cart-icon'))
                oCloneImg.style.cssText = "width:0.4rem;height:0.4rem;position:absolute;z-index:1;left:0.2rem;top:0.2rem;"
                let srcImgX = oGoodsImg.offsetLeft
                let cloneY = window.innerHeight - oCartPanel.offsetHeight + oGoodsImg.offsetTop - oCartIcon.offsetTop
                TweenMax.to(oCloneImg, 2, {
                    bezier: [{ x: srcImgX, y: -100 }, { x: srcImgX + 30, y: -130 }, { x: oCartIcon.offsetLeft, y: -cloneY }], onComplete: () => {
                        oCloneImg.remove();
                        this.bMove = false

                        //将商品添加到redux
                        let aAttr = [], aParam = []
                        if (this.state.aAttr.length > 0) {
                            for (let key in this.state.aAttr) {
                                if (this.state.aAttr[key].values.length > 0) {
                                    aParam = []
                                    for (let key2 in this.state.aAttr[key].values) {
                                        if (this.state.aAttr[key].values[key2].checked) {
                                            aParam.push({
                                                paramid: this.state.aAttr[key].values[key2].vid,
                                                title: this.state.aAttr[key].values[key2].value,
                                            })
                                        }
                                    }
                                }
                                aAttr.push({
                                    attrid: this.state.aAttr[key].attrid,
                                    title: this.state.aAttr[key].title,
                                    aParam: aParam
                                })
                            }
                        }
                        // this.props.dispatch(action.hk.addHistorykeywords({ keywords: this.aKeywords }))
                        this.props.dispatch(action.cart.addCart({
                            gid: this.state.gid,
                            title: this.state.sGoodsTitle,
                            amount: parseInt(this.state.iAmount),
                            price: this.state.fPrice,
                            img: this.state.aSlide[0],
                            checked: true,
                            freight: this.state.fFreight,
                            attrs: aAttr
                        }))
                    }
                });
                TweenMax.to(oCloneImg, 0.2, { rotation: 360, repeat: -1 })
            }
        })
    }
    // 检测是否选中属性值
    checkAttrVal(callback) {
        let aAttr = this.state.aAttr, bSelect = false, aAttrName = ""
        if (aAttr.length > 0) {
            for (let key in aAttr) {
                bSelect = false
                for (let key2 in aAttr[key].values) {
                    if (aAttr[key].values[key2].checked) {
                        bSelect = true
                        break
                    }
                }
                if (!bSelect) {
                    aAttrName = aAttr[key].title
                    break;
                }
            }
            if (!bSelect) {
                Toast.info('请选择' + aAttrName, 2)
            }
            if (bSelect) {
                callback()
            }
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
                <div className={Css['swiper-wrap']} ref="swiper-wrap">
                    <div className="swiper-wrapper">
                        {
                            this.state.aSlide.length > 0 ?
                                this.state.aSlide.map((item, index) => {
                                    return (
                                        <div className="swiper-slide" key={index}>
                                            <a href="//baidu.com" target="_blank" rel="noopener noreferrer">
                                                <img src={item} alt="" />
                                            </a>
                                        </div>
                                    )
                                })
                                : ""
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className={Css['goods-ele-main']}>
                    <div className={Css['goods-title']}>{this.state.sGoodsTitle}</div>
                    <div className={Css['price']}>¥{this.state.fPrice}</div>
                    <ul className={Css['sales-wrap']}>
                        <li>快递：{this.state.fFreight}元</li>
                        <li>月销量{this.state.iSales}件</li>
                    </ul>
                </div>
                <div className={Css['reviews-main']}>
                    <div className={Css['reviews-title']}>商品评价（{this.state.iReviewTotal}）</div>
                    <div className={Css['reviews-wrap']}>
                        {
                            this.state.aReviews.length > 0 ?
                                this.state.aReviews.map((item, index) => {
                                    return (
                                        <div className={Css['reviews-list']} key={index}>
                                            <div className={Css['uinfo']}>
                                                <div className={Css['head']}>
                                                    <img src={require("../../../assets/images/common/lazyImg.jpg")} data-echo={item.head} alt={item.nickname} />
                                                </div>
                                                <div className={Css['nickname']}>{item.nickname}</div>
                                            </div>
                                            <div className={Css['reviews-content']}>{item.content}</div>
                                            <div className={Css['reviews-date']}>{item.times}</div>
                                        </div>
                                    )
                                }) : <div className="null-item">没有任何评价</div>
                        }
                    </div>
                    <div className={this.state.iReviewTotal > 0 ? Css['reviews-more'] : Css['reviews-more'] + " hide"} onClick={this.replacePage.bind(this, 'goods/details/reviews?gid=' + this.state.gid)}>查看更多评价</div>
                </div>
                <div className={Css['bottom-btn-wrap']}>
                    <div className={Css['btn'] + " " + Css['fav']} onClick={this.addFav.bind(this)}>收藏</div>
                    <div className={Css['btn'] + " " + Css['cart']} onClick={this.showCartPanel.bind(this)}>加入购物车</div>
                </div>
                <div ref="mask" className={this.state.bMask ? Css['mask'] : Css['mask'] + " hide"}></div>
                <div ref='cart-panel' className={Css['cart-panel'] + " " + this.state.sCartPanel}>
                    <div ref='goods-info' className={Css['goods-info']}>
                        <div className={Css['close-panel-wrap']}>
                            <div className={Css['spot']}></div>
                            <div className={Css['line']}></div>
                            <div className={Css['close']} onClick={this.hideCartPanel.bind(this)}></div>
                        </div>
                        <div ref="goods-img" className={Css['goods-img']}>
                            <img src={this.state.aSlide.length !== 0 ? this.state.aSlide[0] : ""} alt="" />
                        </div>
                        <div className={Css['goods-wrap']}>
                            <div className={Css['goods-title']}>{this.state.sGoodsTitle}</div>
                            <div className={Css['price']}>￥{this.state.fPrice}</div>
                            <div className={Css['goods-code']}>商品编码：{this.state.gid}</div>
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
                                                                    onClick={this.selectAttrVal.bind(this, index, index2)}>{item2.value}</span>
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
                            <div className={this.state.iAmount === 1 ? Css['dec'] + " " + Css['btn'] + " " + Css['active'] : Css['dec'] + " " + Css['btn']} onClick={this.decAmount.bind(this)}>-</div>
                            <div className={Css['amount-input']}>
                                <input type="tel" value={this.state.iAmount} onChange={(e) => { this.changeAmount(e) }} />
                            </div>
                            <div className={Css['inc'] + " " + Css['btn']} onClick={this.incAmount.bind(this)}>+</div>
                        </div>
                    </div>
                    <div className={Css['sure-btn']} onClick={this.addCart.bind(this)}>确定</div>
                </div>

                <div className={Css['']}></div>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        state: state
    }
})(DetailsItem)