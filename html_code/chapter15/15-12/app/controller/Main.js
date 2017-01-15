Ext.define('MyApp.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {  
            mainview: {
                selector: 'mainview',
                xtype:'mainview',
                autoCreate: true
            },
            AboutButton:'#AboutButton'
        },
        control:{
            AboutButton:{
                 tap:'showAboutView'
             }
        },
        routes: {
            'main': 'showMainView'
        }
    },
    showAboutView: function() {
        this.getApplication().getHistory().add(
            Ext.create('Ext.app.Action', {
                url:'main'
        }));
        this.redirectTo('about');
    },
    showMainView:function(){     
       Ext.Viewport.setActiveItem(this.getMainview());
    }
});



