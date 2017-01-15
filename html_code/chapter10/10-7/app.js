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
            loop: true
        });
        var audioPlayOrPause=function()
        {
            if(button.getText()=="暂停") 
            {
                button.setText("播放");
                audio.pause();
            }
            else
            {
                button.setText("暂停");
                audio.play();
            } 
        }
        var button=Ext.create('Ext.Button',{
            text:'暂停',
            handler:audioPlayOrPause
        });        
        var toolbar=Ext.create('Ext.Toolbar',{
            docked:'top',
            items:button
        });
        var panel = new Ext.Panel({           
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            items: [toolbar,audio]
        });
        Ext.Viewport.add(panel);
        audio.play();
    }
});


