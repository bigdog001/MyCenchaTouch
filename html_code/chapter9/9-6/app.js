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
                fields:['firstName','lastName','EnglishLastName']
            }
        });
        var store=Ext.create('Ext.data.Store',{  
            model:'User',
            grouper: function(record){return record.get('EnglishLastName')[0];},   
            data:[
                {firstName:'三丰',lastName:'张',EnglishLastName:'Zhang'},
                {firstName:'莫愁',lastName:'李',EnglishLastName:'Li'},
                {firstName:'昭君',lastName:'王',EnglishLastName:'Wang'},
                {firstName:'公明',lastName:'赵',EnglishLastName:'Zhao'},
                {firstName:'无忌',lastName:'张',EnglishLastName:'Zhang'},
                {firstName:'逵',lastName:'李',EnglishLastName:'Li'},
                {firstName:'语嫣',lastName:'王',EnglishLastName:'Wang'},
                {firstName:'飞燕',lastName:'赵',EnglishLastName:'Zhao'},
                {firstName:'天师',lastName:'张',EnglishLastName:'Zhang'},
                {firstName:'时珍',lastName:'李',EnglishLastName:'Li'},
                {firstName:'允',lastName:'王',EnglishLastName:'Wang'},
                {firstName:'敏',lastName:'赵',EnglishLastName:'Zhao'}
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

