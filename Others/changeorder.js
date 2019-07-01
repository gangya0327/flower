var cacheKey=GetQueryString("cacheKey");
var seatType=GetQueryString("seatType");
var orderId=GetQueryString("orderId");
var orderPassengerId=GetQueryString("orderPassengerId");
var corpId=GetQueryString("corpId");
var orderPayType=GetQueryString('orderPayType');
var serviceFee;
$(function () {
	// 获取可用支付方式
	getPayWay();
	//获取服务费
	initServiceFee();
	// 得到火车票的信息
	getTrainInfo();
	//得到改签的订单信息
	getOrderInfo(orderId,orderPassengerId);
	$(document).on("change",".trainSeats1",(function(){
        $.each($(".trainSeats1"), function(i, v) {
            if ($(v).val() == 8 || $(v).val() == 3) {
                $('.noSeat').removeClass('hidden');
            } else {
                $('.noSeat').addClass('hidden');
            }
        });

        //更新价格
		totalPrice()
	}));

	//展示明细
	$(document).on("mouseover",".cost_detail",(function(){
		$(".cost_detail_tip").removeClass("hidden");
	}));
	$(document).on("mouseout",".cost_detail",(function(){
		$(".cost_detail_tip").addClass("hidden");
	}));

	//根据orderPayType确定支付方式
	if(orderPayType==1 || orderPayType==3){
		$("#showTip").find(".payWay").html("个人支付");

	}else if(orderPayType==2){
		$("#showTip").find(".payWay").html("企业垫付");
	}

	// 点击确定按钮
	$('#nextButton').click(function () {
			var data={};
			data.orderId=orderId;
			data.passengeParams=[];
		   var trainDetail=$("#tiketInfo").val();
		   var trainInfo=eval('('+trainDetail+')');
		 //  console.log('哈哈哈',trainInfo);
			$("select[name=trainSeats1]").each(function() {
				var $this=$(this);
		       	var aaa={};
					 aaa.orderPassengerId=$this.attr("data-pid");
					aaa.seatType=$this.val();
					aaa.unitPrice=$this.find("option:selected").attr("data-price");
					data.passengeParams.push(aaa);
			});
			data.fromStation=trainInfo.fromStation ;
			data.toStation=trainInfo.arriveStation;
			data.fromTime=getSmpFormatDateByLong(trainInfo.fromTime,"yyyy-MM-dd hh:mm:ss");
			data.toTime=getSmpFormatDateByLong(trainInfo.arriveTime,"yyyy-MM-dd hh:mm:ss");
			data.trainNumber =trainInfo.trainCode;
			data.toCity =trainInfo.toCity;
		$("#subChangeData").val(JSON.stringify(data));
	})
	// 点击确认改签按钮
	$("#changeBtn").click(function(){
		$("#showTip").modal("hide");
		if(orderPayType == 1 || orderPayType == 3) {
			$('#selectPay').modal('show');
		}
		else if (orderPayType == 2){
			submitChangerTrain();
		}
        else {
            layer.alert('获取支付方式失败，请联系管理员');
        }
	});

    // 选择微信、支付宝弹窗打开触发
    $('#selectPay').on('shown.bs.modal', function () {
        $("#select_pay_btn").on('click', function() {
            if($(this).attr('data-pay') == 1) {
                // 支付宝
                submitChangerTrain(1);
            }
            else if($(this).attr('data-pay') == 2) {
                // 微信
                submitChangerTrain(2);
            }
            else {
                layer.alert('请选择支付方式');
            }
        })
    });
    $('#selectPay').on('hidden.bs.modal', function () {
        $("#select_pay_btn").unbind();
    })
});

// 查询当前用户可用支付方式
function getPayWay() {
	$.doAjax({
		url: '/payway',
		err: function(err) {
			layer.alert('获取支付方式失败');
		},
		success: function(data) {
			if(data.paramValue == '1') {
				$('#weixin').remove();
				$("#select_pay_btn").attr("data-pay", '1');
			}
			else if(data.paramValue == '5') {
				$('#zhifubao').remove();
			}
		}
	})
}

