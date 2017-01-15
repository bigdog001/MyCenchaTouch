Ext.require(['Ext.List','Ext.TitleBar'])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {          
        Ext.define('student', {
            extend: 'Ext.data.Model',
            config:{
                fields:['id','name'],
                proxy: {
                    type: 'ajax',
                    url: 'students.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'items'
                    }
                },
                associations: [{
                    type: 'belongsTo',
                    model: 'student',
                    associationKey: 'items'
                }]
            }
        });
        var store=Ext.create('Ext.data.Store',{ 
            autoLoad:true,
            model:'student'
        });
        var recordArray=new Array(),parentNameArray=new Array();
        var myList=Ext.create('Ext.List',{
            store:store,
            itemTpl:'<div>{name}</div>',
            items:[{
                docked:'top',
                xtype:'titlebar',
                id:'titlebar',
                title:'常州兰陵小学学生名单',
                items:[{
                    id:'titleButton',
                    ui:'confirm-back',
                    hidden:true,
                    listeners:{
                        tap:function(){
                            var record=recordArray[recordArray.length-1];
                            var parentName=parentNameArray[parentNameArray.length-1];
                            if(parentName==undefined)
                                Ext.ComponentManager.get('titleButton').setHidden(true);
                            myList.setStore(record.stores[0]); 
                            Ext.ComponentManager.get('titleButton').setText(parentName);                                 recordArray.pop();
                            parentNameArray.pop();
                        }
                    }
                }]
            }],
            listeners:{
                select:function(list,record){                     
                    var student=record.getStudent();           
                    if(student==undefined)
                        return;  
                    var parentName=Ext.ComponentManager.get('titleButton').getText();
                    Ext.ComponentManager.get('titleButton').setHidden(false);
                    Ext.ComponentManager.get('titleButton').setText(record.get('name'));
                    Ext.ComponentManager.get('titleButton').setId(record.get('id')); 
                    list.setStore(Ext.create('Ext.data.Store',{ 
                        model:'student',
                        data:student.raw
                    }));
                    list.refresh();                    
                    recordArray.push(record);
                    parentNameArray.push(parentName);
                }
            }
        });
        Ext.Viewport.add(myList);        
    }
});
