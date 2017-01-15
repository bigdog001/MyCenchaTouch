Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {    
        var data =['张三','李四','王五'];
        var tpl = new Ext.XTemplate(
            '<p>用户: ',
            '<tpl for=".">', 
                '<p>{#}. 姓名：{.}',
            '</tpl></p>'
        );
        var tplHtml = tpl.apply(data);
        var myPanel = Ext.create('Ext.Panel', {
            html:tplHtml
        });
        Ext.Viewport.add(myPanel);
    }
});

