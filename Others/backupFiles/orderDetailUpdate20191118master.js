var orderId = GetQueryString('orderId');
var insuranceList = [];
var corpList = null;
// 企业名称第一次为空时，重新查询全部企业
var firstFullCorpSearch = 0;
var passengerNum = 0;
var childNum = 0;
var pnrCode;
var tmcChannelId;
$(function () {
    // 查询保险信息
    insuranceInfo();
    // 查询订单航班信息
    flightInfo();
    // 查询机票信息
    ticketInfo();
    // 查询出票渠道
    etdzChannelInfo();

    document.onclick = function (e) {
        var ele = e ? e.target : window.event.srcElement;
        if (ele.id !== 'corpInfo' && ele.id !== 'corpId') {
            $("#corpInfo").addClass("hidden");
        }
    }
});

// 查询出票渠道
function etdzChannelInfo() {
    $.doAjax({
        url: "/tmc/channel/define/list/flight",
        type: "get",
        async: false,
        success: function (data) {
            var jsondata = eval(data);
            if (data.length > 0) {
                var html = "";
                $.each(jsondata, function (i, info) {
                    html += "<option value='" + info.channelId + "'>" + info.channelName + "</option>";
                });
                // $("#etdzChannel").append(html);
                $(".etdzChannel").append(html);
                // $("#etdzChannel").eq(0).attr("disabled", false);
                $(".etdzChannel").on("change",function (e) {
                    $(".etdzChannel").find("option[value='"+$(this).val()+"']").attr("selected", "selected");
                })
            }
        }
    })
}

// 查询保险信息
function insuranceInfo() {
    $.doAjax({
        url: "/insurance/self",
        type: "get",
        async: false,
        success: function (data) {
            if (data) {
                insuranceList = data;
            }
        }
    });
}

// 查询订单航班信息
function flightInfo() {
    $.doAjax({
        url: "/order/info/toEdit/" + orderId,
        type: "get",
        async: false,
        success: function (data) {
            pnrCode= data.pnrCode;
            tmcChannelId = data.tmcChannelId;
            // $("#airlineShortName").val(data.airlineShortName);
            // $("#flightNumber").val(data.flightNumber);
            // $("#flightDate").val(data.flightDate);
            // $("#seatClass").val(data.seatClass);
            // $("#departureCityName").val(data.departureCityName);
            // $("#destinationCityName").val(data.destinationCityName);
            // $("#departureAirportName").val(data.departureAirportName);
            // $("#destinationAirportName").val(data.destinationAirportName);
            // $("#departureTime").val(getSmpFormatDateByLong(data.departureTime, "yyyy-MM-dd hh:mm:ss"));
            // $("#destinationTime").val(getSmpFormatDateByLong(data.destinationTime, "yyyy-MM-dd hh:mm:ss"));
            // $("#departureTerminal").val(data.departureTerminal);
            // $("#destinationTerminal").val(data.destinationTerminal);
            // $("#pnrCode").val(data.pnrCode);
            // $("#etdzChannel").find("option[value='" + data.tmcChannelId + "']").attr("selected", "selected");
            $("#ticketPrice").val(data.ticketPrice);
            $("#settlementPrice").val(data.settlementPrice);
            $("#vipPrice").val(data.vipPrice);
            $("#oilTax").val(data.oilTax);
            $("#serviceFee").val(data.serviceFee);
            $("#corpVipCode").val(data.corpVipCode);
            $("#createTime").val(getSmpFormatDateByLong(data.createTime, "yyyy-MM-dd hh:mm:ss"));
            if(data.childSettlementPrice != null && parseInt(data.childSettlementPrice)>0){
                $(".ticket_info_head.detail_info.price").height(160);
                $(".child").css("display","block");
                $("#childTicketPrice").val(data.childPatPrice);
                $("#childSettlementPrice").val(data.childSettlementPrice);
                $("#childOilTax").val(data.childOilTax);
                /*$("#childVipPrice").val(data.childVipPrice);*/
            }
            $("#corpId").val(data.corpName);
            $("#corpId").attr("corpname", data.corpName);
            $("#corpId").attr("corpid", data.corpId);
        }
    })
}

