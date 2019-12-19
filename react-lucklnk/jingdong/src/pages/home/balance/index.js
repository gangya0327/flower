import React from 'react'
import { connect } from 'react-redux'
import SubHeaderComponent from '../../../components/header/subheader'
import Css from '../../../assets/css/home/balance/index.css'

class BalanceIndex extends React.Component {
    render() {
        return (
            <div className={Css['page']}>
                <SubHeaderComponent title="确认订单"></SubHeaderComponent>
                <div className={Css['main']}>
                    <div className={Css['address-wrap']}>
                        <div className={Css['address-border-wrap']}>
                            <div className={Css['trapezoid'] + ' ' + Css['style1']}></div>
                            <div className={Css['trapezoid'] + ' ' + Css['style2']}></div>
                            <div className={Css['trapezoid'] + ' ' + Css['style1']}></div>
                            <div className={Css['trapezoid'] + ' ' + Css['style2']}></div>
                        </div>
                    </div>
                </div>

                <div className={Css['']}></div>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(BalanceIndex)