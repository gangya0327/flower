import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import config from '../assets/js/conf/config'
const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Boolean(localStorage['isLogin']) ? (
                <Component {...props}></Component>
            ) : (
                    <Redirect to={{
                        pathname: config.path + 'login/index',
                        state: { from: props.location }
                    }}></Redirect>
                )
        }></Route>
)
export { AuthRoute }