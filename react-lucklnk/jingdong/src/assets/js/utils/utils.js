import echo from '../libs/echo'
function lazyImage() {
    echo.init({
        offset: 100,//可视区域多少像素可被加载
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

export { lazyImage, localParam }