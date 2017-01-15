Ext.define('MyApp.controller.phone.BookList', {
    extend: 'MyApp.controller.BookList', 
    config:{
        refs:{
            toolbarBottom:'#toolbar_bottom',
            returnButton:{
                selector:'#btn_Return',
                xtype:'button',
                id:'btn_Return',
                iconMask:true,
                iconCls: 'reply',
                autoCreate:true
            }
        },
        control:{
            returnButton:{
                tap:'returnButton_ontap'
            }
        }
    },  
    launch:function(){
        this.callParent(arguments);
        this.getToolbarBottom().add(this.getReturnButton());
    },
    loadBookListView:function(id){    
        var bookStore=Ext.getStore('BookStore');
        bookStore.clearFilter();           
        bookStore.filter('genreid',id);
        bookStore.loadPage(1,{
            callback:function(){             
                var mainview=this.getMainview(),
                booklistview=this.getBooklistview();
                mainview.getLayout().setAnimation({type:'fade',duration:1000});  
                mainview.setActiveItem(booklistview);
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
    },
    returnButton_ontap:function(){
        this.redirectTo('loadmain');
    }
});