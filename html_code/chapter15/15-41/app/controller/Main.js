Ext.define('MyApp.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {  
            filmlistview:'filmlistview',
            filmformview:'filmformview'
        },
        control:{
            filmlistview:{
                 itemtap:'loadFilm'
             }
        },
        routes:{
            'loadFilm':'setFilm'
        },
        index:undefined
    },
    loadFilm: function(list,index) {
        this.setIndex(index);
        this.redirectTo('loadFilm');
    },
    setFilm:function(){
        var film=Ext.getStore('FilmStore').getAt(this.getIndex());
        this.getFilmformview().setRecord(film);
    }    
});
