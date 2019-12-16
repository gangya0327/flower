var hasSelectData = [{
    userName: "应孟霖",
    userPhone: "18768105813",
    userId: 211124206,
    departmentId: 111123076,
    departmentName: "英明总司",
    costCenterId: 111117162,
    costCenterName: "默认成本中心"
}, {
    userName: "刘凯源",
    userPhone: "18768105816",
    userId: 211124430,
    departmentId: 111123118,
    departmentName: "探员组",
    costCenterId: 111117162,
    costCenterName: "默认成本中心"
}, {
    userName: "马立",
    userPhone: "18768105742",
    userId: 211124220,
    departmentId: 111123118,
    departmentName: "探员组",
    costCenterId: 111117162,
    costCenterName: "默认成本中心"
}];
var allData = [];
$(function () {
    onload();

    bindEmployee();
    renderHasSelect();
});

function onload() {
    pageTable({
        url: "/corp/costCenter/list",
        uniqueId: "costCenterId",
        method: "post",
        columns: [
            {
                title: '成本中心名称',
                field: 'costCenterName',
                align: 'center',
                valign: 'middle'
            }, {
                title: '描述',
                field: 'costCenterDesc',
                align: 'center',
                valign: 'middle'
            }, {
                title: '编号',
                field: 'costCenterNum',
                align: 'center',
                valign: 'middle',
            }, {
                title: '绑定员工',
                field: 'costCenterNum',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row) {
                    var str = "<a href='javascript:;' onclick='bindEmployee(" + row.costCenterId + ")'>绑定员工( " + 5 + " )</a>";
                    return str;
                }
            }, {
                title: '操作',
                field: 'costCenterId',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var e = '<a href="javascript:" mce_href="javascript:" data-toggle="modal" data-backdrop="static" data-target="#AddDialog" onclick="edit(\''
                        + row.costCenterId + '\')">修改</a> ';
                    var d = '<a href="javascript:" mce_href="javascript:" data-toggle="modal" data-backdrop="static" data-target="#delDialog"  onclick="alertDel(\'' + row.costCenterId + '\')">删除</a> ';
                    return e + d;
                }
            }]
    });
}

function add() {
    var id = $("#centerId").val();
    if (id == "" || id == null) {
        center("post");
    } else {
        center("put");
    }
}

//编辑
function edit(id) {
    resertform();
    var json = $('#pageTable').bootstrapTable('getRowByUniqueId', id);
    $("#dialogTitle").text("编辑成本中心");
    $("#centerId").val(id);
    $("#costCenterName").val(json.costCenterName);
    $("#costCenterDesc").val(json.costCenterDesc);
    $("#costCenterNum").val(json.costCenterNum);
}

function alertDel(ctid) {
    $("#ctid").val(ctid);
}

//删除
function del() {
    var ctid = $("#ctid").val();
    $.ajax({
        type: 'delete', // 提交方式 get/post
        url: '/corp/costCenter/info/' + ctid, // 需要提交的 url
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var ret = XMLHttpRequest.responseText;
            var err = $.parseJSON(ret);
            $("#delDialog").modal("hide");
            dialogHTML(err.message);
        },
        success: function (data) { // data 保存提交后返回的数据，一般为 json 数据
            var searchParams = $("#searchForm").toJSON();
            $('#pageTable').bootstrapTable('refresh', {
                query: searchParams
            });
            $("#delDialog").modal("hide");
        }
    });
}

function center(type) {

    MyValidator.init({
        url: '/corp/costCenter/info',
        type: type,
        contentType: "application/json",
        data: function () {
            var jsondata = $("#addform").toJSON();
            return JSON.stringify(jsondata);
        },
        rules: {
            costCenterName: {
                required: true,
                delSpace: true
            }
        },
        messages: {
            costCenterName: {
                required: "成本中心名称不能为空！",
                delSpace: "不能只输入空格"
            },
            costCenterNum: {
                delSpace: "不能只输入空格"
            },
            costCenterDesc: {
                required: "描述不能为空！"
            }
        },
        success: function (data) {
            $("#AddDialog").modal("hide");
            var searchParams = $("#searchForm").toJSON();
            $('#pageTable').bootstrapTable('refresh', {
                query: searchParams
            });
        },
        error: function (err) {
            dialogHTML(err.message);
        }
    });
}

//清空表单
function resertform() {
    $('#addform')[0].reset();
    $("#centerId").val("");
    $("#addform .help-block").remove();
    $("#addform .has-error").removeClass("has-error");
}

// 成本中心绑定员工
function bindEmployee(costCenterId) {
    $("#bindDialog").modal("show");
    getAllEmployee();
}

// 渲染所有员工
function getAllEmployee() {
    var data = {departmentId: "111123076"};
    $.doAjax({
        url: '/corp/emp/list',
        type: 'post',
        data: data,
        success: function (data) {
            allData = data.rows;
            renderNotSelect()
        }
    })
}

