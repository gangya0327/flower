var jsondata = [{
    "name": "A座",
    "type": "员工",
    "number": 60
},
{
    "name": "A座",
    "type": "商户",
    "number": 10
},
{
    "name": "B座",
    "type": "员工",
    "number": 20
},
{
    "name": "C座",
    "type": "员工",
    "number": 30
},
{
    "name": "C座",
    "type": "商户",
    "number": 40
},
{
    "name": "C座",
    "type": "商户",
    "number": 80
}
]

let resultdata = []
jsondata.map((item) => {
    let flag = 1
    resultdata.map((v) => {
        if (v.name == item.name) {
            let countObj = {}
            countObj.type = item.type
            countObj.number = item.number
            v.count.push(countObj)
            flag = 0
        }
    })
    if (flag) {
        let itemObj = {}
        itemObj.name = item.name
        let countObj = {}
        countObj.type = item.type
        countObj.number = item.number
        itemObj.count = [countObj]

        resultdata.push(itemObj)
    }
}
})

console.log(resultdata)