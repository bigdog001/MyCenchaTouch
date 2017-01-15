Ext.define('MyApp.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {  
            mainview:'mainview',
            genre:'#genre'
        },
        control:{
            genre:{
                 change:'genre_onchange'
             }
        },
        routes: {
            'setHtml/:value': 'setHtmlByValue'
        }
    },
    genre_onchange: function() {
        var value=this.getGenre().getValue();
        if(value!="")
        {
            this.redirectTo('setHtml/'+value);
        }
    },
    setHtmlByValue:function(value){   
       var valueArray=["","喜剧","文艺","动作"];
       this.getMainview().setHtml(valueArray[value]);
    }
});



