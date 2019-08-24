import React from 'react'
import { request } from '../../assets/js/libs/request'
import config from '../../assets/js/conf/config'
import Css from './search.css'

export default class SearchComponent extends React.Component {
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
                <div className={Css['search-header']}>
                    <div className={Css['close']}></div>
                    <div className={Css['search-swap']}>
                        <input type="text" className={Css['search']} placeholder='请输入宝贝名称' />
                        <button className={Css['search-btn']}></button>
                    </div>
                </div>
            </div>
        )
    }
}
