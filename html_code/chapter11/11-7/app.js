Ext.require([
    'Ext.DataView',
    'Ext.TitleBar',
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.Number',
    'Ext.field.Hidden'
])
Ext.define('Class',{
    extend:'Ext.data.Model',
    config:{
        fields:['id','name','studentCount'],
        hasMany:{
            model:'Student',
            name:'students'
        },
        proxy:{
            type:'rest',
            url:'classes.php'
        }
    }
});
Ext.define('Student',{
    extend:'Ext.data.Model',
    config:{
        fields:['id','number','name','age','phone'],
        validations:[                     
            {type: 'presence',field:'number',message:'请输入学号'},      
            {type: 'presence',field:'name',message:'请输入姓名'} ,  
            {type:'length',field:'age',max:2,message: '必须输入有效的年龄'}, 
            {type:'format',field: 'age',matcher: /^\+?[1-9][0-9]$/,message:'必须输入有效的年龄'},
            {type:'format',field: 'phone',matcher:/^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/, message:'必须输入有效的电话'}             
        ],
        proxy: {
            type: 'rest',
            url : 'students.php',
            appendId:true,
            writer:{
                type:'json',
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
            model:'Class',
            autoLoad:true,
            autoSync:false
        });
        var template = new Ext.XTemplate(              
            '<div class="class">',
                '<div class="header">',
                '<h3>{name}(学生人数:{studentCount})</h3><input type="button" class="normal_btn" id="addBtn" value=" 追加 "/>',  
                '</div>',            
                '<div class="listHeader">',
                    '<div class="title" style="width:10%">姓名</div>',
                    '<div class="title">学号</div>',
                    '<div class="title" style="width:10%">年龄</div>',
                    '<div class="title">电话号码</div>',
                    '<div class="title">编辑</div>',
                    '<div class="title">删除</div>',
                '</div>',
                '<tpl for="students">',
                    '<div class="students">',
                        '<div style="width:10%">{name}</div>',
                        '<div>{number}</div>',                          
                        '<div style="width:10%">{age}</div>',
                        '<div>{phone}</div>',
                        '<div><input type="button" class="normal_btn" id="editBtn" value=" 编辑 "/></div>',
                        '<div><input type="button" class="normal_btn" id="deleteBtn" value=" 删除 "/></div>',
                        '<div style="display:none">{id}</div>',
                    '</div>',
                '</tpl>',
            '</div>'                   
        );
        var titleBar=Ext.create('Ext.TitleBar',{
            docked:'top',
            title:'常州兰陵小学一年级学生信息'
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
                        var id=Ext.ComponentManager.get('id').getValue();
                        var currentClass=dataview.getSelection()[0];                    
                        var studentStore=currentClass.students();
                        if(id=="-1")    
                            var currentStudent =Ext.create('Student');
                        else                 
                            var currentStudent =studentStore.getById(id);
                        formpanel.updateRecord(currentStudent);
                        var errors = currentStudent.validate();   
                        if(errors.isValid())
                        {    
                           if(id=="-1") 
                               studentStore.add(currentStudent); 
                           currentStudent.save({
                               success:function()
                               {
                                   classStore.load(); 
                                   dataview.refresh();
                               }
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
                        formpanel.hide();
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
        var dataview=Ext.create('Ext.DataView',{
            items:titleBar,
            itemTpl:template,
            store:classStore,
            listeners:{
                itemtap:function(mydataview,index,target,record,e){
                    var target=e.target;
                    if(target.id=="addBtn")
                    {
                        Ext.Viewport.add(formpanel);
                        var student = Ext.create('Student',{id:-1,number:'',
                        name: '',age: '',phone:'' }); 
                        formpanel.setRecord(student);
                        formpanel.show();
                    }
                    else if(target.id=="editBtn")
                    {
                        Ext.Viewport.add(formpanel);
                        var id=target.parentElement.parentElement.children[6].innerHTML;
                        var name=target.parentElement.parentElement.children[0].innerHTML;
                        var number=target.parentElement.parentElement.children[1].innerHTML;
                        var age=target.parentElement.parentElement.children[2].innerHTML;
                        var phone=target.parentElement.parentElement.children[3].innerHTML;
                        var student =Ext.create('Student',{id:id,number:number,name:name,age:age,phone:phone}); 
                        formpanel.setRecord(student);  
                        formpanel.show();
                    }
                    else if(target.id=="deleteBtn")
                    {
                        var id=target.parentElement.parentElement.children[6].innerHTML;                
                        var studentStore=record.students();
                        var currentStudent =studentStore.getById(id);
                        currentStudent.erase({
                           success:function()
                           {
                               classStore.load(); 
                               dataview.refresh();
                           }
                       });
                    }
                }
            }
        });
        Ext.Viewport.add(dataview);
    }
});


