Ext.define('MyApp.view.tablet.BookMain', {
    extend: 'Ext.Container',  
    xtype:'bookmainview',
    requires: [
        'MyApp.view.BookGenreList','MyApp.view.tablet.Author','MyApp.view.BookList','MyApp.view.BookForm'
    ],   
    config: {
        layout:'card',
        items:[
            {
                xtype: 'bookgenrelistview',
                width:200,
                docked:'left'
            },
            {
                xtype: 'authorview'
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