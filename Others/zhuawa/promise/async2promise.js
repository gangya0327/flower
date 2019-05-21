function sleep (duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}

async function run () {
  const start = Date.now()
  await sleep(1000)
  await sleep(2000)
  await sleep(3000)
  console.log('async', Date.now() - start)
}

run()

// promise

function run1 () {
    const start = Date.now()
  return Promise.resolve()
    .then(function(){ return sleep(1000) })
    .then(function(){ return sleep(2000) })
    .then(function(){ return sleep(3000) })
    .then(function(){ console.log('promise', Date.now() - start) })
}

run1()