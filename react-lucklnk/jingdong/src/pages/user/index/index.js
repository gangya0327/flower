import React from 'react'
import { connect } from 'react-redux'
import action from '../../../actions/index'
import config from '../../../assets/js/conf/config'
import { request } from '../../../assets/js/libs/request'
import {safeAuth} from '../../../assets/js/utils/utils'
// import Css from '../../../assets/css/home/index/index.css'

class UserComponent extends React.Component {
    constructor(props) {
        super(props)
        safeAuth(props)
    }
    outLogin() {
        let sUrl = config.baseUrl + "/api/home/user/safeout?token=" + config.token
        request(sUrl, "post", { uid: this.props.state.user.uid }).then(res => {
            console.log(res)
        })
        this.props.dispatch(action.user.outLogin())
        this.props.history.replace(config.path + "login/index")
    }
    render() {
        return (
            <div>
                昵称：{this.props.state.user.nickname}
                <button type="button" onClick={this.outLogin.bind(this)}>安全退出</button>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(UserComponent)