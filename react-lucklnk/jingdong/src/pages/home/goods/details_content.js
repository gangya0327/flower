import React from 'react'
import Css from '../../../assets/css/home/goods/details_content.css'
import { lazyImage, localParam } from '../../../assets/js/utils/utils'
import { request } from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'

export default class DetailsContent extends React.Component {
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
            <div className={Css['page']}>
                商品详情
            </div>
        )
    }
}