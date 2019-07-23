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
        this.getSwiper()
    }
    getSwiper() {
        fetch("http://vueshop.glbuys.com/api/home/index/slide?token=1ec949a15fb709370f").then((res) => {
            return res.json()
        }).then((data)=>{
            
        })
    }
    render() {
        return (
            <div class={Css['page']}>
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
                            <div className={Css['goods-price1']}>128元</div>
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
                            <div className={Css['price']}>￥280</div>
                            <div className={Css['unprice']}>￥280</div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556119.jpg" alt="" />
                            </div>
                            <div className={Css['price']}>￥280</div>
                            <div className={Css['unprice']}>￥480</div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556119.jpg" alt="" />
                            </div>
                            <div className={Css['price']}>￥280</div>
                            <div className={Css['unprice']}>￥298</div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556119.jpg" alt="" />
                            </div>
                            <div className={Css['price']}>￥280</div>
                            <div className={Css['unprice']}>￥310</div>
                        </div>
                    </div>
                </div>

                <div className={Css['goods-level-wrap']}>
                    <div className={Css['classify-title'] + " " + Css['color2']}>—— 品牌男装 ——</div>
                    <div className={Css['goods-level1-wrap']}>
                        <div className={Css['goods-level1-item0']}>
                            <div className={Css['goods-title2']}>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                            <div className={Css['goods-text2']}>火爆开售</div>
                            {/* <div className={Css['goods-price2']}>1280元</div> */}
                            <div className={Css['goods-img2']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" />
                            </div>
                        </div>
                        <div className={Css['goods-level1-item0']}>
                            <div className={Css['goods-title2']}>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                            <div className={Css['goods-text2']}>火爆开售</div>
                            {/* <div className={Css['goods-price2']}>1280元</div> */}
                            <div className={Css['goods-img2']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={Css['goods-list-wrap']}>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556119.jpg" alt="" />
                            </div>
                            <div className={Css['price']}>￥280</div>
                            <div className={Css['unprice']}>￥280</div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556119.jpg" alt="" />
                            </div>
                            <div className={Css['price']}>￥280</div>
                            <div className={Css['unprice']}>￥330</div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556119.jpg" alt="" />
                            </div>
                            <div className={Css['price']}>￥280</div>
                            <div className={Css['unprice']}>￥312</div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556119.jpg" alt="" />
                            </div>
                            <div className={Css['price']}>￥280</div>
                            <div className={Css['unprice']}>￥340</div>
                        </div>
                    </div>
                </div>

                <div className={Css['goods-level-wrap']}>
                    <div className={Css['classify-title'] + " " + Css['color3']}>—— 电脑办公 ——</div>
                    <div className={Css['goods-level1-wrap']}>
                        <div className={Css['goods-level1-item0']}>
                            <div className={Css['goods-title']}>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                            <div className={Css['goods-text']}>精品打折</div>
                            <div className={Css['goods-price1']}>128元</div>
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
                            <div className={Css['price']}>￥280</div>
                            <div className={Css['unprice']}>￥300</div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556119.jpg" alt="" />
                            </div>
                            <div className={Css['price']}>￥280</div>
                            <div className={Css['unprice']}>￥352</div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556119.jpg" alt="" />
                            </div>
                            <div className={Css['price']}>￥280</div>
                            <div className={Css['unprice']}>￥368</div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                            <div className={Css['image']}>
                                <img src="http://vueshop.glbuys.com/uploadfiles/1524556119.jpg" alt="" />
                            </div>
                            <div className={Css['price']}>￥280</div>
                            <div className={Css['unprice']}>￥336</div>
                        </div>
                    </div>
                </div>
                <div class={Css['reco-title-wrap']}>
                    <div class={Css['line']}></div>
                    <div class={Css['reco-text-wrap']}>
                        <div class={Css['reco-icon']}></div>
                        <div class={Css['reco-text']}>为您推荐</div>
                    </div>
                    <div class={Css['line']}></div>
                </div>
                <div class={Css['reco-item-wrap']}>
                    <div class={Css['reco-item']}>
                        <div class={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1484283665.jpg" alt="" />
                        </div>
                        <div class={Css['title']}>ONLY冬装新品雪纺拼接流苏腰带长款连衣裙女</div>
                        <div class={Css['price']}>￥399</div>
                    </div>
                    <div class={Css['reco-item']}>
                        <div class={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1484283665.jpg" alt="" />
                        </div>
                        <div class={Css['title']}>韩都衣舍2016新款时尚拼接色宽松显瘦气质长款长袖连衣裙</div>
                        <div class={Css['price']}>￥485</div>
                    </div>
                    <div class={Css['reco-item']}>
                        <div class={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1484283665.jpg" alt="" />
                        </div>
                        <div class={Css['title']}>ONLY冬装新品雪纺拼接流苏腰带长款连衣裙女</div>
                        <div class={Css['price']}>￥399</div>
                    </div>
                </div>
            </div>
        )
    }
}
