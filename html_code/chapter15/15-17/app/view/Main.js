Ext.define('MyApp.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'mainview',
    config: {
        id:'mainview',
        fullscreen:true,
        items:[{
            id:'toolbar',
            docked:'top',
            xtype:'toolbar',
            items:[
            {
                xtype: 'selectfield',
                id:'genre',
                options:[
                {
                    text:'选择',
                    value:''
                },
                {
                    text:'喜剧',
                    value:1
                },
                {
                    text:'文艺',
                    value:2
                },
                {
                    text:'动作',
                    value:3
                }]
            }]
        }]
    }
});