﻿Ext.require([
    'Ext.form.Panel',
    'Ext.field.Search',
    'Ext.field.Password',
    'Ext.field.Number',
    'Ext.field.Radio',
    'Ext.field.Email',
    'Ext.field.Url',
    'Ext.field.TextArea',
    'Ext.field.Hidden'
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
                    {name:'id',type:'int'},
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
        var toolbar1 = Ext.create('Ext.Toolbar',{
            docked : 'top',            
            items: [{
                xtype: 'searchfield',
                id : 'search',
                placeHolder: '请输入用户姓名',
                width:200
            },
            {
                text:'搜索',                        
                handler: function() {                                          
                    Ext.Ajax.request({
                        url: 'finduser.php',
                        params:{
                            name:toolbar1.getComponent("search").getValue()
                        },                                
                        success: function(response) {
                            var obj = Ext.decode(response.responseText);
                            var msg = obj.data[0];
                            var user = Ext.create('User',{
                                'id'      : msg.id,
                                'name'    : msg.name,
                                'sex'     : msg.sex,                                        
                                'password': msg.password,
                                'age'     : msg.age,
                                'email'   : msg.email,
                                'url'     : msg.url,
                                'memo'    : msg.memo,                                  
                            });        
                            formPanel.setRecord(user);
                        },
                        failure: function() {
                            Ext.Msg.alert('数据搜索失败！');
                        }
                    });                          
                }
            }]
        });

        var toolbar2 = Ext.create('Ext.Toolbar',{
            docked : 'bottom',            
            items: [{
                text:'提交' ,
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
            },
            {
                text:'删除',                        
                handler: function() {                            
                    formPanel.submit({
                        params:{
                            action:'delete'
                        },
                        success:function(){
                            formPanel.reset();
                        },
                        failure:function(){
                            Ext.Msg.alert("数据删除失败");
                        }
                    });
                }
            },
            {
                text:'禁用',    
                hasDisabled:false,   
                scope:this,          
                handler: function(btn) {                            
                    if(btn.hasDisabled)
                    {
                        formPanel.enable();
                        btn.hasDisabled=false;
                        btn.setText('禁用');
                    }
                    else
                    {
                        formPanel.disable();
                        btn.hasDisabled=true;
                        btn.setText('有效');
                    }  
                }
            }]   
        });

        var formPanel = Ext.create('Ext.form.Panel', {
            id:'formPanel',
            scrollable:'vertical',
            url:'postUser.php',
            items: [
            toolbar1,toolbar2,
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
                id:'id',
                xtype:'hiddenfield',
                name:'id'
            }]         
        });
        Ext.Viewport.add(formPanel);
        formPanel.getComponent('rb_sex1').setGroupValue('female');
    }
});

