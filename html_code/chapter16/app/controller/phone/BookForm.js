Ext.define('MyApp.controller.phone.BookForm', {
    extend: 'MyApp.controller.BookForm', 
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
        var mainview=this.getMainview();
        mainview.getLayout().setAnimation({type:'fade',duration:1000});  
        mainview.setActiveItem(bookformview);
        this.getHidden_genreid().setValue(genreid);
    }
});
          