import React from 'react'
import { Route, Redirect } from 'react-router-dom'
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Boolean(localStorage['isLogin']) ?
        (
          <Component {...props}></Component>
        ) :
        (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}></Redirect>
        )
    }
  ></Route>
)

export {
  PrivateRoute
}