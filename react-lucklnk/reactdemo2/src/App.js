import React, { Component } from 'react';
import './App.css';
import HeaderComponent from './demo/header'
import EventComponent from './demo/event'
import ProtalsComponent from './demo/protals'
// import RouterComponent from './router/router'

class App extends Component {
    constructor() {
        super()
        this.state = {
            name: ""
        }
    }
    sendValue(value) {
        this.setState({
            name: value
        })
    }
    goPage(url) {
        this.props.history.push(url)
    }
    render() {
        return (
            <div className="App">
                <HeaderComponent title='小丑'></HeaderComponent>
                <p>子组件传来的值：{this.state.name}</p>
                <EventComponent sendValue={this.sendValue.bind(this)}></EventComponent>
                <ProtalsComponent>父级组件内容</ProtalsComponent>
                {/* <RouterComponent></RouterComponent> */}
                <button type='button' onClick={this.goPage.bind(this, '/news/index')}>新闻页面</button>
                &nbsp;
                <button type='button' onClick={this.goPage.bind(this, '/goods')}>商品页面</button>
                <hr />
                <button type='button' onClick={this.goPage.bind(this, '/profile')}>个人资料</button>
                &nbsp;
                <button type='button' onClick={this.goPage.bind(this, '/login')}>会员登录</button>
            </div>
        );
    }
}

export default App;
