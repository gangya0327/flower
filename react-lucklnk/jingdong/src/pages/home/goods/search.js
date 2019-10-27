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
            sKeywords: "",
            aClassify: {
                checked: true, items: [
                    // { cid: 1, title: "潮流女装", checked: false },
                    // { cid: 2, title: "品牌男装", checked: false },
                    // { cid: 3, title: "数码科技", checked: false },
                ]
            },
            aPrice: {
                checked: true, items: [
                    { price1: 1, price2: 50, checked: false },
                    { price1: 51, price2: 99, checked: false },
                    { price1: 100, price2: 300, checked: false },
                    { price1: 300, price2: 500, checked: false },
                ]
            },
            fprice1: 0,
            fprice2: 50,
            aAttr: [
                // {
                //     title: "品牌",
                //     checked: true,
                //     param: [{ pid: 978, title: "波司登", checked: false, },
                //     { pid: 976, title: "ADIDAS", checked: false, }]
                // },
                // {
                //     title: "衣长",
                //     checked: true,
                //     param: [{ pid: 978, title: "中长款", checked: false, },
                //     { pid: 979, title: "短款", checked: false, },
                //     { pid: 980, title: "长款", checked: false, },
                //     { pid: 981, title: "小短款", checked: false, }]
                // }
            ],
            itemTotal: 0
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
        this.cid = ""
        this.fPrice1 = ""
        this.fPrice2 = ""
        this.sParam = ""
        this.aParam = []
    }
    componentDidMount() {
        this.myScroll = new IScroll(this.refs['screen'], {
            scrollX: false,
            scrollY: true,
            preventDefault: false
        })
        this.sKeywords = decodeURIComponent(localParam(this.props.history.location.search).search.keywords)
        this.setState({ sKeywords: this.sKeywords })
        this.getPageData()
        this.getClassifyData()
        this.getAttrData()
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
                this.setState({ aGoods: res.data, itemTotal: res.pageinfo.total }, () => {
                    lazyImage()
                })
                this.maxPage = res.pageinfo.pagenum
                this.getScrollPage()
            } else {
                this.setState({ aGoods: [], itemTotal: 0 })
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
                    this.setState({ aGoods: aGoods }, () => {
                        lazyImage()
                    })
                }
            })
        })
    }
    setParams() {
        this.sParams = "kwords=" + this.sKeywords + "&param=" + this.sParam + "&price1=" + this.fPrice1 + "&price2=" + this.fPrice2
            + "&otype=" + this.oType + "&cid=" + this.cid
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
    getChildKeywords(val) {
        this.sKeywords = val
        this.setState({ sKeywords: val, pageStyle: { display: 'none' } })
        this.props.history.replace(config.path + 'goods/search?keywords=' + val)
        this.setReset()
        this.getPageData()
        this.getAttrData()
    }
    //分类显示隐藏
    handleClassify() {
        let aClassify = this.state.aClassify
        if (aClassify.checked) {
            aClassify.checked = false
        } else {
            aClassify.checked = true
        }
        this.setState({ aClassify: aClassify })
    }
    //选择分类
    checkedClassify(index) {
        let aClassify = this.state.aClassify
        if (aClassify.items.length > 0) {
            for (let i = 0; i < aClassify.items.length; i++) {
                if (i !== index) {
                    aClassify.items[i].checked = false
                }
            }
            if (aClassify.items[index].checked) {
                aClassify.items[index].checked = false
                this.cid = ""
            } else {
                aClassify.items[index].checked = true
                this.cid = aClassify.items[index].cid
            }
        }
        this.setState({ aClassify: aClassify })
    }
    //价格显示隐藏
    handlePrice() {
        let aPrice = this.state.aPrice
        if (aPrice.checked) {
            aPrice.checked = false
        } else {
            aPrice.checked = true
        }
        this.setState({ aPrice: aPrice })
    }
    //选择价格范围
    checkedPrice(index, price1, price2) {
        let aPrice = this.state.aPrice
        if (aPrice.items.length > 0) {
            for (let i = 0; i < aPrice.items.length; i++) {
                if (i !== index) {
                    aPrice.items[i].checked = false
                }
            }
            if (aPrice.items[index].checked) {
                aPrice.items[index].checked = false
                price1 = 0
                price2 = 0
                this.fPrice1 = ""
                this.fPrice2 = ""
            } else {
                aPrice.items[index].checked = true
                this.fPrice1 = price1
                this.fPrice2 = price2
            }
        }
        this.setState({ aPrice: aPrice, fprice1: price1, fprice2: price2 })
    }
    //属性显示隐藏
    handleAttr(index) {
        let aAttr = this.state.aAttr
        if (aAttr[index].checked) {
            aAttr[index].checked = false
        } else {
            aAttr[index].checked = true
        }
        this.setState({ aAttr: aAttr })
    }
    //选择属性的值，多选
    checkedParam(attrIndex, paramIndex) {
        let aAttr = this.state.aAttr
        if (aAttr[attrIndex].param[paramIndex].checked) {
            aAttr[attrIndex].param[paramIndex].checked = false
            for (let i = 0; i < this.aParam.length; i++) {
                if (this.aParam[i] === aAttr[attrIndex].param[paramIndex].pid) {
                    this.aParam.splice(i--, 1)
                    break
                }
            }
        } else {
            aAttr[attrIndex].param[paramIndex].checked = true
            this.aParam.push(aAttr[attrIndex].param[paramIndex].pid)
        }
        console.log(this.aParam)
        this.sParam = this.aParam.length > 0 ? JSON.stringify(this.aParam) : ""
        this.setState({ aAttr: aAttr })
    }
    //阻止冒泡
    preventBubble(e) {
        e.stopPropagation()
    }
    //获取分类数据
    getClassifyData() {
        let url = config.baseUrl + "/api/home/category/menu?token=" + config.token
        request(url).then(res => {
            console.log("aClassify ", res.data)
            if (res.code === 200) {
                let aClassify = { checked: true }
                aClassify.items = res.data
                for (let i = 0; i < res.data.length; i++) {
                    aClassify.items[i].checked = false
                }
                this.setState({ aClassify: aClassify }, () => {
                    this.myScroll.refresh()
                })
            }
        })
    }
    //获取属性数据
    getAttrData() {
        let url = config.baseUrl + '/api/home/goods/param?kwords=' + this.sKeywords + "&token=" + config.token
        request(url).then(res => {
            console.log("aAttr ", res.data)
            if (res.code === 200) {
                let aAttr = res.data
                for (let i = 0; i < aAttr.length; i++) {
                    aAttr[i].checked = true
                    if (aAttr[i].param.length > 0) {
                        for (let j = 0; j < aAttr[i].param.length; j++) {
                            aAttr[i].param[j].checked = false
                        }
                    }
                }
                this.setState({ aAttr: aAttr }, () => {
                    this.myScroll.refresh()
                })
            }
        })
    }
    //监听价格范围最低价的值
    changePrice1(e) {
        this.setState({ fprice1: e.target.value.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[#|*|,|+|;]/g, '') }, () => {
            this.fPrice1 = this.state.fprice1
        })
    }
    //监听价格范围最高价的值
    changePrice2(e) {
        this.setState({ fprice2: e.target.value.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[#|*|,|+|;]/g, '') }, () => {
            this.fPrice2 = this.state.fprice2
        })
    }
    goSearch() {
        this.hideScreen()
        this.getPageData()
    }
    //全部重置
    setReset() {
        this.sParam = ""
        this.cid = ""
        this.fPrice1 = ""
        this.fPrice2 = ""
        this.oType = "all"

        //分类重置
        let aClassify = this.state.aClassify
        if (aClassify.items.length > 0) {
            for (let i = 0; i < aClassify.items.length; i++) {
                aClassify.items[i].checked = false
            }
        }
        //价格范围重置
        let aPrice = this.state.aPrice
        for (let i = 0; i < aPrice.items.length; i++) {
            aPrice.items[i].checked = false
        }
        //属性重置
        let aAttr = this.state.aAttr
        if (aAttr.length > 0) {
            for (let i = 0; i < aAttr.length; i++) {
                if (aAttr[i].param.length > 0) {
                    for (let j = 0; j < aAttr[i].param.length; j++) {
                        aAttr[i].param[j].checked = false
                    }
                }
            }
        }

        this.setState({ fPrice1: 0, fPrice2: 0, aClassify: aClassify, aPrice: aPrice, aAttr: aAttr })
    }
    componentWillUnmount() {
        this.setState=(state, callback)=>{
            return
        }
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
                                            <img data-echo={item.image} src={require("../../../assets/images/common/lazyImg.jpg")} alt={item.title} />
                                        </div>
                                        <div className={Css['goods-content']}>
                                            <div className={Css['goods-title']}>{item.title}</div>
                                            <div className={Css['goods-price']}>￥{item.price}</div>
                                            <div className={Css['goods-sales']}>销量<span>{item.sales}</span>件</div>
                                        </div>
                                    </div>
                                )
                            }) : <div className="null-item">没有相关商品</div>
                    }
                </div>
                <div ref="mask" className={this.state.bMask ? Css['mask'] : Css['mask'] + " hide"} onClick={this.hideScreen.bind(this)}></div>
                <div ref="screen" className={Css['screen'] + " " + this.state.screenMove}>
                    <div>
                        <div className={Css['attr-wrap']}>
                            <div className={Css['attr-tittle-wrap']} onClick={this.handleClassify.bind(this)}>
                                <div className={Css['attr-name']}>分类</div>
                                <div className={this.state.aClassify.checked ? Css['attr-icon'] + " " + Css['up'] : Css['attr-icon']}></div>
                            </div>
                            <div className={this.state.aClassify.checked ? Css['item-wrap'] : Css['item-wrap'] + " height-hide"}>
                                {
                                    this.state.aClassify.items.length > 0 ?
                                        this.state.aClassify.items.map((item, index) => {
                                            return (
                                                <div key={index} className={item.checked ? Css['item'] + " " + Css['active'] : Css['item']}
                                                    onClick={this.checkedClassify.bind(this, index)}>{item.title}</div>
                                            )
                                        }) : ""
                                }
                            </div>
                        </div>
                        <div style={{ width: "100%", height: "1px", backgroundColor: "#efefef" }}></div>
                        <div className={Css['attr-wrap']}>
                            <div className={Css['attr-tittle-wrap']} onClick={this.handlePrice.bind(this)}>
                                <div className={Css['attr-name']}>价格区间</div>
                                <div className={Css['price-wrap']}>
                                    <div className={Css['price-input']} onClick={this.preventBubble.bind(this)}>
                                        <input type="tel" placeholder="最低价" value={this.state.fprice1 === 0 ? "" : this.state.fprice1}
                                            onChange={this.changePrice1.bind(this)} />
                                    </div>
                                    <div className={Css['price-line']}></div>
                                    <div className={Css['price-input']} onClick={this.preventBubble.bind(this)}>
                                        <input type="tel" placeholder="最高价" value={this.state.fprice1 === 0 ? "" : this.state.fprice2}
                                            onChange={this.changePrice2.bind(this)} />
                                    </div>
                                </div>
                                <div className={this.state.aPrice.checked ? Css['attr-icon'] + " " + Css['up'] : Css['attr-icon']}></div>
                            </div>
                            <div className={this.state.aPrice.checked ? Css['item-wrap'] : Css['item-wrap'] + " height-hide"}>
                                {
                                    this.state.aPrice.items.map((item, index) => {
                                        return (
                                            <div key={index} className={item.checked ? Css['item'] + " " + Css['active'] : Css['item']}
                                                onClick={this.checkedPrice.bind(this, index, item.price1, item.price2)}>{item.price1}-{item.price2}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div style={{ width: "100%", height: "1px", backgroundColor: "#efefef" }}></div>
                        {
                            this.state.aAttr.length > 0 ?
                                this.state.aAttr.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className={Css['attr-wrap']}>
                                                <div className={Css['attr-tittle-wrap']} onClick={this.handleAttr.bind(this, index)}>
                                                    <div className={Css['attr-name']}>{item.title}</div>
                                                    <div className={item.checked ? Css['attr-icon'] + " " + Css['up'] : Css['attr-icon']}></div>
                                                </div>
                                                <div className={item.checked ? Css['item-wrap'] : Css['item-wrap'] + " height-hide"}>
                                                    {
                                                        item.param.length > 0 ?
                                                            item.param.map((item2, index2) => {
                                                                return (
                                                                    <div key={index2} className={item2.checked ? Css['item'] + " " + Css['active'] : Css['item']}
                                                                        onClick={this.checkedParam.bind(this, index, index2)}>{item2.title}</div>
                                                                )
                                                            }) : ""
                                                    }
                                                </div>
                                            </div>
                                            <div style={{ width: "100%", height: "1px", backgroundColor: "#efefef" }}></div>
                                        </React.Fragment>
                                    )
                                }) : ""
                        }
                        <div style={{ width: "100%", height: "1rem" }}></div>
                    </div>
                    <div className={Css['handle-wrap']}>
                        <div className={Css['item']}>共<span>{this.state.itemTotal}</span>件</div>
                        <div className={Css['item'] + " " + Css['reset']} onClick={this.setReset.bind(this)}>全部重置</div>
                        <div className={Css['item'] + " " + Css['sure']} onClick={this.goSearch.bind(this)}>确定</div>
                    </div>
                </div>

                <SearchComponent pageStyle={this.state.pageStyle} childStyle={this.getStyle.bind(this)} isLocal="1"
                    childKeywords={this.getChildKeywords.bind(this)} keywords={this.state.sKeywords}></SearchComponent>
            </div>
        )
    }
}
