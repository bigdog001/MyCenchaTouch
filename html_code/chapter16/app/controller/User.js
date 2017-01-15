Ext.define('MyApp.controller.User', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {  
            mainview:'mainview',
            userview:'userview',                        
            txt_name:'#txt_name',
            txt_password:'#txt_password',
            btn_register:'#btn_register',
            btn_login:'#btn_login'
        },
        control:{
            btn_register:{
                 tap:'btn_register_ontap'
            },
            btn_login:{
                tap:'btn_login_ontap'
            }
        },
        routes: {
            'login': 'login'
        }
    },
    btn_register_ontap: function() {
        var nameValue=this.getTxt_name().getValue(),
            passwordValue=this.getTxt_password().getValue();
        var user=Ext.create('MyApp.model.User',{name:nameValue,password:passwordValue});
        var errors=user.validate();
        if(errors.isValid())
        {
            Ext.Ajax.request({
                url: 'users.php',
                params:{
                    name:nameValue,
                    password:passwordValue
                },                                
                success: function(response,success) {
                    responseText=Ext.decode(response.responseText);
                    if(responseText.success==true)
                        Ext.Msg.alert('注册成功','用户注册成功！');
                    else
                        Ext.Msg.alert('注册失败',responseText.message);
                },
                failure: function() {
                    Ext.Msg.alert('请求失败','AJAX请求发送失败！');
                }
            });
        }
        else {
            var message = "";
            Ext.each(errors.items,function(rec){
                message += rec.getMessage()+"<br>";
            });
            Ext.Msg.alert("验证失败", message);                                    
        }
    },
    btn_login_ontap:function(){
        var nameValue=this.getTxt_name().getValue(),
            passwordValue=this.getTxt_password().getValue();
        var user=Ext.create('MyApp.model.User',{name:nameValue,password:passwordValue});
        var errors=user.validate();
        if(errors.isValid())
        {
            Ext.Ajax.request({
                url: 'finduser.php',
                params:{
                    name:nameValue,
                    password:passwordValue
                },     
                scope:this,                           
                success: function(response) {
                    responseText=Ext.decode(response.responseText);
                    if(responseText.success==true)
                    {
                        this.getApplication().getHistory().add(
                            Ext.create('Ext.app.Action', {
                                url:'login'
                        }));                        
                        this.redirectTo('loadmain');
                    }
                    else
                        Ext.Msg.alert('登录失败',responseText.message);
                },
                failure: function() {
                    Ext.Msg.alert('请求失败','AJAX请求发送失败！');
                }
            });
        }
        else {
            var message = "";
            Ext.each(errors.items,function(rec){
                message += rec.getMessage()+"<br>";
            });
            Ext.Msg.alert("验证失败", message);                                    
        }
    },
    login:function(){
        var mainview=this.getMainview(),
        userview=this.getUserview();
        mainview.setActiveItem(userview);
    }
});