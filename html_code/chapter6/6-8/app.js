Ext.require('Ext.TitleBar');
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {              
        var myTitlebar = Ext.create('Ext.TitleBar', {
            id:'mytitlebar',
            title:'我的标题条',
            items: [            
            {
                text: '按钮一'
            },
            {
                text: '按钮二',
                align:'right'
            }]
        });
        var myPanel = Ext.create('Ext.Panel', {
            id:'mypanel',
            items: [myTitlebar],
            html:'测试面板'
        });
        Ext.Viewport.add(myPanel);
    }
});

