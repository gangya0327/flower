let obj = {
    a: [1, 2], b: [], c: [], d: [2, 4, 6], e: [3, 2], f: [2]
}

let flagCountMax = 0
let arr = []
for (i in obj) {
    if (obj[i].length > 0) {
        flagCountMax++
        arr = arr.concat(obj[i])
    }
}
let sortArr = arr.sort()
console.log(sortArr, flagCountMax);

let result = []
let flag = sortArr[0]
let flagCount = 0
sortArr.map(i => {
    if (flag === i) {
        console.log(i, flagCount);
        flagCount++
        if (flagCount === flagCountMax - 1) {
            result.push(i)
        }
    } else {
        flagCount = 0
    }
    flag = i
})

console.log(result);