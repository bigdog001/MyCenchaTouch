Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {    
        var company={
        name:'常州第一百货公司',
        email:'test@qq.com',
        address:'清阳北路238号',
        city:'常州市',
        province:'江苏省',
        zip:'213001',
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
            '<p>公司:<br/>',
            '<tpl for=".">', 
                '名称：{name}<br/>',
                '地址：{province}{city}{address}<br/>',
                'Email：{email}<br/>',
                '邮政编码：{zip}<br/>',
                '<p>员工: ',
                '<tpl for="employer">', 
                    '<p>{#}. 姓名：{name},年龄：{age}',
                '</tpl>',
            '</tpl>'
        );
        var tplHtml = tpl.apply(company);
        var myPanel = Ext.create('Ext.Panel', {
            html:tplHtml
        });
        Ext.Viewport.add(myPanel);
    }
});

