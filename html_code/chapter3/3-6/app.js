Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {          
        var panel = Ext.create('Ext.Panel', {
            id:'myPanel',  
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items:[
                {
                    flex:1,
                    html:'子组件1',
                    style: 'background-color: #759E60;'
                },
                {
                    flex:2,
                    html:'子组件2',
                    style: 'background-color: #5E99CC;'
                }
            ]
        });
        Ext.Viewport.add(panel);
    }
});





