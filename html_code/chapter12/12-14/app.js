Ext.require([
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.TextArea',
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
                fields:['image_url','book_name','author','description'],
                proxy: {
                    type: 'direct',
                    directFn: TestAction.getBook,
                    paramOrder: 'id' //通知代理将id作为远程调用的第一个参数
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
                }]
            }]
        });
        Ext.Viewport.add(form);
    }
});



