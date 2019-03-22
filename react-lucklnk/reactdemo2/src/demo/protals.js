import React, { Component } from 'react'

export default class ProtalsComponent extends Component {
    render() {
        return (
            <div>
                <h3>插槽</h3>
                <p>内容：{this.props.children}</p>
            </div>
        )
    }
}