Ext.application({
    name: 'myApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {   
        var panel = Ext.create('Ext.Panel', {
            id:'myPanel',
            html: '一个简单的示例面板'
        });
        var subPanel = Ext.create('Ext.Panel', {
            id:'subPanel',
            html: '面板中的子面板'
        });       
        Ext.Viewport.add(panel);
        panel.add(subPanel);
        var newPanel=Ext.fly('myPanel');        
        newPanel.addCls('colorRed');       
        //应用程序中这段代码之后不再引用id为myPanel的元素 
        var newPanel=Ext.fly('subPanel');
        newPanel.addCls('colorBlue'); 
        //应用程序中这段代码之后不再引用id为subPanel的元素 
    }
});


