Ext.require([
    'Ext.data.Store',
    'Ext.data.reader.Json',
    'Ext.data.JsonP',
    'Ext.dataview.DataView',
    'Ext.field.Select',
    'Ext.field.Search',
    'Ext.TitleBar'
])
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        var pageSize=5,Sorter,start=0,Filter,currentPage=1;
        var loadPage=function(){             
            if(Sorter==null&&Filter==null)
            {
                Ext.data.JsonP.request({
                    url: 'http://localhost:8081/JsonPTest/bookInfo_paged_sorted_filted.php',
                    callbackKey: 'callback',
                    params:{
                        limit: pageSize,
                        start:start
                    },
                    callback:callback
                })
            }
            else if(Filter==null)
            {
                sort="["+Ext.encode(Sorter)+"]";
                Ext.data.JsonP.request({
                    url: 'http://localhost:8081/JsonPTest/bookInfo_paged_sorted_filted.php',
                    callbackKey: 'callback',
                    params:{
                        limit: pageSize,
                        start:start,
                        sort:sort
                    },
                    callback:callback
                })
            }
            else if(Sorter==null)
            {
                filter="["+Ext.encode(Filter)+"]";
                Ext.data.JsonP.request({
                    url: 'http://localhost:8081/JsonPTest/bookInfo_paged_sorted_filted.php',
                    callbackKey: 'callback',
                    params:{
                        limit: pageSize,
                        start:start,
                        filter:filter
                    },
                    callback:callback
                })
            }
            else
            {
                sort="["+Ext.encode(Sorter)+"]";
                filter="["+Ext.encode(Filter)+"]";
                Ext.data.JsonP.request({
                    url: 'http://localhost:8081/JsonPTest/bookInfo_paged_sorted_filted.php',
                    callbackKey: 'callback',
                    params:{
                        limit: pageSize,
                        start:start,
                        sort:sort,
                        filter:filter
                    },
                    callback:callback
                })
            }
        }
        var callback=function(success,result) {             
            if (success) {   
                dataview.setHtml(bookTemplate.applyTemplate(result.books));           
                var recordCount=parseInt(result.bookCount,0);   
                pageCount=(recordCount-recordCount%pageSize)/pageSize;
                if(recordCount%pageSize>0)
                    pageCount+=1;
                Ext.getCmp('pageInfo').setText(
                String(currentPage)+"/"+pageCount+"页");
            }
            else{                    
                Ext.Msg.alert('读取数据失败');                
            }
        };
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
                        Filter=new Object();
                        var value=this.getValue();
                        if(value!="")
                        {
                            Filter.property='book_name';
                            Filter.value=value;
                        }
                        else
                            Filter=null;
                        loadPage();
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
                        Sorter=new Object();                                               
                        switch(newValue.getData().value)
                        {
                            case "book_name_asc":                                
                                Sorter.property='book_name';
                                Sorter.direction='asc';
                                break;
                            case "book_name_desc":
                                Sorter.property='book_name';
                                Sorter.direction='desc';
                                break;
                            case "author_asc":
                                Sorter.property='author';
                                Sorter.direction='asc';
                                break;
                            case "author_desc":
                                Sorter.property='author';
                                Sorter.direction='desc';
                                break; 
                            default:
                                Sorter=null; 
                        }
                        currentPage=1;
                        loadPage();
                    }                    
                }
            }]
        });
        var toolbar2 =Ext.create('Ext.Toolbar',{
            docked : 'bottom',  
            width:'100%',
            layout:{
                type:'hbox',
                pack:'center'
            },     
            items: [
            {
                iconMask:true,
                iconCls: 'firstpage',
                handler:function(){
                    start=0;
                    currentPage=1;
                    loadPage();
                }
            },
            {
                iconMask:true,
                iconCls: 'arrow_left',
                handler:function(){
                    if(currentPage>1)
                    {                     
                       start=pageSize*(currentPage-2);
                       currentPage-=1;
                       loadPage(); 
                    }
                }
            },
            {
                iconMask:true,
                iconCls: 'arrow_right',
                handler:function(){
                    if(currentPage<pageCount)
                    {                      
                        start=pageSize*(currentPage);
                        currentPage+=1;
                        loadPage(); 
                    }
                }
            },
            {
                iconMask:true,
                iconCls: 'lastpage',
                handler:function(){
                    if(currentPage<pageCount)
                    {                      
                        start=pageSize*(pageCount-1);
                        currentPage=pageCount;
                        loadPage();
                    }
                }
            },
            {
                html:'',
                style:'font-size:16px',
                id:'pageInfo'
            }]
        });
        
        var bookTemplate=new Ext.XTemplate( 
            '<tpl for=".">',
            '<div class="Book-item">',           
            '<div class="Book_img"><img src="{image_url}"/></div>', 
            '<div class="Book_info">',
            '<h2>{book_name}</h2><br><h3>作者：{author}<h3>',
            '<p>{description:ellipsis(40)}</p>',
            '</div>',
            '</div>',
            '</tpl>'                  
        ); 
        
        var dataview=new Ext.DataView({           
            itemTpl:bookTemplate, 
            emptyText:'没有数据',           
            baseCls:'Book'
        });
        var panel=Ext.create('Ext.Panel',{
            layout:'fit',
            items:[toolbar1,dataview,toolbar2]
        });
        Ext.Viewport.add(panel);
        loadPage();
    }
});



