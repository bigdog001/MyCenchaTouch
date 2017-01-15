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
                xtype: 'spacer',
                width:10
            },
            {
                xtype:'button',
                text: '按钮一'
            },
            {
                xtype:'button',
                text   : '按钮二'
            },
            {
                xtype: 'spacer',
                width:100
            },
            {
                xtype:'button',
                text: '按钮三'
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

