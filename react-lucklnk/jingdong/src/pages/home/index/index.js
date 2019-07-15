import React from 'react'
import Swiper from '../../../assets/js/libs/swiper.min.js'
import '../../../assets/css/common/swiper.min.css'
import Css from '../../../assets/css/home/index/index.css'

export default class IndexComponent extends React.Component {
    componentDidMount() {
        new Swiper("." + Css['swiper-wrap'], {
            autoplay: 3000,
            pagination: ".swiper-pagination",
            autoplayDisableOnInteraction: false
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
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
                                <img src="http://vueshop.glbuys.com/uploadfiles/1484285334.jpg" alt="" />
                            </a>
                        </div>
                        <div className="swiper-slide">
                            <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
                                <img src="http://vueshop.glbuys.com/uploadfiles/1484285334.jpg" alt="" />
                            </a>
                        </div>
                        <div className="swiper-slide">
                            <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
                                <img src="http://vueshop.glbuys.com/uploadfiles/1484285334.jpg" alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div class={Css['quick-nav']}>
                    <ul class={Css['item']}>
                        <li className={Css['item-img']}>
                            <img src="http://vueshop.glbuys.com/uploadfiles/1484287695.png" alt="" />
                        </li>
                        <li className={Css['item-text']}>潮流女装</li>
                    </ul>
                    <ul class={Css['item']}>
                        <li className={Css['item-img']}>
                            <img src="http://vueshop.glbuys.com/uploadfiles/1484287695.png" alt="" />
                        </li>
                        <li className={Css['item-text']}>品牌男装</li>
                    </ul>
                    <ul class={Css['item']}>
                        <li className={Css['item-img']}>
                            <img src="http://vueshop.glbuys.com/uploadfiles/1484287695.png" alt="" />
                        </li>
                        <li className={Css['item-text']}>电脑办公</li>
                    </ul>
                    <ul class={Css['item']}>
                        <li className={Css['item-img']}>
                            <img src="http://vueshop.glbuys.com/uploadfiles/1484287695.png" alt="" />
                        </li>
                        <li className={Css['item-text']}>手机数码</li>
                    </ul>
                </div>
                <div className={Css['goods-level-wrap']}>
                    <div className={Css['classify-title'] + " " + Css['color1']}>—— 潮流女装 ——</div>
                    <div className={Css['goods-level1-wrap']}>
                        <div className={Css['goods-level1-item0']}>
                            <div className={Css['goods-title']}>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                            <div className={Css['goods-text']}>精品打折</div>
                            <div className={Css['goods-price']}>128元</div>
                            <div className={Css['goods-img']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" />
                            </div>
                        </div>
                        <div className={Css['goods-level1-item1']}>
                            <div className={Css['goods-row']}>
                                <div className={Css['goods-row-title']}>欧美尖头蝴蝶结拖鞋女夏外穿2018新款绸缎面细跟凉拖半拖鞋穆勒鞋</div>
                                <div className={Css['goods-row-text']}>品质精挑</div>
                                <div className={Css['goods-row-img']}>
                                    <img src="http://vueshop.glbuys.com/uploadfiles/1524556315.jpg" alt="" />
                                </div>
                            </div>
                            <div className={Css['goods-row']}>
                                <div className={Css['goods-row-title']}>欧美尖头蝴蝶结拖鞋女夏外穿2018新款绸缎面细跟凉拖半拖鞋穆勒鞋</div>
                                <div className={Css['goods-row-text']}>品质精挑4折起</div>
                                <div className={Css['goods-row-img']}>
                                    <img src="http://vueshop.glbuys.com/uploadfiles/1524556315.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Css['goods-list-wrap']}>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556119.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
