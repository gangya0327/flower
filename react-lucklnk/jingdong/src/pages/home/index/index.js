import React from 'react'
import Swiper from '../../../assets/js/libs/swiper.min.js'
import '../../../assets/css/common/swiper.min.css'
import Css from '../../../assets/css/home/index/index.css'

export default class IndexComponent extends React.Component {
    componentDidMount() {
        var mySwiper = new Swiper(Css['swiper-wrap'], {
            autoplay: 5000,
        })
    }
    render() {
        return (
            <div>
                <div class={Css['search-header']}>
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
                    <div className="swiper-wrap">
                        <div className="swiper-slide">slide1</div>
                        <div className="swiper-slide">slide2</div>
                        <div className="swiper-slide">slide3</div>
                    </div>
                </div>
            </div>
        )
    }
}
