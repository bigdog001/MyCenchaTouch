Ext.define('MyApp.view.BookGenreList', {
    extend:'Ext.List',
    xtype:'bookgenrelistview',
    requires: ['Ext.List','Ext.TitleBar'],
    config:{
        store:'BookGenreStore',
        itemTpl:'<div>{name}</div>',
        items:[{
            docked:'top',
            xtype:'titlebar',
            id:'titlebar',
            title:'书籍列表',
            items:[
            {
                id:'btn_title',
                ui:'action-back',
                hidden:true
            }]
        }]
    }
});