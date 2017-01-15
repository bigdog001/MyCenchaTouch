Ext.require([
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.Search',
    'Ext.field.Select',
    'Ext.field.TextArea',
    'Ext.field.Hidden',
    'Ext.data.Store',
    'Ext.dataview.DataView',
    'Ext.TitleBar'
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
        var bookStore=Ext.create('Ext.data.Store',{            
            model:'BookInfo',
            data:[
                {id:1,image_url:'images/html51.jpg',book_name:'HTML 5与CSS 3权威指南',author:'陆凌牛',description:'内容系统而全面，HTML 5与CSS 3的新功能和新特性尽揽无余。注重实战，包含200余设计精巧的实例，可操作性极强。资深专家亲自执笔，3大前端社区一致推荐，权威性毋庸置疑。'},
                {id:2,image_url:'images/html52.jpg',book_name:'HTML5揭秘',author:'皮尔格林',description:'本书全面而深入地对HTML5相关的技术进行详细介绍和剖析。“从开始到现在”道出HTML5的坎坷发展史；“HTML5特性检测”介绍了多种针对不同特性的检测方法。'},
                {id:3,image_url:'images/html53.jpg',book_name:'HTML5游戏开发 ', author:'（美）迈耶',description:'很多从事Web前端开发的人对HTML总有些不满，比如需要手动检查和设计很多格式代码，不仅容易出错，而且存在大量重复。好在HTML5让我们看到了曙光。'},
                {id:4,image_url:'images/html54.jpg',book_name:'HTML5高级程序设计', author:'（荷）柳伯斯，（美）阿伯斯，（美）萨姆',description:'本书首先介绍了HTML5的历史背景、新的语义标签及与以往HTML版本相比的根本变化，同时揭示了HTML5背后的设计原理。'},
                {id:5,image_url:'images/html55.jpg',book_name:'HTML 5&CSS完全手册（第5版）',author:'(美)鲍威尔',description:'为了介绍HTML 5，这本由Thomas A.Powell所著，刘博译的《HTML5 & CSS完全手册(第5版)》在结构和内容上进行了重大的调整。本版与上一版有大约三分之一的内容是相似的。'}
            ],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            },
            listeners:{
                removerecords:function(){
                    console.log("数据被删除");
                },
                addrecords:function(){
                    console.log("数据被追加");
                },
                updaterecord:function(){
                    console.log("数据被修改");
                }
            }
        });
        var maxID=5;
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
            deleteButton
            ]
        });

        var dataview=Ext.create('Ext.DataView',{
            id:'dataview',
            store:bookStore,
            itemTpl:bookTemplate, 
            emptyText:'没有数据',           
            baseCls:'Book',
            selectedCls:'selected',
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
                style:'float:right',
                handler:function(){  
                    var currentBook =Ext.create('BookInfo',formPanel.getValues());
                    var errors = currentBook.validate();    
                    if(errors.isValid())
                    {    
                       if(Ext.ComponentManager.get('id').getValue()=="-1") 
                       {                           
                           maxID=maxID+1;
                           currentBook.setId(maxID);                           
                           bookStore.add(currentBook);
                       }
                       else
                       {
                           currentBook=dataview.getSelection()[0];
                           formPanel.updateRecord(currentBook);
                       }     
                       dataview.refresh();
                       Ext.Viewport.getLayout().setAnimation({type:'slide',direction:'left'});
                       Ext.Viewport.setActiveItem('dataviewPanel');                     
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


