Ext.require([
    'Ext.field.Search',
    'Ext.field.Select',
    'Ext.dataview.DataView',
    'Ext.TitleBar',
    'Ext.direct.Manager',
    'Ext.direct.RemotingProvider',
    'Ext.data.DirectStore',
    'Ext.Ajax',
    'Ext.ModelManager'
])        
Ext.application({
    name: 'MyApp',
    icon: 'images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'images/phone_startup.png',
    tabletStartupScreen: 'images/tablet_startup.png',
    launch: function() { 
        Ext.direct.Manager.addProvider(Ext.app.REMOTING_API, {
            type:'remoting',
            url: 'router.php'
        });   
        Ext.define('BookInfo', {
            extend: 'Ext.data.Model',
            config: {
                fields:['id','image_url','book_name','author','description']
            }
        });                
        var bookStore=Ext.create('Ext.data.DirectStore',{ 
            model:'BookInfo',
            autoLoad:true,
            autoSync:false,
            remoteSort:true,
            remoteFilter:true,
            proxy: {
                type: 'direct',
                directFn: TestAction.getBooks,
                reader: {
                    type: 'json',
                    rootProperty: 'books',
                    totalProperty:'bookCount'
                },
                listeners: { 
                    exception:function(proxy,response)
                    {
                        Ext.Msg.alert(Ext.decode(response).message);
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

        var toolbar =Ext.create('Ext.Toolbar',{
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

        
        var dataview=Ext.create('Ext.DataView',{
            id:'dataview',
            store:bookStore,
            itemTpl:bookTemplate, 
            emptyText:'没有数据',           
            baseCls:'Book'
        });        
        var panel=Ext.create('Ext.Panel',{
            layout:'fit',
            id:'dataviewPanel',
            items:[toolbar,dataview]
        });
        Ext.Viewport.add(panel);
    }
});



