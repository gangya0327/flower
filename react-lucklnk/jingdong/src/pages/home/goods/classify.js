import React from 'react'
import { Route, Switch } from 'react-router-dom'
import asyncComponent from "../../../components/async/AsyncComponent"
import IScroll from '../../../assets/js/libs/iscroll'
import config from '../../../assets/js/conf/config'
import Css from '../../../assets/css/home/goods/classify.css'
import { request } from '../../../assets/js/libs/request'

const GoodsItems = asyncComponent(() => import("./items"));

export default class GoodsClassify extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            aClassify: []
        }
        this.myScroll = null
        this.aTempClassify = []
    }
    componentDidMount() {
        this.getClassifyData()
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
    eventScroll() {
        document.getElementById("scroll-classify").addEventListener("touchmove", function (e) {
            e.preventDefault()
        }, false)
        this.myScroll = new IScroll("#scroll-classify", {
            scrollX: false,
            scrollY: true,
            preventDefault: false
        })
    }
    getClassifyData() {
        request(config.baseUrl + "/api/home/category/menu?token=" + config.token).then((res) => {
            if (res.code === 200) {
                this.aTempClassify = res.data
                for (let i = 0; i < this.aTempClassify.length; i++) {
                    this.aTempClassify[i].bActive = false
                }
                console.log(JSON.stringify(this.aTempClassify));
                this.setState({
                    aClassify: this.aTempClassify
                }, () => {
                    this.eventScroll()
                })
            }
        })
    }
    changeStyle(pUrl, pIndex) {
        if (this.aTempClassify.length > 0) {
            for (let i = 0; i < this.aTempClassify.length; i++) {
                this.aTempClassify[i].bActive = false
            }
        }
        this.aTempClassify[pIndex].bActive = true
        this.myScroll.scrollTo(0, -100, 300, IScroll.utils.ease.elastic)
        this.jumpPage(pUrl)
    }
    render() {
        return (
            <div>
                <div className={Css['search-header']}>
                    <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                    <div className={Css['search']}>请输入宝贝名称</div>
                </div>
                <div className={Css['goods-main']}>
                    <div id="scroll-classify" className={Css['classify-wrap']}>
                        <div>
                            {
                                this.state.aClassify !== null ?
                                    this.state.aClassify.map((item, index) => {
                                        return (
                                            <div key={index} className={item.bActive ? Css['classify-item'] + " " + Css['active'] : Css['classify-item']}
                                                onClick={this.changeStyle.bind(this, "goods/classify/items?cid=" + item.cid, index)}>{item.title}</div>
                                        )
                                    })
                                    : ""
                            }
                        </div>
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
