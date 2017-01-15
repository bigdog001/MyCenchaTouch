Ext.define('MyApp.view.phone.Main', {
    extend: 'MyApp.view.Main',
    xtype:'mainview', 
    requires: [
        'MyApp.view.FilmForm',
        'MyApp.view.FilmList'
    ],   
    config: {
        fullscreen:true,
        layout:'card',
        items:[
            {
                xtype: 'filmlistview'
            },
            {
                xtype: 'filmformview'
            }
        ]
    }
});
