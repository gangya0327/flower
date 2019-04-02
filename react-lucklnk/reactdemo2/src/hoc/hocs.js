import React from 'react'

export default function withHoc(WrapedComponent,msg) {
    return class HOC extends React.Component {
        constructor() {
            super()
            this.state = {
                username: '',
                password: ''
            }
        }
        changeUsername(e) {
            this.setState({
                username: e.target.value
            }, () => {
                console.log(this.state.username)
            })
        }
        changePassword(e) {
            this.setState({
                password: e.target.value
            }, () => {
                console.log(this.state.password)
            })
        }
        submit(msg) {
            if (this.state.username.match(/^\s*$/)) {
                alert('请输入用户名')
                return
            }
            if (this.state.password.match(/^\s*$/)) {
                alert('请输入密码')
                return
            }
            console.log(msg)
        }
        render() {
            const newProps = {
                username: { onChange: this.changeUsername.bind(this) },
                pwd: { onChange: this.changePassword.bind(this) },
                submit: { onClick: this.submit.bind(this,msg) }
            }
            return (
                <div>
                    <WrapedComponent {...this.props} {...newProps} ></WrapedComponent>
                </div>
            )
        }
    }
}