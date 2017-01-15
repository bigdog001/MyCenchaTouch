Ext.define('MyApp.store.BookStore', {
    extend: 'Ext.data.Store',
    requires:['Ext.data.proxy.Rest'],
    config:{         
        model:'MyApp.model.Book',
        id:'BookStore',
        autoLoad:false,
        autoSync:true,
        remoteSort:true,
        remoteFilter:true,
        pageSize:5,
        proxy: {
            type: 'rest',
            url : 'books.php',
            appendId:true,
            reader: {
                type: 'json',
                rootProperty: 'books',
                totalProperty:'bookCount'
            },
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