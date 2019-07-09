var reg = /^[1-9]\d*$/;
        if(!reg.test($("#auditingTime").val())){
            layer.alert("审批时间必须为正整数");
            return false;
        }

var isNumber = true;
        $(".show-priceConfig .set-select-btn").each(function (index, value) {
            var priceItem = {};
            priceItem.businessType = index + 1;
            if(!reg.test($(value).find("input").val())){
                isNumber = false;
            }
            priceItem.floatAmount = $(value).find("input").val();
            auditingPriceConfigs.push(priceItem);
        });
        if(!isNumber){
            layer.alert("上浮价格必须为正整数");
            return false;
        }


