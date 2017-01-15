Ext.define('MyApp.controller.tablet.BookForm', {
    extend: 'MyApp.controller.BookForm', 
    config:{
        refs:{
            bookmainview:'bookmainview',
        }
    }, 
    loadBookFormView:function(id,genreid){
        if(id=="-1")
            var book = Ext.create('MyApp.model.Book',{id:-1,image_url:'',
            book_name: '',author: '',description:'' }); 
        else{
            var bookStore=Ext.getStore('BookStore');
            var book=bookStore.getById(id);
        }
        var bookformview=this.getBookformview();
        bookformview.setRecord(book);
        var bookmainview=this.getBookmainview();
        bookmainview.getLayout().setAnimation({type:'fade',duration:1000});  
        bookmainview.setActiveItem(bookformview);
        this.getHidden_genreid().setValue(genreid);
    }
});
          