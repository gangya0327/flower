function dragFunc11(id) {
    var Drag = document.getElementById(id);
    var isMovestatus = false;
    $(Drag).mousedown(function (event) {
        var ev = event || window.event;
        var disX = ev.clientX - $(Drag).offset().left;
        var disY = ev.clientY - $(Drag).offset().top;
        $(document).mousemove(function (event) {
            var ev = event || window.event;
            console.log(241);
            $(Drag).css("left", ev.clientX - disX + "px");
            $(Drag).css("top", ev.clientY - disY + "px");
            $(Drag).css("cursor", "move");
            isMovestatus = true;
        })
    })
    $(Drag).mouseup(function () {
        $(document).unbind("mousemove");
        $(Drag).css("cursor", "default");
        if (!isMovestatus) {
            $("#remindBox").css("display", "none");
            $("#remindListBox").css("display", "block");
        }
        isMovestatus = false;
    });
}