Ext.define('MyApp.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'mainview',
    config: {
        id:'mainview',
        fullscreen:true,
        html:'我是主视图',
        items:[{
            id:'toolbar_main',
            docked:'top',
            xtype:'toolbar',
            items:[{
                    xtype:'button',
                    id:'AboutButton',
                    text:'切换到About视图'
                }]
        }]
    }
});

