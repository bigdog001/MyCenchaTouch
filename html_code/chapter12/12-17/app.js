Ext.require([
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.TextArea',
    'Ext.field.Hidden',
    'Ext.direct.Manager',
    'Ext.direct.RemotingProvider',
    'Ext.Ajax',
    'Ext.ModelManager'
]) 
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {   
        Ext.direct.Manager.addProvider(Ext.app.REMOTING_API, {
            type:'remoting',
            url: 'router.php'
        });  
        Ext.define('BookInfo', {
            extend: 'Ext.data.Model',
            config: {
                fields:['id','image_url','book_name','author','description'],
                validations: [                     
                    {type: 'format',field:'image_url',matcher:/\.(jpg|gif|png|jpeg)+$/,message:'请输入有效的jpg格式、gif格式或png格式的图片地址'},
                    {type: 'presence',field:'book_name',message:'请输入书名'},      
                    {type: 'presence',field:'author',message:'请输入作者名'}                 
                ],
                proxy: {
                    type: 'direct',
                    api:{
                        read:TestAction.getBook,
                        update:TestAction.updateBook,
                    },
                    paramOrder: 'id', //通知代理将id作为远程调用的第一个参数,
                    listeners: { 
                        exception:function(proxy,response)
                        {
                            Ext.Msg.alert(Ext.decode(response).message);
                        }
                    }
                }
            }
        });         
        var form=Ext.create('Ext.form.FormPanel',{
            style:'font-size:12px',         
            items: [
            {
                xtype:'toolbar',
                docked:'top',
                items:[{
                    text:'装载数据',
                    handler:function(){
                        var BookInfo = Ext.ModelManager.getModel('BookInfo');                        
                        BookInfo.load(1, {
                            success: function(currentBook) {
                                form.setRecord(currentBook);
                            }
                        });
                    }
                },
                {
                    text:'修改',
                    handler:function(){
                        var currentBook =Ext.create('BookInfo',form.getValues());
                        var errors = currentBook.validate();    
                        if(errors.isValid())
                        {    
                           currentBook.setDirty();
                           currentBook.save({
                               success:function(){Ext.Msg.alert('成功','修改数据成功');}
                           });                                           
                        }
                        else {
                            var message = "";
                            Ext.each(errors.items,function(rec){
                                message += rec.getMessage()+"<br>";
                            });
                            Ext.Msg.alert("验证失败", message);                                    
                        }
                    }
                }]
            },
            {
                xtype:'fieldset',
                title:'书籍信息',
                defaults:{
                    labelwidth:'20%'
                },
                items: [
                {
                    xtype: 'textfield',
                    name : 'image_url',
                    label: '图片地址',
                    maxLength:50,
                    placeHolder:'请输入书籍图片的URL地址',
                    required:true,
                    clearIcon: true
                },
                {
                    xtype: 'textfield',
                    name : 'book_name',
                    label: '标题',
                    maxLength:50,
                    placeHolder:'请输入书籍标题',
                    required:true,
                    clearIcon: true
                },
                {
                    xtype: 'textfield',
                    id:'author',
                    name : 'author',
                    label: '作者',
                    maxLength:50,
                    placeHolder:'请输入作者名称',
                    required:true,
                    clearIcon: true
                },
                {
                    xtype:'textareafield',
                    name:'description',
                    maxLength:1000,
                    maxRows:10,
                    label:'书籍描述'
                },
                {
                    xtype:'hiddenfield',
                    name:'id',
                    id:'id'
                }]
            }]
        });
        Ext.Viewport.add(form);
    }
});



