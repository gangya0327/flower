import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Counter from './components/counter'

function reducer(state = initialState, action) {
    console.log('reducer', state, action)

    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            }
        case 'DECREMENT':
            return {
                count: state.count - 1
            }
        case 'RESET':
            return {
                count: 0
            }
        default:
            return state
    }
}

const initialState = {
    count: 0
}

const store = createStore(reducer, applyMiddleware(thunk))
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'DECREMENT' })
// store.dispatch({ type: 'RESET' })

const App = () => (
    <Provider store={store}>
        <Counter></Counter>
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'));
