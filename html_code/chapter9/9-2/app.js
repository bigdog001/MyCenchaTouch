Ext.require(['Ext.dataview.List','Ext.data.Store'])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
       var store=new Ext.data.Store({
            data:[
                {name:'张三'},
                {name:'李四'},
                {name:'王五'},
                {name:'赵六'}
            ],
            fields:['name']
        });
        
        var myList=Ext.create('Ext.List',{
            store:store,
            itemTpl:'<div>{name}</div>',
            onItemDisclosure:function(record,element,index,e){
                Ext.Msg.alert("您点击了"+store.getAt(index).get('name'));
            }
        });
        Ext.Viewport.add(myList);
    }
});



