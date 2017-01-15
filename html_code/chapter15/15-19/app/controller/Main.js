Ext.define('MyApp.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {  
            mainview:'mainview',
            search_bookname:'#search_bookname',
            formview: {
                selector: '#formview',
                xtype:'formview',
                autoCreate: true
            }
        },
        control:{
            search_bookname:{
                 change:'search_bookname_onchange'
             }
        },
        routes: {
            'loadBook': 'loadBook'
        },
        before: {
            loadBook: ['getBook']
        },
        currentBook:undefined
    },
    search_bookname_onchange: function() {
        this.redirectTo('loadBook');
    },
    getBook:function(action){
         var bookStore=Ext.getStore('BookStore');
         bookStore.clearFilter();
         var value=this.getSearch_bookname().getValue();
         if(value!="")
             bookStore.filter('book_name',value);
         bookStore.load({
             callback:function(records,operation,success)
             {
                 if(success)
                 {
                     var controller=action.getController();
                     controller.setCurrentBook(this.getAt(0));
                     action.resume();                    
                 }
             }
         });
    },
    loadBook:function(){   
        var mainview=this.getMainview();
        var formview=this.getFormview();
        mainview.add(formview); 
        formview.setRecord(this.getCurrentBook());
    }
});
