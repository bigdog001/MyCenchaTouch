Ext.require('Ext.TabPanel');
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {          
        var tabPanel = Ext.create('Ext.TabPanel', {
            id:'tabPanel',
            ui:'dark',
            tabBarPosition: 'bottom',            
            items:[{
                title:'主页',
                html:'主页',
                iconCls:'home'
            },
            {
                title:'合同',
                html:'合同',
                iconCls:'user'
            }],
            listeners:{
                activeitemchange:function(item,oldValue,newValue)
                {
                    //执行一些代码
                    return true;//返回true或false
                },
                painted:function(item)
                {
                    item.addCls('bgcolorPink');
                }
            }

        });
        Ext.Viewport.add(tabPanel);
        tabPanel.setActiveItem(1);
    }
});





