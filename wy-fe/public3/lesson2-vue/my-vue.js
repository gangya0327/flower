(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.Vue = factory()); //window.Vue
})(this, function () {

    var ASSET_TYPES = [
        'components',
        'directives',
        'filters'
    ];

    //全局配置对象，接口
    var config = {
        optionMergeStrategies: Object.create(null)
    }

    //自定义策略
    var strats = config.optionMergeStrategies;
    strats.data = function () {

    }

    //默认策略
    function defaultStrats(parentVal, childVal, vm) {
        return childVal === undefined ? parentVal : childVal;

    }


    var has = function (obj, key) {
        return obj !== null && Object.hasOwnProperty.call(obj, key);
    }

    function mergeOptions(parent, child, vm) {
        var options = {};
        var key;
        for (key in parent) {
            mergeFild(key);
        }

        for (key in child) {
            if (!has(parent, key)) {
                mergeFild(key);
            }
        }

        //选项的处理策略
        function mergeFild(key) {
            console.log(key)
            var strat = strats[key] || defaultStrats;
            options[key] = strat(parent[key], child[key], vm);
        }

        return options;
    }

    function initMixin(Vue) {
        Vue.prototype._init = function (options) {
            var vm = this;
            //合并选项
            vm.$options = mergeOptions(Vue.options, options || {}, vm);
        }
    }

    function initGlobalAPI(Vue) {
        var configDef = {};
        configDef.get = function () {
            return config;
        }
        configDef.set = function (val) {
            console.error("请不要试图修改Vue.config对象的引用");
        }
        Object.defineProperty(Vue, 'config', configDef);
    }

    function Vue(options) {
        if ("development" !== 'production' &&
            !(this instanceof Vue)
        ) {
            warn('Vue is a constructor and should be called with the `new` keyword');
        }
        this._init(options);
    }

    Vue.options = Object.create(null);
    ASSET_TYPES.forEach(function (type) {
        Vue.options[type] = Object.create(null);
    });

    initMixin(Vue);
    initGlobalAPI(Vue);

    return Vue;
})