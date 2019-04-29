import React, {
    Component
} from 'react'
export default class loginComponent extends Component {
    constructor() {
        super()
        this.state = {
            nickname: "13717628483",
            password: "123456"
        }
    }
    goBack() {
        this.props.history.push('/')
    }
    loginClick() {
        if (this.state.nickname !== "" && this.state.password !== "") {
            const params = new URLSearchParams()
            params.append('cellphone', this.state.nickname)
            params.append('password', this.state.password)
            fetch('http://vueshop.glbuys.com/api/home/user/pwdlogin?token=1ec949a15fb709370f', {
                method: "POST",
                body: params
            })
                .then(response => response.json())
                .then(res => {
                    console.log(res);
                })
        }
    }

    render() {
        return (
            <div style={{ "padding": "20px" }}>
                login <br />
                账号：<input type="text" value={this.state.nickname}
                    onChange={(e) => { this.setState({ nickname: e.target.value }) }}
                /> <br />
                密码：<input type="password" value={this.state.password}
                    onChange={(e) => { this.setState({ password: e.target.value }) }}
                /> <br />
                <button onClick={this.loginClick.bind(this)}>登录</button>
            </div>
        )
    }
}

