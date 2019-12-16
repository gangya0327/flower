import React from 'react'
import { withRouter } from 'react-router'
import Css from './subheader.css'

class SubHeader extends React.Component {
    goBack() {
        this.props.history.goBack()
    }
    render() {
        return (
            <div className={Css['sub-header']}>
                <div className={Css['sub-back']} onClick={this.goBack.bind(this)}></div>
                <div className={Css['title']}>{this.props.title}</div>
                <div className={Css['right-btn']}>{this.props['right-text']}</div>
            </div>
        )
    }
}

export default withRouter(SubHeader)