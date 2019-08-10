import echo from '../libs/echo'
function lazyImage() {
    echo.init({
        offset: 100,//可视区域多少像素可被加载
        throttle: 800 //设置图片延迟加载时间
    })
}

export { lazyImage }