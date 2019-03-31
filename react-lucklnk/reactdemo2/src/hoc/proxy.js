import React, { Component } from 'react'

export default function withHoc(WrapedComponent) {
    return class HOC extends Component {
        componentDidMount(){
            let ocontent = document.getElementById('content')
            console.log(ocontent)
        }
        render() {
            return (
                <WrapedComponent {...this.props} name='raven'></WrapedComponent>
            )
        }
    }
}