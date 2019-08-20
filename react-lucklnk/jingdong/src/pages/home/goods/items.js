import React from 'react'
import Css from '../../../assets/css/home/goods/items.css'
import IScroll from '../../../assets/js/libs/iscroll'
import { lazyImage, localParam } from '../../../assets/js/utils/utils'
import { request } from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'

export default class GoodsItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            aGoods: []
        }
        this.myScroll = null
    }
    componentDidMount() {
        this.getData(this.props)
    }
    componentWillReceiveProps(newProps) {
        this.getData(newProps)
    }
    getData(props) {
        let cid = localParam(props.location.search).search.cid ? localParam(props.location.search).search.cid : ""
        request(config.baseUrl + "/api/home/category/show?cid=" + cid + "&token=" + config.token).then((res) => {
            if (res.code === 200) {
                this.setState({ aGoods: res.data }, () => {
                    this.eventScroll()
                    lazyImage()
                    this.myScroll.on("scrollEnd", () => {
                        lazyImage()
                    })
                })
            } else {
                this.setState({ aGoods: [] })
            }
        })
    }
    eventScroll() {
        document.getElementById("goods-content-main").addEventListener("touchmove", function (e) {
            e.preventDefault()
        }, false)
        this.myScroll = new IScroll("#goods-content-main", {
            scrollX: false,
            scrollY: true,
            preventDefault: false
        })
    }
    render() {
        return (
            <div className={Css['goods-container-main']} id="goods-content-main">
                <div>
                    {
                        this.state.aGoods.length > 0 ?
                            this.state.aGoods.map((item, index) => {
                                return (
                                    <div className={Css['goods-wrap']} key={index}>
                                        <div className={Css['classify-name']}>{item.title}</div>
                                        <div className={Css['goods-items-wrap']}>
                                            {
                                                item.goods !== null ?
                                                    item.goods.map((item2, index2) => {
                                                        return (
                                                            <ul key={index2}>
                                                                <li>
                                                                    <img src={require("../../../assets/images/common/lazyImg.jpg")} alt={item2.title} data-echo={item2.image} />
                                                                </li>
                                                                <li>{item2.title}</li>
                                                            </ul>
                                                        )
                                                    }) : ""
                                            }
                                        </div>
                                    </div>
                                )
                            }) : <div className="null-item">没有相关商品</div>
                    }
                </div>
            </div>
        )
    }
}
