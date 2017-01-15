Ext.define('MyApp.store.BookGenreStore', {
    extend: 'Ext.data.Store',
    config:{ 
        autoLoad:true,
        model:'MyApp.model.BookGenre'
    }
});