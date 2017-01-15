Ext.define('MyApp.store.BookStore', {
    extend  : 'Ext.data.Store',
    requires: ['MyApp.model.BookInfo'],
    config: {
        model: 'MyApp.model.BookInfo',
        autoLoad:true,
        remoteFilter:true,
        proxy: {
            type: 'ajax',
            url : 'bookInfo_paged_sorted_filted.php',
            reader: {
                type: 'json',
                rootProperty: 'books',
                totalProperty:'bookCount'
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
