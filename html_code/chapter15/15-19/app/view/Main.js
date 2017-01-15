Ext.define('MyApp.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'mainview',
    config: {
        id:'mainview',
        layout:'fit',
        fullscreen:true,
        items:[{
            id:'toolbar',
            docked:'top',
            xtype:'toolbar',
            items:[
            {
                xtype: 'searchfield',
                id:'search_bookname',
                name:'search_bookname',
                placeHolder:'请输入书名' 
            }]
        }]
    }
});
