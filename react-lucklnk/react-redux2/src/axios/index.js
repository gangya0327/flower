import React, {
    Component
} from 'react'
import axios from 'axios'
export default class fetchComponent extends Component {
    constructor() {
        super()
        this.state = {
            aGoods: [],
            aGoods2: [],
        }
    }
    goBack() {
        this.props.history.push('/')
    }
    componentWillMount() {
        this.getGoods()
        this.getGoods2()
    }
    getGoods() {
        axios.get('http://vueshop.glbuys.com/api/home/index/recom?token=1ec949a15fb709370f')
            .then(response => {
                console.log(response);
                let res = response.data
                if (res.code === 200) {
                    this.setState({
                        aGoods: res.data
                    }, () => {
                        console.log(this.state.aGoods);
                    })
                }
            })
    }
    getGoods2() {
        axios({
            method: 'get',
            url: 'http://vueshop.glbuys.com/api/home/index/recom?token=1ec949a15fb709370f',
            data: {}
        })
            .then(response => {
                console.log(response);
                let res = response.data
                if (res.code === 200) {
                    this.setState({
                        aGoods2: res.data
                    }, () => {
                        console.log(this.state.aGoods);
                    })
                }
            })
    }
    render() {
        return (
            <div style={{ "padding": "20px" }}>
                axios
                <ul>
                    {
                        this.state.aGoods.map((item, index) => {
                            return (
                                <li key={index}>{item.title}</li>
                            )
                        })
                    }
                </ul>
                axios
                <ul>
                    {
                        this.state.aGoods2.map((item, index) => {
                            return (
                                <li key={index}>{item.title}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

