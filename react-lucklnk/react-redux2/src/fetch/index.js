import React, {
    Component
} from 'react'
export default class fetchComponent extends Component {
    constructor() {
        super()
        this.state = {
            aGoods: []
        }
    }
    goBack() {
        this.props.history.push('/')
    }
    componentWillMount() {
        this.getGoods()
    }
    getGoods() {
        fetch('http://vueshop.glbuys.com/api/home/index/recom?token=1ec949a15fb709370f')
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(res => {
                console.log(res);
                if (res.code === 200) {
                    this.setState({
                        aGoods: res.data
                    }, () => {
                        console.log(this.state.aGoods);
                    })
                }
            })
    }
    render() {
        return (
            <div style={{ "padding": "20px" }}>
                fetch
                <ul>
                    {
                        this.state.aGoods.map((item, index) => {
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

