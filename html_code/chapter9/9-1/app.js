Ext.require(['Ext.dataview.List','Ext.data.Store'])
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
                {firstName:'三',lastName:'张'},
                {firstName:'四',lastName:'李'},
                {firstName:'五',lastName:'王'},
                {firstName:'六',lastName:'赵'}
            ]    
        });        
        var myList=Ext.create('Ext.List',{
            store:store,
            itemTpl:'<div>{lastName}{firstName}</div>'
        });
        Ext.Viewport.add(myList);
    }
});

