import React from 'react'
import SubHeaderComponent from '../../../components/header/subheader'
import { Switch, Toast } from 'antd-mobile'
import config from '../../../assets/js/conf/config'
import { request } from '../../../assets/js/libs/request'
import Css from '../../../assets/css/home/reg/index.css'
export default class RegIndex extends React.Component {
    constructor() {
        super()
        this.state = {
            checked: false,
            sCellphone: "13717628483",
            sPassword: "",
            sType: "password"
        }
        this.timer = null
        this.bSendCode = true
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
        if (this.state.sCode.match(/^\s*$/)) {
            Toast.info("请输入短信验证码", 2)
            return false
        }
        if (this.state.sPassword.match(/^\s*$/)) {
            Toast.info("请输入密码", 2)
            return false
        }
        let sUrl = config.baseUrl + "/api/home/user/reg?token=" + config.token
        request(sUrl, "post", { vcode: this.state.sCode, cellphone: this.state.sCellphone, password: this.state.sPassword }).then(res => {
            if (res.code === 200) {
                this.props.history.goBack()
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
    render() {
        return (
            <div className={Css['page']}>
                <SubHeaderComponent title="会员登录"></SubHeaderComponent>
                <div className={Css['main']+" login-main"}>
                    <div className={Css['code-wrap']} style={{ marginTop: 0 }}>
                        <input type="tel" placeholder="请输入手机号" onChange={(e) => { this.setState({ sCellphone: e.target.value }) }} />
                    </div>
                    <div className={Css['password-wrap']}>
                        <div className={Css['password']}>
                            <input type={this.state.sType} placeholder="请输入密码" onChange={(e) => { this.setState({ sPassword: e.target.value }) }} />
                        </div>
                        <div className={Css['switch-wrap']}>
                            <Switch
                                checked={this.state.checked}
                                onClick={this.changePwd.bind(this, !this.state.checked)}
                            />
                        </div>
                    </div>
                    <div className={Css['sure-btn']} onClick={this.submitData.bind(this)}>登录</div>
                </div>
            </div>
        )
    }
}
