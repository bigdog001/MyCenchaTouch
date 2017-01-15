Ext.require([
    'Ext.form.Panel',
    'Ext.field.Password',
    'Ext.field.Number',
    'Ext.field.Spinner',
    'Ext.field.Email',
    'Ext.field.Url',
    'Ext.field.TextArea',
    'Ext.field.Radio'
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
                xtype:'radiofield',
                id:'rb_sex1',
                name : 'sex',
                label: '男性',
                value:'male',
                checked:true,
                listeners:{
                    check:function(item,e){console.log('您选取了男性');}
                }
            },
            {
                xtype:'radiofield',
                id:'rb_sex2',
                name : 'sex',
                label: '女性',
                value:'female',
                checked:false,
                listeners:{
                    check:function(item,e){console.log('您选取了女性');}
                }
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
                xtype: 'numberfield',
                id:'txt_age',
                name : 'age',
                label: '年龄',
                placeHolder:'请输入年龄',
                required:true,
                clearIcon: true
            },
            {
                xtype: 'emailfield',
                id:'txt_email',
                name : 'email',
                label: 'Email',
                placeHolder:'请输入有效的Email地址',
               clearIcon: true
            },
            {
                xtype: 'urlfield',
                id:'txt_url',
                name : 'url',
                label: '个人网址',
                placeHolder:'请输入有效的网址',
                clearIcon: true
            },
            {
                xtype: 'textareafield',
                id:'txtarea_memo',
                name : 'memo',
                label: '个人简介',
                placeHolder:'请输入1000文字以内的个人简介',               
                clearIcon: true,
                maxLength:1000,
                maxRows:4
            }]
        });
        Ext.Viewport.add(formPanel);
        formPanel.getComponent('rb_sex1').setGroupValue('female');
    }
});