// 提交改签/改签去付款
function submitChangerTrain(selectPayType) {
	var img = $("#progressImgage");
	img.removeClass("hide");
	document.getElementById("loadbg").style.display ="block";
	var subChangeData=$("#subChangeData").val();
	var data=eval('('+subChangeData+')');
    // 是否接受无座
    data.wzExt = $('input[name=noSeat]').is(':checked') ? 1 : 0;
    if(selectPayType == 1)
    {
        data.payType = 1;   // 支付宝
    }
    else if(selectPayType == 2) {
        data.payType = 3;   // 微信
    }
	$.doAjax({
		type:"post",
		url:"/train/order/change",
		data:JSON.stringify(data),
		contentType:"application/json",
		success:function(data){
			img.addClass("hide");
			document.getElementById("loadbg").style.display ="none";
			var data = eval(data);
			if(data.result==2)//公司代付
			{
				location.href="/train/orderChangeFinish";
			}
			else if(data.result==1)//支付宝支付
			{
				window.location.href=data.payParams;
			}
			else if(data.result==3) {// 微信支付
				var wx_Data = {};
				wx_Data.codeUrl = data.payParams;
				wx_Data.orderNumber = [];
				data.orderNumber.map(function(v, i) {
					wx_Data.orderNumber.push(v);
				});
				wx_Data.price = data.payPrice;
				wx_Data.boss = '飞巴商旅';
				wx_Data.ticketType = 5;
				wx_Data.orderId = [];
				wx_Data.orderId[0] = orderId;
				if (window.localStorage) {
					window.localStorage.setItem('wx_Data', JSON.stringify(wx_Data));
					window.location.href = '/page/weixinPay';
				} else {
					alert('当前浏览器不支持localStorage，请升级浏览器');
				}
			}
		},
		error:function (err) {
			img.addClass("hide");
			document.getElementById("loadbg").style.display ="none";
			dialogHTML(err.message)
		}
	});
}

