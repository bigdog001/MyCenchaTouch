Ext.define('MyApp.view.FilmForm', {
    extend:'Ext.form.Panel',
    xtype:'filmformview',
    requires: ['Ext.form.Panel','Ext.form.FieldSet','Ext.TitleBar',
    'Ext.field.Select','Ext.field.Number'],
    config:{    
        id:'filmformview',
        items: [
        {
            xtype:'titlebar',
            docked:'top',
            title:'编辑电影信息'
        },
        {
            xtype:'fieldset',
            defaults:{
                labelwidth:'20%'
            },
            items: [
            {
                xtype: 'textfield',
                name : 'title',
                label: '标题',
                placeHolder:'请输入电影标题',
                required:true,
                clearIcon: true
            },
            {
                xtype: 'textfield',
                name : 'director',
                label: '导演',
                placeHolder:'请输入电影导演',
                required:true,
                clearIcon: true
            },
            {
                xtype: 'numberfield',
                name : 'price',
                label: '票价',
                placeHolder:'请输入票价',
                required:true
            },
            {
                xtype: 'selectfield',
                name : 'genre',
                label: '种类',
                options:[
                {
                    text:'历史',
                    value:'历史'
                },
                {
                    text:'武侠',
                    value:'武侠'
                },
                {
                    text:'爱情',
                    value:'爱情'
                },
                {
                    text:'动作',
                    value:'动作'
                },
                {
                    text:'惊悚',
                    value:'惊悚'
                },
                {
                    text:'喜剧',
                    value:'喜剧'
                }]
            }]
        },
        {
           docked:'bottom',
           xtype:'toolbar', 
           layout: {
               type: 'hbox',
               pack:'end'
           },          
           items: [
           {
               iconMask:true,
               iconCls: 'check1',
               style:'float:right'
           }]
       }]
    }
});
