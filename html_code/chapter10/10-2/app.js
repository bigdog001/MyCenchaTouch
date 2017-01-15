Ext.require('Ext.Map')
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        var map=Ext.create('Ext.Map',{
            useCurrentLocation:true
        });
        Ext.Viewport.add(map);
    }
});



