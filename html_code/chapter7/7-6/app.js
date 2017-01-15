Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {    
        var data =[{
            name: '张三',
            age:37
        },{
            name: '李四',
            age:27
        },{
            name: '王五',
            age:44
        }];
        var tpl = new Ext.XTemplate(
            '<p>用户: ',
            '<tpl for=".">', 
                '<tpl if="age&gt;=30&&age&lt;40">',
                    '<p>{#}. 姓名：{name},年龄：{age}</p>',
               '</tpl>',
            '</tpl></p>'
        );
        var tplHtml = tpl.apply(data);
        var myPanel = Ext.create('Ext.Panel', {
            html:tplHtml
        });
        Ext.Viewport.add(myPanel);
    }
});

