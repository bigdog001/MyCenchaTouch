Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch:function(){
        var panel=Ext.create('Ext.Panel',{
            fullscreen:true,
            style:'color:red',
            html:'示例面板'
        });
        Ext.Viewport.add(panel);
    }
});


