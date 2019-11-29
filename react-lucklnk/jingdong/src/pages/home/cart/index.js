import React from 'react'
import { connect } from 'react-redux'
import action from '../../../actions'
import SubHeader from '../../../components/header/subheader'
import Css from '../../../assets/css/home/cart/index.css'

class CartComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            bAllCheck: true
        }
    }
    componentDidMount() {
        console.log(this.props.state);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    delItem(index) {
        if (this.props.state.cart.aCartData.length > 0) {
            this.props.dispatch(action.cart.delItem({ index: index }))
        }
    }
    checkItem(index, checked) {
        if (this.props.state.cart.aCartData.length > 0) {
            this.props.dispatch(action.cart.checkItem({ index: index, checked: checked }))
        }
        this.isAllChecked()
    }
    //是否全选
    isAllChecked() {
        if (this.props.state.cart.aCartData.length > 0) {
            let bChecked = true
            for (let key in this.props.state.cart.aCartData) {
                if (this.props.state.cart.aCartData[key].checked === false) {
                    bChecked = false
                    break
                }
            }
            if (!bChecked) {
                this.setState({ bAllCheck: false })
            }
        }
    }
    render() {
        return (
            <div>
                <SubHeader title="购物车"></SubHeader>
                <div className={Css['cart-main']}>
                    {
                        this.props.state.cart.aCartData.length > 0 ?
                            this.props.state.cart.aCartData.map((item, index) => {
                                return (
                                    <div className={Css['cart-list']} key={index}>
                                        <div className={item.checked ? Css['select-btn'] + " " + Css['active'] : Css['select-btn']} onClick={this.checkItem.bind(this, index, !item.checked)}></div>
                                        <div className={Css['image-wrap']}>
                                            <div className={Css['image']}>
                                                <img src={item.img} alt="" />
                                            </div>
                                            <div className={Css['del']} onClick={this.delItem.bind(this, index)}>删除</div>
                                        </div>
                                        <div className={Css['goods-wrap']}>
                                            <div className={Css['goods-title']}>{item.title}</div>
                                            <div className={Css['goods-attr']}>
                                                {
                                                    item.attrs.length > 0 ?
                                                        item.attrs.map((item2, index2) => {
                                                            return (
                                                                <span key={index2}>{item2.title}：{
                                                                    item2.aParam.length > 0 ?
                                                                        item2.aParam.map((item3, index3) => {
                                                                            return (
                                                                                <React.Fragment key={index3}>{item3.title}</React.Fragment>
                                                                            )
                                                                        }) : ""
                                                                }</span>
                                                            )
                                                        })
                                                        : ""
                                                }
                                            </div>
                                            <div className={Css['buy-wrap']}>
                                                <div className={Css['goods-price']}>￥{item.price}</div>
                                                <div className={Css['amount-wrap']}>
                                                    <div className={Css['amount-input-wrap']}>
                                                        <div className={Css['dec'] + " " + Css['btn'] + " " + Css['active']}>-</div>
                                                        <div className={Css['amount-input']}>
                                                            <input type="tel" defaultValue={item.amount} />
                                                        </div>
                                                        <div className={Css['inc'] + " " + Css['btn']}>+</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : ""
                    }
                </div>
                <div className={Css['orderend-wrap']}>
                    <div className={Css['select-area']}>
                        <div className={Css['select-wrap']}>
                            <div className={this.state.bAllCheck ? Css['select-btn'] + " " + Css['active'] : Css['select-btn']}></div>
                            <div className={Css['select-text']}>全选</div>
                        </div>
                        <div className={Css['total']}>合计：<span>{this.props.state.cart.total}</span></div>
                    </div>
                    <div className={Css['orderend-btn']}>去结算</div>
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
})(CartComponent)