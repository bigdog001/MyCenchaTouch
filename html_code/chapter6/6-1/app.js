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
                ui: 'action',
                text: '按钮一'
            },
            {
                ui: 'confirm-round',
                text: '按钮二'
            },
            {
                ui: 'decline',
                text: '按钮三'
            },
            {
                ui: 'decline-small',
                text: '按钮四'
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

