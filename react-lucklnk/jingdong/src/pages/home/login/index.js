import React from 'react'
import { connect } from 'react-redux'
import action from '../../../actions'
import SubHeaderComponent from '../../../components/header/subheader'
import { Switch, Toast } from 'antd-mobile'
import config from '../../../assets/js/conf/config'
import { request } from '../../../assets/js/libs/request'
import Css from '../../../assets/css/home/reg/index.css'
class LoginIndex extends React.Component {
    constructor() {
        super()
        this.state = {
            checked: false,
            sCellphone: "13717628483",
            sPassword: "",
            sType: "password"
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer)
        this.setState = (state, callback) => {
            return
        }
    }
    componentDidMount() {
        document.getElementById("title").innerHTML = "会员登录"
    }
    // 登录
    submitData() {
        if (this.state.sCellphone.match(/^\s*$/)) {
            Toast.info("请输入您的手机号", 2)
            return false
        }
        if (!this.state.sCellphone.match(/^1[0-9][0-9]{9}/)) {
            Toast.info("手机号格式有误", 2)
            return false
        }
        if (this.state.sPassword.match(/^\s*$/)) {
            Toast.info("请输入密码", 2)
            return false
        }
        let sUrl = config.baseUrl + "/api/home/user/pwdlogin?token=" + config.token
        request(sUrl, "post", { cellphone: this.state.sCellphone, password: this.state.sPassword }).then(res => {
            if (res.code === 200) {
                localStorage['uid'] = res.data.uid
                localStorage['nickname'] = res.data.nickname
                localStorage['authToken'] = res.data.auth_token
                localStorage['isLogin'] = true
                this.props.dispatch(action.user.login({ uid: res.data.uid, nickname: res.data.nickname, authToken: res.data.auth_token, isLogin: true }))
                this.props.history.goBack()
            } else {
                Toast.info(res.data, 2)
            }
        })
    }
    // 显示明码还是暗码
    changePwd(checked) {
        if (checked) {
            this.setState({ sType: "text" })
        } else {
            this.setState({ sType: "password" })
        }
        this.setState({ checked: checked })
    }
    pushPage(url) {
        this.props.history.push(config.path + url)
    }
    render() {
        return (
            <div className={Css['page']}>
                <SubHeaderComponent title="会员登录"></SubHeaderComponent>
                <div className={Css['main'] + " login-main"}>
                    <div className={Css['code-wrap']} style={{ marginTop: 0 }}>
                        <input type="tel" placeholder="请输入手机号" onChange={(e) => { this.setState({ sCellphone: e.target.value }) }} />
                    </div>
                    <div className={Css['password-wrap']}>
                        <div className={Css['password']}>
                            <input type={this.state.sType} placeholder="请输入密码" onChange={(e) => { this.setState({ sPassword: e.target.value }) }} />
                        </div>
                        <div className={Css['switch-wrap']}>
                            <Switch
                                color="#eb1625"
                                checked={this.state.checked}
                                onClick={this.changePwd.bind(this, !this.state.checked)}
                            />
                        </div>
                    </div>
                    <div className={Css['sure-btn']} onClick={this.submitData.bind(this)}>登录</div>
                    <div className={Css['fastreg-wrap']}>
                        <div><img src={require('../../../assets/images/home/index/forget.png')} alt="" /> 忘记密码</div>
                        <div onClick={this.pushPage.bind(this, 'reg/index')}><img src={require('../../../assets/images/home/index/reg.png')} alt="" /> 快速注册</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(LoginIndex)