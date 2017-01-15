Ext.require(['Ext.data.Store','Ext.dataview.DataView'])
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
            proxy: {
                type: 'ajax',
                url : 'bookInfo.json',
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
        var dataview=Ext.create('Ext.DataView',{
            store:bookStore,
            itemTpl:bookTemplate,
            baseCls:'Book'
        });
        Ext.Viewport.add(dataview);
    }
});


