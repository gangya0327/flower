/*eslint-disable*/
import React, { Component } from 'react'
import CheckboxList from './testCheckAll/CheckboxList'

export default class EventComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [{
                id: 1,
                title: '新闻标题1',
                checked: false
            }, {
                id: 2,
                title: '新闻标题2',
                checked: false
            }, {
                id: 3,
                title: '新闻标题3',
                checked: false
            }, {
                id: 4,
                title: '新闻标题4',
                checked: false
            }]
        }
    }
    checkClick(e, index) {
        let list = this.state.list
        list[index].checked = e.target.checked
        this.setState({
            list: list
        }, () => {
            console.log(this.state.list)
        })
    }
    checkAll(e) {
        console.log(e.target.checked)
        let list = this.state.list
        if (list.length > 0) {
            list.forEach(function (v, i) {
                v.checked = e.target.checked
            })
        }
        this.setState({ list: list }, () => { console.log(this.state.list) })
    }
    changeList(e) {
        console.log(e)
    }
    submitClick() {
        console.log(22)
    }
    render() {
        return (
            <div>
                组件
                <h3>全选与反选</h3>
                <label>全选: <input type="checkbox" onClick={this.checkAll.bind(this)} /></label>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <li key={index}>
                                    <label>
                                        <input type="checkbox"
                                            checked={item.checked ? 'checked' : ''}
                                            onChange={(e) => { this.checkClick(e, index) }} />{item.title}</label>
                                </li>
                            )
                        })
                    }
                </ul>
                <button onClick={this.submitClick.bind(this)}>提交</button>
                <button onClick={this.props.sendValue.bind(this, 'hello')}>向父组件传值</button>
                <div>
                    <div className="checkboxList">
                        <CheckboxList></CheckboxList>
                    </div>
                </div>
            </div>
        )
    }
}