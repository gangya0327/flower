import React from 'react'
import { Route, Switch } from 'react-router-dom'
import asyncComponent from "../../../components/async/AsyncComponent";
import config from '../../../assets/js/conf/config'
import Css from '../../../assets/css/home/goods/items.css'

export default class GoodsItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentWillMount() {
    }
    componentWillReceiveProps(newProps) {
    }
    render() {
        return (
            <div className={Css['goods-container-main']}>
                <div className={Css['goods-wrap']}>
                    <div className={Css['classify-name']}>裙装</div>
                    <div className={Css['goods-items-wrap']}>
                        <ul>
                            <li>
                                <img src="//vueshop.glbuys.com/uploadfiles/1523793417.jpg" alt="" />
                            </li>
                            <li>韩都衣舍2017韩版女装春款新款木耳边卡通刺绣显瘦连衣裙</li>
                        </ul>
                        <ul>
                            <li>
                                <img src="//vueshop.glbuys.com/uploadfiles/1523793417.jpg" alt="" />
                            </li>
                            <li>韩都衣舍2017韩版女装春款新款木耳边卡通刺绣显瘦连衣裙</li>
                        </ul>
                        <ul>
                            <li>
                                <img src="//vueshop.glbuys.com/uploadfiles/1523793417.jpg" alt="" />
                            </li>
                            <li>韩都衣舍2017韩版女装春款新款木耳边卡通刺绣显瘦连衣裙</li>
                        </ul>
                        <ul>
                            <li>
                                <img src="//vueshop.glbuys.com/uploadfiles/1523793417.jpg" alt="" />
                            </li>
                            <li>韩都衣舍2017韩版女装春款新款木耳边卡通刺绣显瘦连衣裙</li>
                        </ul>
                        <ul>
                            <li>
                                <img src="//vueshop.glbuys.com/uploadfiles/1523793417.jpg" alt="" />
                            </li>
                            <li>韩都衣舍2017韩版女装春款新款木耳边卡通刺绣显瘦连衣裙</li>
                        </ul>
                        <ul>
                            <li>
                                <img src="//vueshop.glbuys.com/uploadfiles/1523793417.jpg" alt="" />
                            </li>
                            <li>韩都衣舍2017韩版女装春款新款木耳边卡通刺绣显瘦连衣裙</li>
                        </ul>
                        <ul>
                            <li>
                                <img src="//vueshop.glbuys.com/uploadfiles/1523793417.jpg" alt="" />
                            </li>
                            <li>韩都衣舍2017韩版女装春款新款木耳边卡通刺绣显瘦连衣裙</li>
                        </ul>
                        <ul>
                            <li>
                                <img src="//vueshop.glbuys.com/uploadfiles/1523793417.jpg" alt="" />
                            </li>
                            <li>韩都衣舍2017韩版女装春款新款木耳边卡通刺绣显瘦连衣裙</li>
                        </ul>
                    </div>
                </div>
                <div className={Css['goods-wrap']}>
                    <div className={Css['classify-name']}>上装</div>
                    <div className={Css['goods-items-wrap']}>
                        <ul>
                            <li>
                                <img src="//vueshop.glbuys.com/uploadfiles/1523793417.jpg" alt="" />
                            </li>
                            <li>韩都衣舍2017韩版女装春款新款木耳边卡通刺绣显瘦连衣裙</li>
                        </ul>
                        <ul>
                            <li>
                                <img src="//vueshop.glbuys.com/uploadfiles/1523793417.jpg" alt="" />
                            </li>
                            <li>韩都衣舍2017韩版女装春款新款木耳边卡通刺绣显瘦连衣裙</li>
                        </ul>
                        <ul>
                            <li>
                                <img src="//vueshop.glbuys.com/uploadfiles/1523793417.jpg" alt="" />
                            </li>
                            <li>韩都衣舍2017韩版女装春款新款木耳边卡通刺绣显瘦连衣裙</li>
                        </ul>
                        <ul>
                            <li>
                                <img src="//vueshop.glbuys.com/uploadfiles/1523793417.jpg" alt="" />
                            </li>
                            <li>韩都衣舍2017韩版女装春款新款木耳边卡通刺绣显瘦连衣裙</li>
                        </ul>
                        <ul>
                            <li>
                                <img src="//vueshop.glbuys.com/uploadfiles/1523793417.jpg" alt="" />
                            </li>
                            <li>韩都衣舍2017韩版女装春款新款木耳边卡通刺绣显瘦连衣裙</li>
                        </ul>
                        <ul>
                            <li>
                                <img src="//vueshop.glbuys.com/uploadfiles/1523793417.jpg" alt="" />
                            </li>
                            <li>韩都衣舍2017韩版女装春款新款木耳边卡通刺绣显瘦连衣裙</li>
                        </ul>
                        <ul>
                            <li>
                                <img src="//vueshop.glbuys.com/uploadfiles/1523793417.jpg" alt="" />
                            </li>
                            <li>韩都衣舍2017韩版女装春款新款木耳边卡通刺绣显瘦连衣裙</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
