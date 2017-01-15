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
            age:37,
            hobby:['看电影','听音乐','阅读']
        },{
            name: '李四',
            age:27,
            hobby:['钓鱼','购物','打电动游戏']
        },{
            name: '王五',
            age:44,
            hobby:['旅游']
        }]};
        var tpl = new Ext.XTemplate(
            '<p>公司:<br/>',
            '<tpl for=".">', 
                '名称：{name}<br/>',                
                '<p>员工: ',
                '<tpl for="employer">',
                    '<p>{#}. 姓名：{name},年龄：{age}<br/>兴趣爱好：',
                    '<tpl for="hobby">',
                        '<tpl if="xindex&gt;1">',
                            ',',
                        '</tpl>',
                        '{.}',                      
                    '</tpl>',
                    '({[values.hobby.length]}项)',
                    '<tpl if="xindex==xcount">',
                    '<br/>员工人数:',
                    '{[xcount]}人', 
                    '</tpl>',
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

