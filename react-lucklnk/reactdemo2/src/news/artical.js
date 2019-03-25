import React, { Component } from 'react'
import { getPathParams } from '../components/common/pathUtils'

export default class NewsArtical extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            title: ''
        }
    }
    componentWillMount() {
        let id = getPathParams(this.props.location.search).search.id
        let title = decodeURI(getPathParams(this.props.location.search).search.title)
        this.setState({
            id: id,
            title: title
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.props.history.goBack}>返回</button>
                {/* <p>文章{this.props.match.params.id}</p> */}
                <p>
                    文章：{this.state.id}
                    内容：{this.state.title}
                </p>
            </div>
        )
    }
}