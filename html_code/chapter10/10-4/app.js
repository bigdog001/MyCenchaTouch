Ext.require('Ext.Video')
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        var video=Ext.create('Ext.Video', {
            fullScreen:true,
            url:['BigBuck.m4v', 'BigBuck.webm'],
            loop: true,
            posterUrl: 'images/cover.jpg'
        });
        Ext.Viewport.add(video);
    }
});



