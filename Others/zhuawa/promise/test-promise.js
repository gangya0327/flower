const Promise = require('./promise')

const p1 = new Promise((resolve, reject) => {
  console.log(1)
  resolve(3)
})

p1.then(value => {
  console.log(value)
}, reason => {
  console.log(reason)
})
  .catch(e => {
    console.log(e)
  })

console.log(2)