//得到火车信息
function getTrainInfo(){
	$.doAjax({
		url:"/train/gettraininfo/"+cacheKey+"/"+seatType,
		type:"get",
		error:function(err){

		},
		success:function(data)
		{
			var html=template("trainInfoHtml",data);
			$("#trainInfo").html(html);
			$("#trainInfoOk").html(html);
			//退改签弹框效果
			$("#trainInfo #changeBack,#trainInfoOk #changeBack").hover(function(){
				$(".refundChangeShow").show();
			},function(){
				$(".refundChangeShow").hide();
			});
			$("#tiketInfo").val(JSON.stringify(data));
            // 弹窗起终点
            $('#fromTo').text(data.fromCity + '-' + data.toCity);
		}
	})
}
//得到改签的订单信息
function getOrderInfo(orderId,orderPassengerId){
	var data={};
	data.orderId=orderId;
	data.passengerIds=new Array();
	data.passengerIds=orderPassengerId.split(",");

	$.doAjax({
		url:"/train/order/ticketinfo",
		type:"post",
		data:JSON.stringify(data),
		success:function(data){
			var passengerList=eval(data).passengerList;
		//	console.log("疯狂的茄子",passengerList);
			for(var i=0;i<passengerList.length;i++){
				$("#userinfolist").append(getuserhtml(passengerList[i].name,passengerList[i].idcardType,passengerList[i].idcardCode,passengerList[i].carriageNumber,passengerList[i].seatNumber,passengerList[i].seatType,passengerList[i].orderPassengerId,i));
			}
            // 添加是否接受无座
            $('#userinfolist .detail_info:last').append('<div class="form-group passenger_name noSeat" style="margin-left: 115px;"><label><input type="checkbox" name="noSeat" style="margin-right: 5px;"><span>是否接受无座</span></label></div>')
			//刷新金额
			totalPrice();
		},
		error:function(err){

		}
	});
}
//生成乘客信息html
function getuserhtml(name,idcardType,idcardCode,carriageNumber,seatNumber,seattype,orderPassengerId,i)
{
	var html="<div class='detail_info or_border'>";
	var trainNum=carriageNumber+'车厢'+seatNumber+parseIngSeatsInfo(seattype);
	var i=i+1;
	html+="<span style='position: absolute;left: 25px;top: 27px;'>第<span class=\"passenger_order\">"+i+"</span>位乘客</span><div class='form-group passenger_name'>";
    // 火车票选择席位
    var price_t = getSeatsPrice();
    html += "<label  class='col-sm-1 col-xs-1 control-label' style='text-align: right;'>改签座席:</label><select class='trainSeats1' name='trainSeats1' data-pid='" + orderPassengerId + "'>";
    for (var i = 0; i < price_t.length; i++) {
        if (seatType == price_t[i].seatType) {
            html += "<option value='" + price_t[i].seatType + "' data-price='" + price_t[i].highestPrice + "' selected='selected' data-seat='" + parseIngSeatsInfo(price_t[i].seatType) + "（¥" + price_t[i].highestPrice + "）'>" + parseIngSeatsInfo(price_t[i].seatType) + "（¥" + price_t[i].lowestPrice + "）</option>";
        } else if (price_t[i].ticketNum == 0) {
            html += "<option value='" + price_t[i].seatType + "' data-price='" + price_t[i].highestPrice + "' disabled='disabled'  data-seat='" + parseIngSeatsInfo(price_t[i].seatType) + "（¥" + price_t[i].highestPrice + "）'>" + parseIngSeatsInfo(price_t[i].seatType) + "（¥" + price_t[i].lowestPrice + "）</option>";
        } else if (seatType == price_t[i].seatType && price_t[i].ticketNum == 0) {
            html += "<option value='" + price_t[i].seatType + "' data-price='" + price_t[i].highestPrice + "' selected='selected' disabled='disabled'  data-seat='" + parseIngSeatsInfo(price_t[i].seatType) + "（¥" + price_t[i].highestPrice + "）'>" + parseIngSeatsInfo(price_t[i].seatType) + "（¥" + price_t[i].lowestPrice + "）</option>";
        }
        else {
            html += "<option value='" + price_t[i].seatType + "' data-price='" + price_t[i].highestPrice + "'  data-seat='" + parseIngSeatsInfo(price_t[i].seatType) + "（¥" + price_t[i].highestPrice + "）'>" + parseIngSeatsInfo(price_t[i].seatType) + "（¥" + price_t[i].lowestPrice + "）</option>";
        }
    }
    if (seatType == 3 || seatType == 8) {
        // 二等座或者硬座显示接受无座选项
        $('.noSeat').removeClass('hidden');
    }
    html += "</select>";
	html+="</div>";
	html+="<div class='form-group passenger_name'>";
	html+="<label  class='col-sm-1 col-xs-1 control-label' style='text-align: right;'>姓名:</label>";
	html+="<div class=\"col-sm-5 col-xs-5\">";
	html+=" <input type='text' class='first_passengegr' name='' value='"+name+"' readonly>";
	html+=" </div>";
	html+=" <label  class='col-sm-1 col-xs-1 control-label' style='text-align: right;'>原座位信息:</label>";
	html+="<div class=\"col-sm-5 col-xs-5\">";
	html+="<input type='text' class='first_passengegr' style='width:200px;' name='' value='"+trainNum+"' readonly>";
	html+="</div>";
    html+="</div>";
	html+="<div class='form-group passenger_name'>";
	html+="<label  class=\"col-sm-1 col-xs-1 control-label\" style=\"text-align: right;\" >证件类型:</label>";
	html+="<div class='col-sm-5 col-xs-5'>";
	if(idcardType==2){
		html+="<select class='select' disabled='disabled'><option value=\"1\" >身份证</option><option value=\"2\" selected>护照</option><option value=\"3\" >军人证</option><option value=\"4\" >港澳通行证</option></select>";
	}else if(idcardType==3){
		html+="<select class='select' disabled='disabled'><option value=\"1\" >身份证</option><option value=\"2\" >护照</option><option value=\"3\" selected>军人证</option><option value=\"4\" >港澳通行证</option></select>";
	}else if(idcardType==4){
		html+="<select class='select' disabled='disabled'><option value=\"1\" >身份证</option><option value=\"2\" >护照</option><option value=\"3\" >军人证</option><option value=\"4\" selected>港澳通行证</option></select>";
	}else{
		html+="<select class='select' disabled='disabled'><option value=\"1\" selected>身份证</option><option value=\"2\" >护照</option><option value=\"3\" >军人证</option><option value=\"4\" >港澳通行证</option></select>";
	}
	html+="</div>";
	html+="<label  class='col-sm-1 col-xs-1 control-label' style='text-align: right;'>证件号码:</label>";
	html+="<div class='col-sm-5 col-xs-5'>";
	html+="<input type='text' class='first_passengegr' style='width:200px;'value='"+idcardCode+"' readonly>";
	html+="</div></div>";
	html+="</div>";
	return html;
}
// 获取火车票席位与席位价格
function getSeatsPrice() {
	var priceList=[];
	$.ajax({
		url:"/train/getCacheData/"+cacheKey,
		type:"get",
		async: false,
		error:function(err){

		},
		success:function(data)
		{
			priceList=data.ticketType;
		}
	});

	return  priceList;
}
// 得到火车票座位类型
function parseIngSeatsInfo(i) {
	//"0、商务座;1、特等座;2、一等座;3、二等座;4、高级软卧;5、软卧;6、硬卧;7、软座;8、硬座;9、无座;10、其他;'
	var type=parseInt(i);
	var value="";
	if(type==0)
	{
		value=" (商务座)";
	}
	else if(type==1)
	{
		value=" (特等座)";
	}
	else if(type==2)
	{
		value=" (一等座)";
	}
	else if(type==3)
	{
		value=" (二等座)";
	}
	else if(type==4)
	{
		value=" (高级软卧)";
	}
	else if(type==5)
	{
		value=" (软卧)";
	}
	else if(type==6)
	{
		value=" (硬卧)";
	}
	else if(type==7)
	{
		value=" (软座)";
	}
	else if(type==8)
	{
		value=" (硬座)";
	}
	else if(type==9)
	{
		value=" (无座)";
	}
	else if(type==10)
	{
		value=" (其他)";
	}
	else if(type==20)
	{
		value=" (动卧)";
	}
	return value;
}
/**
 * 计算金额
 */
