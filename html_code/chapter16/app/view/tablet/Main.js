Ext.define('MyApp.view.tablet.Main', {
    extend: 'Ext.Container',  
    xtype:'mainview',
    requires: [
        'MyApp.view.User','MyApp.view.tablet.BookMain'
    ],   
    config: {
        fullscreen:true,
        layout:'card',
        items:[
            {
                xtype: 'userview'
            },
            {
                xtype: 'bookmainview'
            }
        ]
    }
});
