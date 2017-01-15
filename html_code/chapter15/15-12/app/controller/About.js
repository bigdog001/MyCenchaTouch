Ext.define('MyApp.controller.About', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {  
            aboutview: {
                selector: 'aboutview',
                xtype:'aboutview',
                autoCreate: true
            },
            MainButton:'#MainButton'
        },
        control:{
            MainButton:{
                 tap:'showMainView'
             }
        },
        routes: {
            'about': 'showAboutView'
        },
    },
    showMainView: function() {
        this.redirectTo('main');
    },
    showAboutView:function(){
       Ext.Viewport.setActiveItem(this.getAboutview());
    }
});
