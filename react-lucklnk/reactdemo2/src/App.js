import React, { Component } from 'react';
import './App.css';
import HeaderComponent from './demo/header'
import EventComponent from './demo/event'

class App extends Component {
    render() {
        return (
            <div className="App">
                <HeaderComponent title='小丑'></HeaderComponent>
                <EventComponent></EventComponent>
            </div>
        );
    }
}

export default App;
