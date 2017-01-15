Ext.require(['Ext.form.Panel','Ext.field.Slider'])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {          
        var formPanel = Ext.create('Ext.form.Panel', {
            id:'formPanel',
            items: [{
                xtype:'sliderfield',
                id:'volume',
                name : 'volume',
                label: '音量',
                minValue: 0,
                maxValue: 100,
                increment:10,
                value: 20
            }]
        });
        Ext.Viewport.add(formPanel);
        //formPanel.getComponent('volume').setValue(30);
        //console.log(formPanel.getComponent('volume').getValue());
    }
});
