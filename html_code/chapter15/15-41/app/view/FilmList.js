Ext.define('MyApp.view.FilmList', {
    extend: 'Ext.dataview.List', 
    requires: ['Ext.dataview.List'],
    xtype:'filmlistview',
    config: {
        items:[{
            xtype:'toolbar',
            docked:'top',
            title:'电影列表'
        },
        {
            xtype:'toolbar',
            docked:'bottom'
        }],
        store:'FilmStore',
        itemTpl:'<div>{title}</div>'
    }
});

