Ext.require([
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.Select',
    'Ext.field.Search',
    'Ext.field.TextArea',
    'Ext.field.Hidden',
    'Ext.data.Store',
    'Ext.data.proxy.Rest',
    'Ext.data.JsonReader',
    'Ext.dataview.DataView',
    'Ext.TitleBar',
    'Ext.Picker'
])
Ext.define('BookInfo', {
    extend: 'Ext.data.Model',
    config:{ 
        fields:['id','image_url','book_name','author','description'],
        validations: [                     
            {type: 'format',field:'image_url',matcher:/\.(jpg|gif|png|jpeg)+$/,message:'请输入有效的jpg格式、gif格式或png格式的图片地址'},
            {type: 'presence',field:'book_name',message:'请输入书名'},      
            {type: 'presence',field:'author',message:'请输入作者名'}                 
        ]
    }
});
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        var calcData = function(pageCount) {
            var data = [];
            var item = {};
            for (var i =1;i <=pageCount; i++) {
                item = {
                    text:'第'+i+'页',
                    value:i
                };
                data[i-1] = item;
            }
            return data;
        };
        var  picker = new Ext.Picker({
            id:'picker',
            enter:'right',
            exit:'right',
            width:200,
            height:200,
            stretchX:false,
            stretchY:false, 
            doneButton:'确定',
            cancelButton:'取消',
            hidden:true,
            listeners:{
                change:function(picker){                                    
                    bookStore.loadPage(picker.getValue().pageIndex);
                    Ext.ComponentManager.get('dataview').refresh();
                }
            }
        });  
        var bookReader=Ext.create('Ext.data.JsonReader',{
            type: 'json',
            rootProperty: 'books',
            totalProperty:'bookCount'
        });

        var bookStore=Ext.create('Ext.data.Store',{            
            model:'BookInfo',
            autoLoad:true,
            autoSync:true,
            remoteSort:true,
            remoteFilter:true,
            pageSize:5,
            proxy: {
                type: 'rest',
                url : 'books.php',
                appendId:true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                reader:bookReader,
                writer:{
                    type:'json',
                },
                listeners: { 
                    exception:function(proxy,response)
                    {
                        Ext.Msg.alert(Ext.decode(response.responseText).message);
                    }
                }
            },
            scope:this,
            listeners:{
                load:function(){
                    var recordCount=
                    bookReader.rawData[bookReader.getTotalProperty()];
                    var pageSize=this.getPageSize();
                    pageCount=(recordCount-recordCount%pageSize)/pageSize;
                    if(recordCount%pageSize>0)
                        pageCount+=1;
                    if(recordCount>0)
                    {
                       picker.setSlots({
                           title:'选择页数',
                           name : 'pageIndex',
                           align:'center',
                           data:calcData(pageCount)
                       });                          
                    }
                }
            }
        });
        var bookTemplate=new Ext.XTemplate( 
            '<tpl for=".">',             
            '<div class="Book_img"><img src="{image_url}"/></div>', 
            '<div class="Book_info">',
            '<h2>{book_name}</h2><br><h3>作者：{author}<h3>',
            '<p>{description:ellipsis(40)}</p>',
            '</div>',
            '</tpl>'                  
        ); 
        var editButton=Ext.create('Ext.Button',{ 
            iconMask:true,
            iconCls: 'compose',
            disabled: true,
            handler:function(){
                if(dataview.getSelectionCount()>0)
                {
                    var record=dataview.getSelection()[0];
                    var book = Ext.create('BookInfo',record.data);
                    formPanel.setRecord(book);  
                    Ext.Viewport.getLayout().setAnimation({type:'slide',direction:'right'});
                    Ext.Viewport.setActiveItem('formPanel');  
                }
                else
                {
                    Ext.Msg.alert("请选择需要修改的数据");
                }
            }
        });
        var deleteButton=Ext.create('Ext.Button',{ 
            iconMask:true,
            iconCls: 'delete',
            disabled: true,
            handler:function(){
                if(dataview.getSelectionCount()>0)
                {
                    var record=dataview.getSelection()[0];
                    bookStore.remove(record); 
                    dataview.refresh();
                }
                else
                {
                    Ext.Msg.alert("请选择需要删除的数据");
                }
            }
        });

        var toolbar1 =Ext.create('Ext.Toolbar',{
            docked : 'top', 
            height:30,
            layout: {
                type: 'hbox',
                align:'start'
            },         
            items: [
            {
                xtype: 'searchfield',
                id:'search_bookname',
                name:'search_bookname',
                placeHolder:'请输入书名',
                style:'font-size:12px', 
                flex:1,
                listeners:{
                    change:function(){
                        bookStore.clearFilter();
                        var value=this.getValue();
                        if(value!="")
                            bookStore.filter('book_name',value);
                         bookStore.load();
                    }                    
                }
            },
            {
                xtype: 'selectfield',             
                id:'sort', 
                name:'sort',  
                style:'font-size:12px',    
                flex:1,     
                options:[{
                    text:'选择排序方式',
                    value:''
                },{
                    text:'按书名升序排列',
                    value:'book_name_asc'
                },{
                    text:'按书名降序排列',
                    value:'book_name_desc'
                },{
                    text:'按作者名升序排列',
                    value:'author_asc'
                },{
                    text:'按作者名降序排列',
                    value:'author_desc'
                }], 
                listeners:{
                    change:function(item,newValue,oldValue){
                        switch(newValue.getData().value)
                        {
                            case "book_name_asc":                              
                                bookStore.sort({ 
                                    property :'book_name', 
                                    direction:'asc'
                                });
                                break;
                            case "book_name_desc":
                                bookStore.sort({ 
                                    property :'book_name', 
                                    direction:'desc'
                                });
                                break;
                            case "author_asc":
                                bookStore.sort({ 
                                    property :'author', 
                                    direction:'asc'
                                });
                                break;
                            case "author_desc":
                                bookStore.sort({ 
                                    property :'author', 
                                    direction:'desc'
                                });
                                break;                            
                        }
                        bookStore.load();
                    }                    
                }
            }]
        });
        var  selectPageButton=new Ext.Button({
            id:'selectPage',
            iconMask:true,
            iconCls: 'action',
            handler:function(){      
                Ext.Viewport.add(picker);        
                picker.showBy(this);
            }
        });

        var toolbar2 = Ext.create('Ext.Toolbar',{
            docked : 'bottom',  
            width:'100%',
            layout:{
                type:'hbox',
                pack:'center'
            }, 
            items: [
            {
                iconMask:true,
                iconCls: 'add',
                handler:function(){
                    var book = Ext.create('BookInfo',{id:-1,image_url:'',
                    book_name: '',author: '',description:'' });  
                    formPanel.setRecord(book);
                    Ext.Viewport.getLayout().setAnimation({type:'slide',direction:'right'});
                    Ext.Viewport.setActiveItem('formPanel');     
                }
            },
            editButton,
            deleteButton,
            selectPageButton
            ]
        });
        var dataview=Ext.create('Ext.DataView',{
            id:'dataview',
            store:bookStore,
            itemTpl:bookTemplate, 
            emptyText:'没有数据',           
            baseCls:'Book',
            listeners: {
                selectionchange:function(){
                   editButton.setDisabled(false);
                   deleteButton.setDisabled(false);
                }
            }
        });
        var toolbar3 = Ext.create('Ext.Toolbar',{
            docked : 'bottom', 
            layout: {
                type: 'hbox',
                pack:'end',
            },          
            items: [
            {
                iconMask:true,
                iconCls: 'check1',
                scope:this,
                style:'float:right',
                handler:function(){ 
                    if(Ext.ComponentManager.get('id').getValue()=="-1")    
                        var currentBook =Ext.create('BookInfo');
                    else
                        var currentBook=dataview.getSelection()[0];
                    formPanel.updateRecord(currentBook);
                    var errors = currentBook.validate();   
                    if(errors.isValid())
                    {    
                       if(Ext.ComponentManager.get('id').getValue()=="-1") 
                           bookStore.add(currentBook);  
                       bookStore.load();            
                       dataview.refresh();
                       Ext.Viewport.getLayout().setAnimation({type:'slide',direction:'left'});
                       Ext.Viewport.setActiveItem('dataviewPanel');                     
                    }
                    else {
                        currentBook.reject();
                        var message = "";
                        Ext.each(errors.items,function(rec){
                            message += rec.getMessage()+"<br>";
                        });
                        Ext.Msg.alert("验证失败", message);                                    
                    }
                }
            },
            {
                iconMask:true,
                iconCls: 'reply',
                style:'float:right',
                handler:function(){ 
                     Ext.Viewport.getLayout().setAnimation({type:'slide',direction:'left'});
                     Ext.Viewport.setActiveItem('dataviewPanel');                       
                }
            }]
        });

        var formPanel=Ext.create('Ext.form.FormPanel',{
            id:'formPanel',  
            style:'font-size:12px',         
            items: [toolbar3,{
                xtype:'fieldset',
                title:'书籍信息',
                defaults:{
                    labelwidth:'20%'
                },
                items: [
                {
                    xtype: 'textfield',
                    name : 'image_url',
                    label: '图片地址',
                    maxLength:50,
                    placeHolder:'请输入书籍图片的URL地址',
                    required:true,
                    clearIcon: true
                },
                {
                    xtype: 'textfield',
                    name : 'book_name',
                    label: '标题',
                    maxLength:50,
                    placeHolder:'请输入书籍标题',
                    required:true,
                    clearIcon: true
                },
                {
                    xtype: 'textfield',
                    id:'author',
                    name : 'author',
                    label: '作者',
                    maxLength:50,
                    placeHolder:'请输入作者名称',
                    required:true,
                    clearIcon: true
                },
                {
                    xtype:'textareafield',
                    name:'description',
                    maxLength:1000,
                    maxRows:10,
                    label:'书籍描述'
                },
                {
                    xtype:'hiddenfield',
                    name:'id',
                    id:'id'
                }]
            }]
        });
        var panel=Ext.create('Ext.Panel',{
            layout:'fit',
            id:'dataviewPanel',
            items:[toolbar1,dataview,toolbar2]
        });
        Ext.Viewport.add(panel);
        Ext.Viewport.add(formPanel);
    }
});


