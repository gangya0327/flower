let cartData = {
    aCartData: localStorage['aCartData'] !== undefined ? JSON.parse(localStorage['aCartData']) : [],
    total: localStorage['total'] !== undefined ? JSON.parse(localStorage['total']) : 0,
    freight: 0
    // aCartData: [],
    // total: 0
}

// localStorage.clear()

function cartReducer(state = cartData, action) {
    switch (action.type) {
        case 'addCart':
            addCart(state, action.data)
            return Object.assign({}, state, action)
        case 'delItem':
            delItem(state, action.data)
            return Object.assign({}, state, action)
        case 'checkItem':
            checkItem(state, action.data)
            return Object.assign({}, state, action)
        case 'allItem':
            setAllChecked(state, action.data)
            return Object.assign({}, state, action)
        case 'incAmount':
            incAmount(state, action.data)
            return Object.assign({}, state, action)
        case 'decAmount':
            decAmount(state, action.data)
            return Object.assign({}, state, action)
        case 'changeAmount':
            changeAmount(state, action.data)
            return Object.assign({}, state, action)
        default:
            return state
    }
}

//添加商品
function addCart(state, action) {
    let bSameItem = false
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
    setTotal(state)
    setFreight(state)
    localStorage['aCartData'] = JSON.stringify(state.aCartData)
}

//删除商品
function delItem(state, action) {
    state.aCartData.splice(action.index, 1)
    localStorage['aCartData'] = JSON.stringify(state.aCartData)
    setTotal(state)
    setFreight(state)
}

//计算总价
function setTotal(state) {
    let total = 0
    for (let key in state.aCartData) {
        if (state.aCartData[key].checked) {
            total += parseFloat(state.aCartData[key].price * state.aCartData[key].amount)
        }
    }
    state.total = parseFloat(Math.round(total)).toFixed(2)
    localStorage['total'] = JSON.stringify(state.total)
}

//选择商品
function checkItem(state, action) {
    state.aCartData[action.index].checked = action.checked
    localStorage['aCartData'] = JSON.stringify(state.aCartData)
    setTotal(state)
    setFreight(state)
}

//全选商品
function setAllChecked(state, action) {
    for (let key in state.aCartData) {
        state.aCartData[key].checked = action.checked
        localStorage['aCartData'] = JSON.stringify(state.aCartData)
        setTotal(state)
        setFreight(state)
    }
}

//增加数量
function incAmount(state, action) {
    state.aCartData[action.index].amount++
    localStorage['aCartData'] = JSON.stringify(state.aCartData)
    setTotal(state)
}

//减少数量
function decAmount(state, action) {
    state.aCartData[action.index].amount--
    localStorage['aCartData'] = JSON.stringify(state.aCartData)
    setTotal(state)
}

//改变数量
function changeAmount(state, action) {
    state.aCartData[action.index].amount = action.amount
    localStorage['aCartData'] = JSON.stringify(state.aCartData)
    setTotal(state)
}

//计算运费
function setFreight(state) {
    let afreight = []
    for (let key in state.aCartData) {
        if (state.aCartData[key].checked) {
            afreight.push(state.aCartData[key].freight)
        }
    }
    state.freight = Math.max.apply(null, afreight)
    localStorage['freight'] = JSON.stringify(state.freight)
}

export default cartReducer