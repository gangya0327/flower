function loadError(status, res){
  if (res.responseText) {
      var ret = res.responseText;
      var err = $.parseJSON(ret);
  } else {
      err = {
          code: 9999,
          message: '网络繁忙，请稍后再试'
      }
  }
  // 如果code8004，则为信息过期，跳到登录
  if (err.code == 8004) {
      layer.alert(err.message, {btn: ['确定'], closeBtn: 0}, function () {
          // window.location.href = "/auth/login";
          window.location.reload(); // 登录后会回到之前退出在页面
      });
  } else {
      layer.alert(err.message || '');
  }
return;
}

//e.target.tagName != "INPUT"