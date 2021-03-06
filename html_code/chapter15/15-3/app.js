﻿Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {        
        var bookData = [
            {id:1,image_url:'images/html51.jpg',book_name:'HTML 5与CSS 3权威指南',author:'陆凌牛',description:'内容系统而全面，HTML 5与CSS 3的新功能和新特性尽揽无余。注重实战，包含200余设计精巧的实例，可操作性极强。资深专家亲自执笔，3大前端社区一致推荐，权威性毋庸置疑。'},
            {id:2,image_url:'images/html52.jpg',book_name:'HTML5揭秘',
            author:'皮尔格林',description:'本书全面而深入地对HTML5相关的技术进行详细介绍和剖析。“从开始到现在”道出HTML5的坎坷发展史；“HTML5特性检测”介绍了多种针对不同特性的检测方法。'},
            {id:3,image_url:'images/html53.jpg',book_name:'HTML5游戏开发 ', 
            author:'（美）迈耶',description:'很多从事Web前端开发的人对HTML总有些不满，比如需要手动检查和设计很多格式代码，不仅容易出错，而且存在大量重复。好在HTML5让我们看到了曙光。'},
            {id:4,image_url:'images/html54.jpg',
            book_name:'HTML5高级程序设计', author:'（荷）柳伯斯，（美）阿伯斯，（美）萨姆',description:'本书首先介绍了HTML5的历史背景、新的语义标签及与以往HTML版本相比的根本变化，同时揭示了HTML5背后的设计原理。'},
            {id:5,image_url:'images/html55.jpg',book_name:'HTML 5&CSS完全手册（第5版）',author:'(美)鲍威尔',description:'为了介绍HTML 5，这本由Thomas A. Powell所著，刘博译的《HTML5 & CSS完全手册(第5版)》在结构和内容上进行了重大的调整。本版与上一版有大约三分之一的内容是相似的。'}
        ]; 
        var index=0;
        var myToolbar = new Ext.Toolbar({
            docked : 'top',
            items: [
            {
                ui: 'action',
                text: '装载新数据',                
                handler:function(){
                    index+=1;
                    if(index>4)
                        index=0;
                    bookPanel.updateData(bookData[index]); 
                }
            }]
        });
        bookPanel=new MyApp.panels.bookPanel({
            items:myToolbar,
            data: bookData[0]
        });
        Ext.Viewport.add(bookPanel);
    }
});



