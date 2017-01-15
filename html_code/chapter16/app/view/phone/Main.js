Ext.define('MyApp.view.phone.Main', {
    extend: 'Ext.Container',  
    xtype:'mainview',
    requires: [
        'MyApp.view.User','MyApp.view.BookGenreList','MyApp.view.BookList','MyApp.view.BookForm'
    ],   
    config: {
        fullscreen:true,
        layout:'card',
        items:[
            {
                xtype: 'userview'
            },
            {
                xtype: 'bookgenrelistview'
            },
            {
                xtype: 'booklistview'
            },
            {
                xtype: 'bookformview'
            }
        ]
    }
});
