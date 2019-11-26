let cartData = {
    aCartData: localStorage['aCartData'] !== undefined ? JSON.parse(localStorage['aCartData']) : [],
    total: 0
}
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
    state.aCartData.push(action)
    localStorage['aCartData'] = JSON.stringify(state.aCartData)
}

export default cartReducer