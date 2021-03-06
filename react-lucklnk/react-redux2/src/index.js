import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import RouterIndex from './home/index'
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

//2 商品装车
function counterReducer(state = { amount: 0 }, action) {
    switch (action.type) {
        case "inc":
            return { amount: action.amount }
        case "des":
            return { amount: action.amount }
        default:
            return state
    }
}

//3 存入仓库
let store = createStore(counterReducer)
class Index extends React.Component {
    render() {
        return (
            //将仓库的值分配到所有页面
            <Provider store={store}>
                <RouterIndex/>
            </Provider>
        )
    }
}

ReactDOM.render(
    <Index />
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
