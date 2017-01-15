Ext.define('MyApp.controller.tablet.BookMain', {
    extend: 'Ext.app.Controller',
    config:{
        refs:{
            mainview:'mainview',
            bookmainview:'bookmainview',
            authorview:'authorview'
        },
        routes: {
            'loadmain': 'loadmain'
        }
    },
    loadmain:function(){
        var mainview=this.getMainview(),
        bookmainview=this.getBookmainview(),
        authorview=this.getAuthorview();
        mainview.getLayout().setAnimation({type:'fade',duration:1000});  
        mainview.setActiveItem(bookmainview);
        bookmainview.setActiveItem(authorview);
    }
});