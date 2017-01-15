Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {   
        function appendDom()
        {
            Ext.DomHelper.append('my-div',{
                id:'url-list',
                tag:'ul',
                cn:[
                {
                    tag:'li',
                    cn:[{
                        tag:'a',
                        html:'google',
                        href:'http://www.google.com'
                    }]
                },
                {
                    tag:'li',
                    cn:[{
                        tag:'a',
                        html:'yahoo',
                        href:'http://www.yahoo.com',
                        target:'_blank'
                    }]
                }]
            });
        }
        var myToolbar = Ext.create('Ext.Toolbar', {
            docked : 'top',
            items:[{
                xtype:'button',
                text:'追加元素',
                handler:function(){
                    appendDom();
                }
            }]
        });
        var myPanel = Ext.create('Ext.Panel', {
            id:'myPanel',
            title:'通过DomHelper组件追加元素',
            html:'<div id="my-div"></div>',//将这个div作为目标div
            items: [myToolbar]
        });
        Ext.Viewport.add(myPanel);
    }
});

