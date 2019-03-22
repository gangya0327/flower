import React, { Component } from 'react';
import './App.css';
import HeaderComponent from './demo/header'
import EventComponent from './demo/event'
import ProtalsComponent from './demo/protals'

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
    render() {
        return (
            <div className="App">
                <HeaderComponent title='小丑'></HeaderComponent>
                <p>子组件传来的值：{this.state.name}</p>
                <EventComponent sendValue={this.sendValue.bind(this)}></EventComponent>
                <ProtalsComponent>父级组件内容</ProtalsComponent>
            </div>
        );
    }
}

export default App;
