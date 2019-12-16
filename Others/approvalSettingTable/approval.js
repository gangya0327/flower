//渲染部门到表格中 type 1-出差审批，预订审批 2-报销审批
function renderAuditTable(data, type) {
    var tableHTML = "<tbody><tr><th>审批级别</th>";
    var claimTableHtml = "<tbody><tr><th>审批级别</th>"; // 报销审批表头
    data.forEach(function (v) {
        tableHTML += "<th did='" + v.departmentId + "'>" + v.departmentName + "</th>";
        claimTableHtml += "<th did='" + v.departmentId + "'>" + v.departmentName + "</th>";
    });
    tableHTML += "<th>操作</th></tr><tr><td>一级审批人</td>";
    // 报销审批多一列审批金额
    claimTableHtml += "<th class='claimLimitColumn'>审批金额</th>";
    claimTableHtml += "<th>操作</th></tr><tr><td>一级审批人</td>";
    data.forEach(function (v, i) {
        tableHTML += "<td>" + "<span class='select-audit-person' id='select0" + i + "'>选择</span>" + "</td>";
        claimTableHtml += "<td>" + "<span class='select-audit-person' id='select0" + i + "'>选择</span>" + "</td>";
    });
    tableHTML += "<td>-</td></tr></tbody>";
    claimTableHtml += "<td><span>≤ </span><input type='number' class='claimLimitInput' "+($("#isOpenAmount").attr("data-ckb") == 1 ? '' : 'disabled')+"> <span>元</span></td><td>-</td></tr></tbody>";
    // $(".auditing-body table").html(tableHTML); //出差申请+预订审批
    // $(".claimTable table").html(claimTableHtml); //报销审批
    if(type === 1) {
        return tableHTML
    } else {
        return claimTableHtml
    }
}

if(expenseClaimAuditingConfigData.departmentData.length === 0) {
    $("#claimingTable").html(renderAuditTable(departmentData, 2));
}else{
    $("#claimingTable").html(renderAuditTable(expenseClaimAuditingConfigData.departmentData, 2));
}

if(corpAuditingConfigData.departmentData.length === 0) {
    $("#bookingTable").html(renderAuditTable(departmentData, 1));
}else{
    $("#bookingTable").html(renderAuditTable(corpAuditingConfigData.departmentData, 1));
}

if(travelApprovalAuditingConfigData.departmentData.length === 0) {
    $("#approvalTable").html(renderAuditTable(departmentData, 1));
}else{
    $("#approvalTable").html(renderAuditTable(travelApprovalAuditingConfigData.departmentData, 1));
}