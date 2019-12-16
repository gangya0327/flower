import React from 'react'
import Css from '../../../assets/css/home/goods/details_reviews.css'
import { lazyImage, localParam } from '../../../assets/js/utils/utils'
import { request } from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'
import Uprefresh from '../../../assets/js/libs/uprefresh'

export default class DetailsReview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            aReviews: [],
            iReviewTotal: 0,
            gid: props.location.search !== "" ? localParam(props.location.search).search.gid : ""
        }
        this.oUpRefresh = null
        this.curPage = 1
        this.maxPage = 0
        this.offsetBottom = 100
    }
    componentDidMount() {
        this.getReviews()
    }
    getReviews() {
        let sUrl = config.baseUrl + "/api/home/reviews/index?gid=" + this.state.gid + "&token=" + config.token + "&page=1"
        request(sUrl).then((res) => {
            if (res.code === 200) {
                this.setState({ aReviews: res.data, iReviewTotal: res.pageinfo.total }, () => {
                    lazyImage()
                })
                this.maxPage = res.pageinfo.pagenum
                this.getScrollPage()
            } else {
                this.setState({ aReviews: [] })
            }
        })
    }
    getScrollPage() {
        this.oUpRefresh = new Uprefresh({ 'curPage': this.curPage, "maxPage": this.maxPage, "offsetBottom": this.offsetBottom }, curPage => {
            // this.apiUrl = config.baseUrl + "/api/home/goods/search?" + this.sParams + "&page=" + curPage
            let url = config.baseUrl + "/api/home/reviews/index?gid=" + this.state.gid + "&token=" + config.token + "&page=" + curPage
            request(url).then(res => {
                if (res.code === 200) {
                    let aReviews = this.state.aReviews
                    if (aReviews.length > 0) {
                        for (let i = 0; i < res.data.length; i++) {
                            aReviews.push(res.data[i])
                        }
                    }
                    this.setState({ aReviews: aReviews }, () => {
                        lazyImage()
                    })
                }
            })
        })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        return (
            <div className={Css['page']}>
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
                </div>
            </div>
        )
    }
}
