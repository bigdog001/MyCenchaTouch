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
        Ext.Viewport.add(panel);
        Ext.get('myPanel').addCls('colorRed');
    }
});
