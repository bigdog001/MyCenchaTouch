Ext.require('Ext.TabPanel')
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        var myToolbar =Ext.create('Ext.Toolbar',{
            docked : 'top',
            title:'我的工具条',
            items: [
            {
                text: '按钮一'
            },
            {
                xtype: 'spacer'
            },
            {
                ui: 'confirm-round',
                text: '按钮二'
            }]
        });

        var tabpanel=Ext.create('Ext.TabPanel',{
            fullscreen: true,
            ui:'dark',
            tabBarPosition:'bottom',
            items: [myToolbar,
            {
                iconMask:true,
                iconCls: 'address_book',
                title:'地址簿'                
            },
            {
                iconMask:true,
                iconCls: 'battery_full',
                title:'满电量'
            },
            {
                iconMask:true,
                iconCls: 'bolt',
                title:'闪电'   
            }]
        });
        Ext.Viewport.add(tabpanel);
    }
});


