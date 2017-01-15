Ext.require([
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.Radio',
    'Ext.field.Select',
    'Ext.field.DatePicker',
    'Ext.TitleBar'
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
            items: [
            //FieldSet组件
            {
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
                //复选框组件
                {
                    xtype: 'checkboxfield',
                    name:'color',
                    label:'彩色',
                    value:'colored',
                    checked:true
                },
                {
                    xtype: 'selectfield',
                    name:'genre',
                    label:'种类',
                    options:[{
                        text:'喜剧',
                        value:'1'
                    },{
                        text:'文艺',
                        value:'2'
                    },{
                        text:'动作',
                        value:'3'
                    }],
                    listeners:{
                        change:function(select,newValue,oldValue){
                            switch(newValue.data.value)
                            {
                                case '1':
                                    Ext.Msg.alert('您选择了喜剧片');
                                    break;
                                case '2':
                                    Ext.Msg.alert('您选择了文艺片');
                                    break;
                                case '3':
                                    Ext.Msg.alert('您选择了动作片');
                                    break;
                            }
                        } 
                    } 
                },
                {
                    xtype: 'datepickerfield',
                    name:'released',
                    label:'发行日期',
                    picker:{
                        yearFrom:2000,
                        yearTo:2100
                    },
                    value:new Date(),
                    dateFormat:'Y/m/d',                                 
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
            },
            //按钮用面板组件
            {
                xtype:'panel',
                layout:{
                    type:'hbox',
                    pack:'end'
                },
                defaults:{
                    xtype:'button'
                },
                items:[
                    {
                        text:'提交',
                        cls:'normal_btn'
                    },
                    {
                        text:'重置',
                        cls:'normal_btn'
                    }
                ]                        
            }]
        });
        Ext.Viewport.add(formPanel);
    }
});
