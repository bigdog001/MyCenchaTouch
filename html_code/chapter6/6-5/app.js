Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {
        var myToolbar = Ext.create('Ext.Toolbar', {
            id:'mytoolbar',
            docked : 'top', 
            items: [
            {
                iconCls:'preview',
                text: '预览'
            },
            {
                iconCls:'print',
                text: '打印'
            },
            {
                iconCls:'mail',
                text: '邮件',
                iconAlign:'right',
                badgeText:'您有新邮件'
            }]
        });
        var myPanel = Ext.create('Ext.Panel', {
            id:'mypanel',
            items: [myToolbar],
            html:'测试面板'
        });
        Ext.Viewport.add(myPanel);
    }
});

