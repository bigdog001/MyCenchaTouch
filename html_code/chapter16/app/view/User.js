Ext.define('MyApp.view.User', {
    extend:'Ext.form.Panel',
    xtype:'userview',
    requires: ['Ext.form.Panel','Ext.form.FieldSet','Ext.field.Password'],
    config:{    
        id:'userview',              
        items: [
        {
            xtype:'fieldset',
            title:'用户登录',
            defaults:{                
                labelwidth:'20%',
                required:true,
                clearIcon: true
            },
            items: [
            {
                xtype:'textfield',
                id:'txt_name',
                name : 'name',
                label: '用户名',
                placeHolder:'请输入用户名'                
            },
            {
                xtype:'passwordfield',
                id:'txt_password',
                name:'password',                
                label: '密码',
                placeHolder:'请输入密码'
            },
            {
                xtype:'panel',
                defaults:{
                    xtype:'button',
                    ui:'action',
                    flex:1
                },
                layout:{
                    type:'hbox'
                },
                items:[
                {
                    id:'btn_register',
                    ui:'action',
                    text:'注册'
                },
                {
                    id:'btn_login',
                    ui:'action',
                    text:'登录'
                }]
            }]
        }]
    }
});