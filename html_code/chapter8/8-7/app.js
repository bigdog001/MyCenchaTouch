Ext.require(['Ext.data.Store','Ext.dataview.DataView'])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        var store=Ext.create('Ext.data.Store',{     
            fields: [
                'name', 'url'
            ],
            data:[
                {name:'HTML 5与CSS 3权威指南',url:'images/html51.jpg'},
                {name:'HTML 5揭秘',url:'images/html52.jpg'}
            ]   
        });
        var toolbar=Ext.create('Ext.Toolbar',{
            docked:'top',  
            items:[
                {
                    text:'修改数据',
                    handler:function(){
                        var data=[
                            {name:'HTML 5游戏开发',url:'images/html53.jpg'},
                            {name:'HTML 5高级程序设计',url:'images/html54.jpg'},
                            {name:'HTML 5与CSS完全手册（第5版）',url:'images/html55.jpg'}
                        ];
                        store.setData(data);
                    }
                }
            ]
        });
        
        var tpl = new Ext.XTemplate(
            '<tpl for=".">',                
                '<div style="font-size:12px;">',
                '<img src="{url}" title="{name}"><br/>',
                '{name}',
                '</div>',
            '</tpl>'
        );
        var count=0;
        var dataview = Ext.create('Ext.DataView', {
            fullscreen:true,
            scrollable:'vertical',
            store: store,
            items:toolbar,
            itemTpl:tpl,
            listeners:{
                refresh:function(list){
                    if(count>0)
                        Ext.Msg.alert('数据被更新');
                    count+=1;
                }
            }
        });
        Ext.Viewport.add(dataview);
    }
});
