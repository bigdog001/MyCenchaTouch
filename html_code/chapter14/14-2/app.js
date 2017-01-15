Ext.require('Ext.form.Panel');
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch:function(){
        var formpanel=Ext.create('Ext.form.Panel',{
            fullscreen: true,         
            items: [
            {
                xtype: 'textfield',
                name : 'title',
                label: '标题',
                required:true
            }]
        });

        Ext.Viewport.add(formpanel);
    }
});


