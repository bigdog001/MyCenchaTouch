Ext.define('MyApp.model.User', {
    extend: 'Ext.data.Model',
    config:{ 
        fields:['name','password'],
        validations: [
            {type: 'presence',field:'name',message:'请输入用户名'},               
            {type: 'presence',field:'password',message:'请输入密码'}                
        ]
    }
});