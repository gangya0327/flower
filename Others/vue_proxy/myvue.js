class Vue extends EventTarget {
    constructor(options) {
        super()
        this.$options = options
        this.compile()
        this.observe(this.$options.data)
        // this.proxyData()
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
                    this.addEventListener($1, (e) => {
                        console.log('更新了.');
                        console.log(e);
                        node.textContent = e.detail
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
                let event = new CustomEvent(key, {
                    detail: newValue
                })
                this.dispatchEvent(event)
                value = newValue
            }
        })
    }
    observe(data) {
        // Object.keys(data).forEach(key => {
        //     this.defineReat(key, data[key], data)
        // })

        var _this = this
        this.$options.data = new Proxy(data, {
            get(target, key) {
                return target[key]
            },
            set(target, key, newValue) {
                let event = new CustomEvent(key, {
                    detail: newValue
                })
                _this.dispatchEvent(event)
                target[key] = newValue
            }
        })
    }
}


// tmc保存代码

// 点开警铃，有通知的一项
if (statementNum > 0) {
    $("#mainNav>li:eq(0)>a").click();

    if (statementCreateNum > 0) {
        //默认显示第一个tab
    } else if (statementOverdueNum > 0) {
        $("#corp-statement .myTab>li:eq(1)>a").click();
    }
} else if (Abnormal_Num > 0) {
    $("#mainNav>li:eq(1)>a").click();

    if (checkOrderNum > 0) {
        //默认显示第一个tab
    } else if (checkFligNum > 0) {
        $("#domestic-flight .myTab>li:eq(1)>a").click();
    } else if (checkPnrNum > 0) {
        $("#domestic-flight .myTab>li:eq(2)>a").click();
    } else if (customerOrderNum > 0) {
        $("#domestic-flight .myTab>li:eq(3)>a").click();
    }
} else if (customer_Attention > 0) {
    $("#mainNav>li:eq(2)>a").click();
}

if ($(this).attr("href") != "javascript:") {
    $.session.set('selectedMenu', $(this).attr("href"));
}

formatter: function (value, row, index) {
    var str = "";
    if (value == 0) {
        str = "生成订单待提交";
    } else if (value == 1) {
        str = "待确认";
    } else if (value == 2) {
        str = "已审";
    } else if (value == 3) {
        str = "酒店已确认";
    } else if (value == 4) {
        str = "酒店未核实入住信息";
    } else if (value == 5) {
        str = "已入住";
    } else if (value == 6) {
        str = "未入住";
    } else if (value == 7) {
        str = "已结账";
    } else if (value == 8) {
        str = "变更";
    } else if (value == 9) {
        str = "变价";
    } else if (value == 10) {
        str = "特殊满房";
    } else if (value == 11) {
        str = "满房";
    } else if (value == 12) {
        str = "取消";
    } else if (value == 13) {
        str = "删除";
    } else if (value == 14) {
        str = "等待代理人手动处理"
    } else if (value == 15) {
        str = "导入订单"
    } else if (value == 16) {
        str = "取消中"
    } else if (value == 17){
        str = "取消失败"
    }
    if(row.isExternal == 1) {
        str += "（外采回录）"
    }
    return str;
}

//未下发
formatter: function (value, row) {
    var str = "<a href='/statement/statementDetail?statementType=unissued&corpName=" + encodeURI(encodeURI(row.corpName)) + "&corpId=" + row.corpId +
        "&statementGenerateUnit=" + row.statementGenerateUnit + "&statementStartDate=" + row.statementStartDate +
        "&statementEndDate=" + row.statementEndDate + "' target='_blank'>查看操作账单</a>";
    return str;
}

// 未收款
formatter: function (value, row) {
    var statementStatus = row.issuedDate ? "已下发未收款" : "未下发未收款";
    var str = "<a href='/statement/statementDetail?statementType=unsettle&corpName=" + encodeURI(encodeURI(row.corpName)) + "&corpId=" + row.corpId +
        "&statementGenerateUnit=" + row.statementGenerateUnit + "&statementStatus=" + encodeURI(encodeURI(statementStatus)) +
        "&statementStartDate=" + row.statementStartDate + "&statementEndDate=" + row.statementEndDate +
        "&repaymentDate=" + row.repaymentDate + "&isAudit=" + row.settlementAuditStatus + "' target='_blank'>查看操作账单</a>";
    return str;
}