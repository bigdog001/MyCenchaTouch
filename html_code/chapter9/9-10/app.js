Ext.require([
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.data.TreeStore',
    'Ext.dataview.NestedList',
    'Ext.TitleBar'
])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() {  
        var data = {
           name: '常州兰陵小学',
           items: [{
               name: '一年级',
               items: [
               {
                   name: '一年级一班',
                   items: [
                   {
                       name: '学生一',
                       leaf: true
                   },
                   {
                       name: '学生二',
                       leaf: true
                   },
                   {
                      name: '学生三',
                      leaf: true
                   }]
               },{
                   name: '一年级二班',
                   items: [
                   {
                       name: '学生四',
                       leaf: true
                   },
                   {
                       name: '学生五',
                       leaf: true
                   },
                   {
                       name: '学生六',
                       leaf: true
                   }]                       
               },{
                   name: '一年级三班',
                   leaf: true
               }]
           },
           {
               name: '二年级',
               items: [
               {
                   name: '二年级一班',
                   items: [
                   {
                       name: '学生七',
                       leaf: true
                   },
                   {
                       name: '学生八',
                       leaf: true
                   },
                   {
                       name: '学生九',
                       leaf: true
                   }]
               },
               {
                   name: '二年级二班',
                   items: [
                   {
                       name: '学生十',
                       leaf: true
                   },
                   {
                       name: '学生十一',
                       leaf: true
                   },
                   {
                       name: '学生十二',
                       leaf: true
                   }]                       
               },
               {
                   name: '二年级三班',
                   leaf: true
               }]
           }]
        };
        Ext.define('ListItem', {
            extend: 'Ext.data.Model',
            config:{
                fields:[{name: 'name', type: 'string'}]
            }
        });
        var store=Ext.create('Ext.data.TreeStore', {   
            model: 'ListItem',
            defaultRootProperty: 'items',
            root: data   
        });
        var txtName = new Ext.form.Text();
        var editPanel =Ext.create('Ext.form.Panel',{
            id:'editPanel',
            modal: true,
            hideOnMaskTap: false,
            centered: true,
            height: 200,
            width:300,
            items: [
            {
                docked:'top',
                xtype:'toolbar',
                title:'修改学生名称'
            },
            {
                docked: 'bottom',
                xtype: 'toolbar',
                items: [
                {
                    text: '确定',
                    handler: function() {
                        var activeList = nestedList.getActiveItem(),
                        record     = activeList.getSelection()[0];
                        record.set('name',txtName.getValue());
                        editPanel.hide();
                    }
                },
                {
                    xtype: 'spacer'
                },
                {
                    text: '取消',
                    handler: function() {
                        editPanel.hide();
                    }
                }]
            },
            {
                xtype: 'fieldset',
                items: [txtName]
            }]
        });
        var editButton =Ext.create('Ext.Button',{
            text: '修改',
            disabled: true,
            handler: function() {  
                Ext.Viewport.add(editPanel);              
                editPanel.show();
                var activeList = nestedList.getActiveItem(),
                record     = activeList.getSelection()[0];
                txtName.setValue(record.get('name'));
            }
        });
        var toolbar=Ext.create('Ext.Toolbar',{
            docked:'top',
            layout:{
                type:'hbox',
                pack:'end'
            },
            items:[
            {
                xtype:'spacer'
            },
            editButton]
        });
        var nestedList =Ext.create('Ext.NestedList',{
            title: '常州兰陵小学',
            store: store,
            displayField: 'name',
            toolbar:toolbar,
            getItemTextTpl: function() {
                return  '<tpl if="leaf ==  true">'+
                        '{name}'+
                        '</tpl>'+
                        '<tpl if="leaf != true">{name} /</tpl>';
            },
            listeners: {
                leafitemtap:function(nestedList,list,index,item){
                    editButton.setDisabled(false);                   
                }
            }
        });        
        Ext.Viewport.add(nestedList);
    }
});