// 查询机票信息
function ticketInfo() {
    $.doAjax({
        url: '/order/flight/ticket/info/' + orderId,
        type: 'get',
        async: false,
        success: function (data) {
            // console.log(data,109)
            var orderFlightTransferModelList = data.orderFlightTransferModelList;//返回航线数组
            // 折扣
            $("#discount").val(data.discount);

            if(orderFlightTransferModelList){
                var flightTit = "";//航程标题

                for(var i = 0;i<orderFlightTransferModelList.length;i++){
                    var array_mode = [];
                    for (var j = 0; j < orderFlightTransferModelList.length; j++) {
                        array_mode.push(orderFlightTransferModelList[j].returnFlag);
                    }
                    if(orderFlightTransferModelList.length==1){
                        flightTit = "单";
                    }else{
                        if (array_mode.indexOf("2") != -1) {
                            if (orderFlightTransferModelList[i].serialNumber == "1") {
                                flightTit = "去";
                            }
                            else if (orderFlightTransferModelList[i].serialNumber == "2") {
                                flightTit = "返";
                            }
                        }else{
                            var serialNumber = orderFlightTransferModelList[i].serialNumber;
                            flightTit = serialNumber;
                        }

                    }
                    var newHtml = "<section class=\"ticket_info_head detail_info\" id=\"detail_info_message\">";
                    newHtml += "<ul class=\"newOBject\" value="+orderFlightTransferModelList[i].transerId+" data-returnflg = "+orderFlightTransferModelList[i].returnFlag+">" +
                        "<li class=\"titflght\" style='width: 30px;text-align: center;' value='"+orderFlightTransferModelList[i].serialNumber+"'>"+flightTit+"</li>" +
                        "<li><div><span class=\"edit-title\">航司名称：</span><input type=\"text\" id=\"airlineShortName\" value="+orderFlightTransferModelList[i].airlineShortName+"></div>" +
                        "<div><span class=\"edit-title\">出发城市:</span><input type=\"text\" id=\"departureCityName\" value="+orderFlightTransferModelList[i].departureCityName+"></div>" +
                        "<div><span class=\"edit-title\">出发时间:</span><input type=\"text\" id=\"departureTime\" onclick=\"WdatePicker({ dateFmt: 'yyyy-MM-dd HH:mm:ss' })\" value='"+getSmpFormatDateByLong(orderFlightTransferModelList[i].departureTime, "yyyy-MM-dd hh:mm:ss")+"'></div>" +
                        "<div><span class=\"edit-title\">舱位：</span><input type=\"text\" id=\"seatClass\" value="+orderFlightTransferModelList[i].seatClassCode+"></div>" +
                        "</li>" +
                        "<li><div><span class=\"edit-title\">航班号：</span><input type=\"text\" id=\"flightNumber\" value="+orderFlightTransferModelList[i].flightNumber+"></div>" +
                        "<div><span class=\"edit-title\">到达城市：</span><input type=\"text\" id=\"destinationCityName\" value="+orderFlightTransferModelList[i].destinationCityName+"></div>" +
                        "<div><span class=\"edit-title\">到达时间：</span><input type=\"text\" id=\"destinationTime\" onclick=\"WdatePicker({ dateFmt: 'yyyy-MM-dd HH:mm:ss' })\" value='"+getSmpFormatDateByLong(orderFlightTransferModelList[i].destinationTime,"yyyy-MM-dd hh:mm:ss")+"'></div>" +
                        "<div><span class=\"edit-title\">舱位名称：</span><input type=\"text\" id=\"seatClassName\" value="+(orderFlightTransferModelList[i].seatClassName || orderFlightTransferModelList[i].mainClassName)+"></div>" +
                        "</li>" +
                        "<li><div><span class=\"edit-title\">航班日期：</span><input type=\"text\" id=\"flightDate\" onclick=\"WdatePicker()\" value='"+getSmpFormatDateByLong(orderFlightTransferModelList[i].flightDate)+"'></div>" +
                        "<div><span class=\"edit-title\">出发机场：</span><input type=\"text\" id=\"departureAirportName\" value="+orderFlightTransferModelList[i].departureAirportName+"></div>" +
                        "<div><span class=\"edit-title\">出发航站楼：</span><input type=\"text\" id=\"departureTerminal\" value="+(orderFlightTransferModelList[i].departureTerminal?orderFlightTransferModelList[i].departureTerminal:'')+"></div>" +
                        "<div><span class=\"edit-title\">出票渠道：</span><select id=\"etdzChannel\" class=\"etdzChannel\"></select></div>" +
                        "</li>" +
                        "<li><div><span class=\"edit-title\">PNR：</span><input type=\"text\" id=\"pnrCode\" class=\"pnrCode\" value="+pnrCode+"></div>" +
                        "<div><span class=\"edit-title\">到达机场：</span><input type=\"text\" id=\"destinationAirportName\" value="+(orderFlightTransferModelList[i].destinationAirportName?orderFlightTransferModelList[i].destinationAirportName:'')+"></div>" +
                        "<div><span class=\"edit-title\">到达航站楼：</span><input type=\"text\" id=\"destinationTerminal\" value="+(orderFlightTransferModelList[i].destinationTerminal?orderFlightTransferModelList[i].destinationTerminal:'')+"></div>" +
                        "</li>" +
                        "</ul></section>";
                    $(".pnrCode").eq(0).removeAttr("readonly");
                    $("#flightInfo").append(newHtml);

                }
                $(".pnrCode").on("change",function (e) {
                    $(".pnrCode").val($(this).val())
                })

            }

            var contactPerson = data.contact;
            if (contactPerson) {
                $("#corpUserName").val(contactPerson.name);
                $("#corpUserPhone").val(contactPerson.phone);
            }
            var passengers = data.passengers;
            passengerNum = passengers.length;
            // var height = 180 + (passengerNum - 1) * 160;
            // $("#passenger_info").css({"height": height + "px"});
            if (passengers.length > 0) {
                var html = "";
                $.each(passengers, function (i, info) {
                    html += "<ul class=\"waiting_pay_info\">" +
                        "<li>" +
                        "<input type=\"hidden\" id=\"ticketId_" + i + "\">" +
                        "<input type=\"hidden\" id=\"orderPassengerId_" + i + "\">" +
                        "<div><span class='edit-title'>姓名：</span><input type=\"text\" id=\"passengerName_" + i + "\"></div>" +
                        "<div><span class='edit-title'>证件类型：</span><select type=\"text\" id=\"idcardType_" + i + "\">" +
                        "<option value='1'>身份证</option>" +
                        "<option value='2'>护照</option>" +
                        "<option value='3'>军官证</option>" +
                        "<option value='4'>港澳通行证</option>" +
                        // "<option value='5'>台胞证</option>" +
                        "<option value='5'>其他</option>" +
                        "</select></div>" +
                        "<div><span class='edit-title'>票号：</span><input type=\"text\" id=\"ticketNumber_" + i + "\"></div>" +
                        "</li>" +
                        "<li>" +
                        "<div><span class='edit-title'>手机号码：</span><input type=\"text\" id=\"passengerPhone_" + i + "\"></div>" +
                        "<div><span class='edit-title'>证件号码：</span><input type=\"text\" id=\"idcardCode_" + i + "\"></div>" ;
                    if(info.passengerType == 2){
                        childNum = childNum+1;
                        html+= "<div style='color: #e26a6a'>&nbsp;&nbsp;*儿童</div>"
                    }
                    html+="</li> <li>" +
                        "</li> <li>";
                    if (insuranceList) {
                        html += "<div style='height: 50px;width: 500px;overflow: hidden;white-space: normal;' id='insurance_" + i + "'><span class='edit-title'>保险信息：</span>&nbsp;&nbsp;";
                        $.each(insuranceList, function (n, info) {
                            html += "<input type=\"checkbox\" id=\"" + info.insuranceId + "_" + i + "\" name='insurances' value='" + info.insuranceId + "' unitPrice='" + info.unitPrice + "' insuranceName='" + info.insuranceName + "'>" + info.insuranceName + "&nbsp;&nbsp;";
                        });
                    }
                    html += "</div>" +
                        "</li> </ul>";
                });
                $("#passenger_info").append(html);
                $.each(passengers, function (i, info) {
                    $("#ticketId_" + i).val(info.ticketId);
                    $("#orderPassengerId_" + i).val(info.orderPassengerId);
                    $("#passengerName_" + i).val(info.name);
                    $("#passengerPhone_" + i).val(info.phone);
                    $("#idcardCode_" + i).val(info.idcardCode);
                    $("#ticketNumber_" + i).val(info.ticketNumber);
                    $("#idcardType_" + i).find("option[value='" + info.idcardType + "']").attr("selected", "selected");
                    if (info.insOrderDetails) {
                        $.each(info.insOrderDetails, function (n, info) {
                            $("#" + info.tmcInsuranceId + "_" + i).prop("checked", 'checked');
                            $("#" + info.tmcInsuranceId + "_" + i).attr("detailId", info.detailId);
                            $("#" + info.tmcInsuranceId + "_" + i).attr("tmcOrderInsurance", info.tmcOrderInsurance);
                            $("#" + info.tmcInsuranceId + "_" + i).prop("disabled", true);
                        });
                    }
                });
            }
            // 总计信息
            totalInfo();
        }
    });
}
function searchCorp(obj) {
    var corpInfo = {};
    corpInfo.corpInfo = $.trim(obj);
    if (obj == "" && firstFullCorpSearch == 0) {
        firstFullCorpSearch = 1
    }
    if (corpList == null || firstFullCorpSearch == 1) {
        $.doAjax({
            type: "get",
            url: "/tmc/corp/list/byCodeAndName",
            data: corpInfo,
            success: function (data) {
                var html = "";
                if (data) {
                    var jsondata = eval(data);
                    corpList = jsondata;
                    if (obj == "" && firstFullCorpSearch == 1) {
                        firstFullCorpSearch = 2
                    }
                    $.each(jsondata, function (i, info) {
                        var corpInfo = '{"corpId":' + info.corpId + ',"tmcId":' + info.tmcId + ',"corpCode":"' + info.corpCode + '","corpName":"' + info.corpName + '","corpShortName":"' + info.corpShortName + '","payType":' + info.payType + ',"trainPayType":' + info.trainPayType + ',"hotelPayType":' + info.hotelPayType + ',"intlFlightPayType":' + info.intlFlightPayType + ',"userId":-1,"userName":"","userPhone":"","policyName":"","departmentName":"","orderRole":2}';
                        html += "<li style='float:none;cursor: pointer;' name='corpDetail' isVirtual='" + info.isVirtual + "' corpinfo='" + corpInfo + "' corpId='" + info.corpId + "' corpName='" + info.corpName + "' corpCode='" + info.corpCode + "'>" + info.corpName + "(" + info.corpCode + ")</li>";

                    });
                    $("#corpList").html(html);
                    $("#corpInfo").removeClass("hidden");
                } else {
                    $("#corpInfo").addClass("hidden");
                    $("#corpList").html(html);
                }
            }
        });
    } else {
        //已查询过，直接筛选
        var html = "";
        var jsondata = corpList;
        $.each(jsondata, function (i, info) {
            if (info.corpName.toUpperCase().indexOf($.trim(obj.toUpperCase())) > -1 || info.corpCode.toUpperCase().indexOf($.trim(obj.toUpperCase())) > -1
                || $.trim(obj) == "") {
                var corpInfo = '{"corpId":' + info.corpId + ',"tmcId":' + info.tmcId + ',"corpCode":"' + info.corpCode + '","corpName":"' + info.corpName + '","corpShortName":"' + info.corpShortName + '","payType":' + info.payType + ',"trainPayType":' + info.trainPayType + ',"hotelPayType":' + info.hotelPayType + ',"intlFlightPayType":' + info.intlFlightPayType + ',"userId":-1,"userName":"","userPhone":"","policyName":"","departmentName":"","orderRole":2}';
                html += "<li style='float:none;cursor: pointer;'name=' corpDetail' isVirtual='" + info.isVirtual + "' corpinfo='" + corpInfo + "' corpId='" + info.corpId + "' corpName='" + info.corpName + "' corpCode='" + info.corpCode + "'>" + info.corpName + "(" + info.corpCode + ")</li>";
            }
        });
        $("#corpList").html(html);
        $("#corpInfo").removeClass("hidden");
    }
}

