//添加商品
function addCart(data) {
    return {
        type: "addCart",
        data: data
    }
}

//删除商品
function delItem(data) {
    return {
        type: "delItem",
        data: data
    }
}

//选择商品
function checkItem(data) {
    return {
        type: "checkItem",
        data: data
    }
}

export {
    addCart,
    delItem,
    checkItem
}