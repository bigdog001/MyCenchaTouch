Ext.require(['Ext.data.Store','Ext.dataview.DataView'])
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
            fullscreen:true,
            store:store,
            baseCls:'user',
            items:[panel],
            itemTpl:'<div>{lastName}</div><div>{firstName}</div>'
        });
        Ext.Viewport.add(dataview);
    }
});

