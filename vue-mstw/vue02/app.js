new Vue({
    el: '#vue-app',
    data: {
        a: 0,
        b: 0,
        age: 20,
        changeColor: false,
        changeLength: false,
        success: false,
        error: false,
        chracters: ['peter', 'raven', 'mark'],
        users: [
            { name: 'lily', age: 20 },
            { name: 'lucy', age: 16 },
            { name: 'lyn', age: 35 },
        ]


    },
    methods: {
        // addToA: function () {
        //     console.log('+a')
        //     return this.age + this.a
        // },
        // addToB: function () {
        //     console.log('+b')
        //     return this.age + this.b
        // }
    },
    computed: {
        addToA: function () {
            console.log('+a')
            return this.age + this.a
        },
        addToB: function () {
            console.log('+b')
            return this.age + this.b
        },
        compClasses: function () {
            return {
                changeColor: this.changeColor,
                changeLength: this.changeLength
            }
        }
    }
})