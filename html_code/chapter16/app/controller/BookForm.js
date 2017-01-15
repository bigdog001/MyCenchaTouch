Ext.define('MyApp.controller.BookForm', {
    extend: 'Ext.app.Controller', 
    config: {
        refs: {  
            mainview:'mainview',
            bookformview:'bookformview',
            hidden_id:'#hidden_id',
            hidden_genreid:'#hidden_genreid',
            btnOK:'#btnOK',
            btnReturn:'#btnReturn',
            txt_image:'#txt_image'
        },
        routes: {
            'loadbookform/:id/:genreid': 'loadBookFormView'
        },
        control:{
            btnOK:{
                tap:'btnOK_ontap'
            },
            btnReturn:{
                tap:'btnReturn_ontap'
            }
        }
    },    
    btnOK_ontap:function(){
        var id=this.getHidden_id().getValue();
        var bookStore=Ext.getStore('BookStore');
        if(id=="-1")
            var currentBook=Ext.create('MyApp.model.Book');
        else 
           currentBook=bookStore.getById(id);
        var bookformview=this.getBookformview();
        bookformview.updateRecord(currentBook);
        var errors = currentBook.validate();   
        if(errors.isValid())
        {    
            if(id=="-1") 
                bookStore.add(currentBook); 
            bookStore.load();            
            this.redirectTo('loadbooklist/'+this.getHidden_genreid().getValue()); 
        }
        else {
            currentBook.reject();
            var message = "";
            Ext.each(errors.items,function(rec){
                message += rec.getMessage()+"<br>";
            });
            Ext.Msg.alert("验证失败", message);                                    
        }
    },
    btnReturn_ontap:function(){
        this.redirectTo('loadbooklist/'+this.getHidden_genreid().getValue());
    }
});
          