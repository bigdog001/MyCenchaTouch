Ext.require([
    'Ext.form.Panel',
    'Ext.field.Password',
    'Ext.field.Number',
    'Ext.field.Radio',
    'Ext.field.Email',
    'Ext.field.Url',
    'Ext.field.TextArea'
])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {   
        Ext.define('User', {
            extend: 'Ext.data.Model',
            config:{
                fields: [
                    'name','sex','password',
                    {name:'age',type:'int'},
                    'email','url','memo'
                ],
                validations: [
                    {type: 'presence',field:'name',message:'姓名必须输入'},
                    {type: 'exclusion',field:'name',
                    list:['admin','administrator','管理员'],
                    message:'不能使用这个姓名'},
                    {type:'inclusion',field:'sex',
                    list:['male','female'],
                    message: '必须选择性别'},
                    {type:'presence',field:'password',message : '密码必须输入'},
                    {type:'length',field:'password',min:7,message: '密码长度必须超过6位'},
                    {type:'length',field:'age',max:2,message: '必须输入有效的年龄'}, 
                    {type:'format',field: 'age',matcher: /^\+?[1-9][0-9]$/,message:'必须输入有效的年龄'},
                    {type:'email',field:'email',message:'必须输入有效的Email地址'},
                    {type:'format',field: 'url',
                    matcher: /^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
                    message:'必须输入有效的网址'}
                ]
            }
        });
   
        var formPanel = Ext.create('Ext.form.Panel', {
            id:'formPanel',
            scrollable:'vertical',
            url:'postUser.php',
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
            },
            {
                xtype:'panel',
                layout:{
                    type:'hbox',
                    pack:'end'
                },
                defaults:{
                    xtype:'button'
                },
                items:[
                {
                    xtype:'button',
                    ui:'action',
                    text:'提交',
                    handler:function(){
                        var model = Ext.create('User',formPanel.getValues());
                        var errors = model.validate();
                        if(errors.isValid())
                            formPanel.submit({
                                success:function(){
                                    Ext.Msg.alert('成功','表单提交成功！');
                                },
                                failure:function(form,result){
                                    var message="";
                                    Ext.each(result.errors,function(rec,i){
                                        message += rec.message+"<br>";
                                    });
                                    Ext.Msg.alert("提交失败！", message);
                                }
                            });
                        else {
                            var message = "";
                            Ext.each(errors.items,function(rec){                            
                                message += rec.getMessage()+"<br>";
                            });
                            Ext.Msg.alert("验证失败", message);
                        }
                    }
                }]                        
            }]         
        });
        Ext.Viewport.add(formPanel);
        formPanel.getComponent('rb_sex1').setGroupValue('female');
    }
});

