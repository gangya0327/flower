import echo from '../libs/echo'
import {request} from '../libs/request'
import action from '../../../actions/index'
import config from '../conf/config'

function lazyImage() {
    echo.init({
        offset: 100, //可视区域多少像素可被加载
        throttle: 800 //设置图片延迟加载时间
    })
}

function localParam(search, hash) {
    search = search || window.location.search
    hash = search || window.location.hash
    var fn = function (str, reg) {
        if (str) {
            var data = {}
            str.replace(reg, function ($0, $1, $2, $3) {
                data[$1] = $3
            })
            return data
        }
    }
    return {
        search: fn(search, new RegExp("([^?=&]+)(=([^&]*))?", "g")) || {},
        hash: fn(hash, new RegExp("([^#=&]+)(=([^&]*))?", "g")) || {}
    }
}

console.log(global.scrollTop.index);

function setScrollTop(val = 0) {
    setTimeout(() => {
        document.body.scrollTop = val
        document.documentElement.scrollTop = val
    }, val)
}

//会员登录安全认证
function safeAuth(props) {
    let sUrl = config.baseUrl + "/api/home/user/safe?token=" + config.token
    request(sUrl, "post", {
            uid: props.state.user.uid,
            auth_token: props.state.user.authToken
        })
        .then(res => {
            if (res.code !== 200) {
                props.dispatch(action.user.outLogin())
                props.history.replace(config.path + "login/index")
            }
        })
}
export {
    lazyImage,
    localParam,
    setScrollTop,
    safeAuth
}