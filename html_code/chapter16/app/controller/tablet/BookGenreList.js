Ext.define('MyApp.controller.tablet.BookGenreList', {
    extend: 'MyApp.controller.BookGenreList',
    config:{
        refs:{
            toolbar_bottom:{
                selector:'bookgenrelistview #toolbar_bottom',
                xtype:'toolbar',
                id:'toolbar_bottom',
                docked:'bottom',
                autoCreate:true
            }
        }
    },
    launch:function(){
        bookgenrelistview=this.getBookgenrelistview(); 
        bookgenrelistview.add(this.getToolbar_bottom());
    }
});