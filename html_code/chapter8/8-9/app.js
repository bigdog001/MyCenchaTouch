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
                {name:'HTML 5揭秘',url:'images/html52.jpg'},
                {name:'HTML 5游戏开发',url:'images/html53.jpg'},
                {name:'HTML 5高级程序设计',url:'images/html54.jpg'},
                {name:'HTML 5与CSS完全手册（第5版）',url:'images/html55.jpg'}
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
        var editButton = Ext.create('Ext.Button',{
            text: '修改书名',
            disabled: true,
            handler: function() {
                var record = dataview.getSelection()[0];
                var bookName=record.get('name');
                Ext.Msg.prompt('编辑书名','请输入书名',
                function(button,value){
                    if(button=='ok'&&value!=''){
                        var record =dataview.getSelection()[0];
                        record.set('name',value);
                    }
                },
                this,
                false,
                bookName,{width:280});                
            }
        });
        var toolbar=new Ext.Toolbar({
            docked:'top',
            items:[{
                      xtype:'spacer'
                  },
                  editButton
            ]
        });

        var dataview = Ext.create('Ext.DataView', {
            fullscreen:true,
            scrollable:'vertical',
            store: store,
            items:toolbar,
            itemTpl:tpl,
            listeners:{
                selectionchange:function(list,records){
                    editButton.setDisabled(false);
                }
            }
        });
        Ext.Viewport.add(dataview);
    }
});
