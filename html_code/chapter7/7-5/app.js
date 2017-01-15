Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {    
        var company={
        name:'常州第一百货公司',
        employer:[{
            name: '张三',
            age:37
        },{
            name: '李四',
            age:27
        },{
            name: '王五',
            age:44
        }]};
        var tpl = new Ext.XTemplate(
            '<p>用户:<br/>',
            '<tpl for="employer">', 
                '<p>{#}. 姓名：{name},年龄：{age}<br/>工作单位：{parent.name}',
            '</tpl>'
        );
        var tplHtml = tpl.apply(company);
        var myPanel = Ext.create('Ext.Panel', {
            html:tplHtml
        });
        Ext.Viewport.add(myPanel);
    }
});

