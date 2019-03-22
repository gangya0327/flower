import React from 'react'
import CheckboxItem from './CheckboxItem'

export default class CheckboxList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                { 'name': 'red', 'checked': true },
                { 'name': 'green', 'checked': false },
                { 'name': 'blue', 'checked': false }
            ],
            checkedAll: false, //全选状态
            checkedInvert: false //反选状态
        }
        this.handleAllChange = this.handleAllChange.bind(this);
        this.handleInvertChange = this.handleInvertChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    // 全选事件
    handleAllChange() {
        const { checkedAll, data } = this.state;

        data.map(function (item, index) {
            return item.checked = !checkedAll;
        })

        this.setState({
            checkedAll: !checkedAll,
            checkedInvert: false,
            data: data
        });
    }

    // 反选事件
    handleInvertChange() {
        const { checkedInvert, data } = this.state;

        data.map(function (item, index) {
            return item.checked = !item.checked;
        })

        const checkedAll = data.every(function (item, index) {
            return item.checked;
        })

        this.setState({
            checkedAll: checkedAll,
            checkedInvert: !checkedInvert,
            data: data
        });
    }

    // CheckItem事件
    handleItemChange(ckitem) {
        const data = this.state.data;
        // const checked = ckitem.checked;
        let checkedInvert = this.state.checkedInvert;

        data.map((item, index) => {
            if (item.name === ckitem.name) {
                item.checked = ckitem.checked
            }
            return true
        })

        const checkedAll = data.every(function (item, index) {
            return item.checked;
        })

        checkedInvert = checkedAll ? false : checkedInvert;

        this.setState({
            data: data,
            checkedAll: checkedAll,
            checkedInvert: checkedInvert
        })
    }

    renderList() {
        var that = this;
        return this.state.data.map(function (item, index) {
            return <CheckboxItem {...item} key={index} handleItemChange={that.handleItemChange} />
        })
    }

    render() {
        const { checkedAll, checkedInvert } = this.state
        return (
            <div className="container">
                <div className="checkbox-control">
                    <label><input type="checkbox" checked={checkedAll} onChange={this.handleAllChange} />全选</label>
                    <label><input type="checkbox" checked={checkedInvert} onChange={this.handleInvertChange} />反选</label>
                </div>
                <div className="checkbox-list">
                    {/* {this.renderList()} */}
                    {
                        this.state.data.map((item, index) => {
                            return (
                                <CheckboxItem {...item} key={index} handleItemChange={this.handleItemChange} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}