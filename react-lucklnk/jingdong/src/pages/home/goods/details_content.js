import React from 'react'
import Css from '../../../assets/css/home/goods/details_content.css'
import { localParam } from '../../../assets/js/utils/utils'
import { request } from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'

export default class DetailsContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bodys: "",
            gid: props.location.search !== "" ? localParam(props.location.search).search.gid : ""
        }
    }
    componentDidMount() {
        let sUrl = config.baseUrl + "api/home/goods/info?gid=" + this.state.gid + "&type=details&token=" + config.token
        request(sUrl).then(res => {
            console.log(res);
            if(res.code === 200) {
                this.setState({bodys: res.data.bodys})
            }
        })
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
                <div className={Css['content']} dangerouslySetInnerHTML={{__html: this.state.bodys}}></div>
            </div>
        )
    }
}
