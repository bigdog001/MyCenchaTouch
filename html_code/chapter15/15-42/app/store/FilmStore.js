Ext.define('MyApp.store.FilmStore', {
    extend : 'Ext.data.Store',
    config: {
        data: [
        {
            id: 1,
            title:'金陵十三钗',
            director:'张艺谋',
            genre:'历史',
            price:30
        },
        {
            id: 2,
            title:'龙门飞甲',
            director:'徐克',
            genre:'武侠',
            price:50
        }],
        fields:['id','title','director','genre','price']
    }
});
