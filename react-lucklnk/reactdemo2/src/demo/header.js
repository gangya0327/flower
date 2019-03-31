import React, { Component } from 'react'
/*eslint-disable*/
import ReachDOM from 'react-dom'
import './header.css'

export default class HeaderComponent extends Component {
    constructor() {
        super()
        this.state = {
            name: 'raven'
        }
    }
    changeName() {
        this.setState({
            name: 'peter'
        }, ()=>{
            console.log(this.state.name)
        })
    }
    render() {
        return (
            <div className='header'>
                <img src={require('../assets/header.jpg')} alt="" />
                <span>Header {this.props.title}</span>
                <p>我叫{this.state.name}</p>
                <button onClick={this.changeName.bind(this)}>改变我的名字</button>
            </div>
        )
    }
}