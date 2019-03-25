import React, { Component } from 'react'

export default class GoodsComment extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.history.goBack}>返回</button>
                {/* <p>文章{this.props.match.params.id}</p> */}
                <p>
                    商品评价
                </p>
            </div>
        )
    }
}