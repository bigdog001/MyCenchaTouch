Ext.require([
    'Ext.form.Panel',
    'Ext.field.Password',
    'Ext.field.Number',
    'Ext.field.Spinner'
])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {      
        var formPanel = Ext.create('Ext.form.Panel', {
            id:'formPanel',
            scrollable:'vertical',
            items: [
            {
                xtype: 'textfield',
                id:'txt_name',
                name : 'name',
                label: '姓名',
                placeHolder:'请输入姓名',
                required:true,
                clearIcon: true
            },
            {
                xtype: 'passwordfield',
                id:'txt_password',
                name : 'password',
                label: '密码',
                placeHolder:'请输入密码',
                required:true,
                clearIcon: true
            },
            {
                xtype: 'spinnerfield',
                id:'spn_age',
                name : 'age',
                label: '年龄',
                minValue: 0,
                maxValue: 100,
                increment: 1
            }]
        });
        Ext.Viewport.add(formPanel);
    }
});

