Ext.define('MyApp.model.BookGenre', {
    extend: 'Ext.data.Model',
    config:{ 
        fields:['id','name','childcount'],
        proxy: {
            type: 'ajax',
            url: 'getGenres.php',
            reader: {
                type: 'json',
                rootProperty: 'children'
            }
        },
        associations: [
        {
            type: 'belongsTo',
            model: 'genre',
            associationKey: 'children'
        }]
    }
});