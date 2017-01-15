Ext.require([
    'Ext.dataview.List',
    'Ext.data.Store',
    'Ext.plugin.ListPaging'
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
        var bookStore=Ext.create('Ext.data.Store',{ 
            model:'BookInfo',
            autoLoad:true,
            pageSize:5,
            proxy: {
                type: 'ajax',
                url : 'bookInfo_paged.php',
                reader: {
                    type: 'json',
                    rootProperty: 'books'
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

        var List=Ext.create('Ext.List',{
            store:bookStore,
            itemTpl:bookTemplate,
            plugins: [
            {
                xclass: 'Ext.plugin.ListPaging',
                autoPaging: true,
                loadMoreText:'下一页'
            }],
            emptyText:'没有数据',  
            baseCls:'Book',
            selectedCls:'selected'
        });
        Ext.Viewport.add(List);
    }
});