// 企业下拉列表交互
$(document).on("mouseover", "#corpInfo li", function (e) {
    $(e.target).addClass("corpList_hover");
});
$(document).on("mouseout", "#corpInfo li", function (e) {
    $(e.target).removeClass("corpList_hover");
});
$(document).on("click", "#corpInfo li", function (e) {
    $("#corpId").val($(e.target).attr("corpname"));
    $("#corpId").attr("corpname", $(e.target).attr("corpname"));
    $("#corpId").attr("corpid", $(e.target).attr("corpid"));
    $("#corpInfo").addClass("hidden");
});

// 价格明细的隐藏切换
$("#priceDetailFlag").mouseover(function () {
    $("#priceDetail").removeClass("hidden");
});
$("#priceDetailFlag").mouseout(function () {
    $("#priceDetail").addClass("hidden");
});

// 总计信息
function totalInfo() {
    $("#passengerNum").html(passengerNum);
    var totalPrice = 0;
    var settlementPrice = parseFloat($("#settlementPrice").val());
    var oilTax = parseFloat($("#oilTax").val());
    var serviceFee = parseFloat($("#serviceFee").val());
    var childTotalPrice = 0;
    var childSettlementPrice = 0;
    var childOilTax = 0;
    if(childNum>0){
        var childSettlementPrice = parseFloat($("#childSettlementPrice").val());
        var childOilTax = parseFloat($("#childOilTax").val());
        if (!isNaN(childSettlementPrice)) {
            childTotalPrice += childSettlementPrice;
        }
        if (!isNaN(childOilTax)) {
            childTotalPrice += childOilTax;
        }
        if (!isNaN(serviceFee)) {
            childTotalPrice += serviceFee;
        }
    }
    if (!isNaN(settlementPrice)) {
        totalPrice += settlementPrice;
    }
    if (!isNaN(oilTax)) {
        totalPrice += oilTax;
    }
    if (!isNaN(serviceFee)) {
        totalPrice += serviceFee;
    }
    totalPrice = totalPrice * (parseInt(passengerNum)-childNum);
    totalPrice = totalPrice+(childTotalPrice*childNum);
    var html = "<ul>" +
        "<li>机票价<span>￥<span  class='ticket_price'>" + settlementPrice + "</span>x<span class='ticket_num'>" + (passengerNum-childNum) + "</span>人</span></li>" +
        "<li>税费<span>￥<span  class='oil_preice'>" + oilTax + "</span>x<span class='oil_num'>" + (passengerNum-childNum)  + "</span>人</span></li>";
    if(childNum>0){
        html+=  "<li>儿童机票价<span>￥<span  class='ticket_price'>" + childSettlementPrice + "</span>x<span class='ticket_num'>" + childNum + "</span>人</span></li>" +
            "<li>儿童税费<span>￥<span  class='oil_preice'>" + childOilTax + "</span>x<span class='oil_num'>" + childNum + "</span>人</span></li>";
    }

    $("input[name='insurances']").each(function () {
        if ($(this).is(':checked')) {
            var insuranceFee = parseFloat($(this).attr("unitPrice"));
            if (!isNaN(insuranceFee)) {
                totalPrice += insuranceFee;
                html += "<li>" + $(this).attr('insuranceName') + "<span>￥<span class='other_price'>" + insuranceFee + "</span>x<span class='other_num'></span>1人</span></li>";
            }
        }
    });
    html += "<li>服务费<span>￥<span  class='service_price'>" + serviceFee + "</span>x<span class='service_num'>" + passengerNum + "</span>人</span></li></ul>";
    $("#totalPrice").html(totalPrice);
    $("#priceDetail").html(html);
}

