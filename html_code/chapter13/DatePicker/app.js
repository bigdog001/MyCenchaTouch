Ext.require(['Ext.TitleBar','Ext.picker.Date'])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        var datePicker = Ext.create('Ext.picker.Date',{
            value:new Date(),
            yearText:'年',
            monthText:'月',
            dayText:'日',
            yearFrom:2010,
            yearTo:2020,
            doneButton:'确定',
            cancelButton:'取消',
            slotOrder:['year','month','day'],
            hidden:true,
            listeners:{
                change:function(){
                    console.log(this);
                    var dateValueString=Ext.util.Format.date(this.getValue(),'Y/m/d');
                    panel.setHtml('您选择的日期为'+dateValueString);
                }
            }
        });
        var panel=Ext.create('Ext.Panel',{
            layout:'fit',
            html:'DataPicker组件使用示例',
            items:[{
                docked:'top',
                xtype:'toolbar',
                items:[{
                     xtype:'button',
                     text:'显示DatePicker组件',
                     handler:function(){
                         Ext.Viewport.add(datePicker);
                         datePicker.show();
                     }
                }]
            }]
        });        
        Ext.Viewport.add(panel);
    }
});


