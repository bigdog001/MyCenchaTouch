Ext.require([
    'Ext.data.Store',
    'Ext.data.reader.Json',
    'Ext.dataview.DataView'
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
            model:'BookInfo',
            proxy: {
                type: 'ajax',
                url : 'bookInfo_paged.php',
                reader: bookReader
            },
            pageSize:5,
            scope:this,
            listeners: {                 
                load:function(store,records,successful,operation) {  
                    //读取数据失败
                    if(!successful)
                        //弹出错误信息
                        Ext.Msg.alert(
                            this.getProxy().getReader().rawData.message
                        );
                    else
                    {
                        var recordCount=bookReader.rawData[bookReader.getTotalProperty()];
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
        var toolbar =Ext.create('Ext.Toolbar',{
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
        var dataview=Ext.create('Ext.DataView',{
            store:bookStore,
            items:toolbar,
            itemTpl:bookTemplate, 
            emptyText:'没有数据',           
            baseCls:'Book'
        });
        Ext.Viewport.add(dataview);
    }
});


