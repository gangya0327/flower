// 会员登录
function login(data) {
    return {
        type: "login",
        data: data
    }
}
// 安全退出
function outLogin(data) {
    return {
        type: "outLogin",
        data: data
    }
}

export {
    login,
    outLogin
}