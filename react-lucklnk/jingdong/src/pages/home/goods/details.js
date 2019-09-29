import React from 'react'
import Css from '../../../assets/css/home/goods/details.css'
import { lazyImage, localParam } from '../../../assets/js/utils/utils'
import { request } from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'

export default class GoodsDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
    }
    componentWillReceiveProps(newProps) {
    }
    render() {
        return (
            <div className={Css['details-header']}>
                <div className={Css['back']}></div>
                <div className={Css['tab-wrap']}>
                    <div className={Css['tab-name'] + " " + Css['active']}>商品</div>
                    <div className={Css['tab-name']}>详情</div>
                    <div className={Css['tab-name']}>评价</div>
                </div>
                <div className={Css['cart-icon']}></div>

                <div className={Css['']}></div>
            </div>
        )
    }
}
