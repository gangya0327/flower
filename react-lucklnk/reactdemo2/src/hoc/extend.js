import React from 'react'

export default function withHoc(WrapedComponent) {
    return class HOC extends WrapedComponent {
        componentDidMount() {
            let ocontent = document.getElementById('content')
            console.log(ocontent)
        }
        render() {
            return (
                <div>
                    <p>{this.state.nickname}</p>
                    <WrapedComponent {...this.props} name='raven'></WrapedComponent>
                </div>
            )
        }
    }
}