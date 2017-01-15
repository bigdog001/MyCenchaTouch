Ext.define('MyApp.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {            
            panel:'#myPanel',
            myButton:'#myButton'
        },
        control:{
            myButton:{
                 tap:'addHtml'
             } 
        }
    },
    addHtml: function() {
        this.getPanel().add({
            html: '被添加的HTML'
        });
    }
});

