Ext.require([
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.Number',
    'Ext.direct.Manager',
    'Ext.direct.RemotingProvider',
    'Ext.Ajax'
])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {          
        var form = Ext.create('Ext.form.Panel', {
            items: [{
                xtype: 'fieldset',
                items: [{
                    xtype: 'textfield',
                    label: '姓名',
                    name: 'name',
                    value:'陆凌牛'
                }, {
                    xtype: 'numberfield',
                    label: '年龄',
                    name: 'age',
                    value: 38
                }]
            }, {
                docked: 'top',
                xtype: 'toolbar',
                items: [{
                    text: '提交',
                    handler: function(){
                        var values = form.getValues();
                        TestAction.join(values, function(value) {
                            Ext.Msg.alert('服务器端的响应: ', value);
                        });
                    }
                }]
            }]
        });

        Ext.Viewport.add(form);
        Ext.direct.Manager.addProvider(Ext.app.REMOTING_API, {
            type:'remoting',
            url: 'router.php'
        });
    }
});



