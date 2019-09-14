import React from 'react'
import Css from '../../../assets/css/home/goods/search.css'
import IScroll from '../../../assets/js/libs/iscroll'
import { request } from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'
import SearchComponent from '../../../components/search/search'
import { lazyImage, localParam } from '../../../assets/js/utils/utils'
import Uprefresh from '../../../assets/js/libs/uprefresh'

export default class GoodsSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            screenMove: "",
            bMask: false,
            bPriceMenu: false,
            bSalesMenu: false,
            pageStyle: { display: "none" },
            aGoods: [],
            aPriceOrder: [
                { title: "综合", type: "all", checked: true },
                { title: "价格从低到高", type: "up", checked: false },
                { title: "价格从高到低", type: "down", checked: false },
            ],
            sKeywords: ""
        }
        this.myScroll = null
        this.oUpRefresh = null
        this.curPage = 1
        this.maxPage = 0
        this.offsetBottom = 100
        this.bPriceMenu = false
        this.bSalesMenu = false
        this.oType = "all"
        this.sParams = ""
        this.sKeywords = ""
    }
    componentDidMount() {
        this.myScroll = new IScroll("#screen", {
            scrollX: false,
            scrollY: true,
            preventDefault: false
        })
        this.sKeywords = decodeURIComponent(localParam(this.props.history.location.search).search.keywords)
        this.setState({ sKeywords: this.sKeywords })
        this.getPageData()
    }
    //显示筛选面板
    showScreen() {
        this.refs['mask'].addEventListener("touchmove", function (e) {
            e.preventDefault()
        }, false)
        this.refs['screen'].addEventListener("touchmove", function (e) {
            e.preventDefault()
        }, false)
        this.setState({ screenMove: Css['move'], bMask: true })
    }
    //隐藏筛选面板
    hideScreen() {
        this.setState({ screenMove: Css['unmove'], bMask: false })
    }
    goBack() {
        this.props.history.goBack()
    }
    //显示隐藏价格排序
    handlePriceOrder() {
        this.bSalesMenu = false
        this.setState({ bSalesMenu: false })
        if (this.bPriceMenu === false) {
            this.bPriceMenu = true
            this.setState({ bPriceMenu: true })
        } else {
            this.bPriceMenu = false
            this.setState({ bPriceMenu: false })
        }
    }
    //显示隐藏销量排序
    handleSalesOrder() {
        this.bPriceMenu = false
        this.setState({ bPriceMenu: false })
        if (this.bSalesMenu === false) {
            this.bSalesMenu = true
            this.setState({ bSalesMenu: true })
        } else {
            this.bSalesMenu = false
            this.setState({ bSalesMenu: false })
        }
        this.oType = "sales"
        this.getPageData()
    }
    changeSearch() {
        this.setState({ pageStyle: { display: "block" } })
    }
    getStyle(val) {
        this.setState({ pageStyle: val })
    }
    getPageData() {
        this.setParams()
        let url = config.baseUrl + "/api/home/goods/search?" + this.sParams + "&page=1&token=" + config.token
        request(url).then(res => {
            console.log("aGoods", res.data)
            if (res.code === 200) {
                this.setState({ aGoods: res.data })
                this.maxPage = res.pageinfo.pagenum
                lazyImage()
                this.getScrollPage()
            } else {
                this.setState({ aGoods: [] })
            }
        })
    }
    getScrollPage() {
        this.oUpRefresh = new Uprefresh({ 'curPage': this.curPage, "maxPage": this.maxPage, "offsetBottom": this.offsetBottom }, curPage => {
            // this.apiUrl = config.baseUrl + "/api/home/goods/search?" + this.sParams + "&page=" + curPage
            let url = config.baseUrl + "/api/home/goods/search?" + this.sParams + "&page=" + curPage + "&token=" + config.token
            request(url).then(res => {
                if (res.code === 200) {
                    let aGoods = this.state.aGoods
                    if (aGoods.length > 0) {
                        for (let i = 0; i < res.data.length; i++) {
                            aGoods.push(res.data[i])
                        }
                    }
                    this.setState({ aGoods: aGoods })
                    // lazyImage()
                }
            })
        })
    }
    setParams() {
        this.sParams = "kwords=" + this.sKeywords + "&param=&price1=&price2=&otype=" + this.oType + "&cid="
    }
    //选择价格排序里的
    checkedPriceOrder(index) {
        let aPriceOrder = this.state.aPriceOrder
        for (let key in aPriceOrder) {
            aPriceOrder[key].checked = false
        }
        aPriceOrder[index].checked = true
        this.oType = aPriceOrder[index].type
        this.setState({ aPriceOrder: aPriceOrder })
        this.getPageData()
    }
    render() {
        return (
            <div className={Css['page']}>
                <div className={Css['search-top']}>
                    <div className={Css['search-header']}>
                        <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                        <div className={Css['search-wrap']} onClick={this.changeSearch.bind(this)}>
                            <div className={Css['search-icon']}></div>
                            <div className={Css['search']}>{this.state.sKeywords}</div>
                        </div>
                        <div className={Css['search-btn']} onClick={this.showScreen.bind(this)}>筛选</div>
                    </div>
                    <div className={Css['order-main']}>
                        <div className={this.state.bPriceMenu ? Css['order-item'] + " " + Css['active'] : Css['order-item']} onClick={this.handlePriceOrder.bind(this)}>
                            <div className={Css['order-text']}>综合</div>
                            <div className={Css['order-icon']}></div>
                            <ul className={this.state.bPriceMenu ? Css['order-menu'] : Css['order-menu'] + " hide"}>
                                {
                                    this.state.aPriceOrder.map((item, index) => {
                                        return (
                                            <li key={index} className={item.checked ? Css['active'] : ""} onClick={this.checkedPriceOrder.bind(this, index)}>{item.title}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className={this.state.bSalesMenu ? Css['order-item'] + " " + Css['active'] : Css['order-item']} onClick={this.handleSalesOrder.bind(this)}>
                            <div className={Css['order-text']}>销量</div>
                        </div>
                    </div>
                </div>
                <div className={Css['goods-main']}>
                    {
                        this.state.aGoods.length > 0 ?
                            this.state.aGoods.map((item, index) => {
                                return (
                                    <div className={Css['goods-list']} key={index}>
                                        <div className={Css['image']}>
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div className={Css['goods-content']}>
                                            <div className={Css['goods-title']}>{item.title}</div>
                                            <div className={Css['goods-price']}>￥{item.price}</div>
                                            <div className={Css['goods-sales']}>销量<span>{item.sales}</span>件</div>
                                        </div>
                                    </div>
                                )
                            }) : ""
                    }
                </div>
                <div ref="mask" className={this.state.bMask ? Css['mask'] : Css['mask'] + " hide"} onClick={this.hideScreen.bind(this)}></div>
                <div ref="screen" className={Css['screen'] + " " + this.state.screenMove} id="screen">
                    <div>
                        <div className={Css['attr-wrap']}>
                            <div className={Css['attr-tittle-wrap']}>
                                <div className={Css['attr-name']}>分类</div>
                                <div className={Css['attr-icon'] + " " + Css['up']}></div>
                            </div>
                            <div className={Css['item-wrap']}>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item'] + " " + Css['active']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                                <div className={Css['item']}>潮流女装</div>
                            </div>
                        </div>
                        <div style={{ width: "100%", height: "1px", backgroundColor: "#efefef" }}></div>
                        <div className={Css['attr-wrap']}>
                            <div className={Css['attr-tittle-wrap']}>
                                <div className={Css['attr-name']}>价格区间</div>
                                <div className={Css['price-wrap']}>
                                    <div className={Css['price-input']}>
                                        <input type="tel" placeholder="最低价" />
                                    </div>
                                    <div className={Css['price-line']}></div>
                                    <div className={Css['price-input']}>
                                        <input type="tel" placeholder="最高价" />
                                    </div>
                                </div>
                                <div className={Css['attr-icon'] + " " + Css['up']}></div>
                            </div>
                            <div className={Css['item-wrap']}>
                                <div className={Css['item']}>0-50</div>
                                <div className={Css['item'] + " " + Css['active']}>51-100</div>
                                <div className={Css['item']}>101-300</div>
                                <div className={Css['item']}>301-1000</div>
                                <div className={Css['item']}>1001-4000</div>
                                <div className={Css['item']}>4001-9999</div>
                            </div>
                        </div>
                        <div style={{ width: "100%", height: "1px", backgroundColor: "#efefef" }}></div>
                        <div className={Css['attr-wrap']}>
                            <div className={Css['attr-tittle-wrap']}>
                                <div className={Css['attr-name']}>品牌</div>
                                <div className={Css['attr-icon']}></div>
                            </div>
                            <div className={Css['item-wrap']}>
                                <div className={Css['item']}>李宁</div>
                                <div className={Css['item']}>阿迪达斯</div>
                                <div className={Css['item']}>耐克</div>
                            </div>
                        </div>
                        <div style={{ width: "100%", height: "1px", backgroundColor: "#efefef" }}></div>
                        <div className={Css['attr-wrap']}>
                            <div className={Css['attr-tittle-wrap']}>
                                <div className={Css['attr-name']}>衣长</div>
                                <div className={Css['attr-icon']}></div>
                            </div>
                            <div className={Css['item-wrap']}>
                                <div className={Css['item']}>长款</div>
                                <div className={Css['item']}>中长款</div>
                                <div className={Css['item']}>短款</div>
                            </div>
                        </div>
                        <div style={{ width: "100%", height: "1px", backgroundColor: "#efefef" }}></div>
                        <div style={{ width: "100%", height: "1rem" }}></div>
                    </div>
                    <div className={Css['handle-wrap']}>
                        <div className={Css['item']}>共<span>16</span>件</div>
                        <div className={Css['item'] + " " + Css['reset']}>全部重置</div>
                        <div className={Css['item'] + " " + Css['sure']}>确定</div>
                    </div>
                </div>

                <SearchComponent pageStyle={this.state.pageStyle} childStyle={this.getStyle.bind(this)} isLocal="1" childKeywords={this.getC}></SearchComponent>
                <div className={Css['']}></div>
            </div>
        )
    }
}
