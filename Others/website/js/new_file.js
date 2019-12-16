var list=document.querySelector(".imgulbox2");/*取元素*/
var numbe=document.getElementsByClassName("bannernum2")[0].children;
var i=0;
var timer=setInterval(move,2000);/*单位为毫秒，创建计时器*/
function move(){
	i++;
	if(i==4){i=0;}
list.style.marginLeft=-i*480+"px"; 
//先将所有数字还原为黑色
for(var x=0;x<numbe.length;x++){  /*先清空再取第i个元素——数字变红*/
	numbe[x].children[0].className="";
}
//先将当前轮番图对应数字设为红色
numbe[i].children[0].className="now";/*添加类now*/
//鼠标移动到数字区域时，要有鼠标所在位置决定上方图片轮播到那一张
for(var y=0;y<numbe.length;y++){
	numbe[y].index=y;/*索引值等于当前的y*/  //将循环到的值确定到对应的li
	numbe[y].onmousemove=function(){/*当前鼠标移动到的图片*/
	     clearInterval(timer);  //清楚定时器timer
	     i=this.index;          //获取鼠标所在的数字值
	     list.style.marginLeft=-i*480+"px";    //将图片挪过来
	 for(var x=0;x<numbe.length;x++){           /*先清空再取第i个元素——数字变红*/
	numbe[x].children[0].className="";
}
    numbe[i].children[0].className="now";
    }
    numbe[y].onmouseout=function(){   /*鼠标移出去*/
    	timer=setInterval(move,2000);
    }
}
}
