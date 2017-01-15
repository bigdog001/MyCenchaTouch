Ext.define('MyApp.controller.phone.BookGenreList', {
    extend: 'MyApp.controller.BookGenreList',
    config:{
        routes: {
            'loadmain': 'loadmain'
        }
    },
    loadmain:function(){
        var mainview=this.getMainview(),
        bookgenrelistview=this.getBookgenrelistview();   
        mainview.getLayout().setAnimation({type:'fade',duration:1000});    
        mainview.setActiveItem(bookgenrelistview);
        bookgenrelistview.deselectAll();
    }
});