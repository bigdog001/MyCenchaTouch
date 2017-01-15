Ext.require([
    'Ext.direct.Manager',
    'Ext.direct.PollingProvider'
])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {          
        var panel = Ext.create('Ext.Panel', {
            id:'myPanel',
            tpl: '<p>{data}</p>',
            tplWriteMode: 'append',
        });
        Ext.Viewport.add(panel);
        Ext.direct.Manager.addProvider({
            type:'polling',
            url: 'poll.php',
            listeners: {
                data: function(provider, event) {
                    panel.setData({
                        data: event.getData()
                    });
                }
            }
        });
    }
});