// 渲染左侧列表
function renderNotSelect() {
    var notSelectListHtml = "";
    allData.map(function (item, index) {
        notSelectListHtml += '<li userId="' + item.userId + '" userName="' + item.userName + '" userPhone="' + item.userPhone + '" costCenterId="' + item.costCenterId +
            '" costCenterName="' + item.costCenterName + '" departmentId="' + item.departmentId + '" departmentName="' + item.departmentName + '">';
        var hasSelectFlag = false;
        hasSelectData.map(function (item2) {
            if (item.userId == item2.userId) {
                hasSelectFlag = true;
            }
        });
        if (hasSelectFlag) {
            notSelectListHtml += '<div class="ckb-btn" data-ckb="1"><img src="../../images/approval/set_ckb_selected.png" alt=""></div>';
        } else {
            notSelectListHtml += '<div class="ckb-btn" data-ckb="0"><img src="../../images/approval/set_ckb_select_not.png" alt=""></div>';
        }
        notSelectListHtml += '<div class="info-wrap">' +
            '<div class="info2">' + item.userName + '</div>' +
            '<div class="info2">' + item.userPhone + '</div>' +
            '<div class="info1 grey">' + item.departmentName + '</div>' +
            '</div>' +
            '<div class="status-wrap">';
        if (index == 3) {
            item.costCenterName = "";
        }
        if (hasSelectFlag) {
            notSelectListHtml += '<div class="selected">已选择</div>';
        } else {
            if (item.costCenterName) {
                notSelectListHtml += '<div class="has-bind">已绑定：<br/><span>' + item.costCenterName + '</span></div>';
            } else {
                notSelectListHtml += '<div class="not-bind grey">未绑定</div>';
            }
        }
        notSelectListHtml += '</div>' +
            '</li>';
    });
    $("#notSelectList").html(notSelectListHtml);
}

// 绑定员工弹框 复选框点击
$(document).on("click", "#bindDialog .check-wrap .ckb-btn", function () {
    if ($(this).attr("data-ckb") == "0") {
        $(this).attr("data-ckb", "1");
        $(this).find("img").attr("src", "../../images/approval/set_ckb_selected.png");
    } else {
        $(this).attr("data-ckb", "0");
        $(this).find("img").attr("src", "../../images/approval/set_ckb_select_not.png");
    }
});

// 点击人员
$(document).on("click", "#notSelectList li", function () {
    if ($(this).find(".ckb-btn").attr("data-ckb") == "0") {
        $(this).find(".ckb-btn").attr("data-ckb", "1");
        $(this).find(".ckb-btn").find("img").attr("src", "../../images/approval/set_ckb_selected.png");
        $(this).find(".status-wrap").html('<div class="selected">已选择</div>');
        var addObj = {
            userName: $(this).attr("userName"),
            userPhone: $(this).attr("userPhone"),
            userId: $(this).attr("userId"),
            departmentId: $(this).attr("departmentId"),
            departmentName: $(this).attr("departmentName"),
            costCenterId: $(this).attr("costCenterId"),
            costCenterName: $(this).attr("costCenterName")
        }
        hasSelectData.push(addObj);
        $("#hasSelectList").append('<li userId="' + addObj.userId + '"><span>' + addObj.userName + '</span><span>' + addObj.userPhone + '</span><span>' + addObj.departmentName + '</span>' +
            '<img class="del-icon" src="../../images/approval/select_delete.png" alt=""></li>');
    } else {
        $(this).find(".ckb-btn").attr("data-ckb", "0");
        $(this).find(".ckb-btn").find("img").attr("src", "../../images/approval/set_ckb_select_not.png");
        $(this).find(".status-wrap").html('<div class="has-bind">已绑定：<br/><span>' + $(this).attr("costCenterName") + '</span></div>');
        var clickUserId = String($(this).attr("userId")); // 点击的员工id
        hasSelectData.map(function (item, index) {
            if (item.userId == clickUserId) {
                hasSelectData.splice(index, 1);
                $("#hasSelectList li").eq(index).remove();
            }
        });
    }
});

// 渲染右侧列表
function renderHasSelect() {
    var hasSelectListHtml = "";
    hasSelectData.map(function (item) {
        hasSelectListHtml += '<li userId="' + item.userId + '"><span>' + item.userName + '</span><span>' + item.userPhone + '</span><span>' + item.departmentName + '</span>' +
            '<img class="del-icon" src="../../images/approval/select_delete.png" alt=""></li>';
    });
    $("#hasSelectList").html(hasSelectListHtml);
}

// 点击删除已选员工
$(document).on("click", "#hasSelectList li .del-icon", function () {
    var clickUserId = String($(this).parents("li").attr("userId")); // 点击的员工id
    hasSelectData.map(function (item, index) {
        if (item.userId == clickUserId) {
            hasSelectData.splice(index, 1);
            $("#hasSelectList li").eq(index).remove();
        }
    });
    allData.map(function (item, index) {
        if (item.userId == clickUserId) {
            $("#notSelectList li").eq(index).find(".ckb-btn").attr("data-ckb", "0");
            $("#notSelectList li").eq(index).find(".ckb-btn").find("img").attr("src", "../../images/approval/set_ckb_select_not.png");
            $("#notSelectList li").eq(index).find(".status-wrap").html('<div class="has-bind">已绑定：<br/><span>' + item.costCenterName + '</span></div>');
        }
    });
});