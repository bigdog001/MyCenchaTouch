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
                {name:'HTML5揭秘',url:'images/html52.jpg'},
                {name:'HTML5游戏开发',url:'images/html53.jpg'},
                {name:'HTML5高级程序设计',url:'images/html54.jpg'},
                {name:'HTML 5&CSS完全手册（第5版）',url:'images/html55.jpg'}
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
 
        var dataview = Ext.create('Ext.DataView', {
            fullscreen:true,
            scrollable:'vertical',
            store: store,
            itemTpl:tpl,
            baseCls:'book'
        });
        Ext.Viewport.add(dataview);
    }
});

