var WC = (function (global, factory) {
    return factory.call(global)
})(this, function () {
    var _TOOL_ = {}
    _TOOL_.registerComponent = function (tagName, document, callback) {
        //1. 获取对象
        var indexDoc = document
        //currentScript 获取正在执行js代码的script标签对象
        //currentDocument 以document对象返回节点的ownerDocument
        var currentDoc = indexDoc.currentScript.ownerDocument

        var temp = currentDoc.getElementById(tagName)

        //2. 注册元素
        var xinProto = Object.create(HTMLElement.prototype)

        //3. 显示组件
        xinProto.createdCallback = function () {
            //创建shadowDOM
            var root = this.createShadowRoot()
            root.appendChild(indexDoc.importNode(temp.content, true))
            callback.call(this, root)
        }

        var xin = indexDoc.registerElement(tagName, {
            prototype: xinProto
        })
    }
    return _TOOL_
})