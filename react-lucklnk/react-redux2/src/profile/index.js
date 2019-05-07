import React, {
    Component
} from 'react'
import axios from 'axios'
export default class profileComponent extends Component {
    constructor() {
        super()
        this.state = {
            head: "//vueshop.glbuys.com/userfiles/head/976380905.jpg",
            progress: 0
        }
    }
    goBack() {
        this.props.history.push('/')
    }
    uploadHead() {
        let uploadFile = this.refs.uploadHead
        if (uploadFile.files[0]) {
            const data = new FormData()
            data.append('headfile', uploadFile.files[0])
            fetch('http://vueshop.glbuys.com/api/user/myinfo/formdatahead?token=1ec949a15fb709370f', {
                method: "POST",
                body: data
            })
                .then(response => response.json())
                .then(res => {
                    this.setState({
                        head: "//vueshop.glbuys.com/userfiles/head/" + res.data.msbox
                    })
                })
        }
    }
    axiosUploadHead() {
        let uploadFile = this.refs.uploadHead
        if (uploadFile.files[0]) {
            const data = new FormData()
            data.append('headfile', uploadFile.files[0])
            // var config = {
            //     onUploadProcess: function (progressEvent) {
            //         var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total)
            //     }
            // }
            axios({
                url: 'http://vueshop.glbuys.com/api/user/myinfo/formdatahead?token=1ec949a15fb709370f',
                method: "POST",
                data: data,
                onUploadProgress: (progressEvent) => {
                    var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total)
                    console.log(percentCompleted)
                    this.setState({
                        progress: percentCompleted
                    })
                }
            })
                .then(response => {
                    let res = response.data
                    if (res.code === 200) {
                        this.setState({
                            head: "//vueshop.glbuys.com/userfiles/head/" + res.data.msbox
                        })
                    }
                })
        }
    }

    render() {
        return (
            <div style={{ "padding": "20px" }}>
                个人资料 <br />
                头像fetch上传：<div style={{ "height": "100px", "width": "100px", "position": "relative" }}>
                    <img src={this.state.head} alt="" />
                    <input type="file" name="" id="uploadHead" ref="uploadHead"
                        style={{ "opacity": 0, "width": "100%", "height": "100%", "position": "absolute", "top": 0, "left": 0 }}
                        onChange={this.uploadHead.bind(this)}
                    />
                </div>
                头像axios上传：<div style={{ "height": "100px", "width": "100px", "position": "relative" }}>
                    <img src={this.state.head} alt="" />
                    <input type="file" name="" id="uploadHead" ref="uploadHead"
                        style={{ "opacity": 0, "width": "100%", "height": "100%", "position": "absolute", "top": 0, "left": 0 }}
                        onChange={this.axiosUploadHead.bind(this)}
                    />
                    <div style={{ border: "1px solid #ccc", width: "200px", height: "15px" }}>
                        <div style={{ background: "lightblue", width: this.state.progress * 2, height: "15px" }}></div>
                    </div>
                </div>
            </div>
        )
    }
}

