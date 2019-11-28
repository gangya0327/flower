let cartData = {
    aCartData: localStorage['aCartData'] !== undefined ? JSON.parse(localStorage['aCartData']) : [],
    total: localStorage['total'] !== undefined ? JSON.parse(localStorage['total']) : 0,
    // aCartData: [],
    // total: 0
}

// localStorage.clear()

function cartReducer(state = cartData, action) {
    switch (action.type) {
        case 'addCart':
            addCart(state, action.data)
            return Object.assign({}, state, action)
        default:
            return state
    }
}

//添加商品
function addCart(state, action) {
    let bSameItem = false, total = 0
    if (state.aCartData.length > 0) { //有相同商品，数量+1
        for (let key in state.aCartData) {
            if (state.aCartData[key].gid === action.gid && JSON.stringify(state.aCartData[key].attrs) === JSON.stringify(action.attrs)) {
                bSameItem = true
                state.aCartData[key].amount++
                break
            }
        }
    }
    if (!bSameItem) { //没有相同商品，添加商品
        state.aCartData.push(action)
    }
    for (let key in state.aCartData) {
        total += parseFloat(state.aCartData[key].price * state.aCartData[key].amount)
    }
    state.total = parseFloat(Math.round(total)).toFixed(2)
    localStorage['total'] = JSON.stringify(state.total)
    localStorage['aCartData'] = JSON.stringify(state.aCartData)
}

export default cartReducer