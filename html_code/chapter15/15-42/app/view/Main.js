Ext.define('MyApp.view.Main', {
    extend: 'Ext.Container',
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
                xtype: 'filmlistview',
                width:120,
                style:'font-size:12px',
                docked:'left'
            },
            {
                xtype: 'filmformview',
                style:'font-size:12px'
            }
        ]
    }
});
