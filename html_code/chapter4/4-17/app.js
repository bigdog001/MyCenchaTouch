Ext.require(['Ext.form.Panel','Ext.field.Toggle'])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {          
        var formPanel = Ext.create('Ext.form.Panel', {
            id:'formPanel',
            items:[{
                xtype:'togglefield',
                name : 'enable',
                label: '是否有效',
                value:1
            }]           
        });
        Ext.Viewport.add(formPanel);
    }
});
