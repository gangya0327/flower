var data = [{
    id: 1,
    name: "peter",
    chidren: [{
        id: 6,
    }]
}, {
    id: 2,
    name: "peter",
    chidren: [{
        id: 7,
        name: "json",
        chidren: [{
            id: 8,
            name: "mark",
        }]
    }]
}, {
    id: 3,
    name: "peter",
}, {
    id: 4,
    name: "mike",
    chidren: [{
        id: 9,
        name: "peter",
        chidren: [{
            id: 10,
            name: "mike",
            chidren: [{
                id: 11,
                name: "peter",
                chidren: [{
                    id: 14,
                    name: "json"
                }]
            }]
        }]
    }, {
        id: 12,
        name: "json",
        chidren: [{
            id: 13,
            name: "mike",
        }]
    }]
}]

var isIn = false
function digui(data, name) {
    data.forEach(function (item) {
        console.log("item-- ", item);
        if (item.chidren) {
            digui(item.chidren, name)
        }
        if (item.name === name) {
            isIn = true
        }
    })
}

digui(data[3].chidren, "peter")
// console.log(isIn);