import React from 'react'
import Css from '../../../assets/css/home/goods/details_reviews.css'
import { lazyImage, localParam } from '../../../assets/js/utils/utils'
import { request } from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'

export default class DetailsReview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
    }
    componentWillReceiveProps(newProps) {
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
