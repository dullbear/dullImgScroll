jQuery图片滚动插件：

默认参数

var defaults = {

	scrollWrap: '#scrollWrap', //滚动父级
			
	scrollBox: '#scrollBox',  //控制显示层
			
	boxName: '#scrollBox', //滚动内容
			
	nextBtn: '#nextBtn', //下一帧按钮
			
	prevBtn: '#prevBtn', //上一帧按钮
			
	direction: 'left', //滚动方向
		
	cun: 1,	//滚动个数
			
	speed: 2000 //滚动速度

}

实例化插件(向上滚动)

$('#scroll-top').dullImgScroll({

        'scrollWrap': '#scroll-top',
        
        'scrollBox': '.scroll-top-main',
        
        'boxName': '#scroll-top-ul',
        
        'nextBtn': '#up-btn',
        
        'prevBtn': '#down-btn',
        
        'direction': 'top',
        
        'cun': '4'
 });