import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import IndexComponent from '../index/index'
import FetchComponent from '../fetch/index'
import loginComponent from '../login/index'
import profileComponent from '../profile/index'
import calendarComponent from '../calendar/index'

export default class RouterIndex extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <ul>
                        <li><Link to='/redux'>Redux</Link></li>
                        <li><Link to='/fetch'>Fetch</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/profile'>Profile</Link></li>
                        <li><Link to='/calendar'>Calendar</Link></li>
                    </ul>
                    <Switch>
                        <Route exact path='/redux' component={IndexComponent} />
                        <Route path='/fetch' component={FetchComponent} />
                        <Route path='/login' component={loginComponent} />
                        <Route path='/profile' component={profileComponent} />
                        <Route path='/calendar' component={calendarComponent} />
                    </Switch>
                </Router>
            </div>
        )
    }
}