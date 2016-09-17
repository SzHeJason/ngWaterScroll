# ng-water-scroll
使用指令来实现瀑布流的效果，但是这个指令适用有局限性,当你需求满足以下几点的时候，你可以使用这个指令来完成瀑布流效果，如果你发现你的需求不满足以下条件，你可以尝试下 __[ngInfiniteScroll](https://github.com/sroze/ngInfiniteScroll)__ 
* 滚动的容器高度固定

### Bower
--------
```
    bower install --save-dev ng-water-scroll
```

### Usage
-------
```html
<ANY water-scroll scroll-container="containIdName" style="overflow: scroll;height:600px;"  scroll-load="fn()">
    <ANY  id="containIdName">
           
    </ANY>
</ANY>
```

### waterScroll Parameters
--------
* **scroll-distance:** 触发scroll-load方法的距离，该距离代表滚动条距离底部的高度，目前只支持像素范围，只需输入数字，不需要输入单位
* **scroll-load:** 当滚动到合适的距离时，他会触发这个的方法
* **scroll-container:** 指定数据存贮的容器
* **loadding-info:** 当数据加载时，出现加载数据html片段
* **load-disabled:** 是否允许数据加载


### Event
-----
* **scrollLoadingFinfish** 数据加载完成
* **stopLoading** 停止继续加载数据
* **startLoading** 重新开始加载数据


