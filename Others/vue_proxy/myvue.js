class Vue extends EventTarget {
    constructor(options) {
        super()
        this.$options = options
        this.compile()
        this.observe(this.$options.data)
        this.proxyData()
    }
    compile() {
        let el = document.querySelector(this.$options.el)
        let childNodes = el.childNodes
        this.compileNodes(childNodes)
    }
    compileNodes(childNodes) {
        childNodes.forEach(node => {
            if (node.nodeType == 3) {
                console.log('文本结点', node.textContent);
                let reg = /\{\{(\S+)\}\}/g
                let textContent = node.textContent
                let res = reg.test(textContent)
                if (res) {
                    let $1 = RegExp.$1
                    node.textContent = this.$options.data[$1]
                    this.addEventListener($1, () => {
                        console.log('更新了.');
                    })
                }
            } else {
                console.log('标签结点');
                if (node.childNodes.length > 0) {
                    this.compileNodes(node.childNodes)
                }
            }
        });
    }
    proxyData() {
        Object.keys(this.$options.data).forEach(key => {
            this.defineReat(key, this.$options.data[key], this)
        })
    }
    defineReat(key, value, data) {
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
                console.log('get.');
                return value
            },
            set(newValue) {
                console.log('set.');

                // 触发自定义事件
                let event = new Event(key)
                this.dispatchEvent(event)
                value = newValue
            }
        })
    }
    observe(data) {
        Object.keys(data).forEach(key => {
            this.defineReat(key, data[key], data)
        })
    }
}