// 刷新总计信息
$("input[name='priceInfo']").blur(function () {
    totalInfo();
});
$(document).on("change", "input[name='insurances']", function () {
    totalInfo();
});

// 返回订单详情
$("#cancelBtn").click(function () {
    layer.confirm("确定返回订单详情？", {
        btn: ["确定", "取消"]
    }, function () {
        window.location.href = "/order/orderDetail?type=0&number=" + orderId
    }, function () {
        return;
    })
})

// 保存订单信息
$("#saveBtn").click(function () {
    layer.confirm("确定保存订单信息？", {
        btn: ["确定", "取消"]
    }, function () {
        layer.closeAll('dialog');
        $('#loading').removeClass('hidden');
        var newForm = $("#detail_info_message .newOBject");
        // console.log(newForm,392)
        var orderFlightEditParams  = [];
        for(var i = 0;i<newForm.length;i++){
            var obj = new Object();
            obj.transferId = $(".newOBject ").eq(i).attr("value");//transferId
            obj.serialNumber = $(".titflght ").eq(i).val();//transferId
            obj.returnflg = $(".newOBject ").eq(i).attr("data-returnflg");//returnFlag
            obj.airlineShortName = $("#airlineShortName ").eq(i).val();//航空公司
            obj.flightNumber = $("#flightNumber ").eq(i).val();
            obj.flightDate = new Date($("#flightDate ").eq(i).val());
            obj.departureCityName = $("#departureCityName ").eq(i).val();
            obj.destinationCityName = $("#destinationCityName ").eq(i).val();
            obj.departureTime = new Date($("#departureTime ").eq(i).val());
            obj.destinationTime = new Date($("#destinationTime ").eq(i).val());
            obj.departureAirportName = $("#departureAirportName ").eq(i).val();
            obj.destinationAirportName = $("#destinationAirportName ").eq(i).val();
            obj.departureTerminal = $("#departureTerminal ").eq(i).val();
            obj.destinationTerminal  = $("#destinationTerminal ").eq(i).val();
            obj.seatClass = $("#seatClass ").eq(i).val();
            obj.seatClassName = $("#seatClassName ").eq(i).val();
            orderFlightEditParams.push(obj);
        }


        // console.log(orderFlightEditParams,396)
        var jsonData = {};
        jsonData.orderFlightEditParams= orderFlightEditParams;
        jsonData.orderId = orderId;
        // jsonData.airlineShortName = $("#airlineShortName").val();
        // jsonData.flightNumber = $("#flightNumber").val();
        // jsonData.flightDate = new Date($("#flightDate").val());
        // jsonData.seatClass = $("#seatClass").val();
        // jsonData.departureCityName = $("#departureCityName").val();
        // jsonData.destinationCityName = $("#destinationCityName").val();
        // jsonData.departureAirportName = $("#departureAirportName").val();
        // jsonData.destinationAirportName = $("#destinationAirportName").val();
        // jsonData.departureTime = new Date($("#departureTime").val());
        // jsonData.destinationTime = new Date($("#destinationTime").val());
        // jsonData.departureTerminal = $("#departureTerminal").val();
        // jsonData.destinationTerminal = $("#destinationTerminal").val();
        jsonData.pnrCode = $("#pnrCode").val();
        jsonData.tmcChannelId = $("#etdzChannel").val();

        jsonData.ticketPrice = $("#ticketPrice").val();
        jsonData.settlementPrice = $("#settlementPrice").val();
        jsonData.oilTax = $("#oilTax").val();
        jsonData.serviceFee = $("#serviceFee").val();
        jsonData.corpVipCode = $("#corpVipCode").val();
        jsonData.vipPrice = $("#vipPrice").val();
        jsonData.corpId = $("#corpId").attr("corpid");
        jsonData.corpUserName = $("#corpUserName").val();
        jsonData.phone = $("#corpUserPhone").val();
        jsonData.createTime = new Date($("#createTime").val());
        jsonData.discount = $("#discount").val();
        if($("#childTicketPrice").val()){
            var childTicketPrice = $("#childTicketPrice").val()
            if(isNaN(childTicketPrice)){
                $('#loading').addClass('hidden');
                dialogHTML("儿童票面价应为数字！");
                return;
            }else{
                jsonData.childTicketPrice =childTicketPrice;
            }
            var childOilTax = $("#childOilTax").val();
            if(isNaN(childOilTax)){
                $('#loading').addClass('hidden');
                dialogHTML("儿童基建燃油费应为数字！");
                return;
            }else{
                jsonData.childOilTax =  childOilTax;
            }
            var childSettlementPrice = $("#childSettlementPrice").val();
            if(isNaN(childSettlementPrice)){
                $('#loading').addClass('hidden');
                dialogHTML("儿童结算非应为数字！");
                return;
            }else{
                jsonData.childSettlementPrice = childSettlementPrice;
            }
            /*jsonData.childVipPrice =  $("#childVipPrice").val();*/
        }
        var passengers = [];
        $("#passenger_info ul").each(function (i, e) {
            var passenger = {};
            passenger.ticketId = $("#ticketId_" + i).val();
            passenger.orderPassengerId = $("#orderPassengerId_" + i).val();
            passenger.name = $("#passengerName_" + i).val();
            passenger.phone = $("#passengerPhone_" + i).val();
            passenger.idcardType = $("#idcardType_" + i).val();
            passenger.idcardCode = $("#idcardCode_" + i).val();
            passenger.ticketNumber = $("#ticketNumber_" + i).val();
            var insurances = [];
            $("#insurance_" + i + " input[name='insurances']").each(function () {
                if ($(this).is(':checked')) {
                    var insurance = {};
                    insurance.detailId = $(this).attr("detailId");
                    insurance.tmcInsuranceId = $(this).val();
                    insurance.unitPrice = $(this).attr("unitPrice");
                    insurance.insuranceName = $(this).attr("insuranceName");
                    insurance.tmcOrderInsurance = $(this).attr("tmcOrderInsurance");
                    insurances.push(insurance);
                }
            });
            passenger.insOrderDetails = insurances;
            passengers.push(passenger);
        });
        jsonData.passengers = passengers;
        // console.log(jsonData,497)
        $.doAjax({
            url: "/order/edit/info/update",
            type: "post",
            data: JSON.stringify(jsonData),
            success: function (data) {
                $('#loading').addClass('hidden');
                // layer.alert("保存成功");
                layer.alert(
                    '保存成功',
                    function () {
                        window.location.href = "/order/orderDetail?type=0&number=" + orderId;
                    });
            }
        });
    }, function () {
        return;
    })
})
