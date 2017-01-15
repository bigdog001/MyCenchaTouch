Ext.require('Ext.Audio')
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        var audio=Ext.create('Ext.Audio', {
            url : 'crash.mp3',
            loop: true,
            enableControls:true,
        });
        Ext.Viewport.add(audio);
    }
});


