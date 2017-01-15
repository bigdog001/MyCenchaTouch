Ext.define('MyApp.controller.tablet.BookList', {
    extend: 'MyApp.controller.BookList', 
    config:{
        refs:{
            bookmainview:'bookmainview',
        }
    },  
    loadBookListView:function(id){  
        var bookStore=Ext.getStore('BookStore');
        bookStore.clearFilter();           
        bookStore.filter('genreid',id);
        bookStore.loadPage(1,{
            callback:function(){             
                var bookmainview=this.getBookmainview(),
                booklistview=this.getBooklistview();
                bookmainview.getLayout().setAnimation({type:'fade',duration:1000}); 
                bookmainview.setActiveItem(booklistview);
                this.setId(id);
                this.getSearch_bookname().setValue('');               
                booklistview.deselectAll();
                var bookStore=Ext.getStore('BookStore');
                if(bookStore.getData().length>0)
                {
                    this.getSelectPageBtn().setHidden(false);
                    this.getSelect_sort().enable();
                }
                else
                {
                    this.getSelectPageBtn().setHidden(true);
                    this.getSelect_sort().disable();
                }
            },
            scope:this
        },this);
    }
});