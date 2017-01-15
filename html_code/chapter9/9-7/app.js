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
                fields:['firstName','lastName',{name:'age',type:'int'}]
            }
        });
        var store=Ext.create('Ext.data.Store',{  
            model:'User',
            grouper: function(record){
                if(record.get('age')<30)
                    return '青少年';
                else if(record.get('age')<55)
                    return '中年';
                else
                    return '老年';
            },   
            data:[
                {firstName:'三丰',lastName:'张',age:11},
                {firstName:'莫愁',lastName:'李',age:49},
                {firstName:'昭君',lastName:'王',age:89},
                {firstName:'公明',lastName:'赵',age:49},
                {firstName:'无忌',lastName:'张',age:84},
                {firstName:'逵',lastName:'李',age:89},
                {firstName:'语嫣',lastName:'王',age:84},
                {firstName:'飞燕',lastName:'赵',age:36},
                {firstName:'天师',lastName:'张',age:85},
                {firstName:'时珍',lastName:'李',age:4},
                {firstName:'允',lastName:'王',age:88},
                {firstName:'敏',lastName:'赵',age:11}
            ]
        });        
        var myList=Ext.create('Ext.List',{
            store:store,
            itemTpl:'<div class="listItem">{lastName}{firstName}</div>',
            grouped:true
        });
        Ext.Viewport.add(myList);
    }
});

