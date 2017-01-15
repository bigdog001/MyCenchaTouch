Ext.require('Ext.Video')
Ext.application({
    name: 'myApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        var video=Ext.create('Ext.Video', {
            fullScreen:true,
            url:['BigBuck.m4v', 'BigBuck.webm'],
            loop: false,
            posterUrl:'images/cover.jpg',
            listeners:{
                play:function(){
                    button.setDisabled(false); 
                    button.setText("暂停");                   
                },
                ended:function(){
                    button.setText("播放");
                }
            }
        });
        var videoPlayOrPause=function()
        {
            if(button.getText()=="暂停") 
            {
                video.pause();
                button.setText("播放");
            }
            else
            {
                video.play();
                button.setText("暂停");
            }            
        }
        var button=Ext.create('Ext.Button',{
            id:'playButton',
            text:'播放',
            disabled:true,
            handler:videoPlayOrPause
        });
        
        var toolbar=new Ext.Toolbar({
            docked:'top',
            items:button
        });
        var panel =Ext.create('Ext.Panel',{
            layout:'vbox',
            items: [toolbar,video]
        });     
        Ext.Viewport.add(panel);
    }
});



