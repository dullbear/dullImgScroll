jQuery图片滚动插件
---

插件特性：向左、向右、滚动个数、滚动速度

默认参数

```
var defaults = {
       //用户获取滚动外层高宽以判断是否满足滚动条件
       scrollBox: '#scrollBox',
       //滚动内容
       boxName: '#scrollBox',
       //下一帧按钮
       nextBtn: '#nextBtn',
       //上一帧按钮
       prevBtn: '#prevBtn',
       //滚动方向
       direction: 'left',
       //当前滚动页面
       current: 0,
       //当前显示状态小图
       currentBox: ".currentBtn",
       //滚动个数
       cun: 1,
       //滚动速度
       speed: 2000
};
```

实例化插件(向上滚动)


```
$('#scroll-top').dullImgScroll({
        'scrollBox': '.scroll-top-main',
        'boxName': '#scroll-top-ul',
        'nextBtn': '#up-btn',
        'prevBtn': '#down-btn',
        'direction': 'top',
        'cun': '4'
 });
 ```
