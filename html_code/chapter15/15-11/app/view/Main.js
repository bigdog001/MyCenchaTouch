Ext.define('MyApp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',
    config: {
        id:'myPanel',
        layout: 'fit',
        fullscreen:true,
        items:[{
            id:'mytoolbar',
            docked:'top',
            xtype:'toolbar',
            items:[{
                    xtype:'button',
                    id:'myButton',
                    text:'测试按钮'
                }]
        }]
    }
});
