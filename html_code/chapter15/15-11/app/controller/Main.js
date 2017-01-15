Ext.define('MyApp.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {            
            panel:'#myPanel',
            mytoolbar:'#mytoolbar',
            myButton:'#myButton',
            testButton: {
                selector: '#mytoolbar #testButton',
                xtype:'button',
                id:'testButton',
                text:'测试按钮二',
                autoCreate: true
            }
        },
        control:{
            myButton:{
                 tap:'addButton'
             },
             testButton:{
                 tap:'addHtml'
             },
        }
    },
    addButton: function() {
       var button=this.getTestButton();
       this.getMytoolbar().add(button);
    },
    addHtml:function(){
        this.getPanel().add({
            html:'被添加的HTML'
        });
    }
});


