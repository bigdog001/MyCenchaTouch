Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {
        var panel = Ext.create('Ext.Panel', {
            fullscreen: true,
            id:'myPanel',
            style:'color:red',
            html: '一个简单的示例面板'
        });
    }
});
