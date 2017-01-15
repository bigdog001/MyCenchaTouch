Ext.require([
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
        var panel = Ext.create('Ext.Panel', {
            id:'myPanel',
            tpl: '<p>{data}</p>',
            items:[{
                xtype:'toolbar',
                docked:'top',
                layout:'vbox',
                height:150,
                items:[
                {        
                    xtype:'container',
                    layout:'hbox',
                    items:[
                    {            
                        xtype:'numberfield',
                        id:'num1',
                        width:'85%'                
                    },
                    {
                        html:'+'                  
                    }]
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                    {            
                        xtype:'numberfield',
                        id:'num2',
                        width:'85%'                   
                    },
                    {
                        html:'='                  
                    }]                    
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                    {
                        xtype:'numberfield',
                        id:'num3'                    
                    },
                    {
                        xtype:'button',
                        text:'计算',
                        handler:function(){
                            var num1=panel.down('#num1').getValue(),
                                num2=panel.down('#num2').getValue();
                            TestAction.sum(num1,num2,function(result, event) {
                                var transaction = event.getTransaction(),
                                content = Ext.String.format('<b>成功调用{0}类的{1}方法，返回数据:</b><pre>{2}</pre>',
                                transaction.getAction(), transaction.getMethod(), Ext.encode(result));
                                panel.setData({
                                    data:content
                                });
                                panel.down('#num3').setValue(Ext.encode(result));
                            });
                        }    
                    }]              
                }]
            }]
        });
        Ext.Viewport.add(panel);
        Ext.direct.Manager.addProvider(Ext.app.REMOTING_API, {
            type:'remoting',
            url: 'router.php'
        });
    }
});



