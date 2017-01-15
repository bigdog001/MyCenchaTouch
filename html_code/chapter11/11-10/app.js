Ext.require([
    'Ext.DataView',
    'Ext.field.Select',
    'Ext.TitleBar'
])
Ext.define('Class',{
    extend:'Ext.data.Model',
    config:{
        fields:['id','name'],
        hasMany:{
            model:'Student',
            name:'students',
            filterProperty: 'id'
        }
    }
});
Ext.define('Student',{
    extend:'Ext.data.Model',
    config:{
        fields:['id','number','name','age','phone'],
        proxy: {
            type: 'ajax',
            url : 'students.php',
            reader:{
                type:'json',
            },
            listeners: { 
                exception:function(proxy,response)
                {
                    Ext.Msg.alert(Ext.decode(response.responseText).message);
                }
            }
        }
    }
});
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        var classStore=Ext.create('Ext.data.Store', {
            model:'Class',
            autoLoad:true,
            proxy:{
                type: 'ajax',
                url : 'getClass.php',                
                reader: {
                    type: 'json'
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
        var toolBar=Ext.create('Ext.Toolbar',{
            docked:'top',
            title:'常州兰陵小学一年级学生信息',
            items:[{
                xtype:'selectfield',
                id:'sel_class',
                name:'class',
                placeHolder:'选择班级',
                valueField:'id',
                displayField:'name',
                store:classStore,
                listeners:{
                    change:function(select,newValue,oldValue){             
                        var studentStore=new Class({id:newValue.getData().id}).students();
                        studentStore.load();
                        dataview.setStore(studentStore);
                        dataview.refresh();
                    } 
                } 
            }]
        });
        var headerPanel=Ext.create('Ext.Panel',{
            docked:'top',
            layout:'hbox',
            items:[toolBar,{
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
            itemTpl:template
        });
        var panel=Ext.create('Ext.Panel',{
            layout:'fit',
            items:[headerPanel,dataview]
        });
        Ext.Viewport.add(panel);
    }
});