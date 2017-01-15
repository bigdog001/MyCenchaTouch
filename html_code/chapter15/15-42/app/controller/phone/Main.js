Ext.define('MyApp.controller.phone.Main', {
    extend: 'MyApp.controller.Main',
    config: {
        refs: {  
            mainview:'mainview',
            returnButton: {
                selector: '#returnButton',
                xtype:'button',
                id:'returnButton',
                iconMask:true,
                iconCls: 'reply',
                autoCreate: true
            },
            toolbar:'filmformview toolbar'
        },
        control:{
            returnButton:{
                 tap:'goback'
             }
        },
        routes:{
            'loadList':'setList'
        }
    },
    loadFilm: function(list,index) {
        this.setIndex(index);
        this.getApplication().getHistory().add(
            Ext.create('Ext.app.Action', {
                url:'loadList'
        }));
        this.redirectTo('loadFilm');
    },
    setFilm: function() {
        this.callParent(arguments);
        this.getToolbar().add(this.getReturnButton());
        this.getMainview().setActiveItem(1);
    },   
    setList:function(){
        this.getFilmlistview().deselectAll();
        this.getMainview().setActiveItem(0);
    },
   goback:function(){
        this.getFilmlistview().deselectAll();
        this.redirectTo('loadList');
    }
})
