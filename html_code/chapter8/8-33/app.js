Ext.require([
    'Ext.data.Store',
    'Ext.data.reader.Json',
    'Ext.data.proxy.JsonP',
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
        Ext.define('BookInfo', {
            extend: 'Ext.data.Model',
            config:{ 
                fields:['image_url','book_name','author','description']
            }
        });
        var bookReader=Ext.create('Ext.data.reader.Json',{
            type: 'json',
            rootProperty: 'books',
            totalProperty:'bookCount'
        });
        var pageCount;//页数
        var bookStore=Ext.create('Ext.data.Store',{            
            autoLoad:true,
            remoteSort:true,
            remoteFilter:true,
            model:'BookInfo',
            proxy: {
                type: 'jsonp',
                url : 'http://localhost:8081/JsonPTest/bookInfo_paged_sorted_filted.php',
                reader: bookReader,
                listeners: { 
                    exception:function(proxy,response)
                    {
                        Ext.Msg.alert(Ext.decode(response.responseText).message);
                    }
                }
            },
            pageSize:5,
            scope:this,
            listeners: {                 
                load:function(store,records,successful,operation) {  
                    //读取数据失败
                    if(successful)
                    {
                        var recordCount=
                        bookReader.rawData[bookReader.getTotalProperty()];
                        var pageSize=this.getPageSize();
                        pageCount=(recordCount-recordCount%pageSize)/pageSize;
                        if(recordCount%pageSize>0)
                            pageCount+=1;
                        Ext.getCmp('pageInfo').setText(
                            String(this.currentPage)+"/"+pageCount+"页"
                        );
                    }
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
                    bookStore.loadPage(1);
                }
            },
            {
                iconMask:true,
                iconCls: 'arrow_left',
                handler:function(){
                    if(bookStore.currentPage>1)
                    {
                        bookStore.previousPage();
                    }
                }
            },
            {
                iconMask:true,
                iconCls: 'arrow_right',
                handler:function(){
                    if(bookStore.currentPage<pageCount)
                    {
                        bookStore.nextPage();
                    }
                }
            },
            {
                iconMask:true,
                iconCls: 'lastpage',
                handler:function(){
                    bookStore.loadPage(pageCount);
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
            '<div class="Book_img"><img src="{image_url}"/></div>', 
            '<div class="Book_info">',
            '<h2>{book_name}</h2><br><h3>作者：{author}<h3>',
            '<p>{description:ellipsis(40)}</p>',
            '</div>',
            '</tpl>'                  
        ); 
        
        var dataview=new Ext.DataView({
            store:bookStore,            
            itemTpl:bookTemplate, 
            emptyText:'没有数据',           
            baseCls:'Book'
        });
        var panel=Ext.create('Ext.Panel',{
            layout:'fit',
            items:[toolbar1,dataview,toolbar2]
        });
        Ext.Viewport.add(panel);
    }
});