function totalPrice(){

	/**
	 * 乘车人
	 */
	var passengerCount = 0; //乘车人数量
	var insurances = []; //保险

	var totalAmount=0;//订单总金额
	var trainOrderPrice={};//保存价格明细

	$("#userinfolist").find(".or_border").each(function(index){
		passengerCount++;



		//确定每个人的选座和价格
		if($("select[name='trainSeats1']").length>0){
			var unitPrice = $(this).find("select[name='trainSeats1'] option:selected").attr('data-price');
			var trainSeatType=$(this).find("select[name='trainSeats1'] option:selected").attr('data-seat');
			if(trainOrderPrice.hasOwnProperty(trainSeatType)){
				trainOrderPrice[trainSeatType].push(unitPrice);
			}else{
				trainOrderPrice[trainSeatType]=[];
				trainOrderPrice[trainSeatType].push(unitPrice);
			};
		}
		else{
			var ticketdata=$("#tiketInfo").val();
			var ticketInfo=eval('('+ticketdata+')');
			var unitPrice=ticketInfo.highestPrice;
		}
		totalAmount+=parseFloat(unitPrice);
	});

	var detailHtml = "";
	var total = 0;

    //单程火车票
    var ticketPriceGo = parseFloat(totalAmount); //车票单价

    var serviceFeeGO = parseFloat(serviceFee);

    /**
     * 订单明细
     */// 获取火车费
    detailHtml += "<ul><li class='clearfix'><span class='pull-left'>票价</span><div class='pull-right' style='width: 150px;'>";
    // 显示硬卧软卧提示
    $("#train_seat_tip").hide();
		for( var i in trainOrderPrice){
			detailHtml +="<span class='pull-right'><span  class='ticket_price'>"+i+"</span>x<span class='ticket_num'>"+trainOrderPrice[i].length+"</span>人</span>";
			// 显示硬卧软卧提示
			if(i.indexOf('软卧')>0 || i.indexOf('硬卧')>0){
				$("#train_seat_tip").show();
			}
		}
    detailHtml +="</div></li>";
    // 获取保险费
    for(var i=0;i<insurances.length;i++){
        detailHtml += "<li>"+insurances[i].name+"<span>￥<span  class='other_price'>"+insurances[i].price+"</span>x<span class='other_num'>"+insurances[i].count+"</span>人</span></li>";
        total += insurances[i].price*insurances[i].count;
    }
    detailHtml += "<li><span class='pull-left'>服务费</span><span class='pull-right'>￥<span  class='service_price'>"+serviceFeeGO+"</span>x<span class='service_num'>"+passengerCount+"</span>人</span></li>" + "</ul>";
    total += ticketPriceGo+(serviceFeeGO*passengerCount);

	$(".cost_detail_tip").html(detailHtml);
    $('.cont_list').html(detailHtml).css('width', '200px');
    $(".money-total").html(total);
	$(".traveler_total").html(passengerCount);
    $('#total-amount').text('￥' + total);
}
//加载服务费
function initServiceFee(){
	$.doAjax({
		url:'/search/train/service/fee/203',
		type:'get',
		async:false,
		success:function(data){
			if(data!=null&&data!=""){
				if(data.serviceFee != null){
					serviceFee = data.serviceFee;
				}
			}
		}
	});
}
