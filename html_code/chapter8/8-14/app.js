Ext.require([
    'Ext.data.Store',  
    'Ext.dataview.DataView',
    'Ext.field.Select',
    'Ext.field.Search',
    'Ext.TitleBar'
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
                fields:['firstName','lastName']
            }
        });
        var store=Ext.create('Ext.data.Store',{  
            model:'User', 
            data:[
                {firstName:'三丰',lastName:'张'},
                {firstName:'莫愁',lastName:'李'},
                {firstName:'昭君',lastName:'王'},
                {firstName:'公明',lastName:'赵'},
                {firstName:'无忌',lastName:'张'},
                {firstName:'逵',lastName:'李'},
                {firstName:'语嫣',lastName:'王'},
                {firstName:'飞燕',lastName:'赵'},
                {firstName:'天师',lastName:'张'},
                {firstName:'时珍',lastName:'李'},
                {firstName:'允',lastName:'王'},
                {firstName:'敏',lastName:'赵'}
            ]
        });        
        function sortTable(){            
            sort=Ext.ComponentManager.get("sel_sort").getValue();
            if(sort!="")
            {
                store.sort({ 
                    property :sort.split('-')[0], 
                    direction:sort.split('-')[1],
                    transform:function(value){return getSpell(value,value);}
                });
            }            
        }
        function searchTable()
        {
            store.clearFilter();
            var value=
            Ext.ComponentManager.get("search_lastname").getValue();
            if(value!="")
                store.filter('lastName',value);
            value=Ext.ComponentManager.get("search_firstname").getValue();
            if(value!="")
                store.filter('firstName',value);
        }

        var toolbar =new Ext.Toolbar({
            docked : 'top', 
            height:160,
            layout: {
                type: 'vbox'
            },     
            items: [
            {
                xtype: 'searchfield',
                id:'search_lastname',
                name:'search_lastname',
                placeHolder:'请输入检索用用户姓',
                listeners:{
                    change:function(){
                        searchTable();
                    }                    
                }
            },
            {
                xtype: 'searchfield',
                id:'search_firstname',
                name:'search_firstname',
                placeHolder:'请输入检索用用户名',
                listeners:{
                    change:function(){
                        searchTable();
                    }                    
                }
            },
            {
                xtype: 'selectfield',          
                id:'sel_sort', 
                name:'sort',  
                displayField:'text',
                valueField:'value',                
                options:[{
                    text:'选择排序方式',
                    value:''
                },{
                    text:'按姓升序排列',
                    value:'lastName-asc'
                },{
                    text:'按姓降序排列',
                    value:'lastName-desc'
                },{
                    text:'按名升序排列',
                    value:'firstName-asc'
                },{
                    text:'按名降序排列',
                    value:'firstName-desc'
                }], 
                listeners:{
                    change:function(){
                        sortTable();
                    }                    
                }
            }]
        });

        var panel=Ext.create('Ext.Panel',{
            docked:'top',
            layout:'hbox',
            items:[
                {
                    baseCls:'title',
                    html:'姓'
                },
                {
                    baseCls:'title',
                    html:'名'
                }
            ]
        });
        var dataview=Ext.create('Ext.DataView',{
            store:store,
            items:[toolbar,panel],
            baseCls:'user',
            emptyText:'没有数据',
            itemTpl:'<div>{lastName}</div><div>{firstName}</div>'
        });
        var mainPanel=Ext.create('Ext.Panel',{
            layout:'fit',
            items:[dataview]
        });
        Ext.Viewport.add(mainPanel);
    }
});

