Ext.require([
    'Ext.DataView',
    'Ext.TitleBar',
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.Number',
    'Ext.field.Hidden',
    'Ext.field.Select',
    'Ext.data.proxy.Rest',
    'Ext.ActionSheet'
])
Ext.define('Classinfo',{
    extend:'Ext.data.Model',
    config:{
        fields:['id','name']
    }
});
Ext.define('Student',{
    extend:'Ext.data.Model',
    config:{
        fields:['id','classinfo_id','number','name','age','phone'],
        validations:[                     
            {type: 'presence',field:'number',message:'请输入学号'},      
            {type: 'presence',field:'name',message:'请输入姓名'} ,  
            {type:'length',field:'age',max:2,message: '必须输入有效的年龄'}, 
            {type:'format',field: 'age',matcher: /^\+?[1-9][0-9]$/,message:'必须输入有效的年龄'},
            {type:'format',field: 'phone',matcher:/^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/, message:'必须输入有效的电话'}             
        ],
        belongsTo:'Classinfo',
            proxy:{
                type: 'rest',
                url : 'students.php',                
                reader: {
                    type: 'json'
                },
                listeners: { 
                    exception:function(proxy,response)
                    {
                        Ext.Msg.alert(Ext.decode(response.responseText).message);
                    }
                }
            }
    }
});
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        var classStore=Ext.create('Ext.data.Store',{
            model:'Classinfo',
            autoLoad:true,
            autoSync:false,
            proxy:{
                type:'rest',
                url:'getClass.php'
            }
        });
        var studentStore=Ext.create('Ext.data.Store', {
            model:'Student',
            autoLoad:true,
            remoteFilter:true,
            filters: [
            {
                property: 'classinfo_id',
                value   : -1
            }],
            proxy:{
                type: 'rest',
                url : 'students.php',                
                reader: {
                    type: 'json'
                },
                listeners: { 
                    exception:function(proxy,response)
                    {
                        Ext.Msg.alert(Ext.decode(response.responseText).message);
                    }
                }
            }
        }); 
        var template = new Ext.XTemplate(          
            '<div class="students">',
                '<div id="name">{name}</div>',
                '<div>{number}</div>',                          
                '<div>{age}</div>',
                '<div>{phone}</div>',
                '<div style="display:none">{id}</div>',
            '</div>'           
        );
        var addBtn=Ext.create('Ext.Button',{
            iconMask:true,
            iconCls: 'add',
            disabled: true,
            handler:function(){
                Ext.Viewport.add(formpanel);
                var student = Ext.create('Student',{id:-1,number:'',
                name: '',age: '',phone:'' }); 
                formpanel.setRecord(student);
                formpanel.show();
            }
        });
        var toolBar=Ext.create('Ext.Toolbar',{
            docked:'top',
            items:[
            {
                xtype:'selectfield',
                id:'sel_class',
                name:'class',
                placeHolder:'选择班级',
                valueField:'id',
                displayField:'name',
                store:classStore,
                listeners:{
                    change:function(select,newValue,oldValue){
                        studentStore.clearFilter();                                     
                        studentStore.filter('classinfo_id',newValue.getData().id);                            
                        studentStore.load();
                        if(newValue.getData().id==-1)
                            addBtn.setDisabled(true);
                        else
                            addBtn.setDisabled(false);
                    } 
                } 
            },addBtn
            ]
        });
        var headerPanel=Ext.create('Ext.Panel',{
            docked:'top',
            layout:'hbox',
            items:[toolBar,
            {
                xtype:'container',
                baseCls:'title',
                html:'姓名'
            },
            {
                xtype:'container',
                baseCls:'title',
                html:'学号'
            },
            {
                xtype:'container',
                baseCls:'title',
                html:'年龄'
            },
            {
                xtype:'container',
                baseCls:'title',
                html:'电话号码'
            }]
        });
        var formpanel=Ext.create('Ext.form.Panel',{
            modal: true,
            hideOnMaskTap: false,
            centered: true,
            height: 350,
            width:'100%',
            layout:'vbox',
            items: [
            {
                docked:'top',
                xtype:'toolbar',
                title:'编辑学生信息'
            },
            {
                docked: 'bottom',
                xtype: 'toolbar',
                items: [
                {
                    text: '确定',           
                    handler: function() {
                        if(Ext.ComponentManager.get('id').getValue()=="-1")    
                            var currentStudent =Ext.create('Student');
                        else
                            var currentStudent=dataview.getSelection()[0];                        
                        formpanel.updateRecord(currentStudent);
                        var errors = currentStudent.validate();   
                        if(errors.isValid())
                        {    
                               currentStudent.setClassinfo(Ext.ComponentManager.get('sel_class').getValue(),function() {
                               studentStore.load();
                               dataview.refresh();                               
                           });
                           formpanel.hide();                   
                        }
                        else {
                            var message = "";
                            Ext.each(errors.items,function(rec){
                                message += rec.getMessage()+"<br>";
                            });
                            Ext.Msg.alert("验证失败", message);                                    
                        }                        
                    }
                },
                {
                    xtype: 'spacer'
                },
                {
                    text: '取消',
                    handler: function() {
                        Ext.Viewport.remove(formpanel);
                        formpanel.destroy();
                    }
                }]
            },
            {
                xtype: 'fieldset',
                items: [{
                    xtype:'textfield',
                    name:'number',
                    label:'学号',
                    maxLength:10,
                    placeHolder:'请输入学号',
                    required:true,
                    clearIcon: true                    
                },
                {
                    xtype:'textfield',
                    name:'name',
                    label:'姓名',                    
                    maxLength:4,
                    placeHolder:'请输入姓名',
                    required:true,
                    clearIcon: true
                },
                {
                    xtype:'numberfield',
                    name:'age',
                    label:'年龄',
                    maxLength:2,
                    placeHolder:'请输入年龄',
                    required:true,
                    clearIcon: true
                },
                {
                    xtype:'textfield',
                    name:'phone',
                    label:'电话',
                    maxLength:20,
                    placeHolder:'请输入电话',
                    required:true,
                    clearIcon: true                    
                },
                {
                    xtype:'hiddenfield',
                    name:'id',
                    id:'id'
                }]
            }]
        });
        var selectedIndex;
        var actionSheet = Ext.create('Ext.ActionSheet',{
            items: [
            {
                text: '编辑',
                ui  : 'action',
                handler:function(){
                    Ext.Viewport.add(formpanel);
                    actionSheet.hide();
                    var student=studentStore.getAt(selectedIndex); 
                    formpanel.setRecord(student);  
                    formpanel.show();
                }
            },
            {
                text: '删除',
                ui  : 'action',
                handler:function(){
                    actionSheet.hide();
                    var student=studentStore.getAt(selectedIndex); 
                    studentStore.remove(student);
                }
            },
            {
                text: '取消',
                ui  : 'action',
                handler:function(){
                    actionSheet.hide();
                }
            }]
        });
        var dataview=Ext.create('Ext.DataView',{
            itemTpl:template,
            store:studentStore,
            listeners: {
                itemtap:function(dataview,index)
                {
                    selectedIndex=index;
                    Ext.Viewport.add(actionSheet);
                    actionSheet.show(); 
                }
            }
        });
        var panel=Ext.create('Ext.Panel',{
            layout:'fit',
            items:[headerPanel,dataview]
        });
        Ext.Viewport.add(panel);
    }
});


