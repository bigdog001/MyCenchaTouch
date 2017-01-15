Ext.require([
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.Radio'
])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {          
        var formPanel = Ext.create('Ext.form.Panel', {
            id:'formPanel',
            scrollable:'vertical',
            items: [{
                xtype:'fieldset',
                title:'电影信息',
                instructions:'请填写电影信息',
                defaults:{
                    labelwidth:'20%'
                },
                items: [
                {
                    xtype: 'textfield',
                    id:'txt_title',
                    name : 'title',
                    label: '标题',
                    placeHolder:'请输入电影标题',
                    required:true,
                    clearIcon: true
                },
                {
                    xtype: 'textfield',
                    id:'txt_director',
                    name : 'director',
                    label: '导演',
                    placeHolder:'请输入导演名称',
                    clearIcon: true
                },
                //FieldSet组件
                {
                    xtype: 'fieldset',
                    title:'拍摄国家',
                    defaults:{
                        xtype:'radiofield'
                    },
                    items:[
                    //单选框组件
                    {
                        name:'country',
                        label:'中国',
                        value:'china'
                    },{
                        name:'country',
                        label:'日本',
                        value:'Janpan'
                    },{
                        name:'country',
                        label:'美国',
                        value:'America'
                    }]
                }]
            }]
        });
        Ext.Viewport.add(formPanel);
    }
});
