Ext.require(['Ext.form.Panel','Ext.field.Hidden'])
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
                xtype:'hiddenfield',
                name : 'hidden',
                value:'test'
            }]           
        });
        Ext.Viewport.add(formPanel);
    }
});
