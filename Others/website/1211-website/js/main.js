window.onload = function () {

    var lunImg = document.getElementById("lunImg")
    var lunNumLi = document.getElementsByClassName("lun-num-li")

    var count = 0 // 计数器
    var total = 5 //图片总数
    var num = 0 // 显示第几个图片
    var imgWidth = -450 // 图片宽度
    var timer // 定时器

    startLun() // 启动轮播

    // 点击数字跳转    
    for (var i = 0; i < lunNumLi.length; i++) {
        lunNumLi[i].onclick = function (e) {
            clearInterval(timer) // 停止轮播
            num = e.target.innerHTML - 1
            count = num
            lunImg.style.left = num * imgWidth + "px"
            var lunNumLiNow = document.getElementsByClassName("now")
            lunNumLiNow[0].classList.remove("now")
            e.target.classList.add("now")
            startLun() // 继续轮播 
        }
    }

    // 轮播图片
    function startLun() {
        timer = setInterval(function () {
            count++
            num = count % total; // 余数
            lunImg.style.left = num * imgWidth + "px"
            var lunNumLiNow = document.getElementsByClassName("now")
            lunNumLiNow[0].classList.remove("now")
            lunNumLi[num].classList.add("now")
        }, 2000)
    }
}
