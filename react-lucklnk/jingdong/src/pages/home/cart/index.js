import React from 'react'
import { connect } from 'react-redux'
import action from '../../../actions'
import SubHeader from '../../../components/header/subheader'
import Css from '../../../assets/css/home/cart/index.css'
import config from '../../../assets/js/conf/config'

class CartComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            bAllCheck: true
        }
    }
    componentDidMount() {

        this.isAllChecked()
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
        this.isAllChecked()
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
                    this.setState({ bAllCheck: false })
                    bChecked = false
                    break
                }
            }
            if (bChecked) {
                this.setState({ bAllCheck: true })
            }
        } else {
            this.setState({ bAllCheck: false })
        }
    }
    //点击全选
    setAllChecked(checked) {
        if (this.props.state.cart.aCartData.length > 0) {
            this.setState({ bAllCheck: checked })
            this.props.dispatch(action.cart.setAllChecked({ checked: checked }))
        }
    }
    //增加数量
    incAmount(index) {
        if (this.props.state.cart.aCartData.length > 0) {
            if (this.props.state.cart.aCartData[index].checked) {
                this.props.dispatch(action.cart.incAmount({ index: index }))
            }
        }
    }
    //减少数量
    decAmount(index) {
        if (this.props.state.cart.aCartData.length > 0) {
            if (this.props.state.cart.aCartData[index].checked && this.props.state.cart.aCartData[index].amount > 1) {
                this.props.dispatch(action.cart.decAmount({ index: index }))
            }
        }
    }
    //改变数量
    changeAmount(e, index) {
        if (this.props.state.cart.total > 0) {
            let iAmount = 1
            if (e.target.value !== "") {
                iAmount = e.target.value.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[#|*|,|+|;|.]/g, '')
                if (iAmount === "") {
                    iAmount = 1
                }
            }
            this.props.dispatch(action.cart.changeAmount({ amount: iAmount, index: index }))
        }
    }
    goBalance() {
        if (this.props.state.cart.aCartData.length > 0) {
            this.props.history.push(config.path + "balance/index")
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
                                                        <div className={this.props.state.cart.aCartData[index].amount <= 1 ? Css['dec'] + " " + Css['btn'] + " " + Css['active'] : Css['dec'] + " " + Css['btn']} onClick={this.decAmount.bind(this, index)}>-</div>
                                                        <div className={Css['amount-input']}>
                                                            <input type="tel" value={item.amount} onChange={(e) => { this.changeAmount(e, index) }} />
                                                        </div>
                                                        <div className={Css['inc'] + " " + Css['btn']} onClick={this.incAmount.bind(this, index)}>+</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <div className="null-item" style={{ marginTop: '1.3rem' }}>没有商品</div>
                    }
                </div>
                <div className={Css['orderend-wrap']}>
                    <div className={Css['select-area']}>
                        <div className={Css['select-wrap']} onClick={this.setAllChecked.bind(this, !this.state.bAllCheck)}>
                            <div className={this.state.bAllCheck ? Css['select-btn'] + " " + Css['active'] : Css['select-btn']}></div>
                            <div className={Css['select-text']}>全选</div>
                        </div>
                        <div className={Css['total']}>合计：<span>{this.props.state.cart.total}</span></div>
                    </div>
                    <div className={this.props.state.cart.total > 0 ? Css['orderend-btn'] : Css['orderend-btn'] + " " + Css['disabled']}
                        onClick={this.goBalance.bind(this)}>去结算</div>
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