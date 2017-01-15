Ext.require(['Ext.DataView','Ext.TitleBar'])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        Ext.define('Class',{
            extend:'Ext.data.Model',
            config:{
                fields:['id','name','studentCount'],
                hasMany:{
                    model:'Student',
                    name:'students'
                },
                proxy:{
                    type:'ajax',
                    url:'students.json'
                }
            }
        });
        Ext.define('Student',{
            extend:'Ext.data.Model',
            config:{
                fields:['number','name','age','phone']
            }
        });
    
        var template = new Ext.XTemplate(              
            '<div class="class">',
                '<h3>{name}(学生人数:{studentCount})</h3>',                    
                '<div class="listHeader">',
                    '<div class="title">姓名</div>',
                    '<div class="title">学号</div>',
                    '<div class="title">年龄</div>',
                    '<div class="title">电话号码</div>',
                '</div>',
                '<tpl for="students">',
                    '<div class="students">',
                        '<div id="name">{name}</div>',
                        '<div>{number}</div>',                          
                        '<div>{age}</div>',
                        '<div>{phone}</div>',
                    '</div>',
                '</tpl>',
            '</div>'                   
        );


        var titleBar=Ext.create('Ext.TitleBar',{
            docked:'top',
            title:'常州兰陵小学一年级学生信息'
        });
        var dataview=Ext.create('Ext.DataView',{
            items:titleBar,
            itemTpl:template,
            selectedCls:'selected',
            store:new Ext.data.Store({
                model:'Class',
                autoLoad:true
            })
        });
        Ext.Viewport.add(dataview);
    }
});


