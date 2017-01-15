Ext.require(['Ext.DataView','Ext.TitleBar'])
Ext.define('Classinfo',{
    extend:'Ext.data.Model',
    config:{
        fields:['id','name'],
        proxy: {
            type: 'ajax',
            url : 'classes.php',
            reader:{
                type:'json',
            }
        }
    }
});
Ext.define('Student',{
    extend:'Ext.data.Model',
    config:{
        fields:['id','class_id','number','name','age','phone'],
        belongsTo: 'Class'
    }
});
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {        
        var studentStore=Ext.create('Ext.data.Store', {
            model:'Student',
            autoLoad:true,
            proxy:{
                type: 'ajax',
                url : 'students.php',                
                reader: {
                    type: 'json'
                },
                listeners: { 
                    exception:function(proxy,response)
                    {
                        Ext.Msg.alert(Ext.decode(response.responseText).message);
                    }
                }
            }
        }); 
        var template = new Ext.XTemplate(                                
            '<div class="students">',
                '<div id="name">{name}</div>',
                '<div>{number}</div>',                          
                '<div>{age}</div>',
                '<div>{phone}</div>',
            '</div>'           
        );        
        var headerPanel=Ext.create('Ext.Panel',{
            docked:'top',
            layout:'hbox',
            items:[{
                xtype:'titlebar',
                docked:'top',
                title:'常州兰陵小学一年级学生信息'
            },
            {
                xtype:'container',
                baseCls:'title',
                html:'姓名'
            },
            {
                xtype:'container',
                baseCls:'title',
                html:'学号'
            },
            {
                xtype:'container',
                baseCls:'title',
                html:'年龄'
            },
            {
                xtype:'container',
                baseCls:'title',
                html:'电话号码'
            }]
        });

        var dataview=Ext.create('Ext.DataView',{
            itemTpl:template,
            store:studentStore
        });
        var panel=Ext.create('Ext.Panel',{
            layout:'fit',
            items:[headerPanel,dataview]
        });
        Ext.Viewport.add(panel);
    }
});