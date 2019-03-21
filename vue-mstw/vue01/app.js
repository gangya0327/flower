new Vue({
    el: '#vue-app',
    data: {
        name: 'peter',
        date: '0317',
        baidu: 'http://www.baidu.com',
        websiste: '<a href="http://www.baidu.com">baidu</a>',
        age: 28,
        x: 0,
        y: 0,
        inputname: ''
    },
    methods: {
        greet: function (time) {
            return 'good ' + time + '!' + this.date
        },
        ageAdd: function (inc) {
            if (typeof inc === 'number') {
                this.age += inc
            }
            else {
                this.age++
            }
        },
        ageSub: function (dec) {
            if (typeof dec === 'number') {
                this.age -= dec
            } else {
                this.age--
            }
        },
        updateXY: function (event) {
            this.x = event.offsetX
            this.y = event.offsetY
        },
        stopmoving: function (event) {
            event.stopPropagation()
        },
        alert: function () {
            alert(123)
        },
        logName: function () {
            console.log('正在输入...')
            this.inputname = this.$refs.inputname.value
        }
    }
